"use client";

import * as React from "react";
import { z } from "zod";
import { EllipsisVertical } from "lucide-react";

import { cardSchema } from "../../../../_schemas/card-schema";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCardBrandIcon } from "@/components/credit-card-brand-icon";
import { Badge } from "@/components/ui/badge";

type CardType = z.infer<typeof cardSchema>;

export function SavedCardsList({ savedCards }: { savedCards: CardType[] }) {
  return (
    <ul className="space-y-2">
      {savedCards.map((card) => (
        <li
          key={card.last4}
          className="flex justify-between items-center gap-8 space-y-0 px-4 py-2 border rounded-md shadow"
        >
          <h4 className="flex justify-center items-center gap-2">
            <CreditCardBrandIcon brandName={card.type} />
            <span>**** **** **** {card.last4}</span>
            {/* Display a `Default` badge if the card is marked as the default */}
            {card.default && <Badge>Default</Badge>}
          </h4>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <EllipsisVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  disabled={card.default}
                >
                  Set Default
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </li>
      ))}
    </ul>
  );
}
