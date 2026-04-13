"use client"

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import type { TodoTaskType } from "../types"

import { useTodoContext } from "../_hooks/use-todo-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TodoTaskItemActionsProps {
  task: TodoTaskType
}

export function TodoTaskItemActions({ task }: TodoTaskItemActionsProps) {
  const { handleSelectTask, handleDeleteTask, setTodoUpdateTaskSidebarIsOpen } =
    useTodoContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0"
          aria-label="Task actions"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            handleSelectTask(task)
            setTodoUpdateTaskSidebarIsOpen(true)
          }}
        >
          <Pencil className="me-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => handleDeleteTask(task.id)}
        >
          <Trash2 className="me-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
