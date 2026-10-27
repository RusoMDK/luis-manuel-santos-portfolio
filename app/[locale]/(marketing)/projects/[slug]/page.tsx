import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { projects } from "@/config/site";
import { PageMotion } from "@/components/common/page-motion";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const caseStudyContent = {
  en: {
    back: "Back to the portfolio",
    title: "PlataformaIoT",
    summary:
      "A personal full stack project to register IoT devices, ingest their readings in real time and display them in configurable dashboards.",
    challengeTitle: "The challenge",
    challenge:
      "Take device data from the sensor to the screen in real time: provisioning devices, receiving readings reliably, storing them and showing them live, without coupling the dashboard to the ingestion path.",
    architectureTitle: "Architecture and approach",
    architecture:
      "A React + Vite + Tailwind frontend and a Node.js + Express backend. Devices publish over MQTT; a worker persists readings to MongoDB and the backend pushes updates to the dashboard over Socket.IO, with separate namespaces for agents and the panel.",
    highlightsTitle: "Key implementation highlights",
    highlights: [
      "MQTT ingestion through a worker that persists readings to MongoDB.",
      "Live dashboard updates over Socket.IO, with draggable, resizable widgets and time-series charts.",
      "Device provisioning (claim, registration, heartbeat) and downloadable Arduino sketch generation.",
      "Security: cookie-based JWT, CSRF protection, TOTP 2FA, roles and input validation with Zod and AJV.",
    ],
    outcomeTitle: "Outcome",
    outcome:
      "A working end-to-end real-time pipeline, from device to dashboard, with rule-based alerts, exports to Excel, PDF and CSV, and an API documented with Swagger.",
    repoCta: "Open repository",
  },
  es: {
    back: "Volver al portfolio",
    title: "PlataformaIoT",
    summary:
      "Proyecto personal full stack para registrar dispositivos IoT, recibir sus lecturas en tiempo real y visualizarlas en dashboards configurables.",
    challengeTitle: "El reto",
    challenge:
      "Llevar los datos del sensor a la pantalla en tiempo real: dar de alta dispositivos, recibir lecturas de forma fiable, guardarlas y mostrarlas en vivo, sin acoplar el dashboard a la ingesta.",
    architectureTitle: "Arquitectura y enfoque",
    architecture:
      "Frontend en React + Vite + Tailwind y backend en Node.js + Express. Los dispositivos publican por MQTT; un worker persiste las lecturas en MongoDB y el backend envía las actualizaciones al dashboard por Socket.IO, con namespaces separados para agentes y panel.",
    highlightsTitle: "Puntos clave de implementación",
    highlights: [
      "Ingesta por MQTT con un worker que persiste las lecturas en MongoDB.",
      "Dashboard en vivo por Socket.IO, con widgets que se arrastran y redimensionan y gráficas de series temporales.",
      "Aprovisionamiento de dispositivos (claim, registro, heartbeat) y generación de sketches de Arduino descargables.",
      "Seguridad: JWT en cookies, protección CSRF, 2FA con TOTP, roles y validación de entrada con Zod y AJV.",
    ],
    outcomeTitle: "Resultado",
    outcome:
      "Un flujo en tiempo real completo, del dispositivo al dashboard, con alertas por reglas, exportación a Excel, PDF y CSV y una API documentada con Swagger.",
    repoCta: "Abrir repositorio",
  },
} as const;

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;

  if (slug !== "iot-platform") {
    notFound();
  }

  const project = projects.find(
    (item) => "caseStudySlug" in item && item.caseStudySlug === slug,
  );

  if (!project || !("repoHref" in project)) {
    notFound();
  }

  const content = locale === "es" ? caseStudyContent.es : caseStudyContent.en;

  return (
    <PageMotion>
      <article className="case field-walnut">
        <header className="frame grid case-head">
          <p className="case-back">
            <Link className="text-link" href="/#trabajo" transitionTypes={["case-study"]}>
              ← {content.back}
            </Link>
          </p>
          <h1 className="display case-title">{content.title}</h1>
          <div className="case-intro">
            <p className="lead">{content.summary}</p>
            <a className="button case-cta" href={project.repoHref} target="_blank" rel="noopener noreferrer">
              {content.repoCta}
            </a>
          </div>
        </header>

        <section className="frame grid case-section" aria-labelledby="challenge-heading">
          <h2 id="challenge-heading" className="heading case-side" data-reveal>
            {content.challengeTitle}
          </h2>
          <p className="case-main lead" data-reveal>{content.challenge}</p>
        </section>

        <section className="frame grid case-section" aria-labelledby="architecture-heading">
          <h2 id="architecture-heading" className="heading case-side" data-reveal>
            {content.architectureTitle}
          </h2>
          <p className="case-main lead" data-reveal>{content.architecture}</p>
        </section>

        <section className="frame grid case-section" aria-labelledby="highlights-heading">
          <h2 id="highlights-heading" className="heading case-side" data-reveal>
            {content.highlightsTitle}
          </h2>
          <ul className="case-main decisions" data-reveal>
            {content.highlights.map((item) => (
              <li key={item}>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="frame grid case-section case-close" aria-labelledby="outcome-heading">
          <h2 id="outcome-heading" className="heading case-side" data-reveal>
            {content.outcomeTitle}
          </h2>
          <p className="case-main lead" data-reveal>{content.outcome}</p>
        </section>
      </article>
    </PageMotion>
  );
}
