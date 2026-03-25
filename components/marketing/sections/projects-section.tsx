import { useTranslations } from "next-intl";
import { projects } from "@/config/site";
import { AnimatedReveal } from "@/components/common/animated-reveal";
import { Container } from "@/components/marketing/shared/container";
import { ProjectCard } from "@/components/marketing/shared/project-card";
import { SectionHeading } from "@/components/marketing/shared/section-heading";

export function ProjectsSection() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="scroll-mt-28 py-16 md:py-24">
      <Container>
        <AnimatedReveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </AnimatedReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <AnimatedReveal key={project.id} delay={index * 0.08}>
              <ProjectCard
                title={t(`items.${project.id}.title`)}
                category={t(`items.${project.id}.category`)}
                description={t(`items.${project.id}.description`)}
                stack={project.stack}
                image={project.image}
                repoHref={project.repoHref}
                repoLabel={t("repoCta")}
                caseStudyHref={
                  "caseStudySlug" in project
                    ? `/projects/${project.caseStudySlug}`
                    : undefined
                }
                caseStudyLabel={t("cta")}
              />
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
