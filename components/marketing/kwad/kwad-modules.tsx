"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { hasPhoneCrop, Shot, type KwadShotId } from "./shot";

const modules = [
  { id: "pos", shot: "terminal" },
  { id: "inventory", shot: "ledger" },
  { id: "currency", shot: "currency" },
  { id: "store", shot: "store" },
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

export function KwadModules() {
  const t = useTranslations("Kwad");
  const [active, setActive] = useState<ModuleId>("pos");

  const picture = (module: (typeof modules)[number], sizes: string): ReactNode => {
    if (!module.shot) {
      return (
        <figure className="module-figure">
          <ConsoleFragment />
          <figcaption className="caption">{t("modules.console.fragment")}</figcaption>
        </figure>
      );
    }
    return (
      <figure className={hasPhoneCrop(module.shot) ? "module-figure" : "module-figure phone-hidden"}>
        <Shot id={module.shot} alt={t(`modules.${module.id}.alt`)} sizes={sizes} />
        <figcaption className="caption">
          {module.id === "pos" ? t("modules.pos.caption") : t("sample")}
        </figcaption>
      </figure>
    );
  };

  return (
    <div className="modules">
      <ul className="module-index" aria-label={t("modulesLabel")}>
        {modules.map((module) => (
          <li key={module.id} className="module-row" data-active={active === module.id}>
            <button
              type="button"
              className="module-button"
              aria-pressed={active === module.id}
              onPointerEnter={() => setActive(module.id)}
              onFocus={() => setActive(module.id)}
              onClick={() => setActive(module.id)}
            >
              <span className="module-title">{t(`modules.${module.id}.title`)}</span>
              <span className="module-text">{t(`modules.${module.id}.text`)}</span>
            </button>
            <div className="module-inline">{picture(module, "100vw")}</div>
          </li>
        ))}
      </ul>
      <div className="module-frame" aria-hidden="true">
        {modules.map((module) => (
          <div key={module.id} className="module-slide" data-active={active === module.id}>
            {picture(module, "(max-width: 900px) 100vw, 52vw")}
          </div>
        ))}
      </div>
    </div>
  );
}
