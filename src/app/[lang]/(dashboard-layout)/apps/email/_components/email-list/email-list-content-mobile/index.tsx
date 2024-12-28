import { cn } from "@/lib/utils";

import type { EmailType } from "../../../types";

import { useSettings } from "@/hooks/use-settings";
import { useEmailContext } from "../../../hooks/use-email-context";

import { ScrollArea } from "@/components/ui/scroll-area";
import { EmailListContentItemMoblie } from "./email-list-content-item-mobile";

export function EmailListContentMobile() {
  const { emailState } = useEmailContext();
  const { settings } = useSettings();

  const selectedEmailsSet = new Set(
    emailState.selectedEmails.map((email) => email.id)
  );

  return (
    <ul>
      <ScrollArea
        className={cn(
          "h-[calc(100vh-19.1rem)]",
          settings.layout === "horizontal" && "md:h-[calc(100vh-22.1rem)]"
        )}
      >
        {emailState.emails.map((email: EmailType) => {
          const isSelected = selectedEmailsSet.has(email.id);

          return (
            <EmailListContentItemMoblie
              key={email.id}
              email={email}
              isSelected={isSelected}
            />
          );
        })}
      </ScrollArea>
    </ul>
  );
}
