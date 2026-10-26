import { ArrowDownRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/marketing/shared/container";

const highlights = ["React / TypeScript", "Node.js / NestJS", "B2B SaaS / IoT"] as const;

export const HeroSection = () => {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const cvHref = locale === "es" ? siteConfig.cv.es : siteConfig.cv.en;

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-20 pt-20 sm:pb-24 sm:pt-28 lg:pb-32 lg:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[12%] top-[12%] h-[32rem] w-[32rem] rounded-full bg-emerald-900/10 blur-[140px]" />
        <div className="editorial-grid absolute inset-0 opacity-35" />
      </div>
      <Container>
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-white/15 pb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-xs">
          <span>01 / {locale === "es" ? "Presentación" : "Introduction"}</span>
          <span>{locale === "es" ? "Ingeniería × Diseño" : "Engineering × Design"}</span>
        </div>

        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:gap-16">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-emerald-300 sm:text-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              {t("badge")}
            </div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-white/50">{t("role")}</p>
            <h1 id="hero-title" className="max-w-[17ch] text-[clamp(3.25rem,7.25vw,7.25rem)] font-medium leading-[0.99] tracking-[-0.075em] text-[#f3f2ed]">
              {t("title")}
            </h1>
            <p className="mt-8 max-w-[58ch] text-base leading-8 text-white/65 sm:text-lg">{t("description")}</p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#kwad" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm bg-[#c6efcd] px-6 text-sm font-semibold text-[#10241a] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">
                {t("primaryCta")} <ArrowUpRight aria-hidden="true" size={17} />
              </a>
              <a href={cvHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-sm border border-white/25 px-6 text-sm font-medium text-white transition-colors hover:border-white/60 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300">
                {t("downloadCv")} <Download aria-hidden="true" size={16} />
              </a>
            </div>
          </div>

          <aside aria-label={locale === "es" ? "Perfil profesional" : "Professional overview"} className="border-t border-white/25 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <MapPin aria-hidden="true" size={15} className="text-emerald-300" />
              {t("location")}
            </div>
            <div className="mt-10 border-b border-white/15 pb-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/85">
                {locale === "es" ? "Proyecto destacado" : "Featured product"}
              </p>
              <h2 className="mt-4 font-serif text-5xl italic tracking-[-0.045em] text-[#f3f2ed] sm:text-6xl">KWAD.</h2>
              <p className="mt-3 max-w-sm text-sm leading-7 text-white/55">
                {locale === "es" ? "SaaS multiempresa. Cinco aplicaciones. Producto desarrollado de extremo a extremo." : "Multi-tenant SaaS. Five applications. Built end to end."}
              </p>
            </div>
            <div className="mt-6 space-y-4">
              {highlights.map((item, index) => (
                <div key={item} className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <span className="font-mono text-[10px] text-white/35">0{index + 1}</span>
                  <span className="flex-1 text-sm text-white/75">{item}</span>
                  <ArrowDownRight aria-hidden="true" size={15} className="text-emerald-300/70" />
                </div>
              ))}
            </div>
          </aside>
        </div>
        <div className="mt-20 flex items-center justify-between border-t border-white/15 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
          <span>{siteConfig.name} © 2026</span>
          <span>{locale === "es" ? "Desliza para explorar" : "Scroll to explore"} ↓</span>
        </div>
      </Container>
    </section>
  );
};
