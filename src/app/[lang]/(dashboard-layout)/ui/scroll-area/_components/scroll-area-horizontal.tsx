"use client";

import * as React from "react";
import Image from "next/image";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ScrollAreaHorizontal() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Horizontal</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <ScrollArea className="rounded-md border">
          <div className="flex gap-x-4 p-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                src="/images/placeholder.svg"
                alt=""
                className="shrink-0 aspect-[3/4] object-cover rounded-md overflow-hidden"
                width={165}
                height={250}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
