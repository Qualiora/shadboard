"use client"

import { Search } from "lucide-react"

import type { Table } from "@tanstack/react-table"
import type { ProductType } from "../../types"

import { productStatusesData } from "../_data/products"

import { DataTableViewOptions } from "@/components/ui/data-table/data-table-column-toggle"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProductsTableToolbarProps {
  table: Table<ProductType>
}

export function ProductsTableToolbar({ table }: ProductsTableToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute start-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-9 w-40 ps-8 md:w-60"
        />
      </div>
      <Select
        value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
        onValueChange={(value) =>
          table
            .getColumn("status")
            ?.setFilterValue(value === "all" ? undefined : value)
        }
      >
        <SelectTrigger className="h-9 w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {productStatusesData.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DataTableViewOptions table={table} />
    </div>
  )
}
