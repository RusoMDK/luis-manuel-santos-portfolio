import { ArrowUpRight, Boxes, Database, LayoutDashboard, ShieldCheck, ShoppingBag, Globe2 } from "lucide-react";
import { Container } from "@/components/marketing/shared/container";
import { Link } from "@/i18n/navigation";

type FeatureItem = {
  title: string;
  detail: string;
  Icon: typeof Boxes;
};

const features: readonly FeatureItem[] = [
  { title: "Back-office", detail: "POS · Inventory · Cash", Icon: LayoutDashboard },
  { title: "Storefront", detail: "Catalog · Orders · Checkout", Icon: ShoppingBag },
  { title: "Platform admin", detail: "SaaS administration", Icon: ShieldCheck },
  { title: "API & data", detail: "Fastify · Prisma · PostgreSQL", Icon: Database },
  { title: "Landing", detail: "Public product website", Icon: Globe2 },
];

type KwadFeatureProps = {
  locale: string;
};

export const KwadFeature = ({ locale }: KwadFeatureProps) => {
  const isSpanish = locale === "es";

  return (
    <section id="kwad" aria-labelledby="kwad-title" className="scroll-mt-28 border-y border-white/10 py-20 md:py-28">
      <Container>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
          <span>{isSpanish ? "02 / Proyecto destacado" : "02 / Featured work"}</span>
          <span className="text-white/50">KWAD / MiNegocio</span>
        </div>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div className="space-y-7">
            <p className="text-sm font-medium text-white/55">{isSpanish ? "Producto propio · Desarrollo integral" : "Independent product · End-to-end development"}</p>
            <h2 id="kwad-title" className="max-w-2xl text-5xl font-medium leading-[1.06] tracking-[-0.055em] text-white sm:text-6xl">
              {isSpanish ? "Software para negocios reales." : "Software for real businesses."}
            </h2>
            <p className="max-w-xl text-base leading-8 text-white/65">
              {isSpanish
                ? "Diseñé y desarrollé KWAD: una plataforma SaaS B2B multiempresa para ventas, inventario, cajas, compras, tiendas online y administración de la plataforma."
                : "I designed and developed KWAD: a multi-tenant B2B SaaS platform for sales, inventory, cash registers, purchasing, online stores and platform administration."}
            </p>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "Turborepo"].map((technology) => (
                <span key={technology} className="rounded-md border border-white/15 px-3 py-1.5 text-xs text-white/65">{technology}</span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-7">
              <Link href="/kwad" className="inline-flex items-center gap-2 border-b border-emerald-300 pb-2 text-sm font-semibold text-emerald-200 transition-colors hover:text-white">
                {isSpanish ? "Ver caso de estudio" : "Read the case study"} <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <a href="https://getkwad.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-white/30 pb-2 text-sm text-white/70 transition-colors hover:text-white">
                {isSpanish ? "Web del producto" : "Product website"} ↗
              </a>
            </div>
            <p className="max-w-lg text-xs leading-6 text-white/40">
              {isSpanish ? "El repositorio es privado: presento las funcionalidades y decisiones técnicas sin exponer código propietario." : "The repository is private: product features and engineering decisions are presented without exposing proprietary code."}
            </p>
          </div>
          <div className="overflow-hidden rounded-[4px] border border-white/15 bg-[#132019] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.28)] sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-emerald-300">KWAD / SYSTEM MAP</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">{isSpanish ? "Una plataforma. Cinco aplicaciones." : "One platform. Five applications."}</h3>
              </div>
              <Boxes aria-hidden="true" className="h-9 w-9 shrink-0 text-emerald-300/70" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map(({ title, detail, Icon }, index) => (
                <div key={title} className={`min-h-32 rounded-[3px] border border-white/10 bg-white/[0.025] p-5 ${index === 4 ? "sm:col-span-2" : ""}`}>
                  <div className="mb-4 flex items-center justify-between"><Icon aria-hidden="true" className="h-5 w-5 text-emerald-300"/><span className="font-mono text-[11px] text-white/35">0{index + 1}</span></div>
                  <h4 className="font-semibold text-white">{title}</h4>
                  <p className="mt-1 text-xs text-white/50">{detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 font-mono text-[11px] tracking-wide text-white/40">+ Landing · RBAC · Tenant isolation · Railway / Vercel</p>
          </div>
        </div>
      </Container>
    </section>
  );
};
