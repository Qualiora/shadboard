"use client"

import { Card } from "@/components/ui/card"
import { TodoAddTaskButton } from "./todo-add-task-button"
import { TodoContentHeader } from "./todo-content-header"
import { TodoSheet } from "./todo-sheet"
import { TodoTaskList } from "./todo-task-list"

export function Todo() {
  return (
    <Card className="flex flex-1 flex-col overflow-hidden">
      <TodoContentHeader />
      <TodoTaskList />
      <TodoAddTaskButton />
      <TodoSheet />
    </Card>
  )
}
