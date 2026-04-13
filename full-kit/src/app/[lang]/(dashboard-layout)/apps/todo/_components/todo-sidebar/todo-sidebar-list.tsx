"use client"

import { isToday } from "date-fns"

import { smartListsData } from "../../_data/smart-lists"

import { useTodoContext } from "../../_hooks/use-todo-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { TodoSidebarItem } from "./todo-sidebar-item"

export function TodoSidebarList() {
  const { todoState } = useTodoContext()
  const { tasks, lists } = todoState

  function getSmartListCount(filter: string): number {
    switch (filter) {
      case "all":
        return tasks.filter((t) => !t.completed).length
      case "today":
        return tasks.filter((t) => t.dueDate && isToday(t.dueDate)).length
      case "upcoming": {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0, 0, 0, 0)
        return tasks.filter((t) => t.dueDate && t.dueDate >= tomorrow).length
      }
      case "completed":
        return tasks.filter((t) => t.completed).length
      case "high-priority":
        return tasks.filter((t) => t.priority === "high" && !t.completed).length
      default:
        return 0
    }
  }

  function getListCount(listId: string): number {
    return tasks.filter((t) => t.listId === listId && !t.completed).length
  }

  return (
    <ScrollArea className="flex-1">
      <nav className="px-2 pb-2">
        <ul className="space-y-1">
          {smartListsData.map((item) => (
            <TodoSidebarItem
              key={item.id}
              id={item.id}
              title={item.title}
              iconName={item.iconName}
              count={getSmartListCount(item.filter)}
            />
          ))}
        </ul>
        {lists.length > 0 && (
          <>
            <Separator className="my-2" />
            <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
              My Lists
            </p>
            <ul className="space-y-1">
              {lists.map((list) => (
                <TodoSidebarItem
                  key={list.id}
                  id={list.id}
                  title={list.title}
                  iconName={list.iconName}
                  count={getListCount(list.id)}
                />
              ))}
            </ul>
          </>
        )}
      </nav>
    </ScrollArea>
  )
}
