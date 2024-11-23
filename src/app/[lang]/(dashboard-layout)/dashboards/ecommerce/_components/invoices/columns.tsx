"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { InvoiceTableRowActions } from "./invoice-table-row-actions";

import type { InvoiceType } from "../../types";
import { PackageCheck, Truck, Plane, Package, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const deliveryStatusIcons = {
  Delivered: PackageCheck,
  Shipped: Truck,
  "In Transit": Plane,
  Processing: Package,
  Pending: Clock,
};

export const columns: ColumnDef<InvoiceType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "invoiceId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice ID" />
    ),
    cell: ({ row }) => {
      const invoiceId = row.getValue("invoiceId") as string;

      return <span className="text-primary">#{invoiceId}</span>;
    },
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      const customerName = row.getValue("customerName") as string;

      return (
        <span className="inline-block max-w-44 break-all truncate">
          {customerName}
        </span>
      );
    },
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: ({ row }) => {
      const orderDate = row.getValue("orderDate") as string;

      return format(orderDate, "MMM dd, yyyy");
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate") as string;

      return <span>{format(dueDate, "MMM dd, yyyy")}</span>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => {
      const totalAmount = row.getValue("totalAmount") as number;

      return (
        <span>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(totalAmount)}
        </span>
      );
    },
  },
  {
    accessorKey: "deliveryStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery Status" />
    ),
    cell: ({ row }) => {
      const deliveryStatus = row.getValue(
        "deliveryStatus"
      ) as InvoiceType["deliveryStatus"];
      const Icon = deliveryStatusIcons[deliveryStatus];

      return (
        <Badge>
          <Icon className="me-2 h-4 w-4" />
          <span>{deliveryStatus}</span>
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <InvoiceTableRowActions row={row} />,
  },
];
