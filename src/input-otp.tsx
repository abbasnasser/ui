"use client";
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "./utils";

export const InputOTP = React.forwardRef<
  React.ComponentRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(function InputOTP({ className, containerClassName, ...props }, ref) {
  return (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
});

export function InputOTPGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center", className)} {...props} />;
}

export function InputOTPSlot({ index, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { index: number }) {
  const otp = React.useContext(OTPInputContext);
  const slot = otp.slots[index];
  const char = slot?.char;
  const hasFakeCaret = slot?.hasFakeCaret ?? false;
  const isActive = slot?.isActive ?? false;
  return (
    <div
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-[13px] first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-pulse bg-foreground" />
        </div>
      )}
    </div>
  );
}

export function InputOTPSeparator(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div role="separator" {...props}>
      <span aria-hidden="true" className="px-1 text-muted-foreground">-</span>
    </div>
  );
}
