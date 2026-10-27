import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { PageMotion } from "@/components/common/page-motion";
import { HeroSection } from "@/components/marketing/sections/hero-section";
import { HavanaSection } from "@/components/marketing/sections/havana-section";
import { KwadFeature } from "@/components/marketing/sections/kwad-feature";
import { ProjectsSection } from "@/components/marketing/sections/projects-section";
import { AboutSection } from "@/components/marketing/sections/about-section";
import { ContactSection } from "@/components/marketing/sections/contact-section";

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
      <HavanaSection />
      <KwadFeature />
      <ProjectsSection />
      <AboutSection />
      <ContactSection locale={locale} />
    </PageMotion>
  );
};

export default MarketingHomePage;
