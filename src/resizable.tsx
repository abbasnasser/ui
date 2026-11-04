"use client";
import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "./utils";

export function ResizablePanelGroup({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.Group>) {
  return <ResizablePrimitive.Group className={cn("flex h-full w-full", className)} {...props} />;
}

export const ResizablePanel = ResizablePrimitive.Panel;

export function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Separator> & { withHandle?: boolean }) {
  return (
    <ResizablePrimitive.Separator
      className={cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {withHandle && <div className="z-10 h-4 w-3 rounded-sm border border-border bg-background" />}
    </ResizablePrimitive.Separator>
  );
}
