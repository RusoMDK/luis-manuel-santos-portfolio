// taste-skill-ignore applies on the Geist Mono lines: the brief sets it for technical data.
import { Geist, Geist_Mono } from "next/font/google"; // taste-skill-ignore

// Geist sets the text and the headlines; the monospaced cut only the technical data
// (availability, dates, technologies, filters and keyboard shortcuts).
export const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const mono = Geist_Mono({ // taste-skill-ignore
  subsets: ["latin"],
  // One static weight: the smallest file for a few lines of data.
  weight: "400",
  variable: "--font-geist-mono",
  display: "swap",
  // Never the largest paint (that is set in Geist): no preload.
  preload: false,
});

export const fontVariables = `${sans.variable} ${mono.variable}`;
