"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import type { CalendarProps } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type DatePickerProps = CalendarProps & {
  value?: Date;
  onValueChange?: (date?: Date) => void;
  formatStr?: string;
  popoverContentClassName?: string;
  buttonClassName?: string;
  placeholder?: string;
};

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      onValueChange,
      formatStr = "yyyy-MM-dd",
      popoverContentClassName,
      buttonClassName,
      placeholder = "Pick date",
      ...props
    },
    ref
  ) => {
    return (
      <Popover modal>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            className={cn(
              "w-full px-3 text-start font-normal",
              buttonClassName
            )}
          >
            {value ? (
              format(value, formatStr)
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <CalendarIcon className="ms-auto h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-auto p-0", popoverContentClassName)}
          align="start"
        >
          <Calendar
            initialFocus
            {...props}
            mode="single"
            selected={value}
            onSelect={onValueChange}
          />
        </PopoverContent>
      </Popover>
    );
  }
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
