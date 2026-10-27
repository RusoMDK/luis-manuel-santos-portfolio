import Image from "next/image";
import { useTranslations } from "next-intl";
import { photoCredits } from "@/config/site";
import { PosDemo } from "@/components/marketing/havana/pos-demo";

const havana = photoCredits[0];

export function HavanaSection() {
  const t = useTranslations("Havana");

  return (
    <section id="habana" className="section havana field-walnut-2" aria-labelledby="havana-title">
      <div className="frame grid havana-grid">
        <div className="havana-intro">
          <h2 id="havana-title" className="heading" data-reveal>
            {t("title")}
          </h2>
          <p className="lead" data-reveal>
            {t("body")}
          </p>
          <figure className="havana-photo" data-reveal>
            <div className="photo-crop">
              <Image
                src={havana.src}
                width={havana.width}
                height={havana.height}
                alt={t("photoAlt")}
                sizes="(max-width: 900px) 100vw, 34vw"
                data-drift
              />
            </div>
            <figcaption className="caption">{t("photoCaption")}</figcaption>
          </figure>
        </div>
        <div className="havana-demo" data-reveal>
          <PosDemo />
          <p className="caption">{t("demo.note")}</p>
        </div>
      </div>
    </section>
  );
}
