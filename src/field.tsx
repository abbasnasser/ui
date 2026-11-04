import * as React from "react";
import { cn } from "./utils";
import { Label } from "./label";

/** A form row: label, control, and optional description and error, stacked. */
export function Field({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}
export function FieldLabel(props: React.ComponentPropsWithoutRef<typeof Label>) {
  return <Label {...props} />;
}
export function FieldDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-[12px] text-muted-foreground", className)} {...props} />;
}
export function FieldError({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p role="alert" className={cn("text-[12px] text-destructive", className)} {...props} />;
}
