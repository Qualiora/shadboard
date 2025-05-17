"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type MultipleDatesPickerProps = Omit<
  ComponentProps<typeof Calendar>,
  "mode" | "selected" | "onSelect"
> & {
  value?: Date[]
  onValueChange: (dates?: Date[]) => void
  formatStr?: string
  popoverContentClassName?: string
  popoverContentOptions?: ComponentProps<typeof PopoverContent>
  buttonClassName?: string
  buttonOptions?: ComponentProps<typeof Button>
  placeholder?: string
}

export function MultipleDatesPicker({
  value,
  onValueChange,
  formatStr = "yyyy-MM-dd p",
  popoverContentClassName,
  popoverContentOptions,
  buttonClassName,
  buttonOptions,
  placeholder = "Pick dates",
  ...props
}: MultipleDatesPickerProps) {
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full px-3 text-start font-normal h-auto", buttonClassName)}
          {...buttonOptions}
        >
          {value && value.length > 0 ? (
            <span className="flex flex-wrap basis-[fit-content]">
              {value?.map((date, index) => (
                <div
                  className="d-inline-block me-1 mb-1 rounded-md border px-2.5 py-0.5 text-foreground text-xs lg:text-sm"
                  key={index}
                >
                  {format(date, formatStr)}
                </div>
              ))}
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <CalendarIcon className="ms-auto h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-auto p-0", popoverContentClassName)}
        align="start"
        {...popoverContentOptions}
      >
        <Calendar
          mode="multiple"
          selected={value}
          onSelect={onValueChange}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}
