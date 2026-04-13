"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Save } from "lucide-react"

import type { CategoryFormType, CategoryType } from "../../types"

import { CategorySchema } from "../_schemas/category-schema"

import { ButtonLoading } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface EditCategoryDialogProps {
  category: CategoryType | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (data: CategoryFormType & { id: string }) => void
}

export function EditCategoryDialog({
  category,
  open,
  onOpenChange,
  onEdit,
}: EditCategoryDialogProps) {
  const form = useForm<CategoryFormType>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      description: "",
      status: "Active",
    },
  })

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        description: category.description,
        status: category.status,
      })
    }
  }, [category, form])

  const { isSubmitting, isDirty } = form.formState

  function onSubmit(data: CategoryFormType) {
    if (!category) return
    onEdit({ ...data, id: category.id })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Update category details.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Category description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ButtonLoading
              isLoading={isSubmitting}
              disabled={isSubmitting || !isDirty}
              className="w-full"
              icon={Save}
            >
              Save Changes
            </ButtonLoading>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
