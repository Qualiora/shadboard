import type { CustomerType } from "../../types"

import { formatCurrency, formatDate } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface CustomerOrdersCardProps {
  customer: CustomerType
}

export function CustomerOrdersCard({ customer }: CustomerOrdersCardProps) {
  const { recentOrders } = customer

  const paymentVariant = (status: string) =>
    status === "Paid"
      ? "default"
      : status === "Pending"
        ? "secondary"
        : status === "Failed"
          ? "destructive"
          : "outline"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea
          orientation="horizontal"
          className="w-[calc(100vw-2.25rem)] md:w-auto"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-end">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell className="text-primary font-medium">
                      #{order.orderId}
                    </TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell className="text-end">
                      {formatCurrency(order.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={paymentVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-16 text-center">
                    No recent orders.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
