"use client"

import { useMedia } from "react-use"

import { useTodoContext } from "../../_hooks/use-todo-context"
import { Card } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { TodoSidebarHeader } from "./todo-sidebar-header"
import { TodoSidebarList } from "./todo-sidebar-list"

export function TodoSidebar() {
  const { isTodoSidebarOpen, setIsTodoSidebarOpen } = useTodoContext()
  const isMediumOrSmaller = useMedia("(max-width: 767px)")

  const content = (
    <>
      <TodoSidebarHeader />
      <TodoSidebarList />
    </>
  )

  if (!isMediumOrSmaller) {
    return (
      <aside>
        <Card className="h-full w-72 flex flex-col border border-border">
          {content}
        </Card>
      </aside>
    )
  }

  return (
    <Sheet open={isTodoSidebarOpen} onOpenChange={setIsTodoSidebarOpen}>
      <SheetContent side="start" className="p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Todo Sidebar</SheetTitle>
          <SheetDescription>
            Navigate your todo lists and smart filters.
          </SheetDescription>
        </SheetHeader>
        {content}
      </SheetContent>
    </Sheet>
  )
}
