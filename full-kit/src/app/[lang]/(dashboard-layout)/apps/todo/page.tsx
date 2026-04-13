import type { Metadata } from "next"

import { labelsData } from "./_data/labels"
import { listsData } from "./_data/lists"
import { todosData } from "./_data/todos"

import { Todo } from "./_components/todo"
import { TodoWrapper } from "./_components/todo-wrapper"

// Define metadata for the page
// More info: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: "Todo",
}

export default function TodoPage() {
  return (
    <TodoWrapper
      todosData={todosData}
      listsData={listsData}
      labelsData={labelsData}
    >
      <Todo />
    </TodoWrapper>
  )
}
