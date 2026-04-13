import type { Metadata } from "next"

import { productsData } from "./_data/products"

import { ProductsTable } from "./_components/products-table"

export const metadata: Metadata = {
  title: "Products List",
}

export default function ProductsListPage() {
  return (
    <section className="container p-4">
      <ProductsTable data={productsData} />
    </section>
  )
}
