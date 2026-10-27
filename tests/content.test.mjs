import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
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
const rollBlock = config.slice(config.indexOf("export const rollEntries"), config.indexOf("] as const;", config.indexOf("export const rollEntries")));
const rollIds = [...rollBlock.matchAll(/id: "([^"]+)"/g)].map((match) => match[1]);

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

test("Spanish and English translations preserve matching keys", () => {
  const flattenKeys = (value, prefix = "") =>
    Object.entries(value).flatMap(([key, entry]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return entry && typeof entry === "object" && !Array.isArray(entry)
        ? flattenKeys(entry, path)
        : [path];
    });
  assert.deepEqual(flattenKeys(spanish).sort(), flattenKeys(english).sort());
});

test("both locales describe the current location and core work", () => {
  for (const locale of [spanish, english]) {
    assert.match(locale.Hero.lead, /Valladolid/);
    assert.match(locale.Hero.lead, /KWAD/);
    assert.match(locale.Kwad.title, /KWAD/);
  }
});

test("Valladolid shows in three places only: hero, the October 2026 copy and availability", () => {
  for (const locale of [spanish, english]) {
    const visible = strings(locale).filter(([path]) => !path.startsWith("Metadata."));
    const places = visible.filter(([, text]) => /Valladolid/.test(text)).map(([path]) => path);
    assert.deepEqual(places, ["Hero.lead", "Roll.entries.valladolid.items.0.name", "About.p3"]);
  }
  // The hero ticket prints the till and the time, not the city.
  assert.match(readSource("components/marketing/ticket/hero-ticket.tsx"), /\{t\("register"\)\} · /);
  assert.equal(spanish.Ticket.totalNote, "Remoto o híbrido");
  assert.equal(english.Ticket.totalNote, "Remote or hybrid");
});

test("the roll prints every stage, oldest first, in both locales", () => {
  assert.deepEqual(rollIds, [
    "uci",
    "iotModule",
    "thesis",
    "sigies",
    "iotPlatform",
    "proxyAgent",
    "smartIot",
    "ecommerce",
    "kwad",
    "sesamo",
    "valladolid",
  ]);
  const dates = [...rollBlock.matchAll(/year: (\d+), month: (\d+|null)/g)].map(([, year, month]) =>
    Number(year) * 100 + (month === "null" ? 0 : Number(month)),
  );
  assert.equal(dates.length, rollIds.length);
  for (const locale of [spanish, english]) {
    assert.equal(locale.Roll.months.length, 12);
    for (const id of rollIds) {
      const entry = locale.Roll.entries[id];
      assert.ok(entry?.items?.length && entry.total, `Missing Roll.entries.${id}`);
    }
    // No numbering on the copies.
    assert.doesNotMatch(JSON.stringify(locale.Roll), /Nº|No\. \d/);
  }
  assert.equal(spanish.Roll.entries.thesis.total, "INGENIERO");
  assert.match(rollBlock, /id: "uci", year: 2019, month: null/);
  assert.match(rollBlock, /id: "iotModule", year: 2023, month: 11/);
  assert.match(rollBlock, /id: "kwad", year: 2026, month: 4, anchor: "#kwad"/);
  assert.match(rollBlock, /id: "valladolid", year: 2026, month: 10, stone: true/);
  assert.equal(spanish.Navigation.roll, "Trayectoria");
  assert.equal(spanish.Roll.title, "El rollo");
});

test("the KWAD module panel shows only modules with an honest picture", () => {
  for (const locale of [spanish, english]) {
    assert.deepEqual(Object.keys(locale.Kwad.modules), ["pos", "inventory", "currency", "console"]);
    for (const id of Object.keys(locale.Kwad.modules)) {
      assert.ok(locale.Kwad.modules[id].title && locale.Kwad.modules[id].text, `Missing KWAD module: ${id}`);
    }
  }
  const panel = readSource("components/marketing/kwad/kwad-modules.tsx");
  // The active module follows clicks, focus and the scroll, never the pointer.
  assert.doesNotMatch(panel, /onPointerEnter|onMouseEnter/);
  assert.doesNotMatch(panel, /0\d \/ 0\d/);
  assert.match(readSource("components/common/motion-layer.tsx"), /MODULE_ENTER_EVENT/);
});

