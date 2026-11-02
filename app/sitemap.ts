import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Both pages in both languages, each with its alternate.
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/kwad"].flatMap((path) =>
    (["es", "en"] as const).map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: new Date("2026-11-02"),
      alternates: { languages: { es: `${siteConfig.url}/es${path}`, en: `${siteConfig.url}/en${path}` } },
    })),
  );
}
