"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileDropzone } from "@/components/ui/file-dropzone"

export function MediaCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Media</CardTitle>
      </CardHeader>
      <CardContent>
        <FileDropzone multiple accept={{ "image/*": [] }} />
      </CardContent>
    </Card>
  )
}
