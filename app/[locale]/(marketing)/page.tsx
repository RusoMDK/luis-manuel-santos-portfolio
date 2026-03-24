import { HeroSection } from "@/components/marketing/sections/hero-section";
import { ProofSection } from "@/components/marketing/sections/proof-section";
import { ProjectsSection } from "@/components/marketing/sections/projects-section";
import { ServicesSection } from "@/components/marketing/sections/services-section";
import { StackSection } from "@/components/marketing/sections/stack-section";
import { AboutSection } from "@/components/marketing/sections/about-section";
import { ContactSection } from "@/components/marketing/sections/contact-section";

export default function MarketingHomePage() {
  return (
    <>
      <HeroSection />
      <ProofSection />
      <ProjectsSection />
      <ServicesSection />
      <StackSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
