import * as React from "react";
import { cn } from "./utils";

export interface EmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export function Empty({ icon, title, description, action, className, ...props }: EmptyProps) {
  return (
    <div
      className={cn("flex flex-col items-center gap-2 rounded-lg border border-dashed border-input px-6 py-10 text-center", className)}
      {...props}
    >
      {icon ? <div className="text-subtle-foreground">{icon}</div> : null}
      <p className="text-[14px] font-semibold text-foreground">{title}</p>
      {description ? <p className="max-w-sm text-[13px] text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
