export const siteConfig = {
  name: "Luis Manuel Santos",
  title: "Luis Manuel Santos | Full Stack Developer",
  description:
    "Full Stack Developer in Valladolid, Spain. React, TypeScript, Node.js, NestJS, B2B SaaS and IoT.",
  url: "https://luismsldev.vercel.app",
  ogImage: "/images/og-cover.jpg",
  email: "luissantoslezcano@gmail.com",
  github: "https://github.com/RusoMDK",
  linkedin: "https://www.linkedin.com/in/luissantosdev/",
  cv: {
    es: "/docs/luis-manuel-santos-cv-es.pdf",
    en: "/docs/luis-manuel-santos-cv-en.pdf",
  },
  availability: "Open to work",
  location: "Valladolid, Spain",
  profileImage: "/images/profile/luis-manuel-santos-headshot-cropped.png",
} as const;

export const projects = [
  {
    id: "iotPlatform",
    caseStudySlug: "iot-platform",
    repoHref: "https://github.com/RusoMDK/PlataformaIoT",
    image: "/images/projects/iot-platform-cover.jpg",
    stack: ["React", "Node.js", "MongoDB", "MQTT", "Socket.IO"],
  },
  {
    id: "ecommerce",
    repoHref: "https://github.com/RusoMDK/Tienda-Virtual",
    image: "/images/projects/ecommerce-cover.jpg",
    stack: ["React", "Fastify", "Prisma", "PostgreSQL"],
  },
  {
    id: "creativePlatform",
    repoHref: "https://github.com/RusoMDK/ArtCollab",
    image: "/images/projects/creative-platform-cover.jpg",
    stack: ["React", "Express", "MongoDB", "Cloudinary"],
  },
] as const;

export const stack = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "Fastify",
  "NestJS",
  "Angular",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Socket.IO",
  "MQTT",
  "Docker",
  "GitHub",
  "REST APIs",
] as const;
