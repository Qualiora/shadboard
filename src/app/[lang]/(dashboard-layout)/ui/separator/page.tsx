import type { Metadata } from "next";

import { DefaultSeparator } from "./_components/default-separator";

// Define metadata for the page
// More info: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: "Separator",
};

export default function SeparatorPage() {
  return (
    <section className="container grid gap-4 p-4 md:grid-cols-2">
      <DefaultSeparator />
    </section>
  );
}
