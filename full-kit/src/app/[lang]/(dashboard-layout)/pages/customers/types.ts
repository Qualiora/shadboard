export type CustomerStatusType = "Active" | "Inactive" | "VIP"

export interface CustomerOrderType {
  orderId: string
  date: string
  amount: number
  status: "Paid" | "Pending" | "Failed" | "Refunded"
}

export interface CustomerType {
  id: string
  name: string
  email: string
  avatar: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  zipCode: string
  organization: string
  status: CustomerStatusType
  totalOrders: number
  totalSpent: number
  joinDate: string
  recentOrders: CustomerOrderType[]
}
