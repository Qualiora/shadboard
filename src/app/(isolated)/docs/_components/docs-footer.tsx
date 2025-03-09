import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"

export function DocsFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-red-200 z-50 w-full container flex justify-between items-center bg-background p-4 md:px-6">
      <p className="text-xs text-muted-foreground md:text-sm">
        © {currentYear}{" "}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "link" }), "inline p-0")}
        >
          Shadboard
        </a>
        .
      </p>
      <p className="text-xs text-muted-foreground md:text-sm">
        Designed & Developed by{" "}
        <a
          href="https://themeforest.net/user/qualiora"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "link" }), "inline p-0")}
        >
          Qualiora
        </a>
        .
      </p>
    </footer>
  )
}
