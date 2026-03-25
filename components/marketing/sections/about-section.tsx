import Image from "next/image";
import { CheckCircle2, ExternalLink, MapPin, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { AnimatedReveal } from "@/components/common/animated-reveal";
import { Container } from "@/components/marketing/shared/container";
import { SectionHeading } from "@/components/marketing/shared/section-heading";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const t = useTranslations("About");

  const points = [t("point1"), t("point2"), t("point3"), t("point4")];

  return (
    <section id="about" className="scroll-mt-28 py-16 md:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-start lg:gap-10">
          <AnimatedReveal>
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.04] to-white/[0.02] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.25)] sm:rounded-[32px] sm:p-5 md:p-6">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-4 sm:rounded-[28px] sm:p-5 md:p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-100">
                    <Sparkles className="h-4 w-4" />
                    {t("eyebrow")}
                  </div>

                  <div className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/55">
                    {siteConfig.availability}
                  </div>
                </div>

                <div className="mx-auto w-full max-w-[320px] sm:max-w-[360px]">
                  <div className="relative aspect-[1808/2046] overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:rounded-[28px]">
                    <Image
                      src={siteConfig.profileImage}
                      alt={siteConfig.name}
                      fill
                      className="scale-[1.01] object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 360px"
                    />
                  </div>
                </div>

                <div className="mt-6 text-center sm:text-left">
                  <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {siteConfig.name}
                  </h3>

                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/45 sm:text-sm">
                    Full Stack Developer
                  </p>

                  <p className="mt-4 text-base leading-7 text-white/65 sm:leading-8">
                    {t("description")}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/65">
                    <MapPin className="h-4 w-4 text-cyan-300" />
                    {siteConfig.location}
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/65">
                    Next.js · Node.js · Product UI
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-center rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white",
                    )}
                  >
                    GitHub
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>

                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-center rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white",
                    )}
                  >
                    LinkedIn
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "w-full justify-center rounded-full bg-white text-black hover:bg-white/90",
                    )}
                  >
                    Email
                  </a>
                </div>
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
