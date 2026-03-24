"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
      {routing.locales.map((item) => (
        <Link
          key={item}
          href={pathname}
          locale={item}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] transition",
            locale === item
              ? "bg-white text-black"
              : "text-white/65 hover:text-white",
          )}
        >
          {t(item)}
        </Link>
      ))}
    </div>
  );
}
