"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import type { LocaleType } from "@/types"
import type { CustomerType } from "../../types"

import { ensureLocalizedPathname } from "@/lib/i18n"

import { Button } from "@/components/ui/button"
import { CustomerHeaderCard } from "./customer-header-card"
import { CustomerInfoCard } from "./customer-info-card"
import { CustomerOrdersCard } from "./customer-orders-card"
import { CustomerStatsCard } from "./customer-stats-card"

interface CustomerDetailsProps {
  customer: CustomerType
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
  const params = useParams()
  const locale = params.lang as LocaleType

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" asChild>
        <Link href={ensureLocalizedPathname("/pages/customers/list", locale)}>
          <ChevronLeft className="me-1 h-4 w-4" />
          Back to Customers
        </Link>
      </Button>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-4">
          <CustomerHeaderCard customer={customer} />
          <CustomerInfoCard customer={customer} />
        </div>
        <div className="space-y-4 md:col-span-2">
          <CustomerStatsCard customer={customer} />
          <CustomerOrdersCard customer={customer} />
        </div>
      </div>
    </div>
  )
}
