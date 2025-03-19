"use client"

import { forwardRef } from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import type { ComponentPropsWithoutRef, ElementRef } from "react"

import { cn } from "@/lib/utils"

const Progress = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, max, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-lg bg-primary/20",
      className
    )}
    max={max}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{
        transform: `translateX(-${100 - ((value || 0) / (max || 100)) * 100}%)`,
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
