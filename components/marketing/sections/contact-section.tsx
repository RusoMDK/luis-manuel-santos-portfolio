import { ExternalLink, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { AnimatedReveal } from "@/components/common/animated-reveal";
import { Container } from "@/components/marketing/shared/container";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className="py-16 md:py-24">
      <Container>
        <AnimatedReveal>
          <div className="overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/[0.06] to-fuchsia-400/10 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.32)] md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/65">
                  {t("eyebrow")}
                </div>

                <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  {t("title")}
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 md:text-lg">
                  {t("description")}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "rounded-full bg-white text-black hover:bg-white/90",
                  )}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {t("email")}
                </a>

                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white",
                  )}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t("github")}
                </a>

                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white",
                  )}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t("linkedin")}
                </a>
              </div>
            </div>
          </div>
        </AnimatedReveal>
      </Container>
    </section>
  );
}
