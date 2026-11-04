import * as React from "react";
import { LoaderIcon } from "./icons";
import { cn } from "./utils";

export function Spinner({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return <LoaderIcon role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />;
}
