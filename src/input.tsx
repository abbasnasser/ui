import * as React from "react";
import { cn } from "./utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, type = "text", ...props }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "h-8 w-full min-w-0 rounded-[var(--ui-radius-md)] border border-[var(--ui-line-strong)] bg-[var(--ui-control)] px-2.5 text-[13px] text-[var(--ui-text)] placeholder:text-[var(--ui-text-faint)] outline-none transition-colors focus-visible:border-[var(--ui-focus)] focus-visible:ring-2 focus-visible:ring-[var(--ui-focus)]/30 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[var(--ui-danger)]",
          className,
        )}
        {...props}
      />
    );
  },
);
