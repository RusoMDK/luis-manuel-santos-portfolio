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
    ];
  },
};

export default withNextIntl(nextConfig);
