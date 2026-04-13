import type { ReactNode } from "react"
import type { TodoLabelType, TodoListType, TodoTaskType } from "../types"

import { TodoProvider } from "../_contexts/todo-context"
import { TodoSidebar } from "./todo-sidebar"

interface TodoWrapperProps {
  todosData: TodoTaskType[]
  listsData: TodoListType[]
  labelsData: TodoLabelType[]
  children: ReactNode
}

export function TodoWrapper({
  todosData,
  listsData,
  labelsData,
  children,
}: TodoWrapperProps) {
  return (
    <TodoProvider
      todosData={todosData}
      listsData={listsData}
      labelsData={labelsData}
    >
      <section className="container flex h-full w-full gap-4 p-4">
        <TodoSidebar />
        {children}
      </section>
    </TodoProvider>
  )
}
