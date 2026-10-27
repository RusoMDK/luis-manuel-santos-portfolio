import { Besley, Libre_Franklin } from "next/font/google";

// Display: a Clarendon, like the letterpress labels and signs of Havana.
export const display = Besley({
  subsets: ["latin", "latin-ext"],
  weight: "800",
  variable: "--font-display",
  display: "swap",
});

export const text = Libre_Franklin({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-text",
  display: "swap",
});

export const fontVariables = `${display.variable} ${text.variable}`;
