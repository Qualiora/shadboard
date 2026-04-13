"use client"

import { Search } from "lucide-react"

import type { Table } from "@tanstack/react-table"
import type { CategoryType } from "../../types"

import { DataTableViewOptions } from "@/components/ui/data-table/data-table-column-toggle"
import { Input } from "@/components/ui/input"

interface CategoriesTableToolbarProps {
  table: Table<CategoryType>
}

export function CategoriesTableToolbar({ table }: CategoriesTableToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute start-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-9 w-40 ps-8 md:w-60"
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
