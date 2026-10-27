import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { ContactCoupon } from "@/components/marketing/contact/contact-coupon";

type ContactSectionProps = {
  locale: "es" | "en";
};

export function ContactSection({ locale }: ContactSectionProps) {
  const t = useTranslations("Contact");
  const [user, domain] = siteConfig.email.split("@");

  return (
    <section id="contacto" className="section contact field-stone" aria-labelledby="contact-title">
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
            <ul className="coupon-links">
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
          </div>
          <ContactCoupon />
        </div>
      </div>
    </section>
  );
}
