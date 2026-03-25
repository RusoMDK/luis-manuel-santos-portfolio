import { useTranslations } from "next-intl";
import { AnimatedReveal } from "@/components/common/animated-reveal";
import { Container } from "@/components/marketing/shared/container";
import { SectionHeading } from "@/components/marketing/shared/section-heading";

const proofItems = ["ui", "backend", "realtime", "product"] as const;

export function ProofSection() {
  const t = useTranslations("Proof");

  return (
    <section className="py-8 sm:py-10 md:py-14">
      <Container>
        <AnimatedReveal>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.18)] sm:rounded-[32px] sm:p-6 md:p-8">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />

            <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 xl:grid-cols-4">
              {proofItems.map((item, index) => (
                <AnimatedReveal key={item} delay={index * 0.06} y={16}>
                  <article className="rounded-[22px] border border-white/10 bg-black/20 p-4 sm:rounded-[24px] sm:p-5">
                    <div className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-300/80">
                      0{index + 1}
                    </div>

                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-white sm:mt-4 sm:text-xl">
                      {t(`items.${item}.title`)}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/60">
                      {t(`items.${item}.description`)}
                    </p>
                  </article>
                </AnimatedReveal>
              ))}
            </div>
          </div>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
