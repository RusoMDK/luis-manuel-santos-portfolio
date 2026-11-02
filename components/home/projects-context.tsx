"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { matches, type ProjectItem } from "@/lib/projects";

type ProjectsState = {
  items: ProjectItem[];
  query: string;
  setQuery: (query: string) => void;
  results: ProjectItem[];
};

const ProjectsContext = createContext<ProjectsState | null>(null);

/**
 * One query for the hero search and the project filters: typing in the search
 * filters the cards, and pressing a technology fills the search.
 */
export function ProjectsProvider({ items, children }: { items: ProjectItem[]; children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => items.filter((item) => matches(item, query)), [items, query]);
  const value = useMemo(() => ({ items, query, setQuery, results }), [items, query, results]);
  return <ProjectsContext value={value}>{children}</ProjectsContext>;
}

export function useProjects(): ProjectsState {
  const value = useContext(ProjectsContext);
  if (!value) throw new Error("useProjects needs a ProjectsProvider");
  return value;
}
