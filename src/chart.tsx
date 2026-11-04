"use client";
import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "./utils";

export type ChartConfig = Record<string, { label?: React.ReactNode; color?: string }>;

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null);

function useChart() {
  const ctx = React.useContext(ChartContext);
  if (!ctx) throw new Error("Chart parts must be used inside <ChartContainer>.");
  return ctx;
}

/** Wraps a Recharts chart. Each series colour comes from `config[key].color`, exposed as `--color-<key>`. */
export function ChartContainer({
  config,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { config: ChartConfig; children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"] }) {
  const vars = Object.fromEntries(
    Object.entries(config)
      .filter(([, c]) => c.color)
      .map(([key, c]) => [`--color-${key}`, c.color]),
  ) as React.CSSProperties;
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={cn("flex aspect-video justify-center text-[12px] [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border", className)} style={vars} {...props}>
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export const ChartTooltip = RechartsPrimitive.Tooltip;

export function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel = false,
  labelFormatter,
  className,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ dataKey?: unknown; name?: unknown; value?: unknown; color?: string; payload?: unknown }>;
  label?: unknown;
  hideLabel?: boolean;
  labelFormatter?: (label: unknown) => React.ReactNode;
  className?: string;
}) {
  const { config } = useChart();
  if (!active || !payload?.length) return null;
  return (
    <div className={cn("grid min-w-32 gap-1.5 rounded-md border border-border bg-background px-2.5 py-2 text-[12px] text-foreground shadow-md", className)}>
      {!hideLabel && label != null && (
        <div className="font-medium">{labelFormatter ? labelFormatter(label) : String(label)}</div>
      )}
      {payload.map((item) => {
        const key = String(item.dataKey ?? item.name ?? "value");
        const entry = config[key];
        return (
          <div key={key} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="size-2 rounded-sm" style={{ background: item.color ?? `var(--color-${key})` }} />
              {entry?.label ?? String(item.name ?? key)}
            </span>
            <span className="font-medium tabular-nums">{String(item.value)}</span>
          </div>
        );
      })}
    </div>
  );
}

export const ChartLegend = RechartsPrimitive.Legend;

export function ChartLegendContent({
  payload,
  className,
}: {
  payload?: ReadonlyArray<{ dataKey?: unknown; value?: unknown; color?: string }>;
  className?: string;
}) {
  const { config } = useChart();
  if (!payload?.length) return null;
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      {payload.map((item) => {
        const key = String(item.dataKey ?? item.value ?? "value");
        return (
          <div key={key} className="flex items-center gap-1.5 text-muted-foreground">
            <span className="size-2 rounded-sm" style={{ background: item.color ?? `var(--color-${key})` }} />
            {config[key]?.label ?? String(item.value)}
          </div>
        );
      })}
    </div>
  );
}
