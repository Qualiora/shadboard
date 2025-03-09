"use client"

import * as React from "react"

import type { ChatType } from "../../../types"

import { CardHeader } from "@/components/ui/card"
import { ChatMenuButton } from "../../chat-menu-button"
import { ChatHeaderActions } from "./chat-header-actions"
import { ChatHeaderInfo } from "./chat-header-info"

export function ChatBoxHeader({ chat }: { chat: ChatType }) {
  return (
    <CardHeader className="flex flex-row items-center space-y-0 gap-x-1.5 py-3 border-b border-border">
      <ChatMenuButton isIcon />
      <ChatHeaderInfo chat={chat} />
      <ChatHeaderActions />
    </CardHeader>
  )
}
