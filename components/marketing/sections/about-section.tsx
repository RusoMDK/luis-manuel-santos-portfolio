import Image from "next/image";
import { useTranslations } from "next-intl";
import { photoCredits, siteConfig } from "@/config/site";

const valladolid = photoCredits[1];

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
              <h2 id="about-title" className="heading">
                {t("title")}
              </h2>
            </header>
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
            <p>{t("p4")}</p>
            <p className="signature">{t("signature")}</p>
            <p className="signature-role">{t("role")}</p>
          </div>
          <div className="tear-off">
            <span>{t("tearOff")}</span>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
        </article>
        <figure className="arrival" data-reveal>
          <div className="photo-crop">
            <Image
              src={valladolid.src}
              width={valladolid.width}
              height={valladolid.height}
              alt={t("photoAlt")}
              sizes="(max-width: 900px) 100vw, 40vw"
              data-drift
            />
          </div>
          <figcaption className="caption">{t("photoCaption")}</figcaption>
        </figure>
      </div>
    </section>
  );
}
