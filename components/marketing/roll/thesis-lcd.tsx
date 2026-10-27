"use client";

import { useEffect, useReducer, useRef, useSyncExternalStore } from "react";
import { initialLcdState, LcdPanel, PUMP_THRESHOLD, THESIS_READINGS, type LcdState } from "./lcd-panel";

type Action =
  | { type: "rotate"; drift: [number, number] }
  | { type: "dry"; instant: boolean }
  | { type: "tick" }
  | { type: "jump" };

const STEP = 3;

// Up to ±0.10 °C between screens, as live sensors read.
const drift = () => Math.round((Math.random() - 0.5) * 20) / 100;

function reducer(state: LcdState, action: Action): LcdState {
  switch (action.type) {
    case "rotate": {
      if (state.phase !== "idle") return state;
      const temp = THESIS_READINGS.temp + action.drift[0];
      const heat = THESIS_READINGS.heat + action.drift[1];
      return { ...state, temp, heat, screen: ((state.screen + 1) % 3) as LcdState["screen"] };
    }
    case "dry":
      if (state.phase !== "idle") return state;
      return action.instant
        ? { ...state, moisture: PUMP_THRESHOLD - 2, phase: "dry", screen: 0, hold: 0 }
        : { ...state, phase: "drying", screen: 0 };
    case "tick": {
      if (state.hold > 0) return { ...state, hold: state.hold - 1 };
      if (state.phase === "drying") {
        const moisture = state.moisture - STEP;
        // Below the threshold the plant reads dry for a moment before the relay clicks.
        return moisture < PUMP_THRESHOLD ? { ...state, moisture, phase: "dry", hold: 7 } : { ...state, moisture };
      }
      if (state.phase === "dry") return { ...state, pump: true, phase: "watering", hold: 4 };
      if (state.phase === "watering") {
        const moisture = Math.min(state.moisture + STEP, THESIS_READINGS.moisture);
        return moisture >= THESIS_READINGS.moisture
          ? { ...state, moisture, pump: false, phase: "idle", screen: 0 }
          : { ...state, moisture };
      }
      return state;
    }
    case "jump":
      // Reduced motion: the same three states, one step at a time, with no gradual change.
      if (state.phase === "dry") return { ...state, pump: true, phase: "watering" };
      if (state.phase === "watering") return { ...state, moisture: THESIS_READINGS.moisture, pump: false, phase: "idle" };
      return state;
  }
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (callback: () => void) => {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};

/** The thesis LCD, simulated: screens rotate while it is on screen; "dry" runs one watering cycle. */
export default function ThesisLcd() {
  const [state, dispatch] = useReducer(reducer, initialLcdState);
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(reducedMotionQuery).matches, () => true);
  const root = useRef<HTMLDivElement>(null);

  // Rotate the idle screens only while the display is visible and motion is welcome.
  useEffect(() => {
    if (reduced || !root.current) return;
    let timer: number | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) timer = window.setInterval(() => dispatch({ type: "rotate", drift: [drift(), drift()] }), 2600);
    });
    observer.observe(root.current);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [reduced]);

  // The watering cycle: moisture falls, the pump starts below the threshold, moisture recovers.
  const busy = state.phase !== "idle";
  useEffect(() => {
    if (!busy) return;
    const timer = reduced
      ? window.setInterval(() => dispatch({ type: "jump" }), 1500)
      : window.setInterval(() => dispatch({ type: "tick" }), 150);
    return () => window.clearInterval(timer);
  }, [busy, reduced]);

  return (
    <div ref={root}>
      <LcdPanel state={state} onDry={() => dispatch({ type: "dry", instant: reduced })} />
    </div>
  );
}
