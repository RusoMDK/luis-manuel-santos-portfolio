import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

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

test("KWAD is the only case study; other work links to its repository", () => {
  assert.equal(existsSync(new URL("../app/[locale]/(marketing)/projects", import.meta.url)), false);
  const config = readSource("config/site.ts");
  assert.doesNotMatch(config, /caseStudySlug/);
  const section = readSource("components/marketing/sections/projects-section.tsx");
  assert.doesNotMatch(section, /\/projects\//);
  assert.match(section, /project\.repoHref/);
  for (const repo of ["iot-testbench", "PlataformaIoT", "Tienda-Virtual"]) {
    assert.match(config, new RegExp(`repoHref: "https://github.com/RusoMDK/${repo}"`));
  }
});

test("old case-study URLs redirect, with and without a locale prefix", async () => {
  // Evaluate the redirects() list from next.config.ts without loading Next.js.
  const source = readSource("next.config.ts");
  const body = source.slice(source.indexOf("async redirects()"), source.indexOf("\n  },\n};"));
  const list = body.slice(body.indexOf("return [") + "return ".length, body.lastIndexOf("];") + 1);
  const redirects = new Function(`return ${list}`)();

  const match = (path) => {
    for (const rule of redirects) {
      const pattern = new RegExp(
        "^" +
          rule.source
            .replace(/\/:locale\(es\|en\)/, "/(es|en)")
            .replace(/\/:slug\*/, "(?:/.*)?") +
          "$",
      );
      const found = path.match(pattern);
      if (found) return rule.destination.replace(":locale", found[1] ?? "");
    }
    return null;
  };

  for (const prefix of ["", "/es", "/en"]) {
    assert.equal(match(`${prefix}/projects/iot-platform`), "https://github.com/RusoMDK/PlataformaIoT");
    assert.equal(match(`${prefix}/projects/ecommerce`), "https://github.com/RusoMDK/Tienda-Virtual");
    assert.equal(match(`${prefix}/projects/creative-platform`), prefix || "/");
  }
  assert.equal(match("/es/kwad"), null);
  assert.ok(redirects.every((rule) => rule.source.startsWith("/")));
});
