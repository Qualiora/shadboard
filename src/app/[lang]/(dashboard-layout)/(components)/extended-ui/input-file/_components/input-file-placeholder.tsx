"use client"

import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InputFile } from "@/components/ui/input-file"

export function InputFilePlaceholder() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Input File Placeholder</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-y-1.5">
        <InputFile />
        <InputFile placeholder="No uploaded files" />
      </CardContent>
    </Card>
  )
}
