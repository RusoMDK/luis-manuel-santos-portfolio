import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const readSource = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("KWAD case study has a dedicated route and localized entry", () => {
  const route = readSource("app/[locale]/(marketing)/kwad/page.tsx");
  assert.match(route, /KwadCaseStudy/);
  assert.match(route, /locale !== "es" && locale !== "en"/);
});

test("featured work links to the localized KWAD case study", () => {
  const featured = readSource("components/marketing/sections/kwad-feature.tsx");
  const english = JSON.parse(readSource("messages/en.json"));
  const spanish = JSON.parse(readSource("messages/es.json"));
  assert.match(featured, /href="\/kwad"/);
  assert.match(featured, /t\("caseStudy"\)/);
  assert.equal(english.Kwad.caseStudy, "Read the case study");
  assert.equal(spanish.Kwad.caseStudy, "Ver caso de estudio");
});

test("case study documents five actual application boundaries", () => {
  const study = readSource("components/marketing/sections/kwad-case-study.tsx");
  const applicationNames = ["Back-office", "Storefront", "Platform admin", "API", "Marketing site"];

  for (const name of applicationNames) {
    assert.ok(study.includes(`name: "${name}"`), `Missing application: ${name}`);
  }

  assert.match(study, /Tenant isolation/);
  assert.match(study, /Aislamiento multi-tenant/);
  assert.match(study, /proprietary/);
});

test("case study provides content for both locales", () => {
  const source = readSource("components/marketing/sections/kwad-case-study.tsx");
  assert.match(source, /es: \{/);
  assert.match(source, /en: \{/);
  assert.match(source, /purpose\[locale\]/);
});
