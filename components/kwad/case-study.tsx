import { ViewTransition } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { RequestDiagram } from "./request-diagram";
import { Shot, type KwadShotId } from "./shot";

// The five application boundaries, in the order a request meets them.
const apps = ["backoffice", "storefront", "console", "api", "web"] as const;
const appStack: Record<(typeof apps)[number], string> = {
  backoffice: "React · TypeScript",
  storefront: "React · TypeScript",
  console: "React · TypeScript",
  api: "Fastify · Prisma · PostgreSQL · BullMQ",
  web: "getkwad.com",
};

const modules = [
  { id: "pos", shot: "terminal" },
  { id: "inventory", shot: "ledger" },
  { id: "currency", shot: "currency" },
] as const satisfies readonly { id: string; shot: KwadShotId }[];

const facts = ["since", "team", "stack", "repo", "deploy", "status"] as const;
const ciSteps = ["types", "unit", "migrations", "isolation", "e2e"] as const;

const sectionTitle = "text-[clamp(32px,3.6vw,52px)] leading-[1.02] font-[650] tracking-[-0.045em] text-balance";

/**
 * The KWAD case study, in the order a tech lead asks: what it is and for whom, my role,
 * the architecture (a request travelling with its organisation), the modules with
 * their screenshots, how it is tested, and where it stands.
 */
