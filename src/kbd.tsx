import * as React from "react";
import { cn } from "./utils";

export function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-sans text-[11px] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function KbdGroup({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center gap-1", className)} {...props} />;
}
