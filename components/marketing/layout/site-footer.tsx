"use client";

import { ExternalLink, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/marketing/shared/container";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  const cvHref = locale === "es" ? siteConfig.cv.es : siteConfig.cv.en;
  const homeHref = `/${locale}`;

  const navItems = [
    { label: t("work"), href: `${homeHref}#projects` },
    { label: t("services"), href: `${homeHref}#services` },
    { label: t("stack"), href: `${homeHref}#stack` },
    { label: t("experience"), href: `${homeHref}#experience` },
    { label: t("about"), href: `${homeHref}#about` },
    { label: t("contact"), href: `${homeHref}#contact` },
  ];

  return (
    <footer className="border-t border-white/10 py-12 md:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="space-y-5 text-center lg:text-left">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-white/40">
                Portfolio
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {siteConfig.name}
              </h2>

              <p className="mt-4 max-w-xl text-base leading-8 text-white/65 lg:max-w-none">
                {t("description")}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
              <a
                href={`mailto:${siteConfig.email}`}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full justify-center rounded-full bg-white text-black hover:bg-white/90 sm:w-auto",
                )}
              >
                <Mail className="mr-2 h-4 w-4" />
                {t("email")}
              </a>

              <a
                href={cvHref}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full justify-center rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto",
                )}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {t("cv")}
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                {t("navigation")}
              </h3>

              <nav className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-1">
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
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                {t("connect")}
              </h3>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                  GitHub
                </a>

                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
                >
                  <ExternalLink className="h-4 w-4" />
                  LinkedIn
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 break-all text-sm text-white/65 transition hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-center text-sm text-white/45 md:flex-row md:items-center md:justify-between md:text-left">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. {t("rights")}
            </p>
            <p>{t("builtWith")}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
