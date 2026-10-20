import { notFound } from "next/navigation";
import { KwadCaseStudy } from "@/components/marketing/sections/kwad-case-study";

type CaseStudyPageProps = {
  params: Promise<{ locale: string }>;
};

const CaseStudyPage = async ({ params }: CaseStudyPageProps) => {
  const { locale } = await params;
  if (locale !== "es" && locale !== "en") {
    notFound();
  }

  return <KwadCaseStudy locale={locale} />;
};

export default CaseStudyPage;
