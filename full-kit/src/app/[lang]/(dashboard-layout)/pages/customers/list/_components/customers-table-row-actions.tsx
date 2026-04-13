"use client"

import Link from "next/link"
import { Eye, MoreHorizontal, Trash2 } from "lucide-react"

import type { LocaleType } from "@/types"
import type { CustomerType } from "../../types"

import { ensureLocalizedPathname } from "@/lib/i18n"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CustomersTableRowActionsProps {
  customer: CustomerType
  locale: LocaleType
  onDelete: (id: string) => void
}

export function CustomersTableRowActions({
  customer,
  locale,
  onDelete,
}: CustomersTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href={ensureLocalizedPathname(
              `/pages/customers/${customer.id}`,
              locale
            )}
          >
            <Eye className="me-2 h-4 w-4" />
            View Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => onDelete(customer.id)}
        >
          <Trash2 className="me-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
