"use client";

import { useEffect, useRef, useState } from "react";
import { Code2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { MobileNav } from "@/components/common/mobile-nav";
import { Container } from "@/components/marketing/shared/container";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("Navigation");
  const locale = useLocale();

  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateHeader = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      if (currentY <= 24) {
        setIsHidden(false);
        lastScrollY.current = currentY;
        ticking.current = false;
        return;
      }

      if (Math.abs(diff) < 8) {
        ticking.current = false;
        return;
      }

      if (diff > 0 && currentY > 160) {
        setIsHidden(true);
      }

      if (diff < 0) {
        setIsHidden(false);
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(updateHeader);
    };

    lastScrollY.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const homeHref = `/${locale}`;
  const navItems = [
    { label: t("work"), href: `${homeHref}#projects` },
    { label: t("services"), href: `${homeHref}#services` },
    { label: t("stack"), href: `${homeHref}#stack` },
    { label: t("experience"), href: `${homeHref}#experience` },
    { label: t("about"), href: `${homeHref}#about` },
  ];

  const contactHref = `${homeHref}#contact`;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050816]/75 backdrop-blur-xl will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isHidden ? "-translate-y-[110%]" : "translate-y-0",
        )}
      >
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
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-white/65 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <LanguageSwitcher />

            <Link
              href={contactHref}
              className={cn(
                buttonVariants({ variant: "default" }),
                "rounded-full bg-white px-5 text-black hover:bg-white/90",
              )}
            >
              {t("cta")}
            </Link>
          </div>

          <MobileNav
            navItems={navItems}
            ctaLabel={t("cta")}
            ctaHref={contactHref}
          />
        </Container>
      </header>

      <div className="h-20" aria-hidden="true" />
    </>
  );
}
