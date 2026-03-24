import {
  LayoutPanelTop,
  Layers3,
  Radio,
  Server,
  type LucideIcon,
} from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
};

const icons: Record<string, LucideIcon> = {
  layout: LayoutPanelTop,
  server: Server,
  layers: Layers3,
  radio: Radio,
};

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const Icon = icons[icon] ?? LayoutPanelTop;

  return (
    <article className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
        <Icon className="h-6 w-6 text-cyan-300" />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/60">{description}</p>
    </article>
  );
}
