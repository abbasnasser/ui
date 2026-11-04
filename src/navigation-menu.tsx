"use client";
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDownIcon } from "./icons";
import { cn } from "./utils";

export const NavigationMenu = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(function NavigationMenu({ className, children, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Root ref={ref} className={cn("relative z-10 flex max-w-max items-center justify-center", className)} {...props}>
      {children}
      <NavigationMenuPrimitive.Viewport className="absolute top-full left-0 mt-2 w-full overflow-hidden rounded-md border border-border bg-background shadow-md data-[state=closed]:hidden data-[state=open]:animate-in" />
    </NavigationMenuPrimitive.Root>
  );
});

export const NavigationMenuList = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(function NavigationMenuList({ className, ...props }, ref) {
  return <NavigationMenuPrimitive.List ref={ref} className={cn("flex items-center gap-1", className)} {...props} />;
});

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

export const NavigationMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(function NavigationMenuTrigger({ className, children, ...props }, ref) {
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn("group inline-flex h-9 items-center gap-1 rounded-md px-3 text-[13px] font-medium outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-muted", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="transition-transform group-data-[state=open]:rotate-180" />
    </NavigationMenuPrimitive.Trigger>
  );
});

export const NavigationMenuContent = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(function NavigationMenuContent({ className, ...props }, ref) {
  return <NavigationMenuPrimitive.Content ref={ref} className={cn("p-2", className)} {...props} />;
});

export const NavigationMenuLink = NavigationMenuPrimitive.Link;
