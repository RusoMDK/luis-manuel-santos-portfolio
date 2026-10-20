import { Database, Globe2, LayoutDashboard, ServerCog, ShieldCheck, ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/marketing/shared/container";

type KwadCaseStudyProps = {
  locale: "es" | "en";
};

type Application = {
  id: string;
  name: string;
  purpose: { es: string; en: string };
  stack: string;
  Icon: typeof Database;
};

const applications: readonly Application[] = [
  {
    id: "01",
    name: "Back-office",
    purpose: { es: "Ventas, inventario, empleados, cajas y operaciones por negocio.", en: "Sales, inventory, employees, cash registers and business operations." },
    stack: "React · TypeScript",
    Icon: LayoutDashboard,
  },
  {
    id: "02",
    name: "Storefront",
    purpose: { es: "Catálogo y experiencia de compra online de cada comercio.", en: "Online catalog and purchasing experience for each business." },
    stack: "React · TypeScript",
    Icon: ShoppingBag,
  },
  {
    id: "03",
    name: "Platform admin",
    purpose: { es: "Administración interna de la plataforma, separada de los negocios clientes.", en: "Internal platform administration, separated from tenant operations." },
    stack: "RBAC · SaaS operations",
    Icon: ShieldCheck,
  },
  {
    id: "04",
    name: "API",
    purpose: { es: "Reglas de negocio, autenticación, persistencia y aislamiento multiempresa.", en: "Business rules, authentication, persistence and tenant isolation." },
    stack: "Fastify · Prisma · PostgreSQL",
    Icon: ServerCog,
  },
  {
    id: "05",
    name: "Marketing site",
    purpose: { es: "Presentación del producto, funcionalidades y entrada al SaaS.", en: "Public presentation of the product and its features." },
    stack: "getkwad.com",
    Icon: Globe2,
  },
];

const content = {
  es: {
    eyebrow: "03 / CASO DE ESTUDIO",
    back: "Volver al portfolio",
    title: "KWAD.",
    subtitle: "Diseñar, construir y conectar un producto SaaS B2B.",
    intro: "KWAD es una plataforma multiempresa orientada a las operaciones comerciales. Me encargué de su desarrollo integral: desde las interfaces hasta los servicios, las reglas de negocio y el modelo de datos.",
    overviewTitle: "El reto no era hacer una tienda.",
    overview: "El reto era conectar la operación interna de cada negocio con su canal de venta online, manteniendo las herramientas de administración de la plataforma separadas de los datos y permisos de los comercios.",
    architectureTitle: "Cinco aplicaciones. Un mismo producto.",
    architectureText: "La solución organiza aplicaciones con responsabilidades diferentes y una API compartida. El aislamiento por organización y los permisos por rol forman parte de las decisiones centrales de diseño.",
    decisionsTitle: "Decisiones de ingeniería",
    decisions: [
      { title: "Aislamiento multi-tenant", detail: "Separación de organizaciones y contexto de cada petición para proteger el acceso a datos entre negocios." },
      { title: "Identidad y permisos", detail: "Diferenciación entre los usuarios de cada comercio y los administradores internos de la plataforma; autorización basada en roles." },
      { title: "Modelo de datos y operaciones", detail: "Prisma y PostgreSQL para representar inventario, ventas, compras y cajas; lógica del negocio ubicada en los servicios." },
      { title: "Entrega y mantenimiento", detail: "Monorepo con Turborepo, pruebas con Vitest y despliegues mediante Railway y Vercel, según la documentación técnica del proyecto." },
    ],
    proofTitle: "Qué demuestra este proyecto",
    proof: "Diseño de interfaces de administración, desarrollo de APIs, modelado de datos, seguridad de acceso, integración entre aplicaciones y capacidad de llevar un producto complejo de extremo a extremo.",
    limitations: "El código fuente es propietario y permanece privado. Esta página explica mi contribución y decisiones técnicas sin mostrar secretos, datos de clientes ni métricas no verificadas.",
    cta: "Visitar la web del producto",
  },
  en: {
    eyebrow: "03 / CASE STUDY",
    back: "Back to portfolio",
    title: "KWAD.",
    subtitle: "Designing, building and connecting a B2B SaaS product.",
    intro: "KWAD is a multi-tenant platform for business operations. I built the product end to end, from its interfaces to the services, business rules and data model.",
    overviewTitle: "The challenge was not another online store.",
    overview: "It was connecting each business's internal operations to its online sales channel while keeping platform administration separate from each tenant's data and permissions.",
    architectureTitle: "Five applications. One product.",
    architectureText: "The solution separates applications by responsibility around a shared API. Organization isolation and role permissions are central architecture concerns.",
    decisionsTitle: "Engineering decisions",
    decisions: [
      { title: "Tenant isolation", detail: "Organization boundaries and per-request context prevent cross-tenant data access." },
      { title: "Identity and authorization", detail: "Separating tenant staff from platform administrators, with role-based access control." },
      { title: "Data modeling and operations", detail: "Prisma and PostgreSQL model inventory, sales, purchasing and cash registers, with business logic in services." },
      { title: "Delivery and maintenance", detail: "Turborepo monorepo, Vitest tests, and Railway / Vercel deployments, as documented by the project." },
    ],
    proofTitle: "What this work demonstrates",
    proof: "Administrative UI design, API development, data modeling, access security, integration between applications and end-to-end ownership of a complex product.",
    limitations: "The source code is proprietary and remains private. This case study describes my work without exposing secrets, tenant data or unverified business metrics.",
    cta: "Visit the product website",
  },
} as const;

export const KwadCaseStudy = ({ locale }: KwadCaseStudyProps) => {
  const copy = content[locale];

  return (
    <article className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Container>
        <div className="mb-12 flex items-center justify-between gap-4 border-b border-white/15 pb-5 font-mono text-xs uppercase tracking-[0.18em] text-white/45">
          <span>{copy.eyebrow}</span>
          <Link href="/#kwad" className="text-emerald-200 transition-colors hover:text-white">{copy.back} ↗</Link>
        </div>
        <header className="grid gap-8 border-b border-white/15 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">Full Stack / B2B SaaS</p>
            <h1 className="font-serif text-[clamp(5rem,12vw,11rem)] font-normal italic leading-none tracking-[-0.085em] text-[#f3f2ed]">{copy.title}</h1>
          </div>
          <div className="space-y-5">
            <h2 className="max-w-xl text-3xl font-medium leading-tight tracking-[-0.045em] text-white md:text-5xl">{copy.subtitle}</h2>
            <p className="max-w-2xl text-base leading-8 text-white/65">{copy.intro}</p>
          </div>
        </header>
        <section aria-labelledby="challenge-heading" className="grid gap-8 border-b border-white/15 py-16 md:py-24 lg:grid-cols-[0.45fr_1fr]">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">01 / {locale === "es" ? "El problema" : "The challenge"}</p>
          <div>
            <h2 id="challenge-heading" className="max-w-3xl text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl">{copy.overviewTitle}</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/65">{copy.overview}</p>
          </div>
        </section>
        <section aria-labelledby="architecture-heading" className="border-b border-white/15 py-16 md:py-24">
          <div className="mb-10 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">02 / Architecture</p>
              <h2 id="architecture-heading" className="text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl">{copy.architectureTitle}</h2>
            </div>
            <p className="max-w-xl self-end text-base leading-8 text-white/65">{copy.architectureText}</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-2 xl:grid-cols-3">
            {applications.map(({ id, name, purpose, stack, Icon }) => (
              <div key={id} className="min-h-56 bg-[#111c17] p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <Icon size={25} aria-hidden="true" className="text-emerald-200" />
                  <span className="font-mono text-xs text-white/35">{id}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-white">{name}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">{purpose[locale]}</p>
                <p className="mt-5 font-mono text-xs text-emerald-200/70">{stack}</p>
              </div>
            ))}
            <div className="flex min-h-56 items-center justify-center bg-[#17261e] p-8 text-center">
              <div>
                <Database size={30} aria-hidden="true" className="mx-auto text-emerald-200" />
                <p className="mt-4 font-mono text-xs uppercase tracking-widest text-white/60">TypeScript · Prisma · PostgreSQL</p>
                <p className="mt-2 text-sm text-white/50">RBAC / Tenant boundaries / REST</p>
              </div>
            </div>
          </div>
        </section>
        <section aria-labelledby="decisions-heading" className="grid gap-10 border-b border-white/15 py-16 md:py-24 lg:grid-cols-[0.45fr_1fr]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">03 / Decisions</p>
            <h2 id="decisions-heading" className="text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl">{copy.decisionsTitle}</h2>
          </div>
          <div className="divide-y divide-white/15">
            {copy.decisions.map((decision, index) => (
              <div key={decision.title} className="grid gap-3 py-6 first:pt-0 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-xs text-emerald-300">0{index + 1}</span>
                <div>
                  <h3 className="text-xl font-medium text-white">{decision.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{decision.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <footer className="grid gap-8 pt-16 md:pt-24 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-medium tracking-tight text-white">{copy.proofTitle}</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/65">{copy.proof}</p>
            <p className="mt-8 max-w-xl border-l-2 border-emerald-300/40 pl-4 text-sm leading-7 text-white/50">{copy.limitations}</p>
          </div>
          <div className="flex items-center justify-start lg:justify-end">
            <a href="https://getkwad.com" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-3 rounded-sm bg-[#c6efcd] px-6 font-medium text-[#10241a] transition-colors hover:bg-white">{copy.cta} ↗</a>
          </div>
        </footer>
      </Container>
    </article>
  );
};
