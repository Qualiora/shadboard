"use client";

import * as React from "react";

import { InputFile } from "@/components/ui/input-file";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InputFileButtonVariants() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Button Variants</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-2">
        <div className="w-full space-y-1.5">
          <h4>Primary</h4>
          <InputFile />
        </div>
        <div className="w-full space-y-1.5">
          <h4>Secondary</h4>
          <InputFile buttonVariant="secondary" />
        </div>
        <div className="w-full space-y-1.5">
          <h4>Outline</h4>
          <InputFile buttonVariant="outline" />
        </div>
        <div className="w-full space-y-1.5">
          <h4>Link</h4>
          <InputFile buttonVariant="link" />
        </div>
        <div className="w-full space-y-1.5">
          <h4>Ghost</h4>
          <InputFile buttonVariant="ghost" />
        </div>
        <div className="w-full space-y-1.5">
          <h4>Destructive</h4>
          <InputFile buttonVariant="destructive" />
        </div>
      </CardContent>
    </Card>
  );
}
