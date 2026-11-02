import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const readSource = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const english = JSON.parse(readSource("messages/en.json"));
const spanish = JSON.parse(readSource("messages/es.json"));

test("KWAD case study has a dedicated route and localized entry", () => {
  const route = readSource("app/[locale]/(marketing)/kwad/page.tsx");
  assert.match(route, /KwadCaseStudy/);
  assert.match(route, /locale !== "es" && locale !== "en"/);
  assert.match(route, /generateMetadata/);
  assert.match(route, /canonical: url/);
});

test("the KWAD card and the header link to the case study, and its title morphs between them", () => {
  const card = readSource("components/home/project-card.tsx");
  const study = readSource("components/kwad/case-study.tsx");
  assert.match(readSource("config/site.ts"), /id: "kwad",\n {4}href: "\/kwad"/);
  assert.match(card, /transitionTypes=\{\["case-study"\]\}/);
  assert.match(readSource("components/layout/site-header.tsx"), /href: "\/kwad", label: t\("kwad"\), transition: \["case-study"\]/);
  for (const source of [card, study]) assert.match(source, /<ViewTransition name="kwad-title" share="morph" default="none">/);
  assert.equal(english.Projects.items.kwad.cta, "Read the case study");
  assert.equal(spanish.Projects.items.kwad.cta, "Ver el caso de estudio");
});

test("the case study follows the agreed order", () => {
  const study = readSource("components/kwad/case-study.tsx");
  const order = ["what-title", "role-title", "architecture-title", "modules-title", "testing-title", "status-title"].map((id) =>
    study.indexOf(`id="${id}"`),
  );
  assert.ok(order.every((index) => index > 0), "a section is missing");
  assert.deepEqual([...order].sort((a, b) => a - b), order);
  assert.match(study, /<RequestDiagram \/>/);
});

test("case study documents five actual application boundaries", () => {
  const study = readSource("components/kwad/case-study.tsx");
  assert.match(study, /const apps = \["backoffice", "storefront", "console", "api", "web"\] as const;/);
  assert.equal(spanish.Kwad.architecture.apps.storefront.name, "Tienda online");
  assert.equal(spanish.Kwad.architecture.apps.console.name, "Consola de plataforma");
  assert.match(spanish.Kwad.architecture.body, /AsyncLocalStorage/);
  assert.match(english.Kwad.architecture.body, /AsyncLocalStorage/);
  assert.match(spanish.Kwad.status.body, /El código es privado/);
});

test("the request diagram is an interface, usable from the keyboard, with sample data labelled", () => {
  const diagram = readSource("components/kwad/request-diagram.tsx");
  assert.match(diagram, /aria-pressed=\{org === item\}/);
  assert.match(diagram, /aria-current=\{state === "active" \? "step" : undefined\}/);
  assert.match(diagram, /aria-live="polite"/);
  assert.match(diagram, /prefers-reduced-motion: reduce/);
  for (const id of ["arrive", "resolve", "context", "rbac", "data", "response"]) {
    assert.ok(diagram.includes(`id: "${id}"`), `Missing step ${id}`);
    for (const locale of [spanish, english]) assert.ok(locale.Kwad.architecture.diagram.steps[id].title, id);
  }
  assert.match(spanish.Kwad.architecture.diagram.note, /Datos de ejemplo/);
  assert.match(english.Kwad.architecture.diagram.note, /Sample data/);
});

test("every KWAD screenshot says its data is sample data", () => {
  for (const [locale, word] of [
    [spanish, /Datos de ejemplo\.$/],
    [english, /Sample data\.$/],
  ]) {
    assert.match(locale.Kwad.sample, word);
    for (const id of ["pos", "inventory", "currency"]) assert.match(locale.Kwad.modules[id].caption, word);
  }
});

test("CI and E2E are described as they are", () => {
  for (const step of ["types", "unit", "migrations", "isolation", "e2e"]) {
    assert.ok(spanish.Kwad.testing.steps[step].detail && english.Kwad.testing.steps[step].detail, step);
  }
  assert.match(spanish.Kwad.testing.steps.e2e.detail, /Playwright/);
  assert.match(spanish.Kwad.testing.steps.migrations.detail, /base de datos vacía/);
  assert.match(spanish.Kwad.testing.body, /GitHub Actions/);
});

test("the tenant diagram does not invent a storefront domain", () => {
  for (const locale of [spanish, english]) {
    assert.doesNotMatch(JSON.stringify(locale.Kwad), /getkwad\.com\//);
    assert.doesNotMatch(JSON.stringify(locale.Kwad), /\w+\.getkwad\.com/);
  }
});

test("KWAD is the only case study; other projects link to their repository", () => {
  assert.equal(existsSync(new URL("../app/[locale]/(marketing)/projects", import.meta.url)), false);
  const config = readSource("config/site.ts");
  assert.doesNotMatch(config, /caseStudySlug/);
  for (const repo of ["iot-testbench", "PlataformaIoT", "Tienda-Virtual"]) {
    assert.match(config, new RegExp(`href: "https://github.com/RusoMDK/${repo}"`));
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
      const pattern = new RegExp("^" + rule.source.replace(/\/:locale\(es\|en\)/, "/(es|en)").replace(/\/:slug\*/, "(?:/.*)?") + "$");
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
  assert.equal(match("/cv/es"), "/docs/luis-manuel-santos-cv-es.pdf");
  assert.equal(match("/cv/en"), "/docs/luis-manuel-santos-cv-en.pdf");
  assert.equal(match("/es/kwad"), null);
  assert.ok(redirects.every((rule) => rule.source.startsWith("/")));
});
