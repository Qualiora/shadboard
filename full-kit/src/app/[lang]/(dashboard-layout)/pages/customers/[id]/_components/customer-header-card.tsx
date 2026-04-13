import type { CustomerType } from "../../types"

import { formatDate, getInitials } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface CustomerHeaderCardProps {
  customer: CustomerType
}

export function CustomerHeaderCard({ customer }: CustomerHeaderCardProps) {
  const statusVariant =
    customer.status === "VIP"
      ? "secondary"
      : customer.status === "Inactive"
        ? "outline"
        : "default"

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
        <Avatar className="h-20 w-20">
          <AvatarImage src={customer.avatar} alt={customer.name} />
          <AvatarFallback className="text-lg">
            {getInitials(customer.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{customer.name}</h2>
          <p className="text-sm text-muted-foreground">{customer.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={statusVariant}>{customer.status}</Badge>
          <span className="text-xs text-muted-foreground">
            Joined {formatDate(customer.joinDate)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
