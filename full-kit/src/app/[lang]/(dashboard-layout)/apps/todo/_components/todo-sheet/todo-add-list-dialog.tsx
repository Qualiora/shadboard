"use client"

import { useState } from "react"
import { ListPlus } from "lucide-react"

import type { DynamicIconNameType } from "@/types"

import { useTodoContext } from "../../_hooks/use-todo-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const iconOptions: { value: DynamicIconNameType; label: string }[] = [
  { value: "List", label: "List" },
  { value: "User", label: "Person" },
  { value: "Briefcase", label: "Work" },
  { value: "ShoppingCart", label: "Shopping" },
  { value: "Heart", label: "Heart" },
  { value: "Star", label: "Star" },
  { value: "House", label: "Home" },
  { value: "BookOpen", label: "Book" },
  { value: "Music2", label: "Music" },
  { value: "PlaneTakeoff", label: "Travel" },
]

export function TodoAddListDialog() {
  const { todoAddListDialogIsOpen, setTodoAddListDialogIsOpen, handleAddList } =
    useTodoContext()

  const [title, setTitle] = useState("")
  const [iconName, setIconName] = useState<DynamicIconNameType>("List")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return

    handleAddList({ title: trimmed, iconName })
    setTitle("")
    setIconName("List")
    setTodoAddListDialogIsOpen(false)
  }

  return (
    <Dialog
      open={todoAddListDialogIsOpen}
      onOpenChange={setTodoAddListDialogIsOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New List</DialogTitle>
          <DialogDescription>Create a new todo list.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="list-title">Title</Label>
            <Input
              id="list-title"
              placeholder="List name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="list-icon">Icon</Label>
            <Select
              value={iconName}
              onValueChange={(v) => setIconName(v as DynamicIconNameType)}
            >
              <SelectTrigger id="list-icon">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={!title.trim()} className="w-full">
            <ListPlus className="me-2 h-4 w-4" />
            Create List
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
