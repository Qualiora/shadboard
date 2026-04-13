"use client"

import { Menu } from "lucide-react"

import { useTodoContext } from "../_hooks/use-todo-context"
import { Button } from "@/components/ui/button"

export function TodoMenuButton() {
  const { setIsTodoSidebarOpen } = useTodoContext()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden h-8 w-8"
      onClick={() => setIsTodoSidebarOpen(true)}
      aria-label="Open sidebar"
    >
      <Menu className="h-4 w-4" />
    </Button>
  )
}
