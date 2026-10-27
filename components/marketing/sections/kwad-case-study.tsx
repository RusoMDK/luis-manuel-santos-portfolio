import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { PageMotion } from "@/components/common/page-motion";
import { hasPhoneCrop, Shot } from "@/components/marketing/kwad/shot";

type KwadCaseStudyProps = {
  locale: "es" | "en";
};

type Application = {
  name: string;
  purpose: { es: string; en: string };
  stack: string;
};

const applications: readonly Application[] = [
  {
    name: "Back-office",
    purpose: { es: "Ventas, inventario, empleados, cajas y operaciones por negocio.", en: "Sales, inventory, employees, cash registers and business operations." },
    stack: "React · TypeScript",
  },
  {
    name: "Storefront",
    purpose: { es: "Catálogo y experiencia de compra online de cada comercio.", en: "Online catalog and purchasing experience for each business." },
    stack: "React · TypeScript",
  },
  {
    name: "Platform admin",
    purpose: { es: "Administración interna de la plataforma, separada de los negocios clientes.", en: "Internal platform administration, separated from tenant operations." },
    stack: "RBAC · SaaS operations",
  },
  {
    name: "API",
    purpose: { es: "Reglas de negocio, autenticación, persistencia y aislamiento multiempresa.", en: "Business rules, authentication, persistence and tenant isolation." },
    stack: "Fastify · Prisma · PostgreSQL",
  },
  {
    name: "Marketing site",
    purpose: { es: "Presentación del producto, funcionalidades y entrada al SaaS.", en: "Public presentation of the product and its features." },
    stack: "getkwad.com",
  },
];

const content = {
  es: {
    back: "Volver al portfolio",
    title: "KWAD",
    subtitle: "Diseñar, construir y conectar un producto SaaS B2B.",
    intro: "KWAD es una plataforma multiempresa orientada a las operaciones comerciales. Me encargué de su desarrollo integral: desde las interfaces hasta los servicios, las reglas de negocio y el modelo de datos.",
    overviewTitle: "El reto no era hacer una tienda.",
    overview: "El reto era conectar la operación interna de cada negocio con su canal de venta online, manteniendo las herramientas de administración de la plataforma separadas de los datos y permisos de los comercios.",
    architectureTitle: "Cinco piezas, un producto",
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
    shotAlt: "Recepción de mercancía en KWAD: orden de compra con productos, cantidades y coste por línea en CUP",
    sample: "Datos de ejemplo.",
    gallery: [
      { shot: "terminal", alt: "Pantalla del TPV de KWAD que bloquea una terminal no vinculada", caption: "El TPV se niega a cobrar en un dispositivo no vinculado. Datos de ejemplo." },
      { shot: "ledger", alt: "Movimientos de inventario de KWAD con el stock antes y después", caption: "Datos de ejemplo." },
      { shot: "currency", alt: "Catálogo de KWAD con precio en USD y base en CUP", caption: "Datos de ejemplo." },
      { shot: "store", alt: "Panel de tienda online de KWAD con su catálogo público y los apartados de configuración", caption: "Datos de ejemplo." },
    ],
  },
  en: {
    back: "Back to portfolio",
    title: "KWAD",
    subtitle: "Designing, building and connecting a B2B SaaS product.",
    intro: "KWAD is a multi-tenant platform for business operations. I built the product end to end, from its interfaces to the services, business rules and data model.",
    overviewTitle: "The challenge was not a shop.",
    overview: "It was connecting each business's internal operations to its online sales channel while keeping platform administration separate from each tenant's data and permissions.",
    architectureTitle: "Five applications, one product",
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
    shotAlt: "Goods receipt in KWAD: a purchase order with products, quantities and line cost in CUP",
    sample: "Sample data.",
    gallery: [
      { shot: "terminal", alt: "KWAD point-of-sale screen blocking an unpaired till", caption: "The till refuses to take payments on an unpaired device. Sample data." },
      { shot: "ledger", alt: "KWAD inventory movements with stock before and after", caption: "Sample data." },
      { shot: "currency", alt: "KWAD catalogue with USD price and CUP base", caption: "Sample data." },
      { shot: "store", alt: "KWAD online shop panel with its public catalogue and setup sections", caption: "Sample data." },
    ],
  },
} as const;

export const KwadCaseStudy = ({ locale }: KwadCaseStudyProps) => {
  const copy = content[locale];

  return (
    <PageMotion>
      <article className="case field-walnut">
        <header className="frame grid case-head">
          <p className="case-back">
            <Link className="text-link" href="/#kwad" transitionTypes={["case-study"]}>
              ← {copy.back}
            </Link>
          </p>
          <h1 className="display case-title">{copy.title}</h1>
          <div className="case-intro">
            <p className="lead">{copy.subtitle}</p>
            <p>{copy.intro}</p>
            <a className="button" href={siteConfig.kwadUrl} target="_blank" rel="noopener noreferrer">
              {copy.cta}
            </a>
          </div>
        </header>

        <figure className="frame case-shot">
        <Shot id="reception" alt={copy.shotAlt} sizes="100vw" priority />
        <figcaption className="caption">{copy.sample}</figcaption>
      </figure>

        <section className="frame grid case-section" aria-labelledby="challenge-heading">
          <h2 id="challenge-heading" className="heading case-side" data-reveal>{copy.overviewTitle}</h2>
          <p className="case-main lead" data-reveal>{copy.overview}</p>
        </section>

        <ul className="frame grid case-gallery">
          {copy.gallery.map((item) => (
          <li
            key={item.shot}
            className={hasPhoneCrop(item.shot) ? "case-gallery-item" : "case-gallery-item phone-hidden"}
            data-reveal
          >
            <figure>
              <Shot id={item.shot} alt={item.alt} sizes="(max-width: 900px) 100vw, 45vw" />
              <figcaption className="caption">{item.caption}</figcaption>
            </figure>
          </li>
        ))}
        </ul>

        <section className="frame grid case-section" aria-labelledby="architecture-heading">
          <div className="case-side" data-reveal>
            <h2 id="architecture-heading" className="heading">{copy.architectureTitle}</h2>
            <p className="case-note">{copy.architectureText}</p>
          </div>
          <div className="case-main slip-paper zigzag-bottom" data-ui data-reveal>
            <ul className="apps">
              {applications.map(({ name, purpose, stack }) => (
                <li key={name} className="app-row">
                  <p className="itinerary-row">
                    <span className="app-name">{name}</span>
                    <span className="leader" aria-hidden="true" />
                    <span>{stack}</span>
                  </p>
                  <p className="app-purpose">{purpose[locale]}</p>
                </li>
              ))}
            </ul>
            <p className="itinerary-result">TypeScript · Prisma · PostgreSQL · RBAC</p>
          </div>
        </section>

        <section className="frame grid case-section" aria-labelledby="decisions-heading">
          <h2 id="decisions-heading" className="heading case-side" data-reveal>{copy.decisionsTitle}</h2>
          <ul className="case-main decisions" data-reveal>
            {copy.decisions.map((decision) => (
              <li key={decision.title}>
                <h3 className="decision-title">{decision.title}</h3>
                <p>{decision.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <footer className="frame grid case-section case-close">
          <div className="case-side" data-reveal>
            <h2 className="heading">{copy.proofTitle}</h2>
          </div>
          <div className="case-main">
            <p className="lead">{copy.proof}</p>
            <p className="case-note">{copy.limitations}</p>
            <a className="button case-cta" href={siteConfig.kwadUrl} target="_blank" rel="noopener noreferrer">
              {copy.cta}
            </a>
          </div>
        </footer>
      </article>
    </PageMotion>
  );
};
