"use client";

import dynamic from "next/dynamic";

// ScrollTrigger loads after hydration, so it never sits in front of the first paint;
// everything it animates starts below the fold. It renders nothing and sits beside
// <main> rather than around it, so the page's <ViewTransition> stays the outermost node.
export const PageMotion = dynamic(() => import("./motion-layer"), { ssr: false });
