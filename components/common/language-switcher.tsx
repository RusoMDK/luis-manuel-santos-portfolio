"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  onSelect?: () => void;
};

export function LanguageSwitcher({ onSelect }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LanguageSwitcher");

  const handleChangeLocale = (nextLocale: (typeof routing.locales)[number]) => {
    if (nextLocale === locale) {
      onSelect?.();
      return;
    }

    router.replace(pathname, { locale: nextLocale });
    onSelect?.();
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
      {routing.locales.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => handleChangeLocale(item)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] transition",
            locale === item
              ? "bg-white text-black"
              : "text-white/65 hover:text-white",
          )}
        >
          {t(item)}
        </button>
      ))}
    </div>
  );
}
