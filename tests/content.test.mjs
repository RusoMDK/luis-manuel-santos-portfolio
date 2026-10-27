import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

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
const projectsBlock = config.slice(config.indexOf("export const projects"), config.indexOf("] as const;", config.indexOf("export const projects")));
const projectIds = [...projectsBlock.matchAll(/id: "([^"]+)"/g)].map((match) => match[1]);

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
    assert.match(locale.Ticket.totalNote, /Valladolid/);
  }
});

test("all featured project translations exist in both locales", () => {
  assert.deepEqual(projectIds, ["sigies", "iotTestbench", "iotPlatform", "ecommerce"]);
  for (const locale of [spanish, english]) {
    for (const id of projectIds) {
      for (const field of ["title", "meta", "description", "stack"]) {
        assert.ok(locale.Work.items[id]?.[field], `Missing Work.items.${id}.${field}`);
      }
    }
    for (const id of ["pos", "inventory", "currency", "store", "console"]) {
      assert.ok(locale.Kwad.modules[id]?.title, `Missing KWAD module title: ${id}`);
      assert.ok(locale.Kwad.modules[id]?.text, `Missing KWAD module text: ${id}`);
    }
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

test("photo credits say the pictures are cropped", () => {
  assert.match(spanish.Footer.creditsBy, /<license>\{name\}<\/license>.*recortada/);
  assert.match(english.Footer.creditsBy, /<license>\{name\}<\/license>.*cropped/);
  const config = readSource("config/site.ts");
  assert.equal((config.match(/licenseUrl: "https:\/\/creativecommons.org/g) ?? []).length, 2);
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
