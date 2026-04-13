import type { Metadata } from "next"

import { ordersData } from "./_data/orders"

import { OrdersTable } from "./_components/orders-table"

export const metadata: Metadata = {
  title: "Orders List",
}

export default function OrdersListPage() {
  return (
    <section className="container p-4">
      <OrdersTable data={ordersData} />
    </section>
  )
}
