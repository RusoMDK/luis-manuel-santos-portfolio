"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { isExternal, type ProjectItem } from "@/lib/projects";
import { useProjects } from "./projects-context";

const subscribeNothing = () => () => {};
const isApple = () => /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/** Where Enter or the link takes a project: the case study, its repository, or its card. */
function ProjectLink({ project, label }: { project: ProjectItem; label: string }) {
  const className = "text-link w-fit text-[16px]";
  if (!project.href) return null;
  if (isExternal(project.href)) {
    return (
      <a className={className} href={project.href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return (
    <Link className={className} href={project.href} transitionTypes={["case-study"]}>
      {label}
    </Link>
  );
}

/**
 * The hero's search: a combobox over the projects. Arrows move through the list,
 * Enter opens the project, Esc clears; ⌘K or Ctrl+K focuses it from anywhere on the
 * page. It shares its query with the technology filters of the projects section.
 */
export function ProjectSearch() {
  const t = useTranslations("Search");
  const router = useRouter();
  const { query, setQuery, results } = useProjects();
  const [activeId, setActiveId] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const listId = `${id}-list`;
  const helpId = `${id}-help`;
  const optionId = (projectId: string) => `${id}-option-${projectId}`;
  const apple = useSyncExternalStore(subscribeNothing, isApple, () => false);

  const active = results.find((project) => project.id === activeId) ?? results[0];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        input.current?.focus();
        input.current?.select();
        input.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = (project: ProjectItem) => {
    if (!project.href) {
      document.getElementById(`proyecto-${project.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (isExternal(project.href)) {
      window.open(project.href, "_blank", "noopener,noreferrer");
      return;
    }
    // next-intl forwards the options to Next's router, which knows transitionTypes.
    router.push(project.href, { transitionTypes: ["case-study"] } as Parameters<typeof router.push>[1]);
  };

  const move = (step: number) => {
    if (!results.length) return;
    const index = Math.max(0, results.indexOf(active));
    const next = results[(index + step + results.length) % results.length];
    setActiveId(next.id);
    document.getElementById(optionId(next.id))?.scrollIntoView({ block: "nearest" });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        move(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        move(-1);
        break;
      case "Home":
        if (results.length) setActiveId(results[0].id);
        break;
      case "End":
        if (results.length) setActiveId(results[results.length - 1].id);
        break;
      case "Enter":
        if (active) {
          event.preventDefault();
          open(active);
        }
        break;
      case "Escape":
        if (query) {
          event.preventDefault();
          setQuery("");
          setActiveId(null);
        }
        break;
    }
  };

  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-[16px] border border-line bg-surface shadow-float" data-ui>
      <div className="flex items-center gap-3 border-b border-line py-2 pr-2 pl-5" /* taste-skill-ignore: interface fragment (data-ui), its own 1px lines */>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true" className="shrink-0 text-muted">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          ref={input}
          type="text"
          role="combobox"
          aria-label={t("label")}
          aria-expanded="true"
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active ? optionId(active.id) : undefined}
          aria-describedby={helpId}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder={t("placeholder")}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveId(null);
          }}
          onKeyDown={onKeyDown}
          className="h-12 min-w-0 flex-1 bg-transparent text-[17px] text-ink outline-none placeholder:text-muted"
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveId(null);
              input.current?.focus();
            }}
            aria-label={t("clear")}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-[10px] text-muted hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        ) : (
          <kbd
            aria-label={t("shortcut")}
            className="mr-2 hidden shrink-0 rounded-[8px] border border-line px-2 py-0.5 text-[13px] text-muted [@media(hover:hover)]:inline-block"
          >
            {apple ? "⌘K" : "Ctrl K"}
          </kbd>
        )}
      </div>

      <ul id={listId} role="listbox" aria-label={t("results")} className="flex flex-col gap-0.5 p-2">
        {results.map((project) => {
          const selected = project === active;
          return (
            <li
              key={project.id}
              id={optionId(project.id)}
              role="option"
              aria-selected={selected}
              // Keep the focus in the input: the option is chosen, not focused.
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => (selected ? open(project) : setActiveId(project.id))}
              className="flex min-h-[52px] cursor-pointer items-center justify-between gap-4 rounded-[10px] px-3 py-2 transition-colors hover:bg-accent-soft/60 aria-selected:bg-accent-soft"
            >
              <span className="flex min-w-0 flex-col">
                <span className="text-[16px] leading-tight font-semibold">{project.name}</span>
                <span className="text-[13px] text-muted">{project.kind}</span>
              </span>
              <span className="shrink-0 font-data text-[13px] whitespace-nowrap text-muted">{project.years}</span>
            </li>
          );
        })}
      </ul>

      {results.length === 0 ? <p className="px-5 pt-1 pb-5 text-[16px] text-muted">{t("empty", { query: query.trim() })}</p> : null}

      {active ? (
        <div className="flex flex-col gap-3 border-t border-line px-5 pt-4 pb-5" /* taste-skill-ignore: interface fragment (data-ui), its own 1px lines */>
          <p className="text-[16px] leading-[1.55]">{active.description}</p>
          <ul className="flex flex-wrap gap-1.5" aria-label={active.name}>
            {active.stack.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
          {active.href ? (
            <ProjectLink project={active} label={active.href.startsWith("/") ? t("openKwad") : t("openRepo")} />
          ) : (
            <p className="text-[16px] text-muted">{t("private")}</p>
          )}
        </div>
      ) : null}

      <p id={helpId} className="border-t border-line px-5 py-3 font-data text-[13px] text-muted" /* taste-skill-ignore: interface fragment (data-ui), its own 1px lines */>
        {t("help")}
      </p>
      <p className="sr-only" aria-live="polite">
        {query ? t("count", { count: results.length }) : ""}
      </p>
    </div>
  );
}
