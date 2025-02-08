"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Send } from "lucide-react";

import { TextMessageSchema } from "../../_schemas/text-message-schema";

import type { TextMessageFormType } from "../../types";

import { useChatContext } from "../../hooks/use-chat-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { EmojiPicker } from "@/components/ui/emoji-picker";

export function TextMessageForm() {
  const { handleAddTextMessage } = useChatContext();
  const form = useForm<TextMessageFormType>({
    resolver: zodResolver(TextMessageSchema),
    defaultValues: {
      text: "",
    },
  });

  const text = form.watch("text");
  const { isSubmitting, isValid } = form.formState;
  const isDisabled = isSubmitting || !isValid; // Disable button if form is invalid or submitting

  const onSubmit = async (data: TextMessageFormType) => {
    handleAddTextMessage(data.text);

    form.reset(); // Reset the form to the initial state
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex justify-center items-center gap-1.5"
      >
        <EmojiPicker
          onEmojiSelect={(e) => {
            form.setValue("text", text + e.native);
            form.trigger();
          }}
        />

        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="grow space-y-0">
              <FormLabel className="sr-only">Type a message</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Type a message..."
                  autoComplete="off"
                  className="bg-accent shadow-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="icon"
          className="shadow-none"
          disabled={isDisabled}
          aria-live="assertive"
          aria-label={isSubmitting ? "Loading" : "Send"}
        >
          {isSubmitting ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </Button>
      </form>
    </Form>
  );
}
