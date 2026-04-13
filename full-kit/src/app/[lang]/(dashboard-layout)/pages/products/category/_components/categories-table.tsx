"use client"

import { useCallback, useMemo, useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Plus } from "lucide-react"

import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import type { CategoryFormType, CategoryType } from "../../types"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AddCategoryDialog } from "./add-category-dialog"
import { getCategoriesTableColumns } from "./categories-table-columns"
import { CategoriesTableToolbar } from "./categories-table-toolbar"
import { EditCategoryDialog } from "./edit-category-dialog"

interface CategoriesTableProps {
  data: CategoryType[]
}

export function CategoriesTable({ data: initialData }: CategoriesTableProps) {
  const [categories, setCategories] = useState<CategoryType[]>(initialData)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CategoryType | null>(
    null
  )

  function handleAdd(data: CategoryFormType) {
    const newCategory: CategoryType = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      productCount: 0,
      status: data.status,
    }
    setCategories((prev) => [...prev, newCategory])
  }

  function handleEdit(data: CategoryFormType & { id: string }) {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === data.id
          ? {
              ...c,
              name: data.name,
              description: data.description,
              status: data.status,
            }
          : c
      )
    )
  }

  const handleDelete = useCallback((id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const handleEditOpen = useCallback((category: CategoryType) => {
    setEditingCategory(category)
    setEditDialogOpen(true)
  }, [])

  const columns = useMemo(
    () => getCategoriesTableColumns(handleEditOpen, handleDelete),
    [handleEditOpen, handleDelete]
  )

  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <>
      <Card>
        <CardHeader className="flex-row justify-between items-center gap-x-1.5 space-y-0">
          <CardTitle>Categories</CardTitle>
          <div className="flex items-center gap-2">
            <CategoriesTableToolbar table={table} />
            <Button
              size="sm"
              className="h-9"
              onClick={() => setAddDialogOpen(true)}
            >
              <Plus className="me-2 h-4 w-4" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea
            orientation="horizontal"
            className="w-[calc(100vw-2.25rem)] md:w-auto"
          >
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
        <CardFooter className="block py-3">
          <DataTablePagination table={table} />
        </CardFooter>
      </Card>

      <AddCategoryDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAdd={handleAdd}
      />
      <EditCategoryDialog
        category={editingCategory}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onEdit={handleEdit}
      />
    </>
  )
}
