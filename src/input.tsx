import * as React from "react";
import { cn } from "./utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, type = "text", ...props }, ref) {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "h-8 w-full min-w-0 rounded-md border border-input bg-background px-2.5 text-[13px] text-foreground placeholder:text-subtle-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive",
          className,
        )}
        {...props}
      />
    );
  },
);
