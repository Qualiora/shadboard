"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { signIn, type SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { getLocalizedPathname } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import type { Locale } from "@/configs/i18n";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const FormSchema = z.object({
  email: z.string().email(),
});

interface ForgotPasswordFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  locale: Locale;
}

export function ForgotPasswordForm({
  className,
  locale,
  ...props
}: ForgotPasswordFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const isLoading = form.formState.isLoading;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(data);
      toast({
        title: "Check your email",
        description:
          "We've sent you an email with instructions to reset your password.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-6", className)}
        {...props}
      >
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <LoaderCircle className="me-2 size-4 animate-spin" />}
            Send instructions
          </Button>
        </div>
        <Link
          href={getLocalizedPathname("/sign-in", locale)}
          className="-mt-4 text-center text-sm underline"
        >
          Back to Sign in
        </Link>
      </form>
    </Form>
  );
}
