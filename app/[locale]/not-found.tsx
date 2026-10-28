import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function LocaleNotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="void field-walnut">
      <div className="frame void-inner">
        <h1 className="display">{t("title")}</h1>
        <p className="lead">{t("body")}</p>
        <Link className="button" href="/">
          {t("cta")}
        </Link>
        <span className="stamp stamp-void" aria-hidden="true">
          {t("stamp")}
        </span>
      </div>
    </main>
  );
}