test("public content never mentions embargo, VPS or VPN", () => {
  const files = [
    ...listFiles("app"),
    ...listFiles("components"),
    ...listFiles("config"),
    ...listFiles("lib"),
    ...listFiles("messages"),
  ].filter((path) => /\.(tsx?|json|css|mjs)$/.test(path));
  for (const path of files) {
    assert.doesNotMatch(readSource(path), /embargo|\bVPS\b|\bVPN\b/i, `Forbidden word in ${path}`);
  }
});

test("projects that left the portfolio stay out", () => {
  const sources = [config, readSource("messages/es.json"), readSource("messages/en.json")];
  for (const source of sources) {
    assert.doesNotMatch(source, /ArtCollab|creativePlatform/);
  }
});

test("unannounced payment plans never reach public files", () => {
  const files = [
    ...listFiles("app"),
    ...listFiles("components"),
    ...listFiles("config"),
    ...listFiles("lib"),
    ...listFiles("messages"),
  ].filter((path) => /\.(tsx?|json|css|mjs)$/.test(path));
  for (const path of files) {
    assert.doesNotMatch(readSource(path), /enzona/i, `EnZona mentioned in ${path}`);
  }
});

test("the about letter leaves SIGIES and Smart IoT to the roll", () => {
  for (const locale of [spanish, english]) {
    assert.doesNotMatch(Object.values(locale.About).join(" "), /SIGIES|Smart IoT/);
  }
});

test("the about letter states the postgraduate studies as finished", () => {
  assert.match(spanish.About.p1, /Cursé estudios de posgrado en Informática Avanzada \(UCI, 2025–2026\)/);
  for (const locale of [spanish, english]) {
    const letter = Object.values(locale.About).join(" ");
    assert.doesNotMatch(letter, /\bsigo\b|máster|master|titulad|graduated/i);
  }
});

test("the demo uses the agreed sample rates and labels them as samples", () => {
  assert.match(config, /CUP: 650/);
  assert.match(config, /EUR: 0\.92/);
  assert.match(spanish.Havana.demo.rates, /^Tasas de ejemplo: 1 USD = 650 CUP · 1 USD = 0,92 EUR$/);
  assert.match(english.Havana.demo.rates, /^Sample rates: 1 USD = 650 CUP · 1 USD = 0\.92 EUR$/);
});

