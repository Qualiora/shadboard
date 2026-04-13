"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Save } from "lucide-react"

import type { AddProductFormType } from "../../types"

import { AddProductSchema } from "../_schemas/add-product-schema"

import { ButtonLoading } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { GeneralInformationCard } from "./general-information-card"
import { InventoryCard } from "./inventory-card"
import { MediaCard } from "./media-card"
import { PricingCard } from "./pricing-card"

export function AddProductForm() {
  const form = useForm<AddProductFormType>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      title: "",
      sku: "",
      description: "",
      category: "",
      price: undefined,
      compareAtPrice: undefined,
      stock: undefined,
      status: "Active",
      tags: [],
    },
  })

  const { isSubmitting, isDirty } = form.formState
  const isDisabled = isSubmitting || !isDirty

  function onSubmit(data: AddProductFormType) {
    // Demo only — no backend
    console.log("Product data:", data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <GeneralInformationCard form={form} />
        </div>
        <div className="md:col-span-2">
          <MediaCard />
        </div>
        <PricingCard form={form} />
        <InventoryCard form={form} />
        <div className="md:col-span-2">
          <ButtonLoading
            isLoading={isSubmitting}
            disabled={isDisabled}
            className="w-full"
            icon={Save}
          >
            Save Product
          </ButtonLoading>
        </div>
      </form>
    </Form>
  )
}
