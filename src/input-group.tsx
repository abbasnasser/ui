import * as React from "react";
import { cn } from "./utils";

export function InputGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="group"
      className={cn(
        "flex h-9 w-full items-center rounded-md border border-input bg-background text-[13px] focus-within:ring-2 focus-within:ring-ring has-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function InputGroupAddon({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex shrink-0 items-center px-3 text-muted-foreground", className)} {...props} />;
}

export const InputGroupInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(function InputGroupInput(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn("h-full min-w-0 flex-1 bg-transparent px-3 outline-none placeholder:text-subtle-foreground disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
});
