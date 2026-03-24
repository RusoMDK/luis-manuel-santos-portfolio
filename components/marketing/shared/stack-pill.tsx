type StackPillProps = {
  label: string;
};

export function StackPill({ label }: StackPillProps) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75">
      {label}
    </span>
  );
}
