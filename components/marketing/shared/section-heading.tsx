type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-4">
      <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-white/60">
        {eyebrow}
      </div>

      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="text-base leading-7 text-white/65 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
