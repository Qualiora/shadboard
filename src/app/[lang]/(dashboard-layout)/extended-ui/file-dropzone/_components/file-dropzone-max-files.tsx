"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileDropzone } from "@/components/ui/file-dropzone";

export function FileDropzoneMaxFiles() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Max Files</CardTitle>
        <CardDescription>Set to max 2 files</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <FileDropzone multiple maxFiles={2} />
      </CardContent>
    </Card>
  );
}
