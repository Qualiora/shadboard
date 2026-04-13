import { Clock, Package, PackageCheck, Plane, Truck } from "lucide-react"

import type { DeliveryStatusType, OrderType } from "../../types"

import { formatDate } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const deliveryStatusIcons: Record<DeliveryStatusType, typeof PackageCheck> = {
  Delivered: PackageCheck,
  Shipped: Truck,
  "In Transit": Plane,
  Processing: Package,
  Pending: Clock,
}

interface OrderHeaderCardProps {
  order: OrderType
}

export function OrderHeaderCard({ order }: OrderHeaderCardProps) {
  const DeliveryIcon = deliveryStatusIcons[order.deliveryStatus]

  const paymentVariant =
    order.paymentStatus === "Paid"
      ? "default"
      : order.paymentStatus === "Pending"
        ? "secondary"
        : order.paymentStatus === "Failed"
          ? "destructive"
          : "outline"

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>#{order.id}</CardTitle>
          <span className="text-sm text-muted-foreground">
            {formatDate(order.orderDate)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Badge variant={paymentVariant}>{order.paymentStatus}</Badge>
        <Badge variant="secondary">
          <DeliveryIcon className="me-1.5 h-3.5 w-3.5" />
          {order.deliveryStatus}
        </Badge>
      </CardContent>
    </Card>
  )
}
