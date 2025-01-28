import type { Metadata } from "next";

import { DefaultTextarea } from "./_components/default-textarea";
import { TextareaDisabled } from "./_components/textarea-disabled";
import { TextareaWithLabel } from "./_components/textarea-with-label";
import { TextareaWithText } from "./_components/textarea-with-text";
import { TextareaWithButton } from "./_components/textarea-with-button";

// Define metadata for the page
// More info: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export const metadata: Metadata = {
  title: "Textarea",
};

export default function TextareaPage() {
  return (
    <section className="container grid gap-4 p-4 md:grid-cols-2">
      <DefaultTextarea />
      <TextareaDisabled />
      <TextareaWithLabel />
      <TextareaWithText />
      <TextareaWithButton />
    </section>
  );
}
