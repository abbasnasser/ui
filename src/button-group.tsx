import * as React from "react";
import { cn } from "./utils";

/** Buttons that sit together as one segmented control; the inner corners are square. */
export function ButtonGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex items-stretch [&>*]:rounded-none [&>*:first-child]:rounded-s-md [&>*:last-child]:rounded-e-md [&>*:not(:first-child)]:-ms-px",
        className,
      )}
      {...props}
    />
  );
}
