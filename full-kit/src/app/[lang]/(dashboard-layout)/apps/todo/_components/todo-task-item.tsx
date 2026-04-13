"use client"

import { Draggable } from "@hello-pangea/dnd"
import { format } from "date-fns"
import { CalendarDays, GripVertical } from "lucide-react"

import type { TodoTaskType } from "../types"

import { cn } from "@/lib/utils"

import { useTodoContext } from "../_hooks/use-todo-context"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { TodoTaskItemActions } from "./todo-task-item-actions"

interface TodoTaskItemProps {
  task: TodoTaskType
  index: number
}

export function TodoTaskItem({ task, index }: TodoTaskItemProps) {
  const { handleToggleTaskCompleted } = useTodoContext()

  const priorityVariant: Record<string, string> = {
    high: "bg-red-500/10 text-red-600 border-red-200",
    medium: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
    low: "bg-green-500/10 text-green-600 border-green-200",
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="flex items-start gap-3 rounded-md border border-border bg-card p-3 shadow-sm"
        >
          <button
            {...provided.dragHandleProps}
            className="mt-0.5 cursor-grab text-muted-foreground hover:text-foreground"
            aria-label="Drag to reorder"
          >
            <GripVertical className="h-4 w-4" />
          </button>

          <Checkbox
            checked={task.completed}
            onCheckedChange={() => handleToggleTaskCompleted(task.id)}
            className="mt-0.5"
            aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
          />

          <div className="flex-1 min-w-0 space-y-1">
            <p
              className={cn(
                "text-sm font-medium leading-none",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </p>

            {task.description && (
              <p className="text-xs text-muted-foreground line-clamp-1">
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-1.5">
              {task.priority !== "none" && (
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] px-1.5 py-0",
                    priorityVariant[task.priority]
                  )}
                >
                  {task.priority}
                </Badge>
              )}

              {task.dueDate && (
                <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  {format(task.dueDate, "MMM d")}
                </span>
              )}

              {task.labels.map((label) => (
                <span
                  key={label.id}
                  className={cn(
                    "inline-block h-2 w-2 rounded-full",
                    label.color
                  )}
                  title={label.name}
                />
              ))}
            </div>
          </div>

          <TodoTaskItemActions task={task} />
        </div>
      )}
    </Draggable>
  )
}
