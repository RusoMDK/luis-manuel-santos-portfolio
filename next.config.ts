import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/en.json",
  },
});

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 60 for the found photographs, which load close to the first screen.
    qualities: [60, 75],
  },
  experimental: {
    // Lets <Link transitionTypes> drive React's <ViewTransition> between pages.
    viewTransition: true,
  },
  // The ticket barcode encodes these short paths; redirects run before the locale proxy.
  async redirects() {
    return [
      { source: "/cv/es", destination: "/docs/luis-manuel-santos-cv-es.pdf", permanent: false },
      { source: "/cv/en", destination: "/docs/luis-manuel-santos-cv-en.pdf", permanent: false },
      // Case studies that left the site: projects go to their repositories, anything
      // else under /projects goes home (keeping the language when the URL had one).
      ...["", "/:locale(es|en)"].flatMap((prefix) => [
        { source: `${prefix}/projects/iot-platform`, destination: "https://github.com/RusoMDK/PlataformaIoT", permanent: true },
        { source: `${prefix}/projects/ecommerce`, destination: "https://github.com/RusoMDK/Tienda-Virtual", permanent: true },
        { source: `${prefix}/projects/:slug*`, destination: prefix ? "/:locale" : "/", permanent: true },
      ]),
    ];
  },
};

export default withNextIntl(nextConfig);
