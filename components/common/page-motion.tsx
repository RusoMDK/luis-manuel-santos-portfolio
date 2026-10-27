"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

// GSAP and its plugins load after hydration, so they never sit in front of the
// first paint; everything they animate starts below the fold.
const MotionLayer = dynamic(() => import("./motion-layer"), { ssr: false });

export function PageMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  return (
    <div ref={scope}>
      {children}
      <MotionLayer scope={scope} />
    </div>
  );
}
