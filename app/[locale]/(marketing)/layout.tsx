import { ViewTransition } from "react";
import { SiteFooter } from "@/components/marketing/layout/site-footer";
import { SiteHeader } from "@/components/marketing/layout/site-header";

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
      {/* Moving between the home and a case study swaps the page in place (an update);
          switching language remounts this layout under the new locale (enter and exit). */}
      <ViewTransition
        default="none"
        update={{ "case-study": "page-swap", default: "none" }}
        enter={{ locale: "page-fade", default: "none" }}
        exit={{ locale: "page-fade", default: "none" }}
      >
        <main id="main">{children}</main>
      </ViewTransition>
      <SiteFooter locale={appLocale} />
    </>
  );
}
