import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

/** A small status label. Tinted, not solid, so a row of badges stays quiet. */
export const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium leading-4",
  {
    variants: {
      tone: {
        neutral: "bg-[var(--ui-recessed)] text-[var(--ui-text-muted)]",
        info: "bg-[#e8f0fe] text-[#1a56db]",
        success: "bg-[#e7f6ec] text-[#14532d]",
        warning: "bg-[#fdf3e1] text-[#8a4b00]",
        danger: "bg-[#fdecec] text-[#9b1c1c]",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
