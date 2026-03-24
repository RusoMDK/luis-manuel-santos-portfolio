import { useTranslations } from "next-intl";
import { services } from "@/config/site";
import { Container } from "@/components/marketing/shared/container";
import { SectionHeading } from "@/components/marketing/shared/section-heading";
import { ServiceCard } from "@/components/marketing/shared/service-card";

export function ServicesSection() {
  const t = useTranslations("Services");

  return (
    <section id="services" className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={t(`items.${service.id}.title`)}
              description={t(`items.${service.id}.description`)}
              icon={service.icon}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