export function KwadCaseStudy() {
  const t = useTranslations("Kwad");

  return (
    <article>
      <header className="frame grid gap-12 pt-8 pb-20 md:pt-14 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-28">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <Link className="text-link w-fit text-[16px]" href="/#proyectos" transitionTypes={["case-study"]}>
            {t("back")}
          </Link>
          <h1 className="text-[clamp(64px,10vw,152px)] leading-[0.9] font-[650] tracking-[-0.055em]">
            <ViewTransition name="kwad-title" share="morph" default="none">
              <span className="inline-block">{t("title")}</span>
            </ViewTransition>
          </h1>
          <p className="max-w-[36ch] text-[clamp(20px,1.9vw,25px)] leading-[1.4] tracking-[-0.01em] text-pretty">{t("lead")}</p>
          <p className="font-data text-[13px] text-muted">{t("facts")}</p>
          <div className="flex flex-wrap gap-3">
            <a className="button button-primary" href={siteConfig.kwadUrl} target="_blank" rel="noopener noreferrer">
              {t("site")}
            </a>
            <a className="button" href={`mailto:${siteConfig.email}`}>
              {t("contact")}
            </a>
          </div>
        </div>
        <figure className="flex flex-col gap-3 lg:col-span-6 lg:items-end">
          <Shot id="reception" alt={t("heroAlt")} priority />
          <figcaption className="font-data text-[13px] text-muted">{t("sample")}</figcaption>
        </figure>
      </header>

      <div className="frame grid gap-14 pt-8 md:pt-12 lg:grid-cols-12 lg:gap-8">
        <section className="flex flex-col gap-5 lg:col-span-6" aria-labelledby="what-title">
          <h2 id="what-title" data-reveal className={sectionTitle}>
            {t("what.title")}
          </h2>
          <p data-reveal className="max-w-[56ch] text-[17px] leading-[1.6]">
            {t("what.body")}
          </p>
        </section>
        <section className="flex flex-col gap-5 lg:col-span-5 lg:col-start-8" aria-labelledby="role-title">
          <h2 id="role-title" data-reveal className={sectionTitle}>
            {t("role.title")}
          </h2>
          <p data-reveal className="max-w-[56ch] text-[17px] leading-[1.6]">
            {t("role.body")}
          </p>
          <dl data-reveal className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 pt-3 text-[16px]">
            {facts.map((fact) => (
              <div key={fact} className="contents">
                <dt className="font-data text-[13px] leading-[1.7] text-muted">{t(`role.facts.${fact}`)}</dt>
                <dd>{t(`role.facts.${fact}Value`)}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section className="frame flex flex-col gap-10 pt-24 md:pt-32" aria-labelledby="architecture-title">
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
          <h2 id="architecture-title" data-reveal className={`${sectionTitle} lg:col-span-6`}>
            {t("architecture.title")}
          </h2>
          <p data-reveal className="max-w-[58ch] text-[17px] leading-[1.6] lg:col-span-5 lg:col-start-8">
            {t("architecture.body")}
          </p>
        </div>
        <div data-reveal>
          <RequestDiagram />
        </div>
        <div className="grid gap-6 pt-6 lg:grid-cols-12 lg:gap-8">
          <h3 data-reveal className="text-[24px] leading-tight font-[600] tracking-[-0.03em] lg:col-span-4">
            {t("architecture.appsTitle")}
          </h3>
          <ul className="flex flex-col lg:col-span-8">
            {apps.map((app) => (
              <li
                key={app}
                data-reveal
                className="grid gap-1 rounded-[12px] px-0 py-4 md:grid-cols-[minmax(0,3fr)_minmax(0,6fr)_minmax(0,4fr)] md:gap-6"
              >
                <span className="text-[17px] font-semibold">{t(`architecture.apps.${app}.name`)}</span>
                <span className="text-[16px] leading-[1.55]">{t(`architecture.apps.${app}.purpose`)}</span>
                <span className="font-data text-[13px] leading-[1.9] text-muted md:text-right">{appStack[app]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="frame flex flex-col gap-14 pt-24 md:pt-32" aria-labelledby="modules-title">
        <h2 id="modules-title" data-reveal className={sectionTitle}>
          {t("modules.title")}
        </h2>
        {modules.map((module, index) => (
          <div key={module.id} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
            <div className={`flex flex-col gap-4 lg:col-span-4 ${index % 2 ? "lg:order-2 lg:col-start-9" : ""}`}>
              <h3 data-reveal className="text-[clamp(24px,2.2vw,30px)] leading-tight font-[600] tracking-[-0.035em]">
                {t(`modules.${module.id}.title`)}
              </h3>
              <p data-reveal className="max-w-[48ch] text-[17px] leading-[1.6]">
                {t(`modules.${module.id}.text`)}
              </p>
            </div>
            <figure
              data-reveal
              className={`flex flex-col gap-3 lg:col-span-7 ${index % 2 ? "lg:order-1 lg:col-start-1 lg:items-start" : "lg:col-start-6 lg:items-end"}`}
            >
              <Shot id={module.shot} alt={t(`modules.${module.id}.alt`)} />
              <figcaption className="font-data text-[13px] text-muted">{t(`modules.${module.id}.caption`)}</figcaption>
            </figure>
          </div>
        ))}
        <p data-reveal className="max-w-[62ch] text-[17px] leading-[1.6]">
          {t("modules.also")}
        </p>
      </section>

      <section className="frame grid gap-10 pt-24 md:pt-32 lg:grid-cols-12 lg:gap-8" aria-labelledby="testing-title">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <h2 id="testing-title" data-reveal className={sectionTitle}>
            {t("testing.title")}
          </h2>
          <p data-reveal className="max-w-[44ch] text-[17px] leading-[1.6]">
            {t("testing.body")}
          </p>
        </div>
        <ol
          data-reveal
          data-ui
          aria-label={t("testing.label")}
          className="flex flex-col overflow-hidden rounded-[16px] border border-line bg-surface lg:col-span-6 lg:col-start-7"
        >
          {ciSteps.map((step) => (
            <li key={step} className="flex items-start gap-4 border-b border-line px-5 py-4 last:border-b-0" /* taste-skill-ignore: interface fragment (data-ui), its own 1px lines */>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-1 shrink-0 text-ok">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
              <span className="flex flex-col">
                <span className="font-data text-[13px] text-muted">{t(`testing.steps.${step}.title`)}</span>
                <span className="text-[16px] leading-[1.5]">{t(`testing.steps.${step}.detail`)}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="frame flex flex-col gap-6 pt-24 pb-24 md:pt-32 md:pb-32" aria-labelledby="status-title">
        <h2 id="status-title" data-reveal className={sectionTitle}>
          {t("status.title")}
        </h2>
        <p data-reveal className="max-w-[56ch] text-[clamp(19px,1.6vw,22px)] leading-[1.55]">
          {t("status.body")}
        </p>
        <div data-reveal className="flex flex-wrap gap-3">
          <a className="button button-primary" href={siteConfig.kwadUrl} target="_blank" rel="noopener noreferrer">
            {t("site")}
          </a>
          <Link className="button" href="/#proyectos" transitionTypes={["case-study"]}>
            {t("back")}
          </Link>
        </div>
      </section>
    </article>
  );
}
