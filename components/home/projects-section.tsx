"use client";

import { addTransitionType, startTransition, ViewTransition } from "react";
import { useTranslations } from "next-intl";
import { techFilters } from "@/config/site";
import { techFor } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { useProjects } from "./projects-context";

// Six columns on a laptop: two wide cards over three, or whatever fills the rows.
// On a tablet, two columns, with the first card across both when the count is odd.
function layoutFor(index: number, count: number): string {
  const span = count === 1 ? 6 : count === 3 ? 2 : count === 5 && index >= 2 ? 2 : 3;
  const desktop = { 2: "lg:col-span-2", 3: "lg:col-span-3", 6: "lg:col-span-6" }[span];
  return count % 2 === 1 && index === 0 ? `md:col-span-2 ${desktop}` : desktop ?? "";
}

/**
 * The projects with their technology filters. A filter fills the hero search with
 * the same query, so both always show the same projects; the cards rearrange with
 * a view transition when a filter is pressed.
 */
export function ProjectsSection() {
  const t = useTranslations("Projects");
  const search = useTranslations("Search");
  const { query, setQuery, results } = useProjects();
  const activeTech = techFor(query);

  const filter = (next: string) =>
    startTransition(() => {
      addTransitionType("filter");
      setQuery(next);
    });

  return (
    <section id="proyectos" className="frame flex scroll-mt-6 flex-col gap-8 pt-24 md:pt-32" aria-labelledby="projects-title">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
        <h2 id="projects-title" data-reveal className="text-[clamp(40px,5vw,68px)] leading-none font-[650] tracking-[-0.045em]">
          {t("title")}
        </h2>
        <p data-reveal className="max-w-[440px] text-[17px] text-muted">
          {t("lead")}
        </p>
      </div>

      <div role="group" aria-label={t("filterLabel")} className="flex flex-wrap gap-2" data-reveal>
        <button type="button" className="chip" aria-pressed={!query} onClick={() => filter("")}>
          {t("all")}
        </button>
        {techFilters.map((tech) => {
          const pressed = activeTech === tech;
          return (
            <button key={tech} type="button" className="chip" aria-pressed={pressed} onClick={() => filter(pressed ? "" : tech)}>
              {tech}
            </button>
          );
        })}
      </div>

      {results.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {results.map((project, index) => (
            <ViewTransition
              key={project.id}
              default="none"
              update={{ filter: "auto", default: "none" }}
              enter={{ filter: "card-in", default: "none" }}
              exit={{ filter: "card-out", default: "none" }}
            >
              <ProjectCard project={project} layout={layoutFor(index, results.length)} stackLabel={t("stackLabel")} />
            </ViewTransition>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-[16px] border border-line bg-surface p-7">
          <p className="text-[17px]">{activeTech ? t("empty", { tech: activeTech }) : search("empty", { query: query.trim() })}</p>
          <button type="button" className="button" onClick={() => filter("")}>
            {t("showAll")}
          </button>
        </div>
      )}
    </section>
  );
}
