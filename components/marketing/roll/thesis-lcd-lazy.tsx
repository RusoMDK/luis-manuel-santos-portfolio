"use client";

import dynamic from "next/dynamic";
import { initialLcdState, LcdPanel } from "./lcd-panel";

// The simulation loads after the page, away from the first screen; until then (and
// without script) the replica shows the prototype's first reading, still.
export const ThesisLcdLazy = dynamic(() => import("./thesis-lcd"), {
  ssr: false,
  loading: () => <LcdPanel state={initialLcdState} />,
});
