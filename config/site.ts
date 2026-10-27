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
  "PostgreSQL",
] as const;

export const projects = [
  {
    id: "sigies",
  },
  {
    id: "iotTestbench",
    repoHref: "https://github.com/RusoMDK/iot-testbench",
  },
  {
    id: "iotPlatform",
    repoHref: "https://github.com/RusoMDK/PlataformaIoT",
  },
  {
    id: "ecommerce",
    repoHref: "https://github.com/RusoMDK/Tienda-Virtual",
  },
] as const;

export type ProjectId = (typeof projects)[number]["id"];

// Sample data for the Havana point-of-sale demo. Prices are in USD;
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

export const photoCredits = [
  {
    id: "havana",
    src: "/images/places/centro-habana-calle-hospital.jpg",
    width: 1200,
    height: 1600,
    title: "Centro Habana Calle Hospital",
    author: "Escla",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0",
    source: "https://commons.wikimedia.org/wiki/File:Centro_Habana_Calle_Hospital.JPG",
  },
  {
    id: "valladolid",
    src: "/images/places/calle-de-la-plateria-valladolid.jpg",
    width: 1920,
    height: 1279,
    title: "Calle de la Platería (Valladolid)",
    author: "José Luis Filpo Cabana",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source:
      "https://commons.wikimedia.org/wiki/File:Calle_de_la_Plater%C3%ADa_(Valladolid).jpg",
  },
] as const;
