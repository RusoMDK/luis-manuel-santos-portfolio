import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { PageMotion } from "@/components/common/page-motion";
import { Shot } from "@/components/marketing/kwad/shot";

type KwadCaseStudyProps = {
  locale: "es" | "en";
};

type Application = {
  name: string | { es: string; en: string };
  purpose: { es: string; en: string };
  stack: string;
};

const applications: readonly Application[] = [
  {
    name: "Back-office",
    purpose: {
      es: "TPV, inventario, compras, caja, empleados e informes de cada comercio.",
      en: "Point of sale, inventory, purchasing, cash, staff and reports for each retailer.",
    },
    stack: "React · TypeScript",
  },
  {
    name: { es: "Tienda online", en: "Online shop" },
    purpose: {
      es: "El catálogo público de cada comercio, con el stock del back-office.",
      en: "Each retailer's public catalogue, with the stock from the back-office.",
    },
    stack: "React · TypeScript",
  },
  {
    name: { es: "Consola de plataforma", en: "Platform console" },
    purpose: {
      es: "Alta y operación de organizaciones, con su propia identidad.",
      en: "Onboarding and running organisations, with its own identity.",
    },
    stack: "TypeScript",
  },
  {
    name: "API",
    purpose: {
      es: "Reglas de negocio, autenticación, aislamiento por organización y trabajos en cola.",
      en: "Business rules, authentication, isolation by organisation and queued jobs.",
    },
    stack: "Fastify · Prisma · PostgreSQL · BullMQ",
  },
  {
    name: "Web",
    purpose: { es: "La presentación del producto.", en: "The product's website." },
    stack: "getkwad.com",
  },
];

