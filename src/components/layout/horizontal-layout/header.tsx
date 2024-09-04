"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { groupNavs } from "@/data/navigation";

import { i18n, Locale } from "@/configs/i18n";

import { getLocalizedPathname } from "@/lib/i18n";

import type { Dictionary } from "@/lib/getDictionary";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { MobileSidebarNav } from "@/components/layout/mobile-sidebar-nav";
import { CommandMenu } from "@/components/layout/command-menu";
import { ModeDropdown } from "@/components/layout/mode-dropdown";
import { LanguageDropdown } from "@/components/layout/language-dropdown";
import { UserNav } from "@/components/layout/user-nav";
import { Nav } from "./nav";

import ShadboardIcon from "/public/images/logos/shadboard.svg";

export function Header({ dictionary }: { dictionary: Dictionary }) {
  const params = useParams();
  const locale = params.lang as Locale;

  const dir = i18n.langDirection[locale];

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <Menubar
        className="h-fit shadow-none border-0 border-b"
        dir={dir}
        asChild
      >
        <div className="container px-6">
          {groupNavs.map((group, index) => (
            <MenubarMenu key={index}>
              <MenubarTrigger className="gap-2 hover:cursor-pointer focus:bg-primary focus:text-primary-foreground data-[state=open]:bg-primary data-[state=open]:text-primary-foreground">
                {group.title}
              </MenubarTrigger>
              <MenubarContent>
                <Nav navs={group.navs} />
              </MenubarContent>
            </MenubarMenu>
          ))}
        </div>
      </Menubar>
      <div className="container flex h-14 justify-between items-center gap-4">
        <Link
          href={getLocalizedPathname("/", locale)}
          className="flex text-foreground font-black hover:text-primary/90"
        >
          <ShadboardIcon className="size-6" aira-hidden="true" />
          Shadboard
        </Link>
        <MobileSidebarNav />
        <div className="flex gap-2">
          <CommandMenu />
          <ModeDropdown dictionary={dictionary} />
          <LanguageDropdown dictionary={dictionary} />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
