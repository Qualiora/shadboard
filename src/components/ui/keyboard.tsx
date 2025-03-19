import { forwardRef } from "react"

import type { HTMLProps } from "react"

import { cn } from "@/lib/utils"

export interface KeyboardProps extends HTMLProps<HTMLElement> {}

const Keyboard = forwardRef<HTMLElement, KeyboardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          "pointer-events-none select-none h-5 inline-flex items-center gap-x-1 px-1.5 bg-muted text-xs text-muted-foreground font-mono font-medium border rounded-sm",
          "before:content-['⌘']",
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    )
  }
)
Keyboard.displayName = "Keyboard"

export { Keyboard }
