import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const readMessages = (locale) =>
  JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"));

const english = readMessages("en");
const spanish = readMessages("es");

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
  assert.match(spanish.Hero.description, /Valladolid/);
  assert.match(english.Hero.description, /Valladolid/);
  assert.match(spanish.Experience.items.systems.title, /KWAD/);
  assert.match(english.Experience.items.systems.title, /KWAD/);
});

test("all featured project translations exist in both locales", () => {
  for (const locale of [spanish, english]) {
    for (const id of ["iotPlatform", "ecommerce", "creativePlatform", "kwad"]) {
      assert.ok(locale.Projects.items[id]?.title, `Missing project title: ${id}`);
      assert.ok(locale.Projects.items[id]?.description, `Missing project description: ${id}`);
    }
  }
});
