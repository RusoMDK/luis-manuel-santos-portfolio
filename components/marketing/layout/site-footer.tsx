import Image from "next/image";
import { useTranslations } from "next-intl";
import { photoCredits, siteConfig } from "@/config/site";

type SiteFooterProps = {
  locale: "es" | "en";
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const t = useTranslations("Footer");
  const nav = useTranslations("Contact");
  const havana = photoCredits[0];

  return (
    <footer className="site-footer field-stone">
      <div className="frame">
        <div className="ticket-back zigzag-top" data-reveal>
          <div className="ticket-back-message">
            <p className="ticket-back-title">{t("title")}</p>
            <p>{t("message")}</p>
          </div>
          <div className="ticket-back-address">
            <Image className="footer-stamp" src={havana.src} width={88} height={117} alt="" />
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
            <p>
              {t("credits")}:{" "}
              {photoCredits.map((photo, index) => (
                <span key={photo.id}>
                  <a href={photo.source}>«{photo.title}»</a>{" "}
                  {t.rich("creditsBy", {
                    author: photo.author,
                    name: photo.license,
                    license: (chunks) => <a href={photo.licenseUrl}>{chunks}</a>,
                  })}
                  {index < photoCredits.length - 1 ? "; " : "."}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
