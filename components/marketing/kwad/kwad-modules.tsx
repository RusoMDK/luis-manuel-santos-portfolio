"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { MODULE_ENTER_EVENT } from "@/lib/events";
import { Shot, type KwadShotId } from "./shot";

const modules = [
  { id: "pos", shot: "terminal" },
  { id: "inventory", shot: "ledger" },
  { id: "currency", shot: "currency" },
  { id: "console", shot: null },
] as const satisfies readonly { id: string; shot: KwadShotId | null }[];

type ModuleId = (typeof modules)[number]["id"];

function ConsoleFragment() {
  const t = useTranslations("Kwad.console");
  return (
    <div className="console" data-ui>
      <p className="console-title">{t("title")}</p>
      <table>
        <thead>
          <tr>
            <th scope="col">{t("org")}</th>
            <th scope="col">{t("plan")}</th>
            <th scope="col">{t("stores")}</th>
            <th scope="col">{t("status")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t("demoOrg")}</td>
            <td>{t("demoPlan")}</td>
            <td>1</td>
            <td>{t("active")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/**
 * The module index with a fixed 16:10 frame beside it. The active module follows
 * clicks, focus and, on desktop, the row crossing the middle of the screen; never
 * the pointer, so rows passing under a still cursor change nothing.
 */
export function KwadModules({ tail }: { tail?: ReactNode }) {
  const t = useTranslations("Kwad");
  const [active, setActive] = useState<ModuleId>("pos");
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const onEnter = (event: Event) => {
      const id = (event.target as HTMLElement).dataset.module as ModuleId | undefined;
      if (id) setActive(id);
    };
    element.addEventListener(MODULE_ENTER_EVENT, onEnter);
    return () => element.removeEventListener(MODULE_ENTER_EVENT, onEnter);
  }, []);

  const caption = (id: ModuleId) =>
    id === "pos" ? t("modules.pos.caption") : id === "console" ? t("modules.console.fragment") : t("sample");

  const picture = (module: (typeof modules)[number]): ReactNode =>
    module.shot ? <Shot id={module.shot} alt={t(`modules.${module.id}.alt`)} /> : <ConsoleFragment />;

  return (
    <div className="modules" ref={root}>
      <div className="module-column">
        <ul className="module-index" aria-label={t("modulesLabel")}>
          {modules.map((module) => (
            <li key={module.id} className="module-row" data-module={module.id} data-active={active === module.id}>
              <button
                type="button"
                className="module-button"
                aria-pressed={active === module.id}
                onFocus={() => setActive(module.id)}
                onClick={() => setActive(module.id)}
              >
                <span className="module-title">{t(`modules.${module.id}.title`)}</span>
                <span className="module-text">{t(`modules.${module.id}.text`)}</span>
              </button>
              <figure className="module-inline">
                {picture(module)}
                <figcaption className="caption">{caption(module.id)}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        {tail}
      </div>
      <div className="module-frame" aria-hidden="true">
        <div className="module-paper">
          {modules.map((module) => (
            <div key={module.id} className="module-slide" data-active={active === module.id}>
              {picture(module)}
            </div>
          ))}
        </div>
        <p className="caption module-caption">
          <span className="module-caption-title">{t(`modules.${active}.title`)}</span> · {caption(active)}
        </p>
      </div>
    </div>
  );
}
