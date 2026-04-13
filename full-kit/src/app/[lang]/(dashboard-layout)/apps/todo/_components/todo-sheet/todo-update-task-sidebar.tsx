"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Save } from "lucide-react"

import type { TodoTaskFormType } from "../../types"

import { TodoTaskSchema } from "../../_schemas/todo-task-schema"

import { useTodoContext } from "../../_hooks/use-todo-context"
import { ButtonLoading } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputTagsWithSuggestions } from "@/components/ui/input-tags"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { PRIORITY_OPTIONS } from "../../constants"

export function TodoUpdateTaskSidebar() {
  const {
    todoState,
    todoUpdateTaskSidebarIsOpen,
    setTodoUpdateTaskSidebarIsOpen,
    handleUpdateTask,
    handleSelectTask,
  } = useTodoContext()

  const { selectedTask } = todoState

  const form = useForm<TodoTaskFormType>({
    resolver: zodResolver(TodoTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "none",
      dueDate: undefined,
      labels: [],
      listId: "",
    },
  })

  // Reset form when selected task changes
  useEffect(() => {
    if (selectedTask) {
      form.reset({
        title: selectedTask.title,
        description: selectedTask.description ?? "",
        priority: selectedTask.priority,
        dueDate: selectedTask.dueDate,
        labels: selectedTask.labels.map((l) => l.name),
        listId: selectedTask.listId,
      })
    }
  }, [selectedTask, form])

  const { isSubmitting, isDirty } = form.formState
  const isDisabled = isSubmitting || !isDirty

  function onSubmit(data: TodoTaskFormType) {
    if (!selectedTask) return

    const matchedLabels = todoState.labels.filter((l) =>
      data.labels.includes(l.name)
    )

    handleUpdateTask({
      ...selectedTask,
      title: data.title,
      description: data.description || undefined,
      priority: data.priority,
      dueDate: data.dueDate,
      labels: matchedLabels,
      listId: data.listId,
    })

    handleSidebarClose()
  }

  function handleSidebarClose() {
    form.reset()
    handleSelectTask(undefined)
    setTodoUpdateTaskSidebarIsOpen(false)
  }

  return (
    <Sheet
      open={todoUpdateTaskSidebarIsOpen}
      onOpenChange={() => handleSidebarClose()}
    >
      <SheetContent className="p-0" side="end">
        <ScrollArea className="h-full p-4">
          <SheetHeader>
            <SheetTitle>Update Task</SheetTitle>
            <SheetDescription>Edit task details.</SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-y-3 mt-3"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="listId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>List</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a list" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {todoState.lists.map((list) => (
                          <SelectItem key={list.id} value={list.id}>
                            {list.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PRIORITY_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        formatStr="PPP"
                        onValueChange={field.onChange}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="labels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Labels</FormLabel>
                    <FormControl>
                      <InputTagsWithSuggestions
                        suggestions={todoState.labels.map((l) => l.name)}
                        tags={field.value}
                        onTagsChange={field.onChange}
                      />
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
                        placeholder="Task description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ButtonLoading
                isLoading={isSubmitting}
                disabled={isDisabled}
                className="w-full"
                icon={Save}
              >
                Save Changes
              </ButtonLoading>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
