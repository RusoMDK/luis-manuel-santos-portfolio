import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { AnimatedReveal } from "@/components/common/animated-reveal";
import { Container } from "@/components/marketing/shared/container";
import { SectionHeading } from "@/components/marketing/shared/section-heading";

export function AboutSection() {
  const t = useTranslations("About");

  const points = [t("point1"), t("point2"), t("point3"), t("point4")];

  return (
    <section id="about" className="scroll-mt-28 py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <AnimatedReveal>
            <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6 md:p-8">
              <div className="rounded-[28px] border border-white/10 bg-black/20 p-8">
                <div className="text-sm uppercase tracking-[0.24em] text-white/45">
                  {t("eyebrow")}
                </div>

                <div className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {t("title")}
                </div>

                <p className="mt-5 text-base leading-8 text-white/65">
                  {t("description")}
                </p>

                <p className="mt-6 text-sm text-white/40">{siteConfig.name}</p>
              </div>
            </div>
          </AnimatedReveal>

          <div className="space-y-6">
            <AnimatedReveal delay={0.08}>
              <SectionHeading
                eyebrow={t("sideEyebrow")}
                title={t("sideTitle")}
                description={t("sideDescription")}
              />
            </AnimatedReveal>

            <div className="grid gap-4">
              {points.map((point, index) => (
                <AnimatedReveal key={point} delay={0.1 + index * 0.06} y={14}>
                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-white/70">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
                    <span>{point}</span>
                  </div>
                </AnimatedReveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
