import { Mail, MapPin, Phone, User } from "lucide-react"

import type { OrderType } from "../../types"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OrderCustomerCardProps {
  order: OrderType
}

export function OrderCustomerCard({ order }: OrderCustomerCardProps) {
  const items = [
    { icon: User, label: "Name", value: order.customerName },
    { icon: Mail, label: "Email", value: order.customerEmail },
    { icon: Phone, label: "Phone", value: order.customerPhone },
    { icon: MapPin, label: "Address", value: order.shippingAddress },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm">{item.value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
