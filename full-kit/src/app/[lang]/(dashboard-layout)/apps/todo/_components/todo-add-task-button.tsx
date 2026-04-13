"use client"

import { Plus } from "lucide-react"

import { useTodoContext } from "../_hooks/use-todo-context"
import { Button } from "@/components/ui/button"

export function TodoAddTaskButton() {
  const { setTodoAddTaskSidebarIsOpen } = useTodoContext()

  return (
    <div className="p-4 border-t border-border">
      <Button
        variant="ghost"
        className="w-full justify-start text-muted-foreground"
        onClick={() => setTodoAddTaskSidebarIsOpen(true)}
      >
        <Plus className="me-2 h-4 w-4" />
        Add Task
      </Button>
    </div>
  )
}
