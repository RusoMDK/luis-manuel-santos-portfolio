import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { GlyphBackdrop } from "./glyph-backdrop";
import { ProjectSearch } from "./project-search";
import { ScrambleTitle } from "./scramble-title";

/**
 * Who, what and available on the left; the project search on the right (under the
 * headline on a phone). Behind both, the glyph field, loaded once the page is up.
 */
export function HeroSection({ locale }: { locale: "es" | "en" }) {
  const t = useTranslations("Hero");

  return (
    <section className="relative isolate" aria-labelledby="hero-title">
      <GlyphBackdrop />
      <div className="frame grid items-center gap-12 pt-8 pb-20 md:pt-12 md:pb-28 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:pb-24">
        <div className="flex min-w-0 flex-col gap-6">
          <p className="inline-flex items-center gap-2.5 font-data text-[13px] text-muted">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-ok" />
            {t("availability")}
          </p>
          <ScrambleTitle
            id="hero-title"
            text={t("title")}
            className="text-[clamp(52px,7.6vw,116px)] leading-[0.95] font-[650] tracking-[-0.05em]"
          />
          <p className="max-w-[34ch] text-[clamp(20px,1.9vw,25px)] leading-[1.4] tracking-[-0.01em] text-pretty">{t("lead")}</p>
          <p className="max-w-[54ch] text-[17px] leading-[1.6] text-muted text-pretty">{t("body")}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a href="#proyectos" className="button button-primary">
              {t("primaryCta")}
            </a>
            <a href={siteConfig.cv[locale]} target="_blank" rel="noopener" className="button">
              {t("cvCta")}
            </a>
          </div>
        </div>
        <div className="min-w-0 lg:max-w-[580px] lg:justify-self-end lg:w-full">
          <ProjectSearch />
        </div>
      </div>
    </section>
  );
}
