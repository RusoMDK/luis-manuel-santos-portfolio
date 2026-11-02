import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  const t = useTranslations("NotFound");

  return (
    <main id="main" className="frame flex min-h-[100dvh] flex-col justify-center gap-6 py-24">
      <p className="font-data text-[13px] text-muted" aria-hidden="true">
        404
      </p>
      <h1 className="text-[clamp(44px,6vw,88px)] leading-[0.98] font-[650] tracking-[-0.05em]">{t("title")}</h1>
      <p className="max-w-[46ch] text-[19px] leading-[1.5] text-muted">{t("body")}</p>
      <Link className="button button-primary w-fit" href="/">
        {t("cta")}
      </Link>
    </main>
  );
}
