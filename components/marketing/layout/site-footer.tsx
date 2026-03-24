import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/marketing/shared/container";

export function SiteFooter() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-white/10 py-8">
      <Container className="flex flex-col gap-3 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. {t("rights")}
        </p>
        <p>{t("builtWith")}</p>
      </Container>
    </footer>
  );
}
