import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

type SiteFooterProps = {
  locale: "es" | "en";
};

/** Contact closes every page: the sentence, the email large, and the three links. */
export function SiteFooter({ locale }: SiteFooterProps) {
  const t = useTranslations("Contact");
  const [user, domain] = siteConfig.email.split("@");

  return (
    <footer id="contacto" className="bg-surface" aria-labelledby="contact-title">
      <div className="frame flex flex-col gap-14 pt-24 pb-10 md:pt-32">
        <div className="flex flex-col gap-6" data-reveal-group>
          <h2
            id="contact-title"
            data-reveal
            className="max-w-[24ch] text-[clamp(26px,3vw,40px)] leading-[1.15] font-[600] tracking-[-0.035em] text-balance"
          >
            {t("title")}
          </h2>
          <a
            data-reveal
            href={`mailto:${siteConfig.email}`}
            aria-label={t("emailLabel", { email: siteConfig.email })}
            className="w-fit text-[clamp(30px,5.6vw,84px)] leading-[1.05] font-[650] tracking-[-0.045em] [overflow-wrap:anywhere] decoration-1 underline-offset-[0.14em] hover:text-link hover:underline"
          >
            {user}
            <wbr />@{domain}
          </a>
        </div>
        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-end md:justify-between">
          <p className="font-data text-[13px] text-muted">{t("rights")}</p>
          <ul className="flex flex-wrap gap-x-2 gap-y-1 text-[16px]" aria-label={t("linksLabel")}>
            <li>
              <a className="button" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
                {t("linkedin")}
              </a>
            </li>
            <li>
              <a className="button" href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                {t("github")}
              </a>
            </li>
            <li>
              <a className="button" href={siteConfig.cv[locale]} target="_blank" rel="noopener">
                {t("cv")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
