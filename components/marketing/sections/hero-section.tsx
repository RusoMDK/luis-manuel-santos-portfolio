import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { HeroTicket } from "@/components/marketing/ticket/hero-ticket";

type HeroSectionProps = {
  locale: "es" | "en";
};

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations("Hero");

  return (
    <section className="hero field-walnut" aria-labelledby="hero-title">
      <div className="frame grid hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title" className="display">
            <span>{t("firstName")}</span> <span>{t("lastName")}</span>
          </h1>
          <p className="lead hero-lead">{t("lead")}</p>
          <div className="hero-actions">
            <a className="button" href="#contacto">
              {t("primaryCta")}
            </a>
            <a className="text-link" href={siteConfig.cv[locale]} target="_blank" rel="noopener">
              {t("cvCta")}
            </a>
          </div>
        </div>
        <HeroTicket />
      </div>
    </section>
  );
}
