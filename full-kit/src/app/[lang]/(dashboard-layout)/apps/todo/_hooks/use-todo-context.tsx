"use client"

import { useContext } from "react"

import { TodoContext } from "../_contexts/todo-context"

export function useTodoContext() {
  const context = useContext(TodoContext)

  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider")
  }

  return context
}
