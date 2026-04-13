import { Building2, Globe, MapPin, Phone } from "lucide-react"

import type { CustomerType } from "../../types"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomerInfoCardProps {
  customer: CustomerType
}

export function CustomerInfoCard({ customer }: CustomerInfoCardProps) {
  const items = [
    { icon: Phone, label: "Phone", value: customer.phone },
    {
      icon: MapPin,
      label: "Address",
      value: `${customer.address}, ${customer.city}, ${customer.state} ${customer.zipCode}`,
    },
    { icon: Globe, label: "Country", value: customer.country },
    { icon: Building2, label: "Organization", value: customer.organization },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Information</CardTitle>
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
