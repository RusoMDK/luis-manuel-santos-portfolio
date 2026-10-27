import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { siteConfig } from "@/config/site";

type SiteHeaderProps = {
  locale: "es" | "en";
};

export function SiteHeader({ locale }: SiteHeaderProps) {
  const t = useTranslations("Navigation");

  const links = [
    { href: "/#kwad", label: t("kwad") },
    { href: "/#trabajo", label: t("work") },
    { href: "/#sobre-mi", label: t("about") },
    { href: "/#contacto", label: t("contact") },
  ];

  return (
    <header className="site-header">
      <div className="frame site-header-row">
        <Link href="/" className="wordmark" aria-label={t("home")}>
          Luisma
        </Link>
        <nav aria-label={t("label")} className="site-nav">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-header-end">
          <LanguageSwitcher />
          <a className="site-cv" href={siteConfig.cv[locale]} target="_blank" rel="noopener">
            {t("cv")}
          </a>
          <Link className="site-contact" href="/#contacto">
            {t("contact")}
          </Link>
        </div>
      </div>
    </header>
  );
}
