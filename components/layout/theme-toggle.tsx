"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { THEME_KEY, currentTheme, subscribeTheme, type Theme } from "@/lib/theme";

/** Light or dark. Follows the system until the visitor chooses, then remembers. */
export function ThemeToggle() {
  const t = useTranslations("Navigation");
  // The server cannot know the theme; null until hydrated, then the real one.
  const theme = useSyncExternalStore<Theme | null>(subscribeTheme, currentTheme, () => null);

  const toggle = () => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private mode: the choice lasts for this page only.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? t("toLight") : t("toDark")}
      className="inline-flex size-11 items-center justify-center rounded-[10px] border border-line bg-surface text-ink transition-colors hover:border-muted"
    >
      {/* Both icons are rendered; CSS shows the one for the theme in use, so nothing flashes. */}
      <svg className="theme-icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg className="theme-icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
