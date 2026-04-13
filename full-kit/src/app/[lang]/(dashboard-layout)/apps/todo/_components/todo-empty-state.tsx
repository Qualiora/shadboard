"use client"

import { ListTodo } from "lucide-react"

export function TodoEmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center text-muted-foreground">
      <ListTodo className="h-12 w-12" />
      <p className="text-sm font-medium">No tasks found</p>
      <p className="text-xs">Add a new task or try a different filter.</p>
    </div>
  )
}
