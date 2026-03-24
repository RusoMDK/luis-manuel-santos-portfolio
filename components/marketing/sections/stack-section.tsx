import { useTranslations } from "next-intl";
import { stack } from "@/config/site";
import { Container } from "@/components/marketing/shared/container";
import { SectionHeading } from "@/components/marketing/shared/section-heading";
import { StackPill } from "@/components/marketing/shared/stack-pill";

export function StackSection() {
  const t = useTranslations("Stack");

  return (
    <section id="stack" className="py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />

          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="flex flex-wrap gap-3">
              {stack.map((item) => (
                <StackPill key={item} label={item} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
