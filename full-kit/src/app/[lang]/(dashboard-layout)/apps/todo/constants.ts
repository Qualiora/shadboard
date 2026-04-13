export const SMART_LIST_IDS = {
  ALL: "all",
  TODAY: "today",
  UPCOMING: "upcoming",
  COMPLETED: "completed",
  HIGH_PRIORITY: "high-priority",
} as const

export const PRIORITY_OPTIONS = [
  { value: "none", label: "None" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] as const
