import { techFilters } from "@/config/site";

/** A project as the search and the cards show it, with its copy already translated. */
export type ProjectItem = {
  id: string;
  name: string;
  kind: string;
  years: string;
  description: string;
  stack: string[];
  href: string | null;
  cta: string;
  photo?: { src: string; width: number; height: number; alt: string };
};

const fold = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

/** The technology filter a query names exactly ("react", "MQTT"), if any. */
export function techFor(query: string): string | undefined {
  const q = fold(query);
  return techFilters.find((tech) => fold(tech) === q);
}

/**
 * A query that names a technology keeps the projects built with it; anything else
 * is looked for in the name, the kind, the description and the technologies.
 */
export function matches(project: ProjectItem, query: string): boolean {
  const q = fold(query);
  if (!q) return true;
  const tech = techFor(q);
  if (tech) return project.stack.includes(tech);
  return [project.name, project.kind, project.description, ...project.stack].some((text) => fold(text).includes(q));
}

export const isExternal = (href: string) => /^https?:\/\//.test(href);
