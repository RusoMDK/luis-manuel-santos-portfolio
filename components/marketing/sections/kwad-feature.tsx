import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { KwadModules } from "@/components/marketing/kwad/kwad-modules";
import { PosDemo } from "@/components/marketing/havana/pos-demo";

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
  const havana = useTranslations("Havana");

  return (
    <section id="kwad" className="section kwad field-walnut" aria-labelledby="kwad-title">
      <div className="frame grid kwad-head">
        <h2 id="kwad-title" className="heading kwad-title" data-split>
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

      {/* Where KWAD comes from: the till has to survive the network dropping mid-sale. */}
      <div id="habana" className="frame grid havana-grid" aria-labelledby="havana-title">
        <div className="havana-intro">
          <h3 id="havana-title" className="heading-sub" data-split>
            {havana("title")}
          </h3>
          <p className="lead" data-reveal>
            {havana("body")}
          </p>
          <p className="havana-try" data-reveal>
            {havana.rich("try", { strong: (chunks) => <strong>{chunks}</strong> })}
          </p>
        </div>
        <div className="havana-demo" data-reveal>
          <PosDemo />
          <p className="caption">{havana("demo.note")}</p>
        </div>
      </div>

      {/* After the last module, the frame stays beside the rest of the product and
          the one picture of its architecture. */}
      <div className="frame">
        <KwadModules
          tail={
            <div className="kwad-tail">
              <p className="lead" data-reveal>
                {t("also")}
              </p>
              <div className="tenant-slip slip-paper zigzag-bottom" data-ui data-reveal>
                <h3 className="tenant-title">{t("tenant.title")}</h3>
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
          }
        />
      </div>
    </section>
  );
}
