import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

type SiteFooterProps = {
  locale: "es" | "en";
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const t = useTranslations("Footer");
  const nav = useTranslations("Contact");

  return (
    <footer className="site-footer field-stone">
      <div className="frame">
        <div className="ticket-back zigzag-top" data-reveal>
          <div className="ticket-back-message">
            <p className="ticket-back-title">{t("title")}</p>
            <p>{t("message")}</p>
          </div>
          <div className="ticket-back-address">
            <ul aria-label={t("linksLabel")}>
              <li>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
                  {nav("linkedin")}
                </a>
              </li>
              <li>
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                  {nav("github")}
                </a>
              </li>
              <li>
                <a href={siteConfig.cv[locale]} target="_blank" rel="noopener">
                  {nav("cv")}
                </a>
              </li>
            </ul>
          </div>
          <div className="ticket-back-imprint">
            <p>{t("rights")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
