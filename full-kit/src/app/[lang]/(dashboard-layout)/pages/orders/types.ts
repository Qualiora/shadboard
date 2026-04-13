export type PaymentStatusType = "Paid" | "Pending" | "Failed" | "Refunded"

export type DeliveryStatusType =
  | "Delivered"
  | "Shipped"
  | "In Transit"
  | "Processing"
  | "Pending"

export interface OrderItemType {
  productName: string
  productImage: string
  sku: string
  quantity: number
  unitPrice: number
}

export interface OrderTimelineEventType {
  status: string
  date: string
  description: string
}

export interface OrderType {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  orderDate: string
  totalAmount: number
  paymentStatus: PaymentStatusType
  deliveryStatus: DeliveryStatusType
  items: OrderItemType[]
  timeline: OrderTimelineEventType[]
}
