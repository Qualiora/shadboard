import type { LocaleType } from "@/types"
import type { Metadata } from "next"

import { customersData } from "../list/_data/customers"

import { CustomerDetails } from "./_components/customer-details"
import { CustomerNotFound } from "./_components/customer-not-found"

export const metadata: Metadata = {
  title: "Customer Details",
}

export default async function CustomerDetailsPage(props: {
  params: Promise<{ lang: LocaleType; id: string }>
}) {
  const params = await props.params

  const customer = customersData.find((c) => c.id === params.id)

  if (!customer) {
    return (
      <section className="container p-4">
        <CustomerNotFound />
      </section>
    )
  }

  return (
    <section className="container p-4">
      <CustomerDetails customer={customer} />
    </section>
  )
}
