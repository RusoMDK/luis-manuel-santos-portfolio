"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * The page's motion layer: headlines rise line by line, section parts rise in as
 * they enter, found photographs drift with the scroll. Content is only hidden once
 * this script runs, and nothing moves when the visitor prefers reduced motion.
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
