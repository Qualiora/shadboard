"use client"

import { useEffect, useId, useImperativeHandle, useRef, useState } from "react"
import { X } from "lucide-react"

import type { ComponentProps, KeyboardEvent } from "react"

import { cn } from "@/lib/utils"

import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./button"
import { ScrollArea } from "./scroll-area"

export interface InputTagsProps extends ComponentProps<"input"> {
  placeholder?: string
  tags: string[]
  onTagsChange: (tags: string[]) => void
  className?: string
}

export function InputTags({
  placeholder,
  tags,
  onTagsChange,
  className,
  ...props
}: InputTagsProps) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Forward the ref to the internal ref
  useImperativeHandle(props.ref, () => inputRef.current!)

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange([...tags, trimmedTag])
    }
    setInputValue("")
  }

  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  return (
    <div
      data-slot="input-tags"
      className={cn(
        "min-h-9 w-full flex flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center rounded-full bg-secondary px-3 py-0.5 text-sm font-medium text-secondary-foreground"
        >
          {tag}
          <Button
            variant="ghost"
            onClick={(e) => {
              e.preventDefault()
              removeTag(index)
            }}
            className="size-auto p-0.5 ms-0.5 -me-1 rounded-full hover:bg-secondary-foreground/20"
            aria-label="Remove"
          >
            <X className="h-3 w-3" />
          </Button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        className="w-0 flex-1 bg-transparent outline-hidden placeholder:text-muted-foreground"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(inputValue)}
        placeholder={tags.length === 0 ? placeholder : ""}
        {...props}
      />
    </div>
  )
}

interface InputTagsWithSuggestionsProps extends ComponentProps<"input"> {
  placeholder?: string
  tags: string[]
  suggestions: string[]
  onTagsChange: (tags: string[]) => void
  className?: string
}

export function InputTagsWithSuggestions({
  placeholder,
  tags,
  suggestions,
  onTagsChange,
  className,
  ...props
}: InputTagsWithSuggestionsProps) {
  const listboxId = useId()
  const [inputValue, setInputValue] = useState("")
  const [open, setOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [popoverWidth, setPopoverWidth] = useState<number | undefined>(
    undefined
  )

  useEffect(() => {
    if (containerRef.current) {
      setPopoverWidth(containerRef.current.offsetWidth)
    }
  }, [open])

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(suggestion)
  )

  // Reset highlighted index when input value changes
  useEffect(() => {
    setHighlightedIndex(-1)
  }, [inputValue])

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("[cmdk-item]")
      items[highlightedIndex]?.scrollIntoView({ block: "nearest" })
    }
  }, [highlightedIndex])

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange([...tags, trimmedTag])
    }
    setInputValue("")
  }

  const removeTag = (indexToRemove: number) => {
    onTagsChange(tags.filter((_, index) => index !== indexToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (!open && filteredSuggestions.length > 0) {
        setOpen(true)
      }
      if (filteredSuggestions.length > 0) {
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        )
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (!open && filteredSuggestions.length > 0) {
        setOpen(true)
      }
      if (filteredSuggestions.length > 0) {
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        )
      }
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (
        highlightedIndex >= 0 &&
        highlightedIndex < filteredSuggestions.length
      ) {
        addTag(filteredSuggestions[highlightedIndex])
        setHighlightedIndex(-1)
      } else if (!open) {
        addTag(inputValue)
      }
    } else if (e.key === "Escape" && open) {
      setOpen(false)
      setHighlightedIndex(-1)
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  // Derive the highlighted value for cmdk's controlled selection
  const highlightedValue =
    highlightedIndex >= 0 ? (filteredSuggestions[highlightedIndex] ?? "") : ""

  return (
    <Popover
      modal
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) setHighlightedIndex(-1)
      }}
    >
      <PopoverTrigger asChild>
        <div
          data-slot="input-tags-with-suggestions"
          ref={containerRef}
          className={cn(
            "min-h-9 w-full flex flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            className
          )}
        >
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full bg-secondary px-3 py-0.5 text-sm font-medium text-secondary-foreground"
            >
              {tag}
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault()
                  removeTag(index)
                }}
                className="size-auto p-0.5 ms-0.5 -me-1 rounded-full hover:bg-secondary-foreground/20"
                aria-label="Remove"
              >
                <X className="h-3 w-3" />
              </Button>
            </span>
          ))}
          <input
            ref={props.ref}
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-autocomplete="list"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-0 flex-1 bg-transparent outline-hidden placeholder:text-muted-foreground"
            placeholder={tags.length === 0 ? placeholder : ""}
            {...props}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: popoverWidth ? `${popoverWidth}px` : "auto" }}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <ScrollArea className="flex flex-col max-h-[300px]">
          <Command
            shouldFilter={false}
            value={highlightedValue}
            onValueChange={() => {}}
          >
            <CommandList ref={listRef} id={listboxId} className="max-h-full">
              <CommandEmpty>No results found.</CommandEmpty>
              {filteredSuggestions.map((suggestion, index) => (
                <CommandItem
                  key={suggestion}
                  value={suggestion}
                  onMouseMove={() => setHighlightedIndex(index)}
                  onSelect={() => {
                    addTag(suggestion)
                    setHighlightedIndex(-1)
                  }}
                >
                  {suggestion}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
