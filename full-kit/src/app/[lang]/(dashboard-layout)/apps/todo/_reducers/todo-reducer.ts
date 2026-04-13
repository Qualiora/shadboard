import type { TodoActionType, TodoStateType } from "../types"

export function TodoReducer(
  state: TodoStateType,
  action: TodoActionType
): TodoStateType {
  switch (action.type) {
    case "addTask": {
      const tasksInList = state.tasks.filter(
        (t) => t.listId === action.task.listId
      )
      const newTask = {
        ...action.task,
        id: crypto.randomUUID(),
        order: tasksInList.length,
      }
      return { ...state, tasks: [...state.tasks, newTask] }
    }

    case "updateTask": {
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.task.id ? action.task : t
        ),
      }
    }

    case "deleteTask": {
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.taskId),
      }
    }

    case "toggleTaskCompleted": {
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.taskId ? { ...t, completed: !t.completed } : t
        ),
      }
    }

    case "reorderTasks": {
      const { sourceIndex, destinationIndex } = action
      if (sourceIndex === destinationIndex) return state

      // We work with the full task array but need to identify which tasks
      // are in the current filtered view to reorder correctly
      const tasks = [...state.tasks]
      const filteredIds = getFilteredTaskIds(state)
      const sourceId = filteredIds[sourceIndex]
      const destId = filteredIds[destinationIndex]

      const sourceGlobalIndex = tasks.findIndex((t) => t.id === sourceId)
      const destGlobalIndex = tasks.findIndex((t) => t.id === destId)

      if (sourceGlobalIndex === -1 || destGlobalIndex === -1) return state

      const [moved] = tasks.splice(sourceGlobalIndex, 1)
      tasks.splice(destGlobalIndex, 0, moved)

      // Recalculate order for tasks in the same list
      const listId = moved.listId
      let order = 0
      const reordered = tasks.map((t) => {
        if (t.listId === listId) {
          return { ...t, order: order++ }
        }
        return t
      })

      return { ...state, tasks: reordered }
    }

    case "setActiveList": {
      return { ...state, activeListId: action.listId }
    }

    case "selectTask": {
      return { ...state, selectedTask: action.task }
    }

    case "setSearchTerm": {
      return { ...state, searchTerm: action.term }
    }

    case "addList": {
      const newList = {
        ...action.list,
        id: crypto.randomUUID(),
      }
      return { ...state, lists: [...state.lists, newList] }
    }

    case "deleteList": {
      return {
        ...state,
        lists: state.lists.filter((l) => l.id !== action.listId),
        tasks: state.tasks.filter((t) => t.listId !== action.listId),
        activeListId:
          state.activeListId === action.listId ? "all" : state.activeListId,
      }
    }

    default:
      return state
  }
}

function getFilteredTaskIds(state: TodoStateType): string[] {
  const { tasks, activeListId } = state
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  let filtered: typeof tasks

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

  return filtered.map((t) => t.id)
}
