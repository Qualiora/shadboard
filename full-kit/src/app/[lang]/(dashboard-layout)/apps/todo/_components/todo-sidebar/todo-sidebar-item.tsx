"use client"

import type { DynamicIconNameType } from "@/types"

import { cn } from "@/lib/utils"

import { useTodoContext } from "../../_hooks/use-todo-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DynamicIcon } from "@/components/dynamic-icon"

interface TodoSidebarItemProps {
  id: string
  title: string
  iconName: DynamicIconNameType
  count: number
}

export function TodoSidebarItem({
  id,
  title,
  iconName,
  count,
}: TodoSidebarItemProps) {
  const { todoState, handleSetActiveList, setIsTodoSidebarOpen } =
    useTodoContext()

  const isActive = todoState.activeListId === id

  return (
    <li>
      <Button
        variant="ghost"
        className={cn("w-full justify-start", isActive && "bg-accent")}
        onClick={() => {
          handleSetActiveList(id)
          setIsTodoSidebarOpen(false)
        }}
      >
        <DynamicIcon name={iconName} className="me-2 h-4 w-4" />
        <span>{title}</span>
        {count > 0 && (
          <Badge variant="secondary" className="ms-auto">
            {count}
          </Badge>
        )}
      </Button>
    </li>
  )
}
