"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import type { LocaleType } from "@/types"
import type { OrderType } from "../../types"

import { ensureLocalizedPathname } from "@/lib/i18n"

import { Button } from "@/components/ui/button"
import { OrderCustomerCard } from "./order-customer-card"
import { OrderHeaderCard } from "./order-header-card"
import { OrderItemsCard } from "./order-items-card"
import { OrderTimelineCard } from "./order-timeline-card"

interface OrderDetailsProps {
  order: OrderType
}

export function OrderDetails({ order }: OrderDetailsProps) {
  const params = useParams()
  const locale = params.lang as LocaleType

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" asChild>
        <Link href={ensureLocalizedPathname("/pages/orders/list", locale)}>
          <ChevronLeft className="me-1 h-4 w-4" />
          Back to Orders
        </Link>
      </Button>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <OrderHeaderCard order={order} />
          <OrderItemsCard order={order} />
        </div>
        <div className="space-y-4">
          <OrderCustomerCard order={order} />
          <OrderTimelineCard order={order} />
        </div>
      </div>
    </div>
  )
}
