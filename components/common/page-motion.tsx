"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The page's motion layer: section parts rise in as they enter, found photographs
 * drift with the scroll. Content is only hidden once this script runs, and nothing
 * moves when the visitor prefers reduced motion.
 */
export function PageMotion({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        gsap.set(items, { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: true,
            }),
        });

        for (const image of gsap.utils.toArray<HTMLElement>("[data-drift]")) {
          gsap.fromTo(
            image,
            { scale: 1.12, yPercent: -4 },
            {
              scale: 1,
              yPercent: 4,
              ease: "none",
              scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }

        for (const folder of gsap.utils.toArray<HTMLElement>(".folder")) {
          gsap.from(folder.querySelectorAll(".folder-tab, .folder-meta, .folder-stack, .folder-text"), {
            y: 24,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.07,
            scrollTrigger: { trigger: folder, start: "top 80%", once: true },
          });
        }
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
