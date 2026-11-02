import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = fileURLToPath(new URL("..", import.meta.url));

const readSource = (path) => readFileSync(join(root, path), "utf8");

const readMessages = (locale) => JSON.parse(readSource(`messages/${locale}.json`));

const english = readMessages("en");
const spanish = readMessages("es");

const listFiles = (dir) =>
  readdirSync(join(root, dir)).flatMap((name) => {
    const path = join(dir, name);
    return statSync(join(root, path)).isDirectory() ? listFiles(path) : [path];
  });

const config = readSource("config/site.ts");

// Every public source file the visitor's page is built from.
const publicFiles = () =>
  [...listFiles("app"), ...listFiles("components"), ...listFiles("config"), ...listFiles("lib"), ...listFiles("messages")].filter((path) =>
    /\.(tsx?|json|css|mjs)$/.test(path),
  );

// Every string in a messages tree, with its dotted path.
const strings = (value, prefix = "") =>
  typeof value === "string"
    ? [[prefix, value]]
    : Object.entries(value).flatMap(([key, entry]) => strings(entry, prefix ? `${prefix}.${key}` : key));

// Reads width and height from a baseline or progressive JPEG's SOF marker.
const jpegSize = (buffer) => {
  let offset = 2;
  while (offset < buffer.length) {
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc2) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  throw new Error("No SOF marker");
};

// PNG header: width and height are big-endian at bytes 16 and 20.
const pngSize = (buffer) => ({ width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) });

test("Spanish and English translations preserve matching keys", () => {
  const flattenKeys = (value, prefix = "") =>
    Object.entries(value).flatMap(([key, entry]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return entry && typeof entry === "object" && !Array.isArray(entry) ? flattenKeys(entry, path) : [path];
    });
  assert.deepEqual(flattenKeys(spanish).sort(), flattenKeys(english).sort());
  // Arrays of rows (the diagram's sample data) keep the same length too.
  assert.equal(spanish.Kwad.architecture.diagram.sample.a.length, english.Kwad.architecture.diagram.sample.a.length);
  assert.equal(spanish.Kwad.architecture.diagram.sample.b.length, english.Kwad.architecture.diagram.sample.b.length);
  for (const [path, text] of strings(english)) assert.ok(text.trim(), `Empty English string at ${path}`);
  for (const [path, text] of strings(spanish)) assert.ok(text.trim(), `Empty Spanish string at ${path}`);
});

