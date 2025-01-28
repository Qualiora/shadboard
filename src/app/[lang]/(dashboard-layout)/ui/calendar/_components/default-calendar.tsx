"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

export function DefaultCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Defualt</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </CardContent>
    </Card>
  );
}
