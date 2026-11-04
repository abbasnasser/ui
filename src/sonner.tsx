"use client";
import * as React from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/** Mount once near the root of the app. Call `toast(...)` from the `sonner` package anywhere. */
export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast border-border bg-background text-foreground shadow-md text-[13px]",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-muted text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}
