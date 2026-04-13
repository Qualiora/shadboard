import type { Metadata } from "next"

import { categoriesData } from "./_data/categories"

import { CategoriesTable } from "./_components/categories-table"

export const metadata: Metadata = {
  title: "Product Categories",
}

export default function ProductCategoryPage() {
  return (
    <section className="container p-4">
      <CategoriesTable data={categoriesData} />
    </section>
  )
}
