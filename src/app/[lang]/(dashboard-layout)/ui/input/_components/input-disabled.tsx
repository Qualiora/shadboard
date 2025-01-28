"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InputDisabled() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disabled</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Input disabled type="email" placeholder="Email" />
      </CardContent>
    </Card>
  );
}
