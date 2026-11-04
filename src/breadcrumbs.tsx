import * as React from "react";
import { cn } from "./utils";

export function Breadcrumbs({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Breadcrumb" className={cn("text-[12px] text-muted-foreground", className)} {...props} />;
}

export function BreadcrumbList({ className, ...props }: React.OlHTMLAttributes<HTMLOListElement>) {
  return <ol className={cn("flex flex-wrap items-center gap-1.5", className)} {...props} />;
}

export function BreadcrumbItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}

/** Separates breadcrumb items with a chevron. */
export function BreadcrumbSeparator() {
  return (
    <svg viewBox="0 0 10 10" width={8} height={8} aria-hidden className="text-subtle-foreground">
      <path d="M3 1.5 7 5 3 8.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
