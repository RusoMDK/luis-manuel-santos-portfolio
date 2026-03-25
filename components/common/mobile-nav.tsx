"use client";

import { useState } from "react";
import { Menu, PanelRightOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/common/language-switcher";

type NavItem = {
  label: string;
  href: string;
};

type MobileNavProps = {
  navItems: NavItem[];
  ctaLabel: string;
  ctaHref: string;
};

export function MobileNav({ navItems, ctaLabel, ctaHref }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="Open navigation menu"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-11 w-11 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10",
          )}
        >
          <PanelRightOpen className="h-5 w-5" />
        </SheetTrigger>

        <SheetContent
          side="right"
          className="h-dvh w-screen max-w-none overflow-y-auto border-white/10 bg-[#07101f]/95 px-0 text-white backdrop-blur-2xl sm:w-[420px] sm:max-w-[420px]"
        >
          <div className="flex min-h-dvh flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
            <div className="border-b border-white/10 pb-5 pr-12">
              <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                Navigation
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Luis Manuel Santos
              </p>
            </div>

            <nav className="mt-8 flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-8">
              <LanguageSwitcher />
            </div>

            <div className="mt-8">
              <a
                href={ctaHref}
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "w-full justify-center rounded-full bg-white text-black hover:bg-white/90",
                )}
              >
                {ctaLabel}
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
