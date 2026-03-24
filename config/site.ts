export const siteConfig = {
  name: "Luis Manuel Santos",
  email: "luismanuelsantos.dev@gmail.com",
  github: "https://github.com/tuusuario",
  linkedin: "https://linkedin.com/in/tuusuario",
} as const;

export const projects = [
  {
    id: "iotPlatform",
    href: "#",
    stack: ["React", "Node.js", "MongoDB", "MQTT", "Socket.IO"],
  },
  {
    id: "ecommerce",
    href: "#",
    stack: ["React", "Fastify", "Prisma", "PostgreSQL"],
  },
  {
    id: "creativePlatform",
    href: "#",
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
