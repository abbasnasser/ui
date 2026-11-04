"use client";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "./utils";

export const Tabs = TabsPrimitive.Root;

/** Underline tabs: the list has a hairline and the active tab gets a dark bar under it. */
export const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...props }, ref) {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn("flex items-center gap-4 border-b border-[var(--ui-line)]", className)}
      {...props}
    />
  );
});

export const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(function TabsTrigger({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "-mb-px h-9 border-b-2 border-transparent text-[13px] font-medium text-[var(--ui-text-muted)] outline-none transition-colors hover:text-[var(--ui-text)] focus-visible:ring-2 focus-visible:ring-[var(--ui-focus)] data-[state=active]:border-[var(--ui-text)] data-[state=active]:text-[var(--ui-text)] disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});

export const TabsContent = TabsPrimitive.Content;
