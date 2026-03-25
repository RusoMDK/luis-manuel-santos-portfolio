import { useTranslations } from "next-intl";
import { AnimatedReveal } from "@/components/common/animated-reveal";
import { Container } from "@/components/marketing/shared/container";
import { SectionHeading } from "@/components/marketing/shared/section-heading";

const experienceItems = ["engineering", "systems", "product"] as const;

export function ExperienceSection() {
  const t = useTranslations("Experience");

  return (
    <section id="experience" className="scroll-mt-28 py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <AnimatedReveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />
          </AnimatedReveal>

          <div className="relative pl-6 sm:pl-8">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-white/10" />

            <div className="space-y-8">
              {experienceItems.map((item, index) => (
                <AnimatedReveal key={item} delay={index * 0.08} y={18}>
                  <article className="relative rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
                    <div className="absolute -left-[1.45rem] top-8 h-4 w-4 rounded-full border border-cyan-300/30 bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.45)] sm:-left-[1.9rem]" />

                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/80">
                          {t(`items.${item}.period`)}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                          {t(`items.${item}.title`)}
                        </h3>
                        <p className="mt-1 text-sm text-white/45">
                          {t(`items.${item}.subtitle`)}
                        </p>
                      </div>

                      <span className="inline-flex w-fit rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/55">
                        {t(`items.${item}.badge`)}
                      </span>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-white/65">
                      {t(`items.${item}.description`)}
                    </p>
                  </article>
                </AnimatedReveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
