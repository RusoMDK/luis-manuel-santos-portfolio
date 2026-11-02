"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// The WebGL code is its own chunk, fetched only after the page has loaded and the
// main thread is idle, so it never competes with the headline (the LCP).
const GlyphField = dynamic(() => import("./glyph-field"), { ssr: false });

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function GlyphBackdrop() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const win = window as IdleWindow;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return;
    let idle = 0;
    let timer = 0;
    const schedule = () => {
      if (win.requestIdleCallback) idle = win.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      else timer = window.setTimeout(() => setReady(true), 200);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idle) win.cancelIdleCallback?.(idle);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[calc(-1*var(--header-h))] bottom-0 -z-10">
      {ready ? <GlyphField /> : null}
    </div>
  );
}
