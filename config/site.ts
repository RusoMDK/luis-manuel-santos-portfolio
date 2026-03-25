export const siteConfig = {
  name: "Luis Manuel Santos",
  title: "Luis Manuel Santos | Full Stack Developer",
  description:
    "Premium full stack developer portfolio focused on elegant UX, scalable architecture and modern digital products.",
  url: "https://luissantosdev.vercel.app",
  ogImage: "/images/og-cover.jpg",
  email: "luissantoslezcano@gmail.com",
  github: "https://github.com/RusoMDK",
  linkedin: "https://www.linkedin.com/in/luis-manuel-santos-lezcano-633956108/",
  cv: {
    es: "/docs/luis-manuel-santos-cv-es.pdf",
    en: "/docs/luis-manuel-santos-cv-en.pdf",
  },
  availability: "Available for freelance",
  location: "Miami, FL",
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

export const services = [
  {
    id: "frontend",
    icon: "layout",
  },
  {
    id: "backend",
    icon: "server",
  },
  {
    id: "fullstack",
    icon: "layers",
  },
  {
    id: "realtime",
    icon: "radio",
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
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Socket.IO",
  "MQTT",
  "Docker",
  "GitHub",
  "REST APIs",
] as const;
