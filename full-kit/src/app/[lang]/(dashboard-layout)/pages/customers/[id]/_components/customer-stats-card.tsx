import { DollarSign, ShoppingCart, TrendingUp } from "lucide-react"

import type { CustomerType } from "../../types"

import { formatCurrency } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CustomerStatsCardProps {
  customer: CustomerType
}

export function CustomerStatsCard({ customer }: CustomerStatsCardProps) {
  const avgOrderValue =
    customer.totalOrders > 0
      ? Math.round(customer.totalSpent / customer.totalOrders)
      : 0

  const stats = [
    {
      icon: ShoppingCart,
      label: "Total Orders",
      value: customer.totalOrders.toString(),
    },
    {
      icon: DollarSign,
      label: "Total Spent",
      value: formatCurrency(customer.totalSpent),
    },
    {
      icon: TrendingUp,
      label: "Avg. Order Value",
      value: formatCurrency(avgOrderValue),
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
