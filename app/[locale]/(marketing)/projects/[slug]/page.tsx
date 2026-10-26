import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  RadioTower,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { projects } from "@/config/site";
import { Container } from "@/components/marketing/shared/container";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const caseStudyContent = {
  en: {
    eyebrow: "Case Study",
    back: "Back to projects",
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
    eyebrow: "Caso de estudio",
    back: "Volver a proyectos",
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

  if (!project) {
    notFound();
  }

  const content = locale === "es" ? caseStudyContent.es : caseStudyContent.en;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="space-y-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/65 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {content.back}
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100">
                {content.eyebrow}
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                {content.title}
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-white/65">
                {content.summary}
              </p>

              <a
                href={project.repoHref}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white",
                )}
              >
                {content.repoCta}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.25)]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-white/10">
                <Image
                  src={project.image}
                  alt={content.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                  <RadioTower className="h-5 w-5 text-cyan-300" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {content.challengeTitle}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/65">
                {content.challenge}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                  <Workflow className="h-5 w-5 text-cyan-300" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {content.architectureTitle}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/65">
                {content.architecture}
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                  <ShieldCheck className="h-5 w-5 text-cyan-300" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {content.outcomeTitle}
                </h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/65">
                {content.outcome}
              </p>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white">
              {content.highlightsTitle}
            </h2>

            <div className="mt-6 grid gap-4">
              {content.highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm leading-7 text-white/70"
                >
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
