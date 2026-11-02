"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const steps = [
  { id: "arrive", tech: "HTTP" },
  { id: "resolve", tech: "Fastify" },
  { id: "context", tech: "AsyncLocalStorage" },
  { id: "rbac", tech: "RBAC" },
  { id: "data", tech: "Prisma · PostgreSQL" },
  { id: "response", tech: "200 OK" },
] as const;

type Org = "a" | "b";

// A simplified sketch of each step, not KWAD's code; the page says so under the diagram.
const code = (step: (typeof steps)[number]["id"], org: Org) => {
  const id = `"org_${org}"`;
  switch (step) {
    case "arrive":
      return "GET /api/inventory/movements";
    case "resolve":
      return `organizationId = ${id}`;
    case "context":
      return `tenant.run({ organizationId: ${id} }, handler)`;
    case "rbac":
      return `can(role, "inventory:read", ${id})`;
    case "data":
      return `where: { organizationId: ${id} }`;
    case "response":
      return "200 OK";
  }
};

/**
 * How a request travels through the API with its organisation: pick where it comes
 * from and send it, or walk the steps one by one. Each step shows what happens and
 * a sketch of it; the last one, the rows that come back, only from that organisation.
 */
export function RequestDiagram() {
  const t = useTranslations("Kwad.architecture.diagram");
  const [org, setOrg] = useState<Org>("a");
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const timer = useRef<gsap.core.Tween | null>(null);

  // The autoplay's pending step dies with the component.
  useEffect(() => () => void timer.current?.kill(), []);

  // The packet: the organisation's tag, moving along the track to the active step.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.to(".diagram-fill", {
        scaleY: active / (steps.length - 1),
        duration: reduce ? 0 : 0.5,
        ease: "power2.inOut",
      });
      gsap.fromTo(
        ".diagram-detail",
        { autoAlpha: reduce ? 1 : 0, y: reduce ? 0 : 8 },
        { autoAlpha: 1, y: 0, duration: reduce ? 0 : 0.35, ease: "power2.out" },
      );
    },
    { scope: root, dependencies: [active, org] },
  );

  const stop = () => {
    timer.current?.kill();
    timer.current = null;
    setPlaying(false);
  };

  const play = () => {
    stop();
    setActive(0);
    setPlaying(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const advance = (index: number) => {
      if (index >= steps.length) {
        setPlaying(false);
        return;
      }
      setActive(index);
      timer.current = gsap.delayedCall(reduce ? 0.9 : 1.1, () => advance(index + 1));
    };
    timer.current = gsap.delayedCall(0.4, () => advance(1));
  };

  const choose = (next: Org) => {
    stop();
    setOrg(next);
    setActive(0);
  };

  const step = steps[active];
  const rows = t.raw(`sample.${org}`) as { product: string; quantity: string; stock: string }[];
  const orgName = org === "a" ? t("orgA") : t("orgB");

  return (
    <div ref={root} className="overflow-hidden rounded-[16px] border border-line bg-surface shadow-soft" data-ui role="group" aria-label={t("label")}>
      <div className="flex flex-col gap-4 border-b border-line p-5 md:flex-row md:items-center md:justify-between md:px-6" /* taste-skill-ignore: interface fragment (data-ui), its own 1px lines */>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[16px] text-muted" id="diagram-org">
            {t("orgLabel")}
          </span>
          <div className="flex gap-1 rounded-[12px] border border-line p-1" role="group" aria-labelledby="diagram-org">
            {(["a", "b"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={org === item}
                onClick={() => choose(item)}
                className="min-h-10 rounded-[8px] px-3 text-[16px] font-medium text-muted transition-colors hover:text-ink aria-pressed:bg-accent-soft aria-pressed:text-ink"
              >
                {item === "a" ? t("orgA") : t("orgB")}
              </button>
            ))}
          </div>
        </div>
        <button type="button" className="button button-primary self-start md:self-auto" onClick={play} disabled={playing}>
          {active === steps.length - 1 ? t("again") : t("send")}
        </button>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="relative p-5 md:p-6">
          {/* The track: a line behind the steps that fills up to the active one. */}
          <span aria-hidden="true" className="absolute top-[50px] bottom-[50px] left-[34.5px] w-px bg-line md:top-[54px] md:bottom-[54px] md:left-[38.5px]" /* taste-skill-ignore: interface fragment (data-ui) */ />
          <span
            aria-hidden="true"
            className="diagram-fill absolute top-[50px] bottom-[50px] left-[34.5px] w-px origin-top scale-y-0 bg-accent md:top-[54px] md:bottom-[54px] md:left-[38.5px]" /* taste-skill-ignore: interface fragment (data-ui) */
          />
          <ol className="relative flex flex-col gap-1" aria-label={t("stepsLabel")}>
            {steps.map((item, index) => {
              const state = index < active ? "done" : index === active ? "active" : "idle";
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-current={state === "active" ? "step" : undefined}
                    onClick={() => {
                      stop();
                      setActive(index);
                    }}
                    className="group flex w-full items-center gap-4 rounded-[10px] px-2 py-2.5 text-left transition-colors hover:bg-accent-soft/50 aria-[current=step]:bg-accent-soft"
                  >
                    <span
                      aria-hidden="true"
                      data-state={state}
                      className="relative z-10 size-3.5 shrink-0 rounded-full border-2 border-line bg-surface transition-colors data-[state=active]:border-accent data-[state=active]:bg-accent data-[state=done]:border-accent"
                    />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[16px] leading-snug font-semibold">{t(`steps.${item.id}.title`)}</span>
                      <span className="font-data text-[13px] text-muted">{item.tech}</span>
                    </span>
                    {state !== "idle" ? (
                      <span className="hidden shrink-0 rounded-full bg-accent px-2 py-0.5 font-data text-[13px] text-on-accent sm:inline">
                        org_{org}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="diagram-detail flex flex-col gap-4 border-t border-line p-5 md:p-6 lg:border-t-0 lg:border-l" /* taste-skill-ignore: interface fragment (data-ui), its own 1px lines */>
          <p className="font-data text-[13px] text-muted">
            {active + 1} / {steps.length} · {step.tech}
          </p>
          <h3 className="text-[24px] leading-tight font-[600] tracking-[-0.03em]">{t(`steps.${step.id}.title`)}</h3>
          <p className="text-[16px] leading-[1.55]">{t(`steps.${step.id}.detail`)}</p>
          <pre className="overflow-x-auto rounded-[10px] border border-line bg-bg px-4 py-3 font-data text-[13px] leading-relaxed">
            <code>{code(step.id, org)}</code>
          </pre>
          {step.id === "response" ? (
            <table className="w-full border-collapse text-left text-[16px]">
              <caption className="pb-2 text-left text-[16px] text-muted">
                {t("rows")} · {orgName}
              </caption>
              <thead>
                <tr className="border-b border-line font-data text-[13px] text-muted" /* taste-skill-ignore: interface fragment (data-ui) */>
                  <th scope="col" className="py-2 pr-3 font-normal">{t("sample.columns.product")}</th>
                  <th scope="col" className="py-2 pr-3 font-normal">{t("sample.columns.quantity")}</th>
                  <th scope="col" className="py-2 font-normal">{t("sample.columns.stock")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.product} className="border-b border-line last:border-b-0" /* taste-skill-ignore: interface fragment (data-ui) */>
                    <td className="py-2 pr-3">{row.product}</td>
                    <td className="py-2 pr-3 font-data text-[13px]">{row.quantity}</td>
                    <td className="py-2 font-data text-[13px]">{row.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          <p className="mt-auto pt-2 text-[16px] text-muted">{t("note")}</p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {orgName} · {t("status", { step: active + 1, total: steps.length, title: t(`steps.${step.id}.title`) })}
      </p>
    </div>
  );
}
