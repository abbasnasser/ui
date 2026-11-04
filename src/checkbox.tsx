"use client";
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "./utils";

export const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(function Checkbox({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-[var(--ui-line-strong)] bg-[var(--ui-control)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--ui-focus)]/40 data-[state=checked]:border-[var(--ui-brand)] data-[state=checked]:bg-[var(--ui-brand)] data-[state=indeterminate]:border-[var(--ui-brand)] data-[state=indeterminate]:bg-[var(--ui-brand)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
        <svg viewBox="0 0 12 12" width={10} height={10} aria-hidden>
          <path d="M2.5 6.2 5 8.5 9.5 3.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
