import { z } from "zod"

export const TodoTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title must contain at least 2 characters." })
    .max(100, { message: "Title must contain at most 100 characters." }),
  description: z
    .string()
    .trim()
    .max(500, { message: "Description must contain at most 500 characters." })
    .optional()
    .or(z.literal("")),
  priority: z.enum(["none", "low", "medium", "high"], {
    required_error: "Priority is required.",
  }),
  dueDate: z.date({ invalid_type_error: "Invalid due date." }).optional(),
  labels: z
    .array(z.string())
    .max(10, { message: "At most 10 labels can be assigned." }),
  listId: z.string().min(1, { message: "List is required." }),
})
