export const siteConfig = {
  name: "Luis Manuel Santos",
  url: "https://luismsldev.vercel.app",
  // One Open Graph card per locale (see .taste-skill/og).
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
  profileImage: { src: "/images/profile/luis-manuel-santos-headshot-cropped.png", width: 960, height: 1017 },
} as const;

// Luisma's own photographs, cropped from public/images/invernadero/originales (not versioned).
export const photos = {
  thesisBench: { src: "/images/invernadero/tesis-planta-escritorio.jpg", width: 1600, height: 1200 },
  thesisLcd: { src: "/images/invernadero/tesis-planta-lcd-temperatura.jpg", width: 1200, height: 800 },
  seedbed: { src: "/images/invernadero/plataformaiot-semillero.jpg", width: 1500, height: 1000 },
} as const;

export type PhotoId = keyof typeof photos;

// The technologies the filters offer, in the order they show.
export const techFilters = [
  "TypeScript",
  "React",
  "Angular",
  "Node.js",
  "NestJS",
  "Fastify",
  "PostgreSQL",
  "Prisma",
  "MongoDB",
  "Redis",
  "Docker",
  "MQTT",
  "Playwright",
] as const;

// The projects, in the order they show. Their kind, years and description live in
// messages (Projects.items). `href` is null when the code is not public.
export const projects = [
  {
    id: "kwad",
    href: "/kwad",
    stack: ["TypeScript", "Node.js", "Fastify", "Prisma", "PostgreSQL", "Redis", "React", "Playwright"],
  },
  {
    id: "sigies",
    href: null,
    stack: ["TypeScript", "Node.js", "NestJS", "Angular", "PostgreSQL", "Docker"],
  },
  {
    id: "iotPlatform",
    href: "https://github.com/RusoMDK/PlataformaIoT",
    stack: ["Node.js", "Express", "MQTT", "MongoDB", "Socket.IO", "React"],
    photo: "seedbed",
  },
  {
    id: "iotTestbench",
    href: "https://github.com/RusoMDK/iot-testbench",
    stack: ["TypeScript", "NestJS", "Angular", "PostgreSQL", "MQTT"],
    photo: "thesisBench",
  },
  {
    id: "store",
    href: "https://github.com/RusoMDK/Tienda-Virtual",
    stack: ["TypeScript", "Fastify", "Prisma", "PostgreSQL", "React"],
  },
] as const satisfies readonly { id: string; href: string | null; stack: readonly string[]; photo?: PhotoId }[];

export type ProjectId = (typeof projects)[number]["id"];
