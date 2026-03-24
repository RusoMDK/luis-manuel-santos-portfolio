import { Code2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { MobileNav } from "@/components/common/mobile-nav";
import { Container } from "@/components/marketing/shared/container";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("Navigation");

  const navItems = [
    { label: t("work"), href: "#projects" },
    { label: t("services"), href: "#services" },
    { label: t("stack"), href: "#stack" },
    { label: t("experience"), href: "#experience" },
    { label: t("about"), href: "#about" },
    { label: t("contact"), href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/75 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            <Code2 className="h-5 w-5 text-cyan-300" />
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">
              Portfolio
            </div>
            <div className="text-sm font-semibold text-white">
              {siteConfig.name}
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/65 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <LanguageSwitcher />

          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-full bg-white px-5 text-black hover:bg-white/90",
            )}
          >
            {t("cta")}
          </a>
        </div>

        <MobileNav navItems={navItems} ctaLabel={t("cta")} />
      </Container>
    </header>
  );
}