test("every translation key the components use exists in both locales", () => {
  const sources = [...listFiles("components"), ...listFiles("app")].filter((path) => path.endsWith(".tsx"));
  const has = (messages, path) => path.split(".").reduce((node, key) => node?.[key], messages) !== undefined;
  for (const path of sources) {
    const source = readSource(path);
    // useTranslations("Namespace") / getTranslations({ namespace: "Namespace" }) with plain t("key") calls.
    const namespaces = [...source.matchAll(/(?:useTranslations\(|namespace: )"([\w.]+)"/g)].map((match) => match[1]);
    if (namespaces.length !== 1) continue;
    const [namespace] = namespaces;
    for (const [, key] of source.matchAll(/\bt\("([\w.]+)"/g)) {
      for (const [locale, messages] of [["es", spanish], ["en", english]]) {
        assert.ok(has(messages, `${namespace}.${key}`), `${path}: ${locale} is missing ${namespace}.${key}`);
      }
    }
  }
});

test("the home says who, what and that he is available, in the agreed words", () => {
  assert.equal(spanish.Hero.availability, "Disponible para empezar ya · remoto o en Valladolid");
  assert.equal(spanish.Hero.title, "Hola, soy Luisma.");
  assert.equal(
    spanish.Hero.lead,
    "Soy desarrollador full stack. Me gusta construir producto de punta a punta: la interfaz que usa la gente y la API que hay detrás.",
  );
  assert.match(spanish.Hero.body, /^Trabajo sobre todo con TypeScript, React, Angular, Node\.js y PostgreSQL\./);
  assert.equal(spanish.Hero.primaryCta, "Ver proyectos");
  assert.equal(spanish.Hero.cvCta, "Descargar CV");
  assert.equal(spanish.Search.placeholder, "Prueba con «React» o «MQTT»");
  assert.equal(spanish.Search.empty, "No encuentro nada con «{query}». Prueba con React, NestJS o MQTT.");
  assert.equal(spanish.Search.help, "↑ ↓ para moverte · Enter para abrir · Esc para borrar");
  assert.equal(spanish.Contact.title, "¿Te encaja mi perfil? Escríbeme y lo hablamos.");
  for (const locale of [spanish, english]) {
    assert.match(locale.Hero.availability, /Valladolid/);
    assert.match(locale.Hero.body, /KWAD/);
    assert.match(locale.Hero.body, /SIGIES/);
  }
});

test("the KWAD claims promise no more than there is", () => {
  assert.equal(
    spanish.Approach.items.tenants.body,
    "KWAD es multi-tenant: cada petición viaja con su organización, y un chequeo del CI busca consultas que podrían saltarse ese filtro y falla si aparece alguna nueva.",
  );
  assert.match(spanish.Kwad.architecture.body, /La idea es que ninguna capa dependa de que alguien se acuerde de pasar el organizationId\./);
  assert.equal(spanish.Kwad.testing.body, "Cada cambio pasa por GitHub Actions.");
  assert.equal(
    spanish.Kwad.testing.steps.isolation.detail,
    "Busca consultas que podrían saltarse el filtro de organización y falla si aparece alguna nueva.",
  );
  // The CI does not gate the deployment, and it does not prove isolation.
  for (const locale of [spanish, english]) {
    assert.doesNotMatch(locale.Kwad.testing.body, /producci|production/i);
    assert.doesNotMatch(JSON.stringify(locale), /nadie vea datos|ninguna organización vea|nobody can see|no organisation can see/i);
  }
});

test("the projects are the five real ones, in order, with their links", () => {
  const ids = [...config.matchAll(/^ {4}id: "(\w+)",$/gm)].map((match) => match[1]);
  assert.deepEqual(ids, ["kwad", "sigies", "iotPlatform", "iotTestbench", "store"]);
  assert.match(config, /id: "kwad",\n {4}href: "\/kwad"/);
  assert.match(config, /id: "sigies",\n {4}href: null/);
  assert.match(config, /href: "https:\/\/github\.com\/RusoMDK\/PlataformaIoT"/);
  assert.match(config, /href: "https:\/\/github\.com\/RusoMDK\/iot-testbench"/);
  assert.match(config, /href: "https:\/\/github\.com\/RusoMDK\/Tienda-Virtual"/);
  for (const locale of [spanish, english]) {
    assert.deepEqual(Object.keys(locale.Projects.items), ids);
    for (const id of ids) {
      const item = locale.Projects.items[id];
      assert.ok(item.name && item.kind && item.years && item.description && item.cta, `Missing copy for ${id}`);
    }
  }
  assert.equal(spanish.Projects.items.kwad.kind, "Proyecto propio");
  assert.equal(spanish.Projects.items.kwad.years, "2026 – hoy");
  assert.equal(spanish.Projects.items.sigies.kind, "Trabajo en FORTES (UCI)");
  assert.equal(spanish.Projects.items.sigies.years, "2024 – 2026");
});

test("contact links are the real ones and both CVs exist", () => {
  assert.match(config, /email: "luissantoslezcano@gmail\.com"/);
  assert.match(config, /linkedin: "https:\/\/www\.linkedin\.com\/in\/luissantosdev\/"/);
  assert.match(config, /github: "https:\/\/github\.com\/RusoMDK"/);
  assert.match(config, /kwadUrl: "https:\/\/getkwad\.com"/);
  for (const locale of ["es", "en"]) {
    const path = `/docs/luis-manuel-santos-cv-${locale}.pdf`;
    assert.match(config, new RegExp(`${locale}: "${path.replace(/\./g, "\\.")}"`));
    const pdf = readFileSync(join(root, "public", path));
    assert.equal(pdf.subarray(0, 5).toString(), "%PDF-", `${path} is not a PDF`);
  }
  const footer = readSource("components/layout/site-footer.tsx");
  assert.match(footer, /<footer id="contacto"/);
  for (const link of ["siteConfig.linkedin", "siteConfig.github", "siteConfig.cv[locale]", "mailto:${siteConfig.email}"]) {
    assert.ok(footer.includes(link), `Contact is missing ${link}`);
  }
  const header = readSource("components/layout/site-header.tsx");
  for (const href of ['"/#proyectos"', '"/kwad"', '"/#contacto"']) assert.ok(header.includes(href), `Header is missing ${href}`);
  assert.match(header, /siteConfig\.cv\[locale\]/);
  assert.match(header, /<ThemeToggle \/>/);
  assert.match(header, /<LanguageSwitcher \/>/);
});

test("the search is a real combobox and shares its query with the filters", () => {
  const search = readSource("components/home/project-search.tsx");
  for (const attribute of ['role="combobox"', 'role="listbox"', 'role="option"', "aria-activedescendant", "aria-controls", "aria-selected"]) {
    assert.ok(search.includes(attribute), `Search is missing ${attribute}`);
  }
  for (const key of ['"ArrowDown"', '"ArrowUp"', '"Enter"', '"Escape"']) assert.ok(search.includes(key), `Search ignores ${key}`);
  assert.match(search, /event\.metaKey \|\| event\.ctrlKey\) && event\.key\.toLowerCase\(\) === "k"/);
  const section = readSource("components/home/projects-section.tsx");
  assert.match(section, /aria-pressed=/);
  assert.match(section, /useProjects\(\)/);
  assert.match(search, /useProjects\(\)/);
});

test("the headline names itself and hides what moves", () => {
  const title = readSource("components/home/scramble-title.tsx");
  assert.match(title, /aria-label=\{text\}/);
  assert.match(title, /className="scramble" aria-hidden="true"/);
  const motion = readSource("components/home/scramble-motion.tsx");
  assert.match(motion, /useGSAP/);
  assert.match(motion, /prefers-reduced-motion: reduce/);
  // GSAP stays out of the first paint: the motion is its own chunk.
  assert.match(title, /dynamic\(\(\) => import\("\.\/scramble-motion"\), \{ ssr: false \}\)/);
  assert.doesNotMatch(title, /from "gsap"/);
  const css = readSource("app/globals.css");
  assert.match(css, /@media \(prefers-reduced-motion: no-preference\) \{\s*\.js \.scramble \.scramble-text/);
});

test("the glyph field never blocks the page", () => {
  const backdrop = readSource("components/home/glyph-backdrop.tsx");
  assert.match(backdrop, /dynamic\(\(\) => import\("\.\/glyph-field"\), \{ ssr: false \}\)/);
  assert.match(backdrop, /requestIdleCallback/);
  assert.match(backdrop, /aria-hidden="true"/);
  const field = readSource("components/home/glyph-field.tsx");
  assert.match(field, /getContext\("webgl2"/);
  assert.match(field, /MAX_DPR = 2/);
  assert.match(field, /IntersectionObserver/);
  assert.match(field, /visibilitychange/);
  assert.match(field, /prefers-reduced-motion: reduce/);
  assert.match(field, /CELL = \{ w: 12, h: 22 \}/);
  assert.equal(readSource("lib/glyphs.ts").includes('"{}[]()<>/;:=+-*_.|&#$01"'), true);
});

test("the theme follows the system, remembers the choice and never flashes", () => {
  const css = readSource("app/globals.css");
  for (const token of ["#0a0a0b", "#131316", "#26262b", "#ededef", "#9a9aa3", "#3b5bff", "#1c2342", "#8fa3ff", "#3dd68c"]) {
    assert.ok(css.includes(token), `Missing dark token ${token}`);
  }
  for (const token of ["#f7f7f5", "#ffffff", "#e4e4e0", "#111113", "#5e5e66", "#2f4be0", "#e9edff", "#1f9d5a"]) {
    assert.ok(css.includes(token), `Missing light token ${token}`);
  }
  assert.match(css, /@theme inline \{/);
  assert.match(css, /prefers-color-scheme: dark/);
  assert.doesNotMatch(css, /gradient\(|backdrop-filter/);
  const layout = readSource("app/[locale]/layout.tsx");
  assert.match(layout, /dangerouslySetInnerHTML=\{\{ __html: themeScript \}\}/);
  assert.match(layout, /suppressHydrationWarning/);
  assert.match(readSource("lib/theme.ts"), /localStorage\.getItem/);
});

test("Geist for text and Geist Mono for technical data, through next/font", () => {
  const fonts = readSource("lib/fonts.ts");
  assert.match(fonts, /import \{ Geist, Geist_Mono \} from "next\/font\/google"/);
  assert.doesNotMatch(fonts, /Besley|Libre_Franklin/);
});

test("the old ticket concept is gone", () => {
  for (const path of [
    "components/marketing/ticket",
    "components/marketing/roll",
    "components/marketing/havana",
    "components/marketing/contact",
    "lib/code128.ts",
    "lib/lcd-font.ts",
    "lib/visit.ts",
  ]) {
    assert.equal(existsSync(join(root, path)), false, `${path} still exists`);
  }
  for (const locale of [spanish, english]) {
    for (const namespace of ["Ticket", "Roll", "Havana", "Footer"]) assert.equal(locale[namespace], undefined, `${namespace} still in messages`);
  }
  for (const path of publicFiles()) {
    assert.doesNotMatch(readSource(path), /ticket|TPV demo|cupón|coupon|barcode|zigzag/i, `Ticket wording in ${path}`);
  }
});

test("public content never mentions embargo, VPS or VPN", () => {
  for (const path of publicFiles()) {
    assert.doesNotMatch(readSource(path), /embargo|\bVPS\b|\bVPN\b/i, `Forbidden word in ${path}`);
  }
});

test("no payments, payment providers or unannounced plans reach public files", () => {
  for (const path of publicFiles()) {
    assert.doesNotMatch(readSource(path), /enzona|stripe|pasarela|payment gateway|transfermóvil/i, `Payments mentioned in ${path}`);
  }
});

test("projects that left the portfolio stay out", () => {
  for (const source of [config, readSource("messages/es.json"), readSource("messages/en.json")]) {
    assert.doesNotMatch(source, /ArtCollab|creativePlatform/);
  }
});

test("no public text calls the postgraduate studies a master's or a degree held", () => {
  assert.match(spanish.About.body, /cursé estudios de posgrado en Informática Avanzada/);
  assert.match(english.About.body, /postgraduate studies in Advanced Computing/);
  const files = ["messages/es.json", "messages/en.json", "config/site.ts", ...listFiles("components").filter((path) => path.endsWith(".tsx"))];
  for (const path of files) {
    assert.doesNotMatch(readSource(path), /máster|\bmaster'?s\b|titulad|graduated/i, `Wording in ${path}`);
  }
});

test("SIGIES is described only with the agreed words", () => {
  const sigies = strings(spanish).filter(([, text]) => /SIGIES/.test(text)).map(([path]) => path);
  assert.deepEqual(sigies.sort(), ["Approach.items.production.body", "Hero.body", "Projects.items.sigies.name"].sort());
  assert.equal(
    spanish.Projects.items.sigies.description,
    "La plataforma con la que Cuba gestiona el ingreso a la universidad. Mantuve el sistema antiguo en los picos de cada convocatoria y desarrollé módulos de la versión nueva.",
  );
});

test("only Luisma's own photographs: no archive pictures, originals kept out of git", () => {
  for (const source of [config, readSource("messages/es.json"), readSource("messages/en.json"), readSource("app/globals.css")]) {
    assert.doesNotMatch(source, /wikimedia|creativecommons|photoCredits/i);
  }
  assert.match(readSource(".gitignore"), /^\/public\/images\/invernadero\/originales\/$/m);
  const tracked = execFileSync("git", ["ls-files", "public/images/invernadero"], { cwd: root, encoding: "utf8" });
  assert.doesNotMatch(tracked, /originales/);

  const photos = [...config.matchAll(/\{ src: "(\/images\/invernadero\/[^"]+)", width: (\d+), height: (\d+) \}/g)];
  assert.equal(photos.length, 3);
  for (const [, src, width, height] of photos) {
    assert.deepEqual(jpegSize(readFileSync(join(root, "public", src))), { width: Number(width), height: Number(height) }, src);
  }
  // The two IoT projects show their own hardware; their alt text exists in both languages.
  assert.match(config, /id: "iotPlatform",[\s\S]*?photo: "seedbed"/);
  assert.match(config, /id: "iotTestbench",[\s\S]*?photo: "thesisBench"/);
  for (const locale of [spanish, english]) {
    assert.ok(locale.Projects.items.iotPlatform.photoAlt && locale.Projects.items.iotTestbench.photoAlt);
  }
  // With a mouse the photo follows the pointer; on a touch screen it sits in the card.
  const card = readSource("components/home/project-card.tsx");
  assert.match(card, /\[@media\(hover:none\)\]:block/);
  assert.match(card, /\[@media\(hover:none\)\]:hidden/);

  const [, src, width, height] = config.match(/profileImage: \{ src: "([^"]+)", width: (\d+), height: (\d+) \}/);
  assert.deepEqual(pngSize(readFileSync(join(root, "public", src))), { width: Number(width), height: Number(height) });
});

test("each locale has its own Open Graph card, also on /kwad", () => {
  const layout = readSource("app/[locale]/layout.tsx");
  const kwad = readSource("app/[locale]/(marketing)/kwad/page.tsx");
  for (const locale of ["es", "en"]) {
    const path = `public/images/og/og-${locale}.png`;
    assert.match(config, new RegExp(`${locale}: "/images/og/og-${locale}.png"`));
    assert.deepEqual(pngSize(readFileSync(join(root, path))), { width: 1200, height: 630 }, path);
  }
  for (const source of [layout, kwad]) {
    assert.match(source, /siteConfig\.ogImage\[locale\]/);
    assert.match(source, /twitter: \{[\s\S]*images: \[image\]/);
    assert.match(source, /languages: \{/);
  }
  assert.match(kwad, /t\("kwadTitle"\)/);
  for (const locale of [spanish, english]) {
    assert.ok(locale.Metadata.title && locale.Metadata.description && locale.Metadata.kwadTitle && locale.Metadata.kwadDescription);
    assert.ok(locale.Metadata.description.length <= 170, "Description too long for search results");
  }
});

test("KWAD screenshots are sharp at 2x and their text reads at 11px or more", () => {
  const source = readSource("components/kwad/shot.tsx");
  const entries = [
    ...source.matchAll(/(desktop|mobile): \{ src: "([^"]+)", width: (\d+), height: (\d+), native: (\d+), minFont: ([\d.]+), display: (\d+)/g),
  ];
  assert.equal(entries.length, 8);
  for (const [, kind, src, width, height, native, minFont, display] of entries) {
    const size = jpegSize(readFileSync(join(root, "public", src)));
    assert.deepEqual(size, { width: Number(width), height: Number(height) }, src);
    // The source has at least twice the CSS width it is shown at.
    assert.ok(size.width >= 2 * Number(display), `${kind} ${src}: ${size.width}px for ${display} CSS px`);
    // Never upscaled past the captured element, and its smallest text stays at 11px or more.
    assert.ok(Number(display) <= Number(native), `${kind} ${src} is shown larger than captured`);
    assert.ok((Number(minFont) * Number(display)) / Number(native) >= 11, `${kind} ${src}: text below 11px`);
  }
  // Below the fold a capture waits behind the page's largest paint.
  assert.match(source, /fetchPriority: "low"/);
});

test("the height check stays local: a few lines of copy must not fail CI", () => {
  assert.doesNotMatch(readSource(".github/workflows/content-checks.yml"), /test:height/);
});
