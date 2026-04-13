import { z } from "zod"

export const AddProductSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title must contain at least 2 characters." })
    .max(100, { message: "Title must contain at most 100 characters." }),
  sku: z
    .string()
    .trim()
    .min(2, { message: "SKU must contain at least 2 characters." })
    .max(20, { message: "SKU must contain at most 20 characters." }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Description must contain at least 10 characters." })
    .max(500, { message: "Description must contain at most 500 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  compareAtPrice: z
    .union([
      z.coerce
        .number()
        .positive({ message: "Compare-at price must be a positive number." }),
      z.literal(""),
    ])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  stock: z.coerce
    .number()
    .int({ message: "Stock must be a whole number." })
    .nonnegative({ message: "Stock cannot be negative." }),
  status: z.enum(["Active", "Draft"]),
  tags: z.array(z.string()).optional().default([]),
})
