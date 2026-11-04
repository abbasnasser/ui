import * as React from "react";
import { cn } from "./utils";

/** A row of content with optional media, text and actions. Stacks the way list rows do. */
export function Item({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-3 rounded-md p-3 text-[13px]", className)} {...props} />;
}

export function ItemGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="list" className={cn("flex flex-col", className)} {...props} />;
}

export function ItemSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="separator" className={cn("h-px w-full bg-border", className)} {...props} />;
}

export function ItemMedia({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4", className)} {...props} />;
}

export function ItemContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)} {...props} />;
}

export function ItemTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("truncate font-medium", className)} {...props} />;
}

export function ItemDescription({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-[12px] text-muted-foreground", className)} {...props} />;
}

export function ItemActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex shrink-0 items-center gap-2", className)} {...props} />;
}
