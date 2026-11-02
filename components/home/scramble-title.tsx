"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { GLYPHS } from "@/lib/glyphs";

// GSAP arrives in its own chunk after hydration, off the path of the first paint;
// until then the CSS shows the scrambled layer (see .scramble in globals.css).
const ScrambleMotion = dynamic(() => import("./scramble-motion"), { ssr: false });

/** A fixed scramble of the text, so the server and the first paint agree. */
const scrambled = (text: string) =>
  [...text].map((char, index) => (char === " " ? " " : GLYPHS[(index * 7 + 3) % GLYPHS.length])).join("");

/**
 * The headline decodes letter by letter in about 0.8 s, and again under the pointer.
 * The real text keeps the layout (hidden while the symbols play over it) and names
 * the heading; everything that moves is aria-hidden. Without script or with reduced
 * motion the real text simply shows.
 */
export function ScrambleTitle({ id, text, className }: { id?: string; text: string; className?: string }) {
  const root = useRef<HTMLHeadingElement>(null);

  return (
    <h1 ref={root} id={id} aria-label={text} className={`relative ${className ?? ""}`}>
      <span className="scramble" aria-hidden="true">
        <span className="scramble-text">{text}</span>
        <span className="scramble-layer">{scrambled(text)}</span>
      </span>
      <span aria-hidden="true" className="caret font-[400] text-accent">
        _
      </span>
      <ScrambleMotion root={root} text={text} />
    </h1>
  );
}
