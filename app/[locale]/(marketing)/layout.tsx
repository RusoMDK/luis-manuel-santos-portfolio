import { ViewTransition } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageMotion } from "@/components/motion/page-motion";

type MarketingLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function MarketingLayout({ children, params }: MarketingLayoutProps) {
  const { locale } = await params;
  const appLocale = locale === "es" ? "es" : "en";

  return (
    <>
      <SiteHeader locale={appLocale} />
      {/* Moving between the home and /kwad swaps the page in place (an update) while the
          KWAD title morphs on its own; switching language remounts this layout under
          the new locale (enter and exit). */}
      <ViewTransition
        default="none"
        update={{ "case-study": "page-swap", default: "none" }}
        enter={{ locale: "page-fade", default: "none" }}
        exit={{ locale: "page-fade", default: "none" }}
      >
        <main id="main" className="overflow-x-clip">
          {children}
        </main>
      </ViewTransition>
      <SiteFooter locale={appLocale} />
      <PageMotion />
    </>
  );
}
