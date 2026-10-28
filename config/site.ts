export const siteConfig = {
  name: "Luis Manuel Santos",
  title: "Luis Manuel Santos | Full Stack Developer",
  description:
    "Full stack developer in Valladolid. I build KWAD, a point-of-sale and inventory SaaS for retailers, already in production.",
  url: "https://luismsldev.vercel.app",
  // One Open Graph card per locale, drawn from the ticket (see .taste-skill/og).
  ogImage: {
    es: "/images/og/og-es.png",
    en: "/images/og/og-en.png",
  },
  email: "luissantoslezcano@gmail.com",
  github: "https://github.com/RusoMDK",
  linkedin: "https://www.linkedin.com/in/luissantosdev/",
  kwadUrl: "https://getkwad.com",
  cv: {
    es: "/docs/luis-manuel-santos-cv-es.pdf",
    en: "/docs/luis-manuel-santos-cv-en.pdf",
  },
  // Short paths encoded in the ticket barcode; next.config.ts redirects them to the PDFs.
  cvShortPath: {
    es: "/cv/es",
    en: "/cv/en",
  },
  location: "Valladolid, Spain",
  profileImage: "/images/profile/luis-manuel-santos-headshot-cropped.png",
} as const;

// The lines printed on the hero ticket.
export const ticketStack = [
  "TypeScript",
  "Node.js · NestJS · Fastify",
  "React · Angular",
  "PostgreSQL · Prisma",
  "Docker · Git",
] as const;

// The roll: one dated copy per stage, oldest first. Months are 1-based; null
// when only the year is certain; `until` closes a period (null: to this day).
// Copies marked `experience` are jobs, printed wider and stamped. The copy for
// each entry lives in messages (Roll).
export const rollEntries = [
  { id: "uci", year: 2019, month: null },
  { id: "thesis", year: 2024, month: 6, repoHref: "https://github.com/RusoMDK/iot-testbench" },
  { id: "sigies", year: 2024, month: 9, until: { year: 2026, month: 10 }, experience: true },
  { id: "iotPlatform", year: 2025, month: 4, repoHref: "https://github.com/RusoMDK/PlataformaIoT" },
  { id: "proxyAgent", year: 2025, month: 6, repoHref: "https://github.com/RusoMDK/ProxyAgent-UCI" },
  // September or October 2025: no certain month, so it prints the year alone.
  { id: "smartIot", year: 2025, month: null },
  { id: "ecommerce", year: 2025, month: 11, repoHref: "https://github.com/RusoMDK/Tienda-Virtual" },
  { id: "kwad", year: 2026, month: 4, until: null, experience: true, anchor: "#kwad" },
  { id: "sesamo", year: 2026, month: 6 },
  // The ground turns from walnut to stone at this copy.
  { id: "valladolid", year: 2026, month: 10, stone: true },
] as const;

export type RollEntryId = (typeof rollEntries)[number]["id"];

// Luisma's own photographs, cropped from public/images/invernadero/originales (not versioned).
export const rollPhotos = {
  thesisBench: { src: "/images/invernadero/tesis-planta-escritorio.jpg", width: 1600, height: 1200 },
  thesisLcd: { src: "/images/invernadero/tesis-planta-lcd-temperatura.jpg", width: 1200, height: 800 },
  seedbed: { src: "/images/invernadero/plataformaiot-semillero.jpg", width: 1500, height: 1000 },
} as const;

// Sample data for the point-of-sale demo ("I learned in Havana", in the KWAD chapter). Prices are in USD;
// the rates are labelled as samples on the page.
export const demoRates = { USD: 1, CUP: 650, EUR: 0.92 } as const;

export type DemoCurrency = keyof typeof demoRates;

export const demoProducts = [
  { id: "coffee", price: 2.4 },
  { id: "malta", price: 0.9 },
  { id: "milk", price: 6.5 },
  { id: "crackers", price: 1.2 },
] as const;

export type DemoProductId = (typeof demoProducts)[number]["id"];
