import type { TodoSidebarSmartItemType } from "../types"

export const smartListsData: TodoSidebarSmartItemType[] = [
  {
    id: "all",
    title: "All Tasks",
    iconName: "ListTodo",
    filter: "all",
  },
  {
    id: "today",
    title: "Today",
    iconName: "CalendarDays",
    filter: "today",
  },
  {
    id: "upcoming",
    title: "Upcoming",
    iconName: "CalendarClock",
    filter: "upcoming",
  },
  {
    id: "completed",
    title: "Completed",
    iconName: "CircleCheck",
    filter: "completed",
  },
  {
    id: "high-priority",
    title: "High Priority",
    iconName: "TriangleAlert",
    filter: "high-priority",
  },
]
