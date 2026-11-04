"use client";
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "./utils";

export const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(function RadioGroup({ className, ...props }, ref) {
  return <RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-2", className)} {...props} />;
});

export const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(function RadioGroupItem({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "size-4 shrink-0 rounded-full border border-[var(--ui-line-strong)] bg-[var(--ui-control)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--ui-focus)]/40 data-[state=checked]:border-[var(--ui-brand)] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="relative flex size-full items-center justify-center after:block after:size-2 after:rounded-full after:bg-[var(--ui-brand)]" />
    </RadioGroupPrimitive.Item>
  );
});
