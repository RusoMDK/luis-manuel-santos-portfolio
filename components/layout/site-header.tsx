import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

type SiteHeaderProps = {
  locale: "es" | "en";
};

/**
 * Name on the left; projects, KWAD, contact, language, theme and CV on the right.
 * It sits over the hero's glyph field, so it has no background of its own. On a
 * phone the three links take a second row.
 */
export function SiteHeader({ locale }: SiteHeaderProps) {
  const t = useTranslations("Navigation");

  const links = [
    { href: "/#proyectos", label: t("projects") },
    { href: "/kwad", label: t("kwad"), transition: ["case-study"] },
    { href: "/#contacto", label: t("contact") },
  ];

  return (
    <header className="relative z-10">
      <a
        href="#main"
        className="sr-only rounded-[10px] bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        {t("skip")}
      </a>
      <div className="frame grid min-h-[var(--header-h)] grid-cols-[1fr_auto] items-center gap-x-6 md:flex md:justify-between">
        <Link
          href="/"
          aria-label={t("home")}
          className="text-[17px] font-[650] tracking-[-0.02em] no-underline"
        >
          <span className="md:hidden">Luisma</span>
          <span className="hidden md:inline">{siteConfig.name}</span>
        </Link>
        <nav aria-label={t("label")} className="col-span-2 row-start-2 -ml-3 md:ml-auto">
          <ul className="flex items-center text-[16px]">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  transitionTypes={link.transition}
                  className="nav-link inline-flex h-11 items-center rounded-[10px] px-3"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href={siteConfig.cv[locale]}
            target="_blank"
            rel="noopener"
            aria-label={t("cvLabel")}
            className="button min-h-11 px-4 text-[16px]"
          >
            {t("cv")}
          </a>
        </div>
      </div>
    </header>
  );
}