test("the tenant diagram does not invent a storefront domain", () => {
  for (const locale of [spanish, english]) {
    assert.doesNotMatch(JSON.stringify(locale.Kwad), /getkwad\.com\//);
    assert.doesNotMatch(JSON.stringify(locale.Kwad), /\w+\.getkwad\.com/);
  }
});

test("the ticket barcode uses a complete Code 128 table", () => {
  const source = readSource("lib/code128.ts");
  const table = source.slice(source.indexOf("["), source.indexOf("] as const"));
  const patterns = [...table.matchAll(/"(\d+)"/g)].map((match) => match[1]);
  assert.equal(patterns.length, 107);
  patterns.forEach((pattern, index) => {
    const modules = [...pattern].reduce((sum, digit) => sum + Number(digit), 0);
    assert.equal(modules, index === 106 ? 13 : 11, `Pattern ${index} has ${modules} modules`);
  });
  assert.equal(new Set(patterns).size, 107);
});

test("only Luisma's own photographs: no archive pictures, originals kept out of git", () => {
  const sources = [config, readSource("messages/es.json"), readSource("messages/en.json"), readSource("app/globals.css")];
  for (const source of sources) {
    assert.doesNotMatch(source, /wikimedia|creativecommons|photoCredits|data-drift/i);
  }
  assert.equal(listFiles("public/images").some((path) => path.includes("/places/")), false);
  assert.match(readSource(".gitignore"), /^\/public\/images\/invernadero\/originales\/$/m);
  const tracked = execFileSync("git", ["ls-files", "public/images/invernadero"], { cwd: root, encoding: "utf8" });
  assert.doesNotMatch(tracked, /originales/);

  const photos = [...config.matchAll(/\{ src: "(\/images\/invernadero\/[^"]+)", width: (\d+), height: (\d+) \}/g)];
  assert.equal(photos.length, 3);
  for (const [, src, width, height] of photos) {
    assert.deepEqual(jpegSize(readFileSync(join(root, "public", src))), { width: Number(width), height: Number(height) }, src);
  }
});

test("the thesis LCD draws every character it prints", () => {
  const font = readSource("lib/lcd-font.ts");
  const glyphs = new Set([...font.matchAll(/^ {2}(?:"(.)"|(\w)): \[/gm)].map(([, quoted, bare]) => quoted ?? bare));
  const printed = ["Planta: Humeda", "Planta: Seca", "Humedad: 79%", "Temp: 25.60°C", "IC: 27.06°C", "Bomba: ON", "Bomba: OFF"];
  for (const text of printed) {
    for (const char of text) assert.ok(glyphs.has(char), `No glyph for "${char}" in "${text}"`);
  }
  const panel = readSource("components/marketing/roll/lcd-panel.tsx");
  for (const text of ["Planta: ", "Humeda", "Seca", "Humedad: ", "Temp: ", "IC: ", "Bomba: "]) assert.ok(panel.includes(text), text);
  assert.match(panel, /PUMP_THRESHOLD = 30/);
  assert.match(panel, /data-ui role="img" aria-label=\{reading\}/);
  for (const locale of [spanish, english]) assert.match(locale.Roll.lcd.threshold, /30/);
});

test("each locale has its own Open Graph card and the old cover is gone", () => {
  const config = readSource("config/site.ts");
  const layout = readSource("app/[locale]/layout.tsx");
  for (const locale of ["es", "en"]) {
    const path = `public/images/og/og-${locale}.png`;
    assert.match(config, new RegExp(`${locale}: "/images/og/og-${locale}.png"`));
    const png = readFileSync(join(root, path));
    // PNG header: width and height are big-endian at bytes 16 and 20.
    assert.equal(png.readUInt32BE(16), 1200, `${path} width`);
    assert.equal(png.readUInt32BE(20), 630, `${path} height`);
  }
  assert.match(layout, /siteConfig\.ogImage\[locale\]/);
  assert.match(layout, /twitter: \{[\s\S]*images: \[image\]/);
  assert.equal(listFiles("public/images").some((path) => path.endsWith("og-cover.jpg")), false);
});

test("KWAD screenshots are sharp at 2x and their text reads at 11px or more", () => {
  const source = readSource("components/marketing/kwad/shot.tsx");
  const entries = [
    ...source.matchAll(
      /(desktop|mobile): \{ src: "([^"]+)", width: (\d+), height: (\d+), native: (\d+), minFont: ([\d.]+), display: (\d+)/g,
    ),
  ];
  assert.equal(entries.length, 10);
  for (const [, kind, src, width, height, native, minFont, display] of entries) {
    const size = jpegSize(readFileSync(join(root, "public", src)));
    assert.deepEqual(size, { width: Number(width), height: Number(height) }, src);
    // The source has at least twice the CSS width it is shown at.
    assert.ok(size.width >= 2 * Number(display), `${kind} ${src}: ${size.width}px for ${display} CSS px`);
    // Never upscaled past the captured element, and its smallest text stays at 11px or more.
    assert.ok(Number(display) <= Number(native), `${kind} ${src} is shown larger than captured`);
    assert.ok((Number(minFont) * Number(display)) / Number(native) >= 11, `${kind} ${src}: text below 11px`);
  }
});
