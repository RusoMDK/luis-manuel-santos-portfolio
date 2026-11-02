"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** ES · EN. Switching keeps the page and fades it over (view transition type "locale"). */
export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  return (
    <ul className="flex items-center font-data text-[13px]" aria-label={t("label")}>
      {routing.locales.map((item) => (
        <li key={item}>
          <Link
            href={pathname}
            locale={item}
            lang={item}
            hrefLang={item}
            aria-label={t(`${item}Name`)}
            aria-current={item === locale ? "true" : undefined}
            transitionTypes={["locale"]}
            className="nav-link inline-flex h-11 min-w-9 items-center justify-center rounded-[10px] px-1.5"
          >
            {t(item)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
