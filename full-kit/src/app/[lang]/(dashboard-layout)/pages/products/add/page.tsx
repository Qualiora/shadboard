import type { Metadata } from "next"

import { AddProductForm } from "./_components/add-product-form"

export const metadata: Metadata = {
  title: "Add Product",
}

export default function AddProductPage() {
  return (
    <section className="container p-4">
      <h1 className="text-2xl font-semibold mb-4">Add Product</h1>
      <AddProductForm />
    </section>
  )
}
