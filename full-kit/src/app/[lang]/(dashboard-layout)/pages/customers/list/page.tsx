import type { Metadata } from "next"

import { customersData } from "./_data/customers"

import { CustomersTable } from "./_components/customers-table"

export const metadata: Metadata = {
  title: "Customers List",
}

export default function CustomersListPage() {
  return (
    <section className="container p-4">
      <CustomersTable data={customersData} />
    </section>
  )
}
