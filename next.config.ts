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
};

export default withNextIntl(nextConfig);
