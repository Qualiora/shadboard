"use client"

import Link from "next/link"
import { Clock, Package, PackageCheck, Plane, Truck } from "lucide-react"

import type { LocaleType } from "@/types"
import type { ColumnDef } from "@tanstack/react-table"
import type { DeliveryStatusType, OrderType } from "../../types"

import { ensureLocalizedPathname } from "@/lib/i18n"
import { formatCurrency, formatDate } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header"
import { OrdersTableRowActions } from "./orders-table-row-actions"

const deliveryStatusIcons: Record<DeliveryStatusType, typeof PackageCheck> = {
  Delivered: PackageCheck,
  Shipped: Truck,
  "In Transit": Plane,
  Processing: Package,
  Pending: Clock,
}

export function getOrdersTableColumns(
  onDelete: (id: string) => void,
  locale: LocaleType
): ColumnDef<OrderType>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          className="ms-4"
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          className="ms-4"
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order ID" />
      ),
      cell: ({ row }) => {
        const orderId = row.getValue("id") as string

        return (
          <Link
            href={ensureLocalizedPathname(`/pages/orders/${orderId}`, locale)}
            className="text-primary hover:underline"
          >
            #{orderId}
          </Link>
        )
      },
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => {
        const order = row.original

        return (
          <div>
            <span className="inline-block max-w-44 truncate font-medium">
              {order.customerName}
            </span>
            <span className="block text-xs text-muted-foreground">
              {order.customerEmail}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "orderDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => formatDate(row.getValue("orderDate")),
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total" />
      ),
      cell: ({ row }) => (
        <span>{formatCurrency(row.getValue("totalAmount"))}</span>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Payment" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("paymentStatus") as string
        const variant =
          status === "Paid"
            ? "default"
            : status === "Pending"
              ? "secondary"
              : status === "Failed"
                ? "destructive"
                : "outline"

        return <Badge variant={variant}>{status}</Badge>
      },
      filterFn: "equals",
    },
    {
      accessorKey: "deliveryStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Delivery" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("deliveryStatus") as DeliveryStatusType
        const Icon = deliveryStatusIcons[status]

        return (
          <Badge variant="secondary">
            <Icon className="me-1.5 h-3.5 w-3.5" />
            {status}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <OrdersTableRowActions
          order={row.original}
          locale={locale}
          onDelete={onDelete}
        />
      ),
    },
  ]
}
