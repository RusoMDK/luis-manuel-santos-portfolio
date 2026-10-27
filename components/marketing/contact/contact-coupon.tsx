"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

const roles = ["fullstack", "backend"] as const;
const modes = ["remote", "hybrid", "onsite"] as const;

export function ContactCoupon() {
  const t = useTranslations("Contact");
  const [opened, setOpened] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const role = t(`roles.${data.get("role") as (typeof roles)[number]}`);
    const mode = t(`modes.${data.get("mode") as (typeof modes)[number]}`);
    const subject = t("subject", { role, mode });
    const body = String(data.get("message") ?? "");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <form className="coupon-form" onSubmit={handleSubmit}>
      <fieldset className="coupon-choice">
        <legend>{t("role")}</legend>
        {roles.map((role, index) => (
          <label key={role}>
            <input type="radio" name="role" value={role} defaultChecked={index === 0} />
            <span>{t(`roles.${role}`)}</span>
          </label>
        ))}
      </fieldset>
      <fieldset className="coupon-choice">
        <legend>{t("mode")}</legend>
        {modes.map((mode, index) => (
          <label key={mode}>
            <input type="radio" name="mode" value={mode} defaultChecked={index === 0} />
            <span>{t(`modes.${mode}`)}</span>
          </label>
        ))}
      </fieldset>
      <label className="coupon-field">
        <span>{t("message")}</span>
        <textarea name="message" rows={4} placeholder={t("messagePlaceholder")} />
      </label>
      <button type="submit" className="coupon-submit">
        {t("submit")}
      </button>
      <p className="coupon-status" role="status">
        {opened ? t("opened", { email: siteConfig.email }) : ""}
      </p>
      {opened ? (
        <span className="stamp" aria-hidden="true">
          {t("stamp")}
        </span>
      ) : null}
    </form>
  );
}
