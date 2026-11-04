import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--ui-radius-md)] text-[13px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-focus)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-[var(--ui-action)] text-[var(--ui-action-text)] hover:bg-[var(--ui-action-hover)]",
        secondary:
          "border border-[var(--ui-line-strong)] bg-[var(--ui-control)] text-[var(--ui-text)] hover:bg-[var(--ui-recessed)]",
        ghost: "text-[var(--ui-text)] hover:bg-[var(--ui-recessed)]",
        destructive: "bg-[var(--ui-danger)] text-white hover:bg-[var(--ui-danger-hover)]",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4",
        icon: "size-8",
      },
    },
    defaultVariants: { variant: "secondary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renders the child element (for example a link) with the button styles instead of a <button>. */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
