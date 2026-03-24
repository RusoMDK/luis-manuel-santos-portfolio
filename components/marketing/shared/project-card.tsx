import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ProjectCardProps = {
  title: string;
  category: string;
  description: string;
  stack: string[];
  href: string;
  image: string;
  ctaLabel: string;
};

export function ProjectCard({
  title,
  category,
  description,
  stack,
  href,
  image,
  ctaLabel,
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

        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
        >
          {ctaLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
