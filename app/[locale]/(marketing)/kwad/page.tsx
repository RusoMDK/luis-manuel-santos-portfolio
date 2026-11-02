import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { KwadCaseStudy } from "@/components/kwad/case-study";

type CaseStudyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "es" && locale !== "en") return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("kwadTitle");
  const description = t("kwadDescription");
  const url = `${siteConfig.url}/${locale}/kwad`;
  // Metadata objects replace the layout's rather than merge, so the card goes again here.
  const image = { url: siteConfig.ogImage[locale], width: 1200, height: 630, type: "image/png", alt: title };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: `${siteConfig.url}/en/kwad`, es: `${siteConfig.url}/es/kwad` },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "es" ? "es_ES" : "en_GB",
      alternateLocale: locale === "es" ? "en_GB" : "es_ES",
      type: "article",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { locale } = await params;
  if (locale !== "es" && locale !== "en") {
    notFound();
  }
  setRequestLocale(locale);

  return <KwadCaseStudy />;
}
