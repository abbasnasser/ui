"use client";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { buttonVariants } from "./button";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { cn } from "./utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/** A date grid built on react-day-picker. Pass `mode="single"` or `mode="range"` as usual. */
export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 text-[13px]", className)}
      classNames={{
        months: "flex flex-col gap-4",
        month: "flex flex-col gap-3",
        month_caption: "flex h-8 items-center justify-center text-[13px] font-medium",
        nav: "absolute inset-x-3 top-3 flex items-center justify-between",
        button_previous: cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-8 p-0"),
        button_next: cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-8 p-0"),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 text-[12px] font-normal text-muted-foreground",
        week: "mt-1 flex w-full",
        day: "relative p-0 text-center",
        day_button: cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-9 p-0 font-normal aria-selected:opacity-100"),
        selected: "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary",
        today: "[&>button]:border [&>button]:border-border",
        outside: "text-subtle-foreground opacity-60",
        disabled: "opacity-40",
        range_middle: "[&>button]:rounded-none [&>button]:bg-muted",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />,
      }}
      {...props}
    />
  );
}
