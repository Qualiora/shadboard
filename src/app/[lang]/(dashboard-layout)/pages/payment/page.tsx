import * as React from "react";

import type { CardType } from "./actions/getSavedCards";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PaymentMethodForm } from "./_components/payment-method-form";
import { PaymentSummary } from "./_components/payment-summary";
import { getSavedCards } from "./actions/getSavedCards";

export default async function PaymentPage() {
  const savedCards: CardType[] = await getSavedCards();

  return (
    <section className="container py-8 lg:py-16">
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8 lg:flex-row">
          <PaymentMethodForm savedCards={savedCards} />
          <PaymentSummary
            originalPrice="6,592.00"
            savings="299.00"
            storePickup="99"
            tax="799"
            total="7,191.00"
          />
        </CardContent>
        <CardFooter className="justify-center md:justify-start">
          <p className="text-sm text-muted-foreground">
            Payment processed by{" "}
            <a href="#" className="underline">
              Stripe
            </a>{" "}
            for{" "}
            <a href="#" className="underline">
              Shadboard
            </a>{" "}
            - United States Of America
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
