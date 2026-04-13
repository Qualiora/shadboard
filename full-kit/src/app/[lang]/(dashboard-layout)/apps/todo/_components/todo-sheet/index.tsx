import { TodoAddListDialog } from "./todo-add-list-dialog"
import { TodoAddTaskSidebar } from "./todo-add-task-sidebar"
import { TodoUpdateTaskSidebar } from "./todo-update-task-sidebar"

export function TodoSheet() {
  return (
    <>
      <TodoAddTaskSidebar />
      <TodoUpdateTaskSidebar />
      <TodoAddListDialog />
    </>
  )
}
