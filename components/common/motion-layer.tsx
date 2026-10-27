"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { MODULE_ENTER_EVENT } from "@/lib/events";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * The page's motion layer: headlines rise line by line, section parts rise in as
 * they enter, the roll's years turn over digit by digit. Content is only hidden once
 * this script runs, and nothing moves when the visitor prefers reduced motion.
 * It also tells the KWAD module index which row crosses the middle of the screen.
 */
export default function MotionLayer({ scope }: { scope: React.RefObject<HTMLDivElement | null> }) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Chapter headings rise line by line out of a mask, once, as they enter.
        // The text is server-rendered and only wrapped here, so nothing shifts.
        // The hero stays static: splitting it pushed the mobile LCP past 2.5 s.
        for (const element of gsap.utils.toArray<HTMLElement>("[data-split]")) {
          SplitText.create(element, {
            type: "lines,words",
            mask: "lines",
            autoSplit: true,
            aria: "auto",
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 105,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.07,
                scrollTrigger: { trigger: element, start: "top 96%", once: true },
              }),
          });
        }

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

        // Each year in the roll's margin turns over, digit by digit, as its copies arrive.
        for (const year of gsap.utils.toArray<HTMLElement>("[data-roll-year]")) {
          SplitText.create(year, {
            type: "chars",
            mask: "chars",
            aria: "none",
            onSplit: (self) =>
              gsap.from(self.chars, {
                yPercent: 100,
                duration: 0.55,
                ease: "power3.out",
                stagger: 0.06,
                scrollTrigger: { trigger: year.parentElement, start: "top 75%", once: true },
              }),
          });
        }
      });

      // The KWAD module frame follows the scroll on desktop: the row crossing the middle
      // of the screen becomes the active one. This is state, not motion, so it runs
      // with reduced motion too.
      mm.add("(min-width: 901px)", () => {
        for (const row of gsap.utils.toArray<HTMLElement>(".module-row")) {
          ScrollTrigger.create({
            trigger: row,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => {
              if (self.isActive) row.dispatchEvent(new Event(MODULE_ENTER_EVENT, { bubbles: true }));
            },
          });
        }
      });

      // The paper leans towards the pointer, only with a precise pointer that can hover.
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const printer = document.querySelector<HTMLElement>(".printer");
        const paper = printer?.querySelector<HTMLElement>(".ticket");
        if (!printer || !paper) return;

        const tiltX = gsap.quickTo(paper, "rotationX", { duration: 0.6, ease: "power3.out" });
        const tiltY = gsap.quickTo(paper, "rotationY", { duration: 0.6, ease: "power3.out" });

        const onMove = (event: PointerEvent) => {
          const box = printer.getBoundingClientRect();
          const x = (event.clientX - box.left) / box.width - 0.5;
          const y = (event.clientY - box.top) / box.height - 0.5;
          tiltY(x * 7);
          tiltX(-y * 5);
        };
        const onLeave = () => {
          tiltX(0);
          tiltY(0);
        };

        printer.addEventListener("pointermove", onMove);
        printer.addEventListener("pointerleave", onLeave);
        return () => {
          printer.removeEventListener("pointermove", onMove);
          printer.removeEventListener("pointerleave", onLeave);
          gsap.set(paper, { clearProps: "transform" });
        };
      });
    },
    { scope },
  );

  return null;
}
