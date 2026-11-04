import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const bannerVariants = cva(
  "flex items-start gap-3 rounded-md border px-3 py-2.5 text-[13px]",
  {
    variants: {
      tone: {
        info: "border-info/30 bg-info/10 text-foreground [&_p]:text-info",
        success: "border-success/30 bg-success/10 text-foreground [&_p]:text-success",
        warning: "border-warning/30 bg-warning/10 text-foreground [&_p]:text-warning",
        danger: "border-destructive/30 bg-destructive/10 text-foreground [&_p]:text-destructive",
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
