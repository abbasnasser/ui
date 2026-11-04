import * as React from "react";
import { cn } from "./utils";

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Breadcrumb or back link, shown above the title. */
  breadcrumb?: React.ReactNode;
  /** Buttons or other controls, aligned to the right. */
  actions?: React.ReactNode;
}

/** The top of a page: optional breadcrumb, title, one-line description, and actions on the right. */
export function PageHeader({ title, description, breadcrumb, actions, className, ...props }: PageHeaderProps) {
  return (
    <header
      className={cn("flex items-start justify-between gap-4 border-b border-[var(--ui-line)] pb-4", className)}
      {...props}
    >
      <div className="flex min-w-0 flex-col gap-1">
        {breadcrumb ? <div className="text-[12px] text-[var(--ui-text-muted)]">{breadcrumb}</div> : null}
        <h1 className="text-[20px] leading-7 font-semibold text-[var(--ui-text)]">{title}</h1>
        {description ? <p className="text-[13px] text-[var(--ui-text-muted)]">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  );
}
