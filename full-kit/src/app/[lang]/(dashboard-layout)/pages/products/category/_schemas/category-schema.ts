import { z } from "zod"

export const CategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must contain at least 2 characters." })
    .max(50, { message: "Name must contain at most 50 characters." }),
  description: z
    .string()
    .trim()
    .min(2, { message: "Description must contain at least 2 characters." })
    .max(200, { message: "Description must contain at most 200 characters." }),
  status: z.enum(["Active", "Inactive"]),
})
