import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";

type ProjectCardProps = {
  title: string;
  category: string;
  description: string;
  stack: readonly string[];
  image: string;
  repoHref: string;
  repoLabel: string;
  caseStudyHref?: string;
  caseStudyLabel?: string;
};

export function ProjectCard({
  title,
  category,
  description,
  stack,
  image,
  repoHref,
  repoLabel,
  caseStudyHref,
  caseStudyLabel,
}: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
      <div className="overflow-hidden rounded-[22px] border border-white/10 bg-black/20">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>
      </div>

      <div className="mt-6 space-y-4 px-2 pb-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-white/50">
            {category}
          </span>
          <ArrowUpRight className="h-4 w-4 text-white/35 transition group-hover:text-white/70" />
        </div>

        <h3 className="text-2xl font-semibold tracking-tight text-white">
          {title}
        </h3>

        <p className="text-sm leading-7 text-white/65">{description}</p>

        <div className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white/70"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {caseStudyHref ? (
            <Link
              href={caseStudyHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              {caseStudyLabel}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : null}

          <a
            href={repoHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
          >
            {repoLabel}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
