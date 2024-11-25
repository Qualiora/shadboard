import {
  ChartPie,
  ChartBar,
  ShoppingCart,
  LayoutTemplate,
  CircleDollarSign,
  CreditCard,
  Headset,
  AtSign,
  MessageCircle,
  Calendar,
  ListTodo,
  Grid2x2,
} from "lucide-react";

import type { IconType } from "@/types";

export interface NavType {
  title: string;
  label?: string;
  icon: IconType;
  href: string;
  children?: Omit<NavType, "icon">[];
}

export interface GroupNavType {
  title?: string;
  navs: NavType[];
}

export const groupNavs: GroupNavType[] = [
  {
    title: "Dashboards",
    navs: [
      {
        title: "Analytics",
        icon: ChartPie,
        href: "/dashboards/analytics",
      },
      {
        title: "CRM",
        icon: ChartBar,
        href: "/dashboards/crm",
      },
      {
        title: "eCommerce",
        icon: ShoppingCart,
        href: "/dashboards/ecommerce",
      },
    ],
  },
  {
    title: "Pages",
    navs: [
      {
        title: "Landing",
        label: "Soon",
        icon: LayoutTemplate,
        href: "/pages/landing",
      },
      {
        title: "Pricing",
        icon: CircleDollarSign,
        href: "/pages/pricing",
      },
      {
        title: "Payment",
        icon: CreditCard,
        href: "/pages/payment",
      },
      {
        title: "Help Center",
        label: "Soon",
        icon: Headset,
        href: "/pages/help-center",
      },
    ],
  },
  {
    title: "Apps",
    navs: [
      {
        title: "Email",
        icon: AtSign,
        href: "/apps/email",
      },
      {
        title: "Chat",
        icon: MessageCircle,
        href: "/apps/chat",
      },
      {
        title: "Calendar",
        icon: Calendar,
        href: "/apps/calendar",
      },
      {
        title: "Kanban",
        icon: Grid2x2,
        href: "/apps/kanban",
      },
      {
        title: "Todo",
        label: "Soon",
        icon: ListTodo,
        href: "/apps/todo",
      },
    ],
  },
];
