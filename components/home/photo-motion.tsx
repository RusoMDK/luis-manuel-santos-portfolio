"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type PhotoMotionProps = {
  card: React.RefObject<HTMLElement | null>;
  photo: React.RefObject<HTMLDivElement | null>;
};

/** A project's photograph follows the mouse over its card (see ProjectCard). */
export default function PhotoMotion({ card, photo }: PhotoMotionProps) {
  useGSAP(
    (_, contextSafe) => {
      const element = card.current;
      const picture = photo.current;
      if (!element || !picture || !contextSafe) return;
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine)", () => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        gsap.set(picture, { autoAlpha: 0, scale: reduce ? 1 : 0.92, xPercent: -50, yPercent: -110 });
        const x = gsap.quickTo(picture, "x", { duration: reduce ? 0 : 0.45, ease: "power3.out" });
        const y = gsap.quickTo(picture, "y", { duration: reduce ? 0 : 0.45, ease: "power3.out" });
        const place = (event: PointerEvent) => {
          const box = element.getBoundingClientRect();
          x(event.clientX - box.left);
          y(event.clientY - box.top);
        };
        const enter = contextSafe((event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const box = element.getBoundingClientRect();
          gsap.set(picture, { x: event.clientX - box.left, y: event.clientY - box.top });
          gsap.to(picture, { autoAlpha: 1, scale: 1, duration: reduce ? 0 : 0.35, ease: "power3.out", overwrite: "auto" });
        });
        const leave = contextSafe(() => {
          gsap.to(picture, { autoAlpha: 0, scale: reduce ? 1 : 0.92, duration: reduce ? 0 : 0.25, ease: "power2.in", overwrite: "auto" });
        });
        element.addEventListener("pointerenter", enter);
        element.addEventListener("pointermove", place);
        element.addEventListener("pointerleave", leave);
        return () => {
          element.removeEventListener("pointerenter", enter);
          element.removeEventListener("pointermove", place);
          element.removeEventListener("pointerleave", leave);
        };
      });
    },
    { scope: card },
  );


  return null;
}
