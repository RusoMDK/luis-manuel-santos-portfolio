"use client";

import { useLocale, useTranslations } from "next-intl";
import { siteConfig, ticketStack } from "@/config/site";
import { useVisit } from "@/lib/visit";
import { Barcode } from "./barcode";

export function HeroTicket() {
  const t = useTranslations("Ticket");
  const locale = useLocale() === "es" ? "es" : "en";
  const visit = useVisit();
  const cvHref = siteConfig.cv[locale];
  const barcodeValue = `${siteConfig.url.replace("https://", "")}${siteConfig.cvShortPath[locale]}`;

  return (
    <div className="printer">
      <div className="printer-mouth">
        <article className="ticket" data-ui aria-label={t("label")}>
          <header className="ticket-center">
            <p className="ticket-strong">{t("header")}</p>
            <p>
              {t("register")} · <span>{visit.date}</span> ·{" "}
              <span>{visit.time}</span>
            </p>
          </header>
          <p className="ticket-cut" aria-hidden="true" />
          <p className="ticket-row ticket-big">
            <span>{t("item")}</span>
            <span>{t("qty")}</span>
          </p>
          <p>{t("role")}</p>
          <p className="ticket-cut" aria-hidden="true" />
          <ul className="ticket-lines">
            {ticketStack.map((line) => (
              <li key={line} className="ticket-row">
                <span>{line}</span>
                <span>{t("included")}</span>
              </li>
            ))}
          </ul>
          <p className="ticket-cut" aria-hidden="true" />
          <p className="ticket-row ticket-big">
            <span>{t("total")}</span>
            <span>{t("totalValue")}</span>
          </p>
          <p>{t("totalNote")}</p>
          <p className="ticket-cut" aria-hidden="true" />
          <a className="ticket-barcode" href={cvHref} target="_blank" rel="noopener" aria-label={t("barcodeAria")}>
            <Barcode value={barcodeValue} className="ticket-bars" />
            <span className="ticket-center">{t("barcodeLabel")}</span>
          </a>
          <p className="ticket-center">
            <a className="ticket-key" href="#habana" aria-label={t("keyAria")}>
              {t("key")} <span>{visit.key}</span>
            </a>{" "}
            · {t("thanks")}
          </p>
        </article>
      </div>
    </div>
  );
}
