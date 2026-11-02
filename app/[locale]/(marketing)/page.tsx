import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { photos, projects } from "@/config/site";
import type { ProjectItem } from "@/lib/projects";
import { AboutSection } from "@/components/home/about-section";
import { ApproachSection } from "@/components/home/approach-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectsProvider } from "@/components/home/projects-context";
import { ProjectsSection } from "@/components/home/projects-section";

type HomePageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (locale !== "es" && locale !== "en") {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Projects" });

  // The projects with their copy in this language, for the search and the cards.
  const items: ProjectItem[] = projects.map((project) => ({
    id: project.id,
    name: t(`items.${project.id}.name`),
    kind: t(`items.${project.id}.kind`),
    years: t(`items.${project.id}.years`),
    description: t(`items.${project.id}.description`),
    cta: t(`items.${project.id}.cta`),
    stack: [...project.stack],
    href: project.href,
    ...("photo" in project
      ? { photo: { ...photos[project.photo], alt: t(`items.${project.id as "iotPlatform" | "iotTestbench"}.photoAlt`) } }
      : {}),
  }));

  return (
    <ProjectsProvider items={items}>
      <HeroSection locale={locale} />
      <ProjectsSection />
      <ApproachSection />
      <AboutSection />
    </ProjectsProvider>
  );
}
