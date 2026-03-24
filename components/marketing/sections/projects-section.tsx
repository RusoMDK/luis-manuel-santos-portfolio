import { useTranslations } from "next-intl";
import { projects } from "@/config/site";
import { Container } from "@/components/marketing/shared/container";
import { ProjectCard } from "@/components/marketing/shared/project-card";
import { SectionHeading } from "@/components/marketing/shared/section-heading";

export function ProjectsSection() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={t(`items.${project.id}.title`)}
              category={t(`items.${project.id}.category`)}
              description={t(`items.${project.id}.description`)}
              stack={project.stack}
              href={project.href}
              ctaLabel={t("cta")}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
