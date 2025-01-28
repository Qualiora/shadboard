"use client";

import * as React from "react";

import { Keyboard } from "@/components/ui/keyboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DefaultKeyboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Defualt</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Keyboard>K</Keyboard>
      </CardContent>
    </Card>
  );
}
