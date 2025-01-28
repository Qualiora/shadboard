import type { Metadata } from "next";

import { DefaultCombobox } from "./_components/default-combobox";
import { ComboboxPopover } from "./_components/combobox-popover";
import { ComboboxDropdownMenu } from "./_components/combobox-dropdown-menu";

// Define metadata for the page
// More info: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: "Combobox",
};

export default function ComboboxPage() {
  return (
    <section className="container grid gap-4 p-4 md:grid-cols-2">
      <DefaultCombobox />
      <ComboboxPopover />
      <ComboboxDropdownMenu />
    </section>
  );
}
