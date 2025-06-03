import { Slot } from "@radix-ui/react-slot"

import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

interface CardProps extends ComponentProps<"div"> {
  asChild?: boolean
}

export function StickyLayout({ className, asChild, ...props }: CardProps) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="sticky-layout"
      className={cn("grid items-start gap-4 lg:grid-cols-2", className)}
      {...props}
    />
  )
}

export function StickyLayoutPane({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="sticky-layout-pane"
      className={cn(
        "top-20 flex flex-col items-center text-center space-y-1.5 lg:sticky lg:block lg:text-start",
        className
      )}
      {...props}
    />
  )
}

export function StickyLayoutContent({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="sticky-layout-content"
      className={cn("space-y-4", className)}
      {...props}
    />
  )
}
