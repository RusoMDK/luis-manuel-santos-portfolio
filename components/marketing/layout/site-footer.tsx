import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { ContactCoupon } from "@/components/marketing/contact/contact-coupon";

type SiteFooterProps = {
  locale: "es" | "en";
};

/** Contact and footer in one coupon: the email, the links, the form and the imprint. */
export function SiteFooter({ locale }: SiteFooterProps) {
  const t = useTranslations("Contact");
  const footer = useTranslations("Footer");
  const [user, domain] = siteConfig.email.split("@");

  return (
    <footer id="contacto" className="site-footer field-stone" aria-labelledby="contact-title">
      <div className="frame">
        <div className="coupon" data-reveal>
          <div className="coupon-stub">
            <h2 id="contact-title" className="heading" data-split>
              {t("title")}
            </h2>
            <a className="coupon-email" href={`mailto:${siteConfig.email}`}>
              {user}
              <wbr />@{domain}
            </a>
            <p>{t("lead")}</p>
            <ul className="coupon-links" aria-label={footer("linksLabel")}>
              <li>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
                  {t("linkedin")}
                </a>
              </li>
              <li>
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                  {t("github")}
                </a>
              </li>
              <li>
                <a href={siteConfig.cv[locale]} target="_blank" rel="noopener">
                  {t("cv")}
                </a>
              </li>
            </ul>
            <p className="coupon-imprint">
              <span className="coupon-thanks">{footer("title")}</span>
              <span>{footer("rights")}</span>
            </p>
          </div>
          <ContactCoupon />
        </div>
      </div>
    </footer>
  );
}
