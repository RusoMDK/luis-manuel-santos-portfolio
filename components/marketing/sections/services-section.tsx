import { useTranslations } from "next-intl";
import { services } from "@/config/site";
import { AnimatedReveal } from "@/components/common/animated-reveal";
import { Container } from "@/components/marketing/shared/container";
import { SectionHeading } from "@/components/marketing/shared/section-heading";
import { ServiceCard } from "@/components/marketing/shared/service-card";

export function ServicesSection() {
  const t = useTranslations("Services");

  return (
    <section id="services" className="scroll-mt-28 py-16 md:py-24">
      <Container>
        <AnimatedReveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </AnimatedReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <AnimatedReveal key={service.id} delay={index * 0.06}>
              <ServiceCard
                title={t(`items.${service.id}.title`)}
                description={t(`items.${service.id}.description`)}
                icon={service.icon}
              />
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
