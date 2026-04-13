"use client"

import { Search } from "lucide-react"

import type { Table } from "@tanstack/react-table"
import type { CustomerType } from "../../types"

import { customerStatusesData } from "../_data/customers"

import { DataTableViewOptions } from "@/components/ui/data-table/data-table-column-toggle"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CustomersTableToolbarProps {
  table: Table<CustomerType>
}

export function CustomersTableToolbar({ table }: CustomersTableToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute start-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search customers..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-9 w-40 ps-8 md:w-60"
          aria-label="Search customers by name"
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
        <SelectTrigger
          className="h-9 w-32"
          aria-label="Filter by customer status"
        >
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {customerStatusesData.map((status) => (
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
