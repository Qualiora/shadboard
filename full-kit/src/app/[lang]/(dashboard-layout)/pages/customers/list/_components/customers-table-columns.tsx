"use client"

import Image from "next/image"
import Link from "next/link"

import type { LocaleType } from "@/types"
import type { ColumnDef } from "@tanstack/react-table"
import type { CustomerType } from "../../types"

import { ensureLocalizedPathname } from "@/lib/i18n"
import { formatCurrency, formatDate } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header"
import { CustomersTableRowActions } from "./customers-table-row-actions"

export function getCustomersTableColumns(
  onDelete: (id: string) => void,
  locale: LocaleType
): ColumnDef<CustomerType>[] {
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
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => {
        const customer = row.original

        return (
          <Link
            href={ensureLocalizedPathname(
              `/pages/customers/${customer.id}`,
              locale
            )}
            className="flex items-center gap-3 hover:underline"
          >
            <Image
              src={customer.avatar}
              alt={customer.name}
              width={36}
              height={36}
              className="aspect-square rounded-full"
            />
            <div>
              <span className="inline-block max-w-44 truncate font-medium">
                {customer.name}
              </span>
              <span className="block text-xs text-muted-foreground">
                {customer.email}
              </span>
            </div>
          </Link>
        )
      },
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.getValue("phone")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const variant =
          status === "VIP"
            ? "secondary"
            : status === "Inactive"
              ? "outline"
              : "default"

        return <Badge variant={variant}>{status}</Badge>
      },
      filterFn: "equals",
    },
    {
      accessorKey: "totalOrders",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Orders" />
      ),
    },
    {
      accessorKey: "totalSpent",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Spent" />
      ),
      cell: ({ row }) => (
        <span>{formatCurrency(row.getValue("totalSpent"))}</span>
      ),
    },
    {
      accessorKey: "joinDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Joined" />
      ),
      cell: ({ row }) => formatDate(row.getValue("joinDate")),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <CustomersTableRowActions
          customer={row.original}
          locale={locale}
          onDelete={onDelete}
        />
      ),
    },
  ]
}
