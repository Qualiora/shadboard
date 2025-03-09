"use client"

import * as React from "react"

import { SettingsContext } from "@/contexts/settings-context"

export function useSettings() {
  const context = React.useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
