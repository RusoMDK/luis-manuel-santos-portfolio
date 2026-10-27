import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

export function AboutSection() {
  const t = useTranslations("About");

  return (
    <section id="sobre-mi" className="about field-stone" aria-labelledby="about-title">
      <div className="frame grid about-grid">
        <article className="letter" data-reveal>
          <div className="letter-sheet">
            <header className="letter-head">
              <Image
                className="portrait"
                src={siteConfig.profileImage}
                width={128}
                height={128}
                alt={t("portraitAlt")}
              />
              <h2 id="about-title" className="heading" data-split>
                {t("title")}
              </h2>
            </header>
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
            <p className="signature">{t("signature")}</p>
            <p className="signature-role">{t("role")}</p>
          </div>
          <div className="tear-off">
            <span>{t("tearOff")}</span>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
        </article>
      </div>
    </section>
  );
}
