"use client"

import { smartListsData } from "../_data/smart-lists"

import { useTodoContext } from "../_hooks/use-todo-context"
import { TodoMenuButton } from "./todo-menu-button"
import { TodoSearchForm } from "./todo-search-form"

export function TodoContentHeader() {
  const { todoState } = useTodoContext()

  const smartList = smartListsData.find((s) => s.id === todoState.activeListId)
  const customList = todoState.lists.find(
    (l) => l.id === todoState.activeListId
  )
  const title = smartList?.title ?? customList?.title ?? "All Tasks"

  return (
    <div className="flex items-center gap-2 p-4 border-b border-border">
      <TodoMenuButton />
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="ms-auto w-full max-w-xs">
        <TodoSearchForm />
      </div>
    </div>
  )
}
