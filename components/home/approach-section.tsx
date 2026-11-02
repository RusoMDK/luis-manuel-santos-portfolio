import { useTranslations } from "next-intl";

const items = ["ci", "tenants", "production"] as const;

/** How I work: three short claims, each one backed by something real in KWAD or SIGIES. */
export function ApproachSection() {
  const t = useTranslations("Approach");

  return (
    <section className="frame grid gap-10 pt-24 md:pt-32 lg:grid-cols-12 lg:gap-6" aria-labelledby="approach-title">
      <h2
        id="approach-title"
        data-reveal
        className="text-[clamp(40px,5vw,68px)] leading-none font-[650] tracking-[-0.045em] lg:col-span-4"
      >
        {t("title")}
      </h2>
      <ul className="flex flex-col lg:col-span-8">
        {items.map((id) => (
          <li
            key={id}
            data-reveal
            className="grid gap-3 py-7 first:pt-0 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-8 lg:first:pt-2"
          >
            <h3 className="text-[24px] leading-tight font-[600] tracking-[-0.03em]">{t(`items.${id}.title`)}</h3>
            <p className="max-w-[56ch] text-[17px] leading-[1.6]">{t(`items.${id}.body`)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
