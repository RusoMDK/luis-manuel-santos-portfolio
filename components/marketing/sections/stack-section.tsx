import { Code2, Database, Layers3, Server } from "lucide-react";
import { useTranslations } from "next-intl";
import { stack } from "@/config/site";
import { AnimatedReveal } from "@/components/common/animated-reveal";
import { Container } from "@/components/marketing/shared/container";
import { SectionHeading } from "@/components/marketing/shared/section-heading";
import { StackPill } from "@/components/marketing/shared/stack-pill";

const stackHighlights = [
  {
    key: "frontend",
    icon: Code2,
  },
  {
    key: "backend",
    icon: Server,
  },
  {
    key: "data",
    icon: Database,
  },
  {
    key: "product",
    icon: Layers3,
  },
] as const;

export function StackSection() {
  const t = useTranslations("Stack");

  return (
    <section id="stack" className="scroll-mt-28 py-16 md:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-10">
          <AnimatedReveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
          </AnimatedReveal>

          <AnimatedReveal delay={0.08}>
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.035] to-white/[0.02] p-4 shadow-[0_25px_100px_rgba(0,0,0,0.22)] sm:rounded-[32px] sm:p-5 md:p-6">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-4 sm:rounded-[28px] sm:p-5 md:p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {stackHighlights.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <AnimatedReveal
                        key={item.key}
                        delay={0.04 * index}
                        y={12}
                      >
                        <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                          <div className="flex items-start gap-3">
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
                              <Icon className="h-5 w-5 text-cyan-300" />
                            </div>

                            <div>
                              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
                                {t(`highlights.${item.key}.title`)}
                              </h3>
                              <p className="mt-2 text-sm leading-6 text-white/55">
                                {t(`highlights.${item.key}.description`)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </AnimatedReveal>
                    );
                  })}
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                        {t("coreEyebrow")}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                        {t("coreTitle")}
                      </h3>
                    </div>

                    <p className="text-sm text-white/45">
                      {t("coreMeta", { count: stack.length })}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {stack.map((item, index) => (
                      <AnimatedReveal key={item} delay={0.015 * index} y={8}>
                        <StackPill label={item} />
                      </AnimatedReveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </div>
      </Container>
    </section>
  );
}
