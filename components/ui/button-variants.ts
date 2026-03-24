import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90",
        destructive:
          "bg-destructive text-white hover:opacity-90 focus-visible:ring-destructive/20",
        outline:
          "border border-white/10 bg-transparent text-white hover:bg-white/10",
        secondary: "bg-white/10 text-white hover:bg-white/15",
        ghost: "text-white hover:bg-white/10",
        link: "text-white underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
