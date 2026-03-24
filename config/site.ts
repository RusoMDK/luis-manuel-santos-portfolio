export const siteConfig = {
  name: "Luis Manuel Santos",
  title: "Luis Manuel Santos | Full Stack Developer",
  description:
    "Premium full stack developer portfolio focused on elegant UX, scalable architecture and modern digital products.",
  url: "https://luismanuelsantos.dev",
  ogImage: "/images/og-cover.jpg",
  email: "luismanuelsantos.dev@gmail.com",
  github: "https://github.com/tuusuario",
  linkedin: "https://linkedin.com/in/tuusuario",
} as const;

export const projects = [
  {
    id: "iotPlatform",
    href: "#",
    image: "/images/projects/iot-platform-cover.jpg",
    stack: ["React", "Node.js", "MongoDB", "MQTT", "Socket.IO"],
  },
  {
    id: "ecommerce",
    href: "#",
    image: "/images/projects/ecommerce-cover.jpg",
    stack: ["React", "Fastify", "Prisma", "PostgreSQL"],
  },
  {
    id: "creativePlatform",
    href: "#",
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
