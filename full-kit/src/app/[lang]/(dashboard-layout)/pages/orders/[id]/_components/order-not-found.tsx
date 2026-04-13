"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { PackageX } from "lucide-react"

import type { LocaleType } from "@/types"

import { ensureLocalizedPathname } from "@/lib/i18n"

import { Button } from "@/components/ui/button"

export function OrderNotFound() {
  const params = useParams()
  const locale = params.lang as LocaleType

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-16 text-center">
      <PackageX className="h-16 w-16 text-muted-foreground" />
      <h2 className="text-xl font-semibold">Order Not Found</h2>
      <p className="text-sm text-muted-foreground">
        The order you are looking for does not exist or has been removed.
      </p>
      <Button asChild>
        <Link href={ensureLocalizedPathname("/pages/orders/list", locale)}>
          Back to Orders
        </Link>
      </Button>
    </div>
  )
}
