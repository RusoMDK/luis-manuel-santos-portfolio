"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The scroll entrances: every [data-reveal] rises 24 px and fades in as it enters,
 * staggered with the ones that enter with it, once. Content is only hidden once
 * this script runs, and nothing moves with reduced motion. It runs again on every
 * page, since the layout that holds it persists across navigations.
 */
export default function MotionLayer() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        // What is already on screen when the page opens stays put.
        const below = items.filter((item) => item.getBoundingClientRect().top > window.innerHeight * 0.92);
        // Opacity, not visibility: hidden headings would drop out of the accessibility tree.
        gsap.set(below, { opacity: 0, y: 24 });
        ScrollTrigger.batch(below, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: true,
            }),
        });
      });
    },
    // The whole document: header, page and footer all carry [data-reveal].
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
