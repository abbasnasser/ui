import * as React from "react";
import { cn } from "./utils";

export function Pagination({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label="Pagination" className={cn("flex items-center justify-between gap-2 text-[13px]", className)} {...props} />;
}

export function PaginationItems({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-1", className)} {...props} />;
}

export function PaginationLink({
  active = false,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-8 min-w-8 items-center justify-center rounded-[var(--ui-radius-md)] px-2 text-[var(--ui-text-muted)] transition-colors hover:bg-[var(--ui-recessed)] hover:text-[var(--ui-text)] disabled:pointer-events-none disabled:opacity-40",
        active && "bg-[var(--ui-recessed)] font-medium text-[var(--ui-text)]",
        className,
      )}
      {...props}
    />
  );
}
