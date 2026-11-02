"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  return (
    <ul className="lang" aria-label={t("label")}>
      {routing.locales.map((item) => (
        <li key={item}>
          <Link
            href={pathname}
            locale={item}
            lang={item}
            hrefLang={item}
            aria-current={item === locale ? "true" : undefined}
            transitionTypes={["locale"]}
          >
            {t(item)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