const content = {
  es: {
    back: "Volver al portfolio",
    title: "KWAD",
    subtitle: "TPV, inventario y tienda online para comercios. En producción con su primer cliente.",
    intro: "Lo diseño, lo programo y lo opero yo solo desde abril de 2026: el modelo de datos, la API, las tres aplicaciones y el despliegue.",
    overviewTitle: "Vender cuando la red se cae",
    overview: "Un comercio en Cuba cobra en varias monedas, sin pasarelas tipo Stripe y con una conexión que se corta a mitad del cobro. KWAD tiene que registrar cada venta una sola vez, mover el stock con trazabilidad y mantener separados los datos de cada comercio.",
    architectureTitle: "Cinco piezas, un producto",
    architectureText: "Tres aplicaciones con identidad separada sobre una API compartida: el personal de un comercio y el operador de la plataforma no comparten sesión ni permisos.",
    decisionsTitle: "Decisiones de ingeniería",
    decisions: [
      { title: "El tenant viaja con la petición", detail: "La organización se resuelve al entrar y vive en un contexto de AsyncLocalStorage hasta la respuesta. Los permisos por rol se evalúan dentro de esa organización. Ninguna capa depende de que alguien se acuerde de pasar el organizationId." },
      { title: "Ventas idempotentes", detail: "Cada venta sale del TPV con su clave. Si la red se corta y el cajero reintenta, el servidor reconoce la clave y no la registra dos veces. La demo de la portada simula ese flujo." },
      { title: "Cajero, terminal y turno", detail: "El TPV trabaja por cajero, terminal y turno, y se bloquea en un dispositivo no vinculado." },
      { title: "El stock es un libro", detail: "Ninguna operación sobrescribe una cantidad. Cada entrada, salida, recepción de compra o traslado entre tiendas y almacenes es un movimiento que guarda el stock de antes y el de después." },
      { title: "CUP como moneda base", detail: "La contabilidad se lleva en CUP y se presenta en USD u otras monedas. La tasa se sincroniza con un trabajo programado en BullMQ sobre Redis." },
      { title: "Cada cambio deja rastro", detail: "Auditoría con el valor anterior y el nuevo, e informes en CSV, XLSX y PDF." },
      { title: "Entrega", detail: "Monorepo con Turborepo y despliegue en Railway y Vercel." },
    ],
    limitations: "Beta en producción con su primer cliente. El código es privado: aquí enseño decisiones y capturas de un tenant de prueba, nunca datos de clientes.",
    cta: "Ver getkwad.com",
    shotAlt: "Ítems de una compra recibida en KWAD: producto, unidad, cantidad, coste y total en dólares, cada uno con su importe registrado en CUP",
    sample: "Datos de ejemplo.",
    gallery: [
      { shot: "terminal", alt: "TPV de KWAD en un dispositivo sin vincular: pide el código de vinculación del panel administrativo antes de operar", caption: "El TPV se niega a cobrar en un dispositivo no vinculado. Datos de ejemplo." },
      { shot: "ledger", alt: "Movimientos de inventario de KWAD con el stock antes y después", caption: "Datos de ejemplo." },
      { shot: "currency", alt: "Catálogo de KWAD con precio en USD y base en CUP", caption: "Datos de ejemplo." },
    ],
  },
  en: {
    back: "Back to portfolio",
    title: "KWAD",
    subtitle: "Point of sale, inventory and online shop for retailers. In production with its first customer.",
    intro: "I have designed, built and run it on my own since April 2026: the data model, the API, the three applications and the deployment.",
    overviewTitle: "Selling when the network drops",
    overview: "A shop in Cuba takes payment in several currencies, without gateways like Stripe and over a connection that drops mid-payment. KWAD has to record every sale exactly once, move stock with a full trail and keep each retailer's data apart.",
    architectureTitle: "Five pieces, one product",
    architectureText: "Three applications with separate identities over a shared API: a retailer's staff and the platform operator share neither sessions nor permissions.",
    decisionsTitle: "Engineering decisions",
    decisions: [
      { title: "The tenant travels with the request", detail: "The organisation is resolved on the way in and lives in an AsyncLocalStorage context until the response. Role permissions are checked inside that organisation. No layer relies on someone remembering to pass the organizationId." },
      { title: "Idempotent sales", detail: "Every sale leaves the till with its own key. If the network drops and the cashier retries, the server recognises the key and does not record the sale twice. The demo on the home page simulates that flow." },
      { title: "Cashier, terminal and shift", detail: "The till works by cashier, terminal and shift, and locks itself on an unpaired device." },
      { title: "Stock is a ledger", detail: "No operation overwrites a quantity. Every receipt, issue, purchase receipt or transfer between shops and warehouses is a movement that stores the stock before and after." },
      { title: "CUP as the base currency", detail: "The books are kept in CUP and shown in USD or other currencies. The rate is synced by a scheduled BullMQ job on Redis." },
      { title: "Every change leaves a trail", detail: "An audit log with the old and new value, and reports in CSV, XLSX and PDF." },
      { title: "Delivery", detail: "A Turborepo monorepo, deployed on Railway and Vercel." },
    ],
    limitations: "A beta in production with its first customer. The code is private: here I show decisions and screenshots from a test tenant, never customer data.",
    cta: "Visit getkwad.com",
    shotAlt: "Items of a received purchase in KWAD: product, unit, quantity, cost and total in dollars, each with its amount recorded in CUP",
    sample: "Sample data.",
    gallery: [
      { shot: "terminal", alt: "KWAD point of sale on an unpaired device: it asks for the pairing code from the admin panel before it will operate", caption: "The till refuses to take payments on an unpaired device. Sample data." },
      { shot: "ledger", alt: "KWAD inventory movements with stock before and after", caption: "Sample data." },
      { shot: "currency", alt: "KWAD catalogue with USD price and CUP base", caption: "Sample data." },
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
              {copy.back}
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
          <Shot id="reception" alt={copy.shotAlt} priority />
          <figcaption className="caption">{copy.sample}</figcaption>
        </figure>

        <section className="frame grid case-section" aria-labelledby="challenge-heading">
          <h2 id="challenge-heading" className="heading case-side" data-reveal>{copy.overviewTitle}</h2>
          <p className="case-main lead" data-reveal>{copy.overview}</p>
        </section>

        <ul className="frame grid case-gallery">
          {copy.gallery.map((item) => (
            <li key={item.shot} className="case-gallery-item" data-reveal>
              <figure>
                <Shot id={item.shot} alt={item.alt} />
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
                <li key={purpose.es} className="app-row">
                  <p className="itinerary-row">
                    <span className="app-name">{typeof name === "string" ? name : name[locale]}</span>
                    <span className="leader" aria-hidden="true" />
                    <span>{stack}</span>
                  </p>
                  <p className="app-purpose">{purpose[locale]}</p>
                </li>
              ))}
            </ul>
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

        <section className="frame grid case-section case-close">
          <div className="case-main">
            <p className="lead">{copy.limitations}</p>
            <a className="button case-cta" href={siteConfig.kwadUrl} target="_blank" rel="noopener noreferrer">
              {copy.cta}
            </a>
          </div>
        </section>
      </article>
    </PageMotion>
  );
};
