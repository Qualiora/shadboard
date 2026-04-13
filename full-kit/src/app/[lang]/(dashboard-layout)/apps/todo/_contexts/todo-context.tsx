"use client"

import { createContext, useMemo, useReducer, useState } from "react"

import type { ReactNode } from "react"
import type {
  TodoContextType,
  TodoLabelType,
  TodoListType,
  TodoTaskType,
  TodoTaskWithoutIdAndOrderType,
} from "../types"

import { TodoReducer } from "../_reducers/todo-reducer"

export const TodoContext = createContext<TodoContextType | undefined>(undefined)

interface TodoProviderProps {
  todosData: TodoTaskType[]
  listsData: TodoListType[]
  labelsData: TodoLabelType[]
  children: ReactNode
}

export function TodoProvider({
  todosData,
  listsData,
  labelsData,
  children,
}: TodoProviderProps) {
  const [todoState, dispatch] = useReducer(TodoReducer, {
    tasks: todosData,
    lists: listsData,
    labels: labelsData,
    activeListId: "all",
    selectedTask: undefined,
    searchTerm: "",
  })

  const [isTodoSidebarOpen, setIsTodoSidebarOpen] = useState(false)
  const [todoAddTaskSidebarIsOpen, setTodoAddTaskSidebarIsOpen] =
    useState(false)
  const [todoUpdateTaskSidebarIsOpen, setTodoUpdateTaskSidebarIsOpen] =
    useState(false)
  const [todoAddListDialogIsOpen, setTodoAddListDialogIsOpen] = useState(false)

  const filteredTasks = useMemo(() => {
    const { tasks, activeListId, searchTerm } = todoState
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    let filtered: TodoTaskType[]

    switch (activeListId) {
      case "all":
        filtered = tasks.filter((t) => !t.completed)
        break
      case "today":
        filtered = tasks.filter(
          (t) => t.dueDate && t.dueDate >= today && t.dueDate < tomorrow
        )
        break
      case "upcoming":
        filtered = tasks.filter((t) => t.dueDate && t.dueDate >= tomorrow)
        break
      case "completed":
        filtered = tasks.filter((t) => t.completed)
        break
      case "high-priority":
        filtered = tasks.filter((t) => t.priority === "high" && !t.completed)
        break
      default:
        filtered = tasks.filter((t) => t.listId === activeListId)
        break
    }

    if (searchTerm) {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered.sort((a, b) => a.order - b.order)
  }, [todoState])

  const handleAddTask = (task: TodoTaskWithoutIdAndOrderType) => {
    dispatch({ type: "addTask", task })
  }

  const handleUpdateTask = (task: TodoTaskType) => {
    dispatch({ type: "updateTask", task })
  }

  const handleDeleteTask = (taskId: string) => {
    dispatch({ type: "deleteTask", taskId })
  }

  const handleToggleTaskCompleted = (taskId: string) => {
    dispatch({ type: "toggleTaskCompleted", taskId })
  }

  const handleReorderTasks = (
    sourceIndex: number,
    destinationIndex: number
  ) => {
    if (sourceIndex === destinationIndex) return
    dispatch({ type: "reorderTasks", sourceIndex, destinationIndex })
  }

  const handleSetActiveList = (listId: string) => {
    dispatch({ type: "setActiveList", listId })
  }

  const handleSelectTask = (task?: TodoTaskType) => {
    dispatch({ type: "selectTask", task })
  }

  const handleSetSearchTerm = (term: string) => {
    dispatch({ type: "setSearchTerm", term })
  }

  const handleAddList = (list: Omit<TodoListType, "id">) => {
    dispatch({ type: "addList", list })
  }

  const handleDeleteList = (listId: string) => {
    dispatch({ type: "deleteList", listId })
  }

  return (
    <TodoContext.Provider
      value={{
        todoState,
        filteredTasks,
        isTodoSidebarOpen,
        setIsTodoSidebarOpen,
        todoAddTaskSidebarIsOpen,
        setTodoAddTaskSidebarIsOpen,
        todoUpdateTaskSidebarIsOpen,
        setTodoUpdateTaskSidebarIsOpen,
        todoAddListDialogIsOpen,
        setTodoAddListDialogIsOpen,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,
        handleToggleTaskCompleted,
        handleReorderTasks,
        handleSetActiveList,
        handleSelectTask,
        handleSetSearchTerm,
        handleAddList,
        handleDeleteList,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
