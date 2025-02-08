import type { Metadata } from "next";

import { BasicInputPhone } from "./_components/basic-input-phone";

// Define metadata for the page
// More info: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: "Input Phone",
};

export default function InputPhonePage() {
  return (
    <section className="container grid gap-4 p-4">
      <BasicInputPhone />
    </section>
  );
}
