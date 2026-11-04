import * as React from "react";
import { cn } from "./utils";

export function Loader({ className, label = "Loading", ...props }: React.HTMLAttributes<HTMLSpanElement> & { label?: string }) {
  return (
    <span role="status" className={cn("inline-flex size-4", className)} {...props}>
      <svg viewBox="0 0 16 16" className="size-full animate-spin text-muted-foreground motion-reduce:animate-none" aria-hidden>
        <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
        <path d="M14 8a6 6 0 0 0-6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
