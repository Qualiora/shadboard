"use client"

import { DragDropContext, Droppable } from "@hello-pangea/dnd"

import type { DropResult } from "@hello-pangea/dnd"

import { useTodoContext } from "../_hooks/use-todo-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TodoEmptyState } from "./todo-empty-state"
import { TodoTaskItem } from "./todo-task-item"

export function TodoTaskList() {
  const { filteredTasks, handleReorderTasks } = useTodoContext()

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result

    if (!destination) return
    if (source.index === destination.index) return

    handleReorderTasks(source.index, destination.index)
  }

  if (filteredTasks.length === 0) {
    return <TodoEmptyState />
  }

  return (
    <ScrollArea className="flex-1">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todo-list">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-2 p-4"
            >
              {filteredTasks.map((task, index) => (
                <TodoTaskItem key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ScrollArea>
  )
}
