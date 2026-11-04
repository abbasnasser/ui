"use client";
import * as React from "react";
import * as DirectionPrimitive from "@radix-ui/react-direction";

type DirectionProviderProps = React.ComponentProps<typeof DirectionPrimitive.Provider>;

/** Sets the text direction (LTR or RTL) for Radix components below it. */
export function DirectionProvider(props: DirectionProviderProps) {
  return <DirectionPrimitive.Provider {...props} />;
}

export function useDirection(localDir?: "ltr" | "rtl") {
  return DirectionPrimitive.useDirection(localDir);
}
