"use client"

import { Search } from "lucide-react"

import { useTodoContext } from "../_hooks/use-todo-context"
import { Input } from "@/components/ui/input"

export function TodoSearchForm() {
  const { todoState, handleSetSearchTerm } = useTodoContext()

  return (
    <div className="relative">
      <Search className="absolute start-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search tasks..."
        value={todoState.searchTerm}
        onChange={(e) => handleSetSearchTerm(e.target.value)}
        className="h-9 ps-8"
      />
    </div>
  )
}
