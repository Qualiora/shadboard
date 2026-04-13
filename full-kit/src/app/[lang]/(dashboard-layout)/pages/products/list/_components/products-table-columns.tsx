"use client"

import Image from "next/image"

import type { ColumnDef } from "@tanstack/react-table"
import type { ProductType } from "../../types"

import { formatCurrency } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header"
import { ProductsTableRowActions } from "./products-table-row-actions"

export function getProductsTableColumns(
  onDelete: (id: string) => void
): ColumnDef<ProductType>[] {
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
        <DataTableColumnHeader column={column} title="Product" />
      ),
      cell: ({ row }) => {
        const product = row.original

        return (
          <div className="flex items-center gap-3">
            <Image
              src={product.image}
              alt={product.name}
              width={40}
              height={40}
              className="aspect-square rounded-lg object-cover"
            />
            <span className="inline-block max-w-44 truncate font-medium">
              {product.name}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "sku",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="SKU" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.getValue("sku")}</span>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      cell: ({ row }) => <span>{formatCurrency(row.getValue("price"))}</span>,
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Stock" />
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as string

        return (
          <Badge
            variant={
              status === "Out of Stock"
                ? "destructive"
                : status === "Low Stock"
                  ? "secondary"
                  : "default"
            }
          >
            {status}
          </Badge>
        )
      },
      filterFn: "equals",
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <ProductsTableRowActions product={row.original} onDelete={onDelete} />
      ),
    },
  ]
}
