import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/marketing/shared/container";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute right-0 top-40 h-[22rem] w-[22rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute left-0 top-72 h-[20rem] w-[20rem] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
              <Sparkles className="h-4 w-4" />
              {t("badge")}
            </div>

            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-white/45">
                {t("role")}
              </p>

              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight text-white md:text-7xl">
                {t("title")}
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-white/65 md:text-xl">
                {t("description")}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#projects"
                className={cn(
                  buttonVariants({ size: "lg", variant: "default" }),
                  "rounded-full bg-white px-6 text-black hover:bg-white/90",
                )}
              >
                {t("primaryCta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>

              <a
                href="#contact"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white",
                )}
              >
                {t("secondaryCta")}
              </a>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
            <div className="rounded-[26px] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] p-6">
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-6">
                <div className="text-sm uppercase tracking-[0.2em] text-white/40">
                  {t("focusLabel")}
                </div>

                <div className="mt-5 text-3xl font-semibold tracking-tight text-white">
                  {t("focusTitle")}
                </div>

                <div className="mt-6 grid gap-3">
                  {[t("bullet1"), t("bullet2"), t("bullet3"), t("bullet4")].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>

                <p className="mt-6 text-sm text-white/45">{siteConfig.name}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
