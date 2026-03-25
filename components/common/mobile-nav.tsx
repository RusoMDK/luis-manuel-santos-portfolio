"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
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
          <Menu className="h-5 w-5" />
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[min(92vw,24rem)] max-w-[24rem] overflow-y-auto border-white/10 bg-[#07101f]/95 px-0 text-white backdrop-blur-2xl"
        >
          <div className="flex min-h-full flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                  Navigation
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Luis Manuel Santos
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Close navigation menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8">
              <LanguageSwitcher />
            </div>

            <div className="mt-8">
              <Link
                href={ctaHref}
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "w-full justify-center rounded-full bg-white text-black hover:bg-white/90",
                )}
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
