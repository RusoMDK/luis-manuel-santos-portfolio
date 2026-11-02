"use client";

import { useRef, ViewTransition } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { isExternal, type ProjectItem } from "@/lib/projects";

// The hover photo's motion (GSAP) loads only for the cards that have a photo, after hydration.
const PhotoMotion = dynamic(() => import("./photo-motion"), { ssr: false });

type ProjectCardProps = {
  project: ProjectItem;
  /** Grid classes from the section: how many columns the card spans. */
  layout: string;
  stackLabel: string;
};

/**
 * One project: kind and years, the name, what it is and what it is built with. The
 * name is the link and stretches over the whole card. Cards with a photograph of
 * their hardware float it beside the pointer on hover (only with a mouse).
 */
export function ProjectCard({ project, layout, stackLabel }: ProjectCardProps) {
  const card = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);

  const name =
    project.id === "kwad" ? (
      // The same name as the case study's title, so it morphs into it.
      <ViewTransition name="kwad-title" share="morph" default="none">
        <span className="inline-block">{project.name}</span>
      </ViewTransition>
    ) : (
      project.name
    );

  // The name is the link and stretches over the whole card; the call to action under
  // it is what the link says it does.
  const stretch = "no-underline outline-none after:absolute after:inset-0 after:rounded-[16px] after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-link";
  const label = `${project.name}: ${project.cta}`;
  const title = project.href ? (
    isExternal(project.href) ? (
      <a className={stretch} href={project.href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        {name}
      </a>
    ) : (
      <Link className={stretch} href={project.href} transitionTypes={["case-study"]} aria-label={label}>
        {name}
      </Link>
    )
  ) : (
    name
  );

  return (
    <article
      ref={card}
      id={`proyecto-${project.id}`}
      className={`group relative flex min-h-[240px] flex-col gap-4 rounded-[16px] border border-line bg-surface p-6 transition-[transform,border-color] duration-200 focus-within:border-muted hover:z-10 hover:-translate-y-1 hover:border-muted md:p-7 ${layout}`}
    >
      <p className="font-data text-[13px] text-muted">
        {project.kind} · {project.years}
      </p>
      <h3 className="text-[clamp(28px,2.6vw,36px)] leading-none font-[650] tracking-[-0.04em]">{title}</h3>
      <p className="max-w-[58ch] flex-1 text-[16px] leading-[1.55]">{project.description}</p>
      <ul className="flex flex-wrap gap-x-2 gap-y-1 font-data text-[13px] text-muted" aria-label={stackLabel}>
        {project.stack.map((tech, index) => (
          <li key={tech}>
            {index > 0 ? <span aria-hidden="true">· </span> : null}
            {tech}
          </li>
        ))}
      </ul>
      <p
        aria-hidden={project.href ? "true" : undefined}
        className={`mt-1 text-[16px] ${project.href ? "font-semibold text-link underline decoration-1 underline-offset-4 group-hover:decoration-2" : "text-muted"}`}
      >
        {project.cta}
      </p>
      {project.photo ? (
        <div
          ref={photo}
          className="pointer-events-none invisible absolute top-0 left-0 z-20 w-[min(300px,70%)] overflow-hidden rounded-[12px] border border-line bg-surface opacity-0 shadow-float [@media(hover:none)]:hidden"
        >
          <Image
            src={project.photo.src}
            width={project.photo.width}
            height={project.photo.height}
            alt={project.photo.alt}
            sizes="300px"
            quality={60}
            className="block h-auto w-full"
          />
        </div>
      ) : null}
      {project.photo ? <PhotoMotion card={card} photo={photo} /> : null}
    </article>
  );
}
