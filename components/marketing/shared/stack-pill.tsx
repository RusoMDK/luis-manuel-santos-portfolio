type StackPillProps = {
  label: string;
};

export function StackPill({ label }: StackPillProps) {
  return (
    <span className="group inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/[0.08] hover:text-white">
      <span className="mr-2 h-2 w-2 rounded-full bg-cyan-300/70 transition group-hover:bg-cyan-200" />
      {label}
    </span>
  );
}
