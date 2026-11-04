import * as React from "react";
import { cn } from "./utils";

export interface MeterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: React.ReactNode;
  /** Shown at the right of the label, for example "42 of 60". */
  valueText?: React.ReactNode;
}

export function Meter({ value, max = 100, label, valueText, className, ...props }: MeterProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      {label || valueText ? (
        <div className="flex items-center justify-between text-[12px] text-[var(--ui-text-muted)]">
          <span>{label}</span>
          <span className="tabular-nums">{valueText}</span>
        </div>
      ) : null}
      <div role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--ui-line-strong)]">
        <div className="h-full rounded-full bg-[var(--ui-brand)] transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
