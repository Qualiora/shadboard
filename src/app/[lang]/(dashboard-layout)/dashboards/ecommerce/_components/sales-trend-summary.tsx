"use client"

import type { SalesTrendType } from "../types"

import { formatCurrency, formatDateShort } from "@/lib/utils"

export function SalesTrendSummary({
  data,
}: {
  data: SalesTrendType["summary"]
}) {
  return (
    <ul className="flex flex-col justify-around gap-4 sm:flex-row">
      <div className="flex flex-wrap justify-around gap-4 md:flex-col">
        <li>
          <h3 className="text-sm text-muted-foreground">Highest Sales</h3>
          <p className="text-2xl font-semibold">
            {formatCurrency(data.highestSales.sales)}
          </p>
          <p className="text-xs text-muted-foreground font-semibold">
            on {formatDateShort(data.highestSales.date)}
          </p>
        </li>
        <li>
          <h3 className="text-sm text-muted-foreground">Lowest Sales</h3>
          <p className="text-2xl font-semibold">
            {formatCurrency(data.lowestSales.sales)}
          </p>
          <p className="text-xs text-muted-foreground font-semibold">
            on {formatDateShort(data.lowestSales.date)}
          </p>
        </li>
      </div>
      <div className="flex flex-wrap justify-around gap-4 md:flex-col">
        <li>
          <h3 className="text-sm text-muted-foreground">Total Sales</h3>
          <p className="text-2xl font-semibold">
            {formatCurrency(data.totalSales)}
          </p>
          <p className="text-xs text-muted-foreground font-semibold">
            for the period
          </p>
        </li>
        <li>
          <h3 className="text-sm text-muted-foreground">Avg. Sales</h3>
          <p className="text-2xl font-semibold">
            {formatCurrency(data.avgSales)}
          </p>
          <p className="text-xs text-muted-foreground font-semibold">per day</p>
        </li>
      </div>
    </ul>
  )
}
