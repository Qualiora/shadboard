import type { z } from "zod"
import type { AddProductSchema } from "./add/_schemas/add-product-schema"
import type { CategorySchema } from "./category/_schemas/category-schema"

export type ProductStatusType = "In Stock" | "Low Stock" | "Out of Stock"

export type ProductPublishStatusType = "Active" | "Draft"

export interface ProductType {
  id: string
  name: string
  sku: string
  description: string
  category: string
  price: number
  compareAtPrice: number | null
  stock: number
  status: ProductStatusType
  publishStatus: ProductPublishStatusType
  image: string
  tags: string[]
}

export type CategoryStatusType = "Active" | "Inactive"

export interface CategoryType {
  id: string
  name: string
  description: string
  productCount: number
  status: CategoryStatusType
}

export type AddProductFormType = z.infer<typeof AddProductSchema>

export type CategoryFormType = z.infer<typeof CategorySchema>
