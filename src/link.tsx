import * as React from "react";
import { cn } from "./utils";

/** A text link in the brand colour, underlined on hover. Pass a router link as `asChild`-free `as` if needed. */
export const Link = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  function Link({ className, ...props }, ref) {
    return (
      <a
        ref={ref}
        className={cn("text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-sm", className)}
        {...props}
      />
    );
  },
);
