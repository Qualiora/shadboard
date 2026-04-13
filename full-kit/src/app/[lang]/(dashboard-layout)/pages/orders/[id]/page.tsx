import type { LocaleType } from "@/types"
import type { Metadata } from "next"

import { ordersData } from "../list/_data/orders"

import { OrderDetails } from "./_components/order-details"
import { OrderNotFound } from "./_components/order-not-found"

export const metadata: Metadata = {
  title: "Order Details",
}

export default async function OrderDetailsPage(props: {
  params: Promise<{ lang: LocaleType; id: string }>
}) {
  const params = await props.params

  const order = ordersData.find((o) => o.id === params.id)

  if (!order) {
    return (
      <section className="container p-4">
        <OrderNotFound />
      </section>
    )
  }

  return (
    <section className="container p-4">
      <OrderDetails order={order} />
    </section>
  )
}
