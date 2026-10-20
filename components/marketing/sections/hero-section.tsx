import { ArrowRight, Download, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { AnimatedReveal } from "@/components/common/animated-reveal";
import { Container } from "@/components/marketing/shared/container";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations("Hero");
  const locale = useLocale();

  const cvHref = locale === "es" ? siteConfig.cv.es : siteConfig.cv.en;

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-cyan-500/12 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
        <div className="absolute right-0 top-32 h-[16rem] w-[16rem] rounded-full bg-fuchsia-500/10 blur-3xl sm:top-40 sm:h-[22rem] sm:w-[22rem]" />
        <div className="absolute left-0 top-64 h-[16rem] w-[16rem] rounded-full bg-blue-500/10 blur-3xl sm:top-72 sm:h-[20rem] sm:w-[20rem]" />
      </div>

      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
          <AnimatedReveal className="space-y-6 sm:space-y-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-100 sm:px-4 sm:text-sm">
              <Sparkles className="h-4 w-4" />
              {t("badge")}
            </div>

            <div className="space-y-4 sm:space-y-6">
              <p className="text-xs uppercase tracking-[0.26em] text-white/45 sm:text-sm sm:tracking-[0.3em]">
                {t("role")}
              </p>

              <h1 className="max-w-5xl text-4xl font-semibold leading-[0.96] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {t("title")}
              </h1>

              <p className="max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8 md:text-xl">
                {t("description")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#projects"
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }),
                  "w-full justify-center rounded-full bg-white px-6 text-black hover:bg-white/90 sm:w-auto",
                )}
              >
                {t("primaryCta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>

              <a
                href={cvHref}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "w-full justify-center rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto",
                )}
              >
                {t("downloadCv")}
                <Download className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 sm:gap-3 sm:pt-2">
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/70 sm:px-4 sm:text-sm">
                {siteConfig.availability}
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/70 sm:px-4 sm:text-sm">
                {siteConfig.location}
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/70 sm:px-4 sm:text-sm">
                Next.js · Node.js · Product UI
              </div>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.12}>
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.3)] sm:rounded-[32px] sm:p-4">
              <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-4 sm:rounded-[26px] sm:p-6">
                <div className="rounded-[20px] border border-white/10 bg-black/20 p-4 sm:rounded-[22px] sm:p-6">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/40 sm:text-sm sm:tracking-[0.2em]">
                    {t("focusLabel")}
                  </div>

                  <div className="mt-4 text-2xl font-semibold tracking-tight text-white sm:mt-5 sm:text-3xl">
                    {t("focusTitle")}
                  </div>

                  <div className="mt-5 grid gap-3 sm:mt-6">
                    {[
                      t("bullet1"),
                      t("bullet2"),
                      t("bullet3"),
                      t("bullet4"),
                    ].map((item, index) => (
                      <AnimatedReveal
                        key={item}
                        delay={0.08 + index * 0.05}
                        y={14}
                      >
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70">
                          {item}
                        </div>
                      </AnimatedReveal>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="text-2xl font-semibold text-white">
                        UI
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">
                        Premium
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="text-2xl font-semibold text-white">
                        API
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">
                        Scalable
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="text-2xl font-semibold text-white">
                        RT
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">
                        Systems
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 text-sm text-white/45 sm:mt-6">
                    {siteConfig.name}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </Container>
    </section>
  );
}
