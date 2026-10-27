import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { KwadModules } from "@/components/marketing/kwad/kwad-modules";

// Technology names are not translated; they sit on the right of each slip row.
const tenantSteps = [
  { id: "arrive", tech: "HTTP" },
  { id: "resolve", tech: "Fastify" },
  { id: "context", tech: "AsyncLocalStorage" },
  { id: "rbac", tech: "RBAC" },
  { id: "data", tech: "Prisma · PostgreSQL" },
] as const;

export function KwadFeature() {
  const t = useTranslations("Kwad");

  return (
    <section id="kwad" className="section kwad field-walnut" aria-labelledby="kwad-title">
      <div className="frame grid kwad-head">
        <h2 id="kwad-title" className="heading kwad-title" data-reveal>
          {t("title")}
        </h2>
        <div className="kwad-intro" data-reveal>
          <p className="lead">{t("body")}</p>
          <p className="kwad-links">
            <Link className="button" href="/kwad" transitionTypes={["case-study"]}>
              {t("caseStudy")}
            </Link>
            <a className="text-link" href={siteConfig.kwadUrl} target="_blank" rel="noopener noreferrer">
              {t("site")}
            </a>
          </p>
        </div>
      </div>

      <div className="frame">
        <KwadModules />
      </div>

      <div className="frame grid kwad-also">
        <p className="lead kwad-also-text" data-reveal>
          {t("also")}
        </p>
        <figure className="kwad-also-shot kwad-also-reception" data-reveal>
          <div className="shot">
            <Image
              src="/images/kwad/crop/recepcion.jpg"
              width={1280}
              height={592}
              alt={t("alsoReceptionAlt")}
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </div>
          <figcaption className="caption">{t("sample")}</figcaption>
        </figure>
        <figure className="kwad-also-shot kwad-also-audit" data-reveal>
          <div className="shot">
            <Image
              src="/images/kwad/crop/auditoria.jpg"
              width={1280}
              height={212}
              alt={t("alsoAuditAlt")}
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </div>
        </figure>
      </div>

      <div className="frame grid tenant">
        <h3 className="heading tenant-title" data-reveal>
          {t("tenant.title")}
        </h3>
        <div className="tenant-slip slip-paper zigzag-bottom" data-ui data-reveal>
          <ol className="itinerary">
            {tenantSteps.map((step) => (
              <li key={step.id} className="itinerary-row">
                <span>{t(`tenant.steps.${step.id}`)}</span>
                <span className="leader" aria-hidden="true" />
                <span>{step.tech}</span>
              </li>
            ))}
          </ol>
          <p className="itinerary-result">{t("tenant.result")}</p>
          <p className="itinerary-note">{t("tenant.note")}</p>
        </div>
      </div>
    </section>
  );
}
