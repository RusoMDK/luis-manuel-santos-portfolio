"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";

const modules = [
  { id: "pos", src: "/images/kwad/crop/terminal-bloqueada.jpg", width: 566, height: 520 },
  { id: "inventory", src: "/images/kwad/crop/movimientos.jpg", width: 1280, height: 300 },
  { id: "currency", src: "/images/kwad/crop/multimoneda.jpg", width: 860, height: 217 },
  { id: "store", src: "/images/kwad/crop/tienda-online.jpg", width: 1280, height: 420 },
  { id: "console", src: null, width: 0, height: 0 },
] as const;

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
    if (!module.src) {
      return (
        <figure className="module-figure">
          <ConsoleFragment />
          <figcaption className="caption">{t("modules.console.fragment")}</figcaption>
        </figure>
      );
    }
    return (
      <figure className="module-figure">
        <div className="shot">
          <Image
            src={module.src}
            width={module.width}
            height={module.height}
            alt={t(`modules.${module.id}.alt`)}
            sizes={sizes}
          />
        </div>
        <figcaption className="caption">{t("sample")}</figcaption>
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
