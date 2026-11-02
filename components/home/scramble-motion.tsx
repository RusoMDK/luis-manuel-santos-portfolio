"use client";

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";
import { GLYPHS } from "@/lib/glyphs";

gsap.registerPlugin(ScrambleTextPlugin, useGSAP);

const decode = (target: Element, text: string) =>
  gsap.to(target, {
    duration: 0.8,
    ease: "none",
    scrambleText: { text, chars: GLYPHS, speed: 0.7, revealDelay: 0.05, tweenLength: false },
  });

/** The headline's decoding (see ScrambleTitle): once on arrival, again under a mouse. */
export default function ScrambleMotion({ root, text }: { root: React.RefObject<HTMLHeadingElement | null>; text: string }) {
  useGSAP(
    (_, contextSafe) => {
      const heading = root.current;
      const box = heading?.querySelector<HTMLElement>(".scramble");
      const layer = heading?.querySelector<HTMLElement>(".scramble-layer");
      if (!heading || !box || !layer || !contextSafe) return;
      // From here the script owns the layer; the CSS fallback stands down.
      box.dataset.live = "";

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        decode(layer, text);
        const replay = contextSafe((event: PointerEvent) => {
          if (event.pointerType === "mouse" && !gsap.isTweening(layer)) decode(layer, text);
        });
        heading.addEventListener("pointerenter", replay);
        return () => heading.removeEventListener("pointerenter", replay);
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        layer.textContent = text;
      });
    },
    { scope: root },
  );

  return null;
}
