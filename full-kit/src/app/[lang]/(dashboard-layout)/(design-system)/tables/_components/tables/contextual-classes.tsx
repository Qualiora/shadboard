import type { InvoiceType } from "../../types"

import { invoicesData } from "../../_data/invoices"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const statusClasses: Record<InvoiceType["status"], string> = {
  Paid: "bg-green-100 text-green-700 hover:bg-green-200",
  Pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  Overdue: "bg-red-100 text-red-700 hover:bg-red-200",
}

export default function ContextualClasses() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Contextual Classes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoicesData.map((invoice) => (
              <TableRow
                key={invoice.id}
                className={statusClasses[invoice.status]}
              >
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.method}</TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
