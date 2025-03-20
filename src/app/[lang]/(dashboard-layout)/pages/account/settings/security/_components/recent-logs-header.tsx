import Link from "next/link"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentLogsHeader() {
  return (
    <CardHeader className="flex-row justify-between items-center gap-x-3 space-y-0">
      <div className="space-y-1.5">
        <CardTitle>Recent Logs</CardTitle>
        <CardDescription>
          View recent activity on your account. Check for any unusual or
          suspicious actions.
        </CardDescription>
      </div>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "link" }), "size-fit p-0")}
      >
        See All
      </Link>
    </CardHeader>
  )
}
