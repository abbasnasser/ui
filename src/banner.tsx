import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const bannerVariants = cva(
  "flex items-start gap-3 rounded-[var(--ui-radius-md)] border px-3 py-2.5 text-[13px]",
  {
    variants: {
      tone: {
        info: "border-[#bfd4fb] bg-[var(--ui-brand-tint)] text-[#1e3a8a]",
        success: "border-[#b7e0c4] bg-[var(--ui-success-tint)] text-[#14532d]",
        warning: "border-[#f2d49b] bg-[var(--ui-warning-tint)] text-[#7a3e00]",
        danger: "border-[#f3b8b8] bg-[#fdecec] text-[#9b1c1c]",
      },
    },
    defaultVariants: { tone: "info" },
  },
);

export interface BannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof bannerVariants> {
  title?: React.ReactNode;
  action?: React.ReactNode;
}

export function Banner({ tone, title, action, children, className, ...props }: BannerProps) {
  return (
    <div role="status" className={cn(bannerVariants({ tone }), className)} {...props}>
      <div className="min-w-0 flex-1">
        {title ? <p className="font-semibold">{title}</p> : null}
        {children ? <div className="text-current/90">{children}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
