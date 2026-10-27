import { useSyncExternalStore } from "react";

export type Visit = {
  date: string;
  time: string;
  key: string;
};

// What the server renders and what the first client render hydrates against.
// The real values replace it right after hydration, so the markup always matches.
export const SERVER_VISIT: Visit = { date: "--/--/----", time: "--:--", key: "7f3a-c21e" };

let visit: Visit | null = null;

export function randomKey(): string {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 4)}-${hex.slice(4)}`;
}

const pad = (value: number) => String(value).padStart(2, "0");

function getVisit(): Visit {
  if (!visit) {
    const now = new Date();
    visit = {
      date: `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`,
      time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
      key: randomKey(),
    };
  }
  return visit;
}

const subscribe = () => () => {};

/** The time of this visit and its key, generated once on the client. */
export function useVisit(): Visit {
  return useSyncExternalStore(subscribe, getVisit, () => SERVER_VISIT);
}
