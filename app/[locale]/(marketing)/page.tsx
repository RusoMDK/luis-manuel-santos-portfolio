import { KwadFeature } from "@/components/marketing/sections/kwad-feature";
import { HeroSection } from "@/components/marketing/sections/hero-section";
import { ProjectsSection } from "@/components/marketing/sections/projects-section";
import { StackSection } from "@/components/marketing/sections/stack-section";
import { ExperienceSection } from "@/components/marketing/sections/experience-section";
import { AboutSection } from "@/components/marketing/sections/about-section";
import { ContactSection } from "@/components/marketing/sections/contact-section";

type MarketingHomePageProps = { params: Promise<{ locale: string }> };

const MarketingHomePage = async ({ params }: MarketingHomePageProps) => {
  const { locale } = await params;
  return (
    <>
      <HeroSection />
      <KwadFeature locale={locale} />
      <ProjectsSection />
      <ExperienceSection />
      <StackSection />
      <AboutSection />
      <ContactSection />
    </>
  );
};

export default MarketingHomePage;
