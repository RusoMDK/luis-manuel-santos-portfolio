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

export const ProjectCard = ({
  title,
  category,
  description,
  stack,
  image,
  repoHref,
  repoLabel,
  caseStudyHref,
  caseStudyLabel,
}: ProjectCardProps) => (
  <article className="group flex h-full flex-col overflow-hidden border-t border-white/20 pt-4">
    <div className="flex items-center justify-between gap-4 pb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
      <span>{category}</span>
      <ArrowUpRight aria-hidden="true" size={18} className="shrink-0 text-emerald-200 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
    </div>
    <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-[#16201c]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      />
    </div>
    <div className="flex flex-1 flex-col pt-6">
      <h3 className="text-2xl font-medium leading-tight tracking-[-0.045em] text-[#f3f2ed]">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-white/60">{description}</p>
      <ul aria-label="Technology stack" className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
        {stack.map((item) => (
          <li key={item} className="font-mono text-[11px] text-emerald-100/70">{item}</li>
        ))}
      </ul>
      <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-4">
        {caseStudyHref && (
          <Link href={caseStudyHref} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 hover:text-white">
            {caseStudyLabel} <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        )}
        <a href={repoHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
          {repoLabel} <ExternalLink aria-hidden="true" size={14} />
        </a>
      </div>
    </div>
  </article>
);
