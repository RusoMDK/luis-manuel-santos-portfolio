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
    title: "Enterprise IoT Platform",
    summary:
      "A premium real-time monitoring platform focused on live telemetry, device state handling, operator dashboards and scalable communication workflows.",
    challengeTitle: "The challenge",
    challenge:
      "The goal was to create a real-time IoT product experience that felt robust for operators and flexible for growth. The platform needed to handle telemetry streams, device connectivity state, dashboard usability and a clean architecture across frontend and backend.",
    architectureTitle: "Architecture and approach",
    architecture:
      "The solution combined a React + Vite + Tailwind frontend with a Node.js and Express backend. MQTT was used for device messaging and Socket.IO for real-time UI updates, enabling a responsive operator experience while keeping the system maintainable and extensible.",
    highlightsTitle: "Key implementation highlights",
    highlights: [
      "Live telemetry visualization with operator-focused dashboard patterns.",
      "MQTT integration for device messaging and shadow/state workflows.",
      "Socket.IO updates to reflect system activity in real time.",
      "Backend structure designed for maintainability and future scaling.",
    ],
    outcomeTitle: "Outcome",
    outcome:
      "The result was a solid full stack foundation for an enterprise-style IoT product: technically reliable, visually polished and designed with real usage in mind.",
    repoCta: "Open repository",
  },
  es: {
    eyebrow: "Caso de estudio",
    back: "Volver a proyectos",
    title: "Plataforma IoT Empresarial",
    summary:
      "Una plataforma premium de monitoreo en tiempo real enfocada en telemetría en vivo, manejo de estado de dispositivos, dashboards para operadores y flujos de comunicación escalables.",
    challengeTitle: "El reto",
    challenge:
      "El objetivo era crear una experiencia IoT en tiempo real que se sintiera robusta para operadores y flexible para crecer. La plataforma debía manejar flujos de telemetría, estado de conectividad, usabilidad del dashboard y una arquitectura limpia entre frontend y backend.",
    architectureTitle: "Arquitectura y enfoque",
    architecture:
      "La solución combinó un frontend en React + Vite + Tailwind con un backend en Node.js y Express. MQTT se usó para la mensajería con dispositivos y Socket.IO para las actualizaciones en tiempo real hacia la interfaz, logrando una experiencia reactiva y una base mantenible.",
    highlightsTitle: "Puntos clave de implementación",
    highlights: [
      "Visualización de telemetría en vivo con patrones de dashboard orientados a operadores.",
      "Integración MQTT para mensajería de dispositivos y flujos de shadow/state.",
      "Actualizaciones con Socket.IO para reflejar la actividad del sistema en tiempo real.",
      "Estructura backend pensada para mantenibilidad y crecimiento futuro.",
    ],
    outcomeTitle: "Resultado",
    outcome:
      "El resultado fue una base full stack sólida para un producto IoT de estilo empresarial: confiable técnicamente, visualmente pulido y diseñado pensando en uso real.",
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
