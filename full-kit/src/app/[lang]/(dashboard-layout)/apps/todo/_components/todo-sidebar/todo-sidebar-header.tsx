"use client"

import { Plus } from "lucide-react"

import { useTodoContext } from "../../_hooks/use-todo-context"
import { Button } from "@/components/ui/button"

export function TodoSidebarHeader() {
  const { setTodoAddListDialogIsOpen } = useTodoContext()

  return (
    <div className="flex items-center justify-between p-4">
      <h2 className="text-lg font-semibold">Todo</h2>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setTodoAddListDialogIsOpen(true)}
        aria-label="New list"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
