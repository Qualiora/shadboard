import type { Metadata } from "next";

import { DefaultPagination } from "./_components/default-pagination";

// Define metadata for the page
// More info: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: "Pagination",
};

export default function PaginationPage() {
  return (
    <section className="container grid gap-4 p-4 md:grid-cols-2">
      <DefaultPagination />
    </section>
  );
}
