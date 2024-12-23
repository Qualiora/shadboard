"use client";

import * as React from "react";

import { KanbanReducer } from "../reducers/kanban-reducer";

import type {
  ColumnType,
  ColumnWithoutIdAndOrderAndTasksType,
  KanbanContextType,
  TaskType,
  TaskWithoutIdAndOrderAndColumnIdType,
} from "../types";

// Create Kanban context
export const KanbanContext = React.createContext<KanbanContextType | undefined>(
  undefined
);

interface KanbanProviderProps {
  kanban: ColumnType[];
  children: React.ReactNode;
}

export function KanbanProvider({ kanban, children }: KanbanProviderProps) {
  // Reducer to manage Kanban state
  const [kanbanState, dispatch] = React.useReducer(KanbanReducer, {
    columns: kanban,
    selectedColumn: undefined,
    selectedTask: undefined,
  });

  // Sidebar state management
  const [kanbanAddTaskSidebarIsOpen, setKanbanAddTaskSidebarIsOpen] =
    React.useState(false);
  const [kanbanUpdateTaskSidebarIsOpen, setKanbanUpdateTaskSidebarIsOpen] =
    React.useState(false);
  const [kanbanAddColumnSidebarIsOpen, setKanbanAddColumnSidebarIsOpen] =
    React.useState(false);
  const [kanbanUpdateColumnSidebarIsOpen, setKanbanUpdateColumnSidebarIsOpen] =
    React.useState(false);

  // Handlers for column actions
  const handleAddColumn = (column: ColumnWithoutIdAndOrderAndTasksType) => {
    dispatch({ type: "addColumn", column });
  };

  const handleUpdateColumn = (column: ColumnType) => {
    dispatch({ type: "updateColumn", column });
  };

  const handleDeleteColumn = (columnId: ColumnType["id"]) => {
    dispatch({ type: "deleteColumn", columnId });
  };

  // Handlers for task actions
  const handleAddTask = (
    task: TaskWithoutIdAndOrderAndColumnIdType,
    columnId: ColumnType["id"]
  ) => {
    dispatch({ type: "addTask", task, columnId });
  };

  const handleUpdateTask = (task: TaskType) => {
    dispatch({ type: "updateTask", task });
  };

  const handleDeleteTask = (taskId: TaskType["id"]) => {
    dispatch({ type: "deleteTask", taskId });
  };

  // Reorder handlers
  const handleReorderColumns = (
    sourceIndex: number,
    destinationIndex: number
  ) => {
    if (sourceIndex === destinationIndex) return;

    dispatch({
      type: "reorderColumns",
      sourceIndex,
      destinationIndex,
    });
  };

  const handleReorderTasks = (
    sourceColumnId: string,
    sourceIndex: number,
    destinationColumnId: string,
    destinationIndex: number
  ) => {
    if (
      sourceColumnId === destinationColumnId &&
      sourceIndex === destinationIndex
    )
      return;

    dispatch({
      type: "reorderTasks",
      source: { columnId: sourceColumnId, index: sourceIndex },
      destination: { columnId: destinationColumnId, index: destinationIndex },
    });
  };

  // Selection handlers
  const handleSelectColumn = (column: ColumnType | undefined) => {
    dispatch({ type: "selectColumn", column });
  };

  const handleSelectTask = (task: TaskType | undefined) => {
    dispatch({ type: "selectTask", task });
  };

  return (
    <KanbanContext.Provider
      value={{
        kanbanState,
        kanbanAddTaskSidebarIsOpen,
        setKanbanAddTaskSidebarIsOpen,
        kanbanUpdateTaskSidebarIsOpen,
        setKanbanUpdateTaskSidebarIsOpen,
        kanbanAddColumnSidebarIsOpen,
        setKanbanAddColumnSidebarIsOpen,
        kanbanUpdateColumnSidebarIsOpen,
        setKanbanUpdateColumnSidebarIsOpen,
        handleAddColumn,
        handleUpdateColumn,
        handleDeleteColumn,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,
        handleReorderColumns,
        handleReorderTasks,
        handleSelectColumn,
        handleSelectTask,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}
