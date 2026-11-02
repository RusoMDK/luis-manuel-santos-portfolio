import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

/** About me: the portrait and one paragraph (where I'm from, what I studied, languages). */
export function AboutSection() {
  const t = useTranslations("About");
  const { src, width, height } = siteConfig.profileImage;

  return (
    <section
      id="sobre-mi"
      className="frame grid items-center gap-8 pt-24 pb-24 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 md:pt-32 md:pb-32 lg:grid-cols-12"
      aria-labelledby="about-title"
    >
      <div data-reveal className="overflow-hidden rounded-[16px] border border-line bg-surface lg:col-span-4">
        <Image
          src={src}
          width={width}
          height={height}
          alt={t("portraitAlt")}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 100vw"
          quality={75}
          className="aspect-[4/5] h-auto w-full object-cover object-top"
        />
      </div>
      <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
        <h2 id="about-title" data-reveal className="text-[clamp(40px,5vw,68px)] leading-none font-[650] tracking-[-0.045em]">
          {t("title")}
        </h2>
        <p data-reveal className="max-w-[46ch] text-[clamp(19px,1.6vw,22px)] leading-[1.55] tracking-[-0.01em] text-pretty">
          {t("body")}
        </p>
      </div>
    </section>
  );
}
