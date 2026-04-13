import type { DynamicIconNameType } from "@/types"
import type { z } from "zod"
import type { TodoTaskSchema } from "./_schemas/todo-task-schema"

export type PriorityType = "none" | "low" | "medium" | "high"

export interface TodoLabelType {
  id: string
  name: string
  color: string
}

export interface TodoListType {
  id: string
  title: string
  iconName: DynamicIconNameType
}

export interface TodoTaskType {
  id: string
  listId: string
  order: number
  title: string
  description?: string
  completed: boolean
  priority: PriorityType
  dueDate?: Date
  labels: TodoLabelType[]
  createdAt: Date
}

export interface TodoSidebarSmartItemType {
  id: string
  title: string
  iconName: DynamicIconNameType
  filter: string
}

export type TodoTaskWithoutIdAndOrderType = Omit<TodoTaskType, "id" | "order">

export interface TodoStateType {
  tasks: TodoTaskType[]
  lists: TodoListType[]
  labels: TodoLabelType[]
  activeListId: string
  selectedTask?: TodoTaskType
  searchTerm: string
}

export type TodoActionType =
  | { type: "addTask"; task: TodoTaskWithoutIdAndOrderType }
  | { type: "updateTask"; task: TodoTaskType }
  | { type: "deleteTask"; taskId: string }
  | { type: "toggleTaskCompleted"; taskId: string }
  | { type: "reorderTasks"; sourceIndex: number; destinationIndex: number }
  | { type: "setActiveList"; listId: string }
  | { type: "selectTask"; task?: TodoTaskType }
  | { type: "setSearchTerm"; term: string }
  | { type: "addList"; list: Omit<TodoListType, "id"> }
  | { type: "deleteList"; listId: string }

export interface TodoContextType {
  todoState: TodoStateType
  filteredTasks: TodoTaskType[]
  isTodoSidebarOpen: boolean
  setIsTodoSidebarOpen: (value: boolean) => void
  todoAddTaskSidebarIsOpen: boolean
  setTodoAddTaskSidebarIsOpen: (value: boolean) => void
  todoUpdateTaskSidebarIsOpen: boolean
  setTodoUpdateTaskSidebarIsOpen: (value: boolean) => void
  todoAddListDialogIsOpen: boolean
  setTodoAddListDialogIsOpen: (value: boolean) => void
  handleAddTask: (task: TodoTaskWithoutIdAndOrderType) => void
  handleUpdateTask: (task: TodoTaskType) => void
  handleDeleteTask: (taskId: string) => void
  handleToggleTaskCompleted: (taskId: string) => void
  handleReorderTasks: (sourceIndex: number, destinationIndex: number) => void
  handleSetActiveList: (listId: string) => void
  handleSelectTask: (task?: TodoTaskType) => void
  handleSetSearchTerm: (term: string) => void
  handleAddList: (list: Omit<TodoListType, "id">) => void
  handleDeleteList: (listId: string) => void
}

export type TodoTaskFormType = z.infer<typeof TodoTaskSchema>
