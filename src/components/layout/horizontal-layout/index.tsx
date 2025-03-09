import type { DictionaryType } from "@/lib/get-dictionary"

import { Footer } from "../footer"
import { Sidebar } from "../sidebar"
import { HorizontalLayoutHeader } from "./horizontal-layout-header"

export function HorizontalLayout({
  children,
  dictionary,
}: {
  children: React.ReactNode
  dictionary: DictionaryType
}) {
  return (
    <>
      <Sidebar dictionary={dictionary} />
      <div className="min-h-screen w-full grid md:grid-rows-[auto,_1fr,_auto]">
        <HorizontalLayoutHeader dictionary={dictionary} />
        <main className="min-h-[calc(100vh-9.553rem)] bg-muted/40 border-x border-b border-sidebar-border overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
