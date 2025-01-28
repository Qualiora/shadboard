import type { Metadata } from "next";

import { DefaultAccordion } from "./_components/default-accordion";

// Define metadata for the page
// More info: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: "Accordion",
};

export default function AccordionPage() {
  return (
    <section className="container grid gap-4 p-4 md:grid-cols-2">
      <DefaultAccordion />
    </section>
  );
}
