"use client";

import * as React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { useMedia } from "react-use";

import { navigationsData } from "@/data/navigations";

import { cn, getDictionaryValue, titleCaseToCamelCase } from "@/lib/utils";
import { ensureLocalizedPathname } from "@/lib/i18n";

import type {
  LocaleType,
  NavigationNestedItem,
  NavigationRootItem,
} from "@/types";
import type { DictionaryType } from "@/lib/getDictionary";
import type { DialogProps } from "@radix-ui/react-dialog";

import { DynamicIcon } from "@/components/dynamic-icon";
import { Badge } from "@/components/ui/badge";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { Keyboard } from "../ui/keyboard";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CommandMenuProps extends DialogProps {
  dictionary: DictionaryType;
  buttonClassName?: string;
}

export function CommandMenu({
  buttonClassName,
  dictionary,
  ...props
}: CommandMenuProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const isLargeOrLarger = useMedia("(min-width: 1024px)");

  const locale = params.lang as LocaleType;

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const renderMenuItem = (item: NavigationRootItem | NavigationNestedItem) => {
    const title = getDictionaryValue(
      titleCaseToCamelCase(item.title),
      dictionary.navigation
    );
    const label =
      item.label &&
      getDictionaryValue(titleCaseToCamelCase(item.label), dictionary.label);

    // If the item has nested items, render it with a collapsible dropdown.
    if (item.items) {
      return (
        <Collapsible key={item.title} className="group/collapsible">
          <CommandItem asChild>
            <CollapsibleTrigger className="w-full flex justify-between items-center gap-2 px-2 py-1.5 [&[data-state=open]>svg]:rotate-180">
              <span className="flex items-center gap-2">
                {"iconName" in item && (
                  <DynamicIcon name={item.iconName} className="h-4 w-4" />
                )}
                <span>{title}</span>
                {"label" in item && <Badge variant="secondary">{label}</Badge>}
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </CollapsibleTrigger>
          </CommandItem>
          <CollapsibleContent className="space-y-1 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            {item.items.map((subItem: NavigationNestedItem) =>
              renderMenuItem(subItem)
            )}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    // Otherwise, render the item with a link.
    if ("href" in item) {
      const localizedPathname = ensureLocalizedPathname(item.href, locale);
      const isActive = pathname.endsWith(item.href);

      return (
        <CommandItem
          key={item.title}
          onSelect={() => runCommand(() => router.push(localizedPathname))}
          className={cn(
            "flex items-center gap-2 px-2 py-1.5",
            isActive && "bg-accent"
          )}
        >
          {"iconName" in item ? (
            <DynamicIcon name={item.iconName} />
          ) : (
            <DynamicIcon name="Circle" />
          )}
          <span>{title}</span>
          {label && <Badge variant="secondary">{label}</Badge>}
        </CommandItem>
      );
    }
  };

  return (
    <>
      {isLargeOrLarger ? (
        <Button
          variant="outline"
          className={cn(
            "h-8 w-64 justify-start rounded-md bg-muted/50 text-muted-foreground shadow-none",
            buttonClassName
          )}
          onClick={() => setOpen(true)}
          {...props}
        >
          <Search className="me-2 h-4 w-4" />
          <span>{dictionary.search.search}</span>
          <Keyboard className="ms-auto">K</Keyboard>
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className={buttonClassName}
          onClick={() => setOpen(true)}
          aria-label="Search"
          {...props}
        >
          <Search className="h-4 w-4" />
        </Button>
      )}
      <CommandDialog open={open} onOpenChange={setOpen} {...props}>
        <CommandInput placeholder={dictionary.search.typeCommand} />
        <CommandList>
          <CommandEmpty>{dictionary.search.noResults}</CommandEmpty>
          <ScrollArea className="h-[300px] max-h-[300px]">
            {navigationsData.map((nav) => {
              const title = getDictionaryValue(
                titleCaseToCamelCase(nav.title),
                dictionary.navigation
              );

              return (
                <CommandGroup
                  key={nav.title}
                  heading={title}
                  className="[&_[cmdk-group-items]]:space-y-1"
                >
                  {nav.items.map((item) => renderMenuItem(item))}
                </CommandGroup>
              );
            })}
          </ScrollArea>
        </CommandList>
      </CommandDialog>
    </>
  );
}
