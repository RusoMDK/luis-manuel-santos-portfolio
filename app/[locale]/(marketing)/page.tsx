import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageMotion } from "@/components/common/page-motion";
import { HeroSection } from "@/components/marketing/sections/hero-section";
import { KwadFeature } from "@/components/marketing/sections/kwad-feature";
import { RollSection } from "@/components/marketing/sections/roll-section";
import { AboutSection } from "@/components/marketing/sections/about-section";

type MarketingHomePageProps = { params: Promise<{ locale: string }> };

const MarketingHomePage = async ({ params }: MarketingHomePageProps) => {
  const { locale } = await params;
  if (locale !== "es" && locale !== "en") {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <PageMotion>
      <HeroSection locale={locale} />
      <KwadFeature />
      <RollSection />
      <AboutSection />
    </PageMotion>
  );
};

export default MarketingHomePage;
