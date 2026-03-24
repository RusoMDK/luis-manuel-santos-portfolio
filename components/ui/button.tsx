"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button };
