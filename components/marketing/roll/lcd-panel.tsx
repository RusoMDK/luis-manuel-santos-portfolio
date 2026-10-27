"use client";

import { useLocale, useTranslations } from "next-intl";
import { LcdScreen } from "./lcd-screen";

// Readings from the photographs of the prototype (June 2024).
export const THESIS_READINGS = { moisture: 79, temp: 25.6, heat: 27.06 } as const;
// The pump started when soil moisture fell below about 30 %; the simulation uses 30.
export const PUMP_THRESHOLD = 30;

export type LcdState = {
  moisture: number;
  temp: number;
  heat: number;
  pump: boolean;
  /** Which of the three idle screens is showing. */
  screen: 0 | 1 | 2;
  /** drying → dry (a pause on "Planta: Seca") → watering (pump on) → idle. */
  phase: "idle" | "drying" | "dry" | "watering";
  /** Ticks left before the next step of the cycle. */
  hold: number;
};

export const initialLcdState: LcdState = { ...THESIS_READINGS, pump: false, screen: 0, phase: "idle", hold: 0 };

/** The two lines the prototype printed, in its own words and without accents. */
export function lcdLines(state: LcdState): [string, string] {
  if (state.phase === "watering") return ["Bomba: ON", `Humedad: ${state.moisture}%`];
  if (state.phase !== "idle" || state.screen === 0) {
    return [`Planta: ${state.moisture < PUMP_THRESHOLD ? "Seca" : "Humeda"}`, `Humedad: ${state.moisture}%`];
  }
  if (state.screen === 1) return [`Temp: ${state.temp.toFixed(2)}°C`, `IC: ${state.heat.toFixed(2)}°C`];
  return [`Bomba: ${state.pump ? "ON" : "OFF"}`, ""];
}

type LcdPanelProps = {
  state: LcdState;
  onDry?: () => void;
};

/** The replica and its control. Without `onDry` (before the script loads) the button waits. */
export function LcdPanel({ state, onDry }: LcdPanelProps) {
  const t = useTranslations("Roll.lcd");
  const locale = useLocale();
  const number = (value: number) =>
    value.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const reading = t("aria", {
    state: state.moisture < PUMP_THRESHOLD ? t("dry") : t("wet"),
    moisture: state.moisture,
    temp: number(state.temp),
    heat: number(state.heat),
    pump: state.pump ? t("on") : t("off"),
  });

  return (
    <div className="lcd-panel" role="group" aria-label={t("label")}>
      <div className="lcd" data-ui role="img" aria-label={reading}>
        <LcdScreen lines={lcdLines(state)} />
      </div>
      <div className="lcd-controls">
        <button
          type="button"
          className="lcd-dry"
          onClick={onDry}
          disabled={!onDry || state.phase !== "idle"}
        >
          {t("dryButton")}
        </button>
        <p className="lcd-relay" data-on={state.pump} aria-live="polite">
          <span className="lcd-relay-led" aria-hidden="true" />
          {state.pump ? t("relayClosed") : t("relayOpen")}
        </p>
      </div>
      <p className="lcd-note">
        {t("threshold")} · {t("note")}
      </p>
    </div>
  );
}
