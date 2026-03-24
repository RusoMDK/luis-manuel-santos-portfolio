import { SiteFooter } from "@/components/marketing/layout/site-footer";
import { SiteHeader } from "@/components/marketing/layout/site-header";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background text-foreground">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
