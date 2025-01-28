"use client";

import * as React from "react";

import { suggestionsData } from "../_data/suggestions";

import { TagsInputWithSuggestions } from "@/components/ui/tags-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DefaultTagsInputWithSuggestions() {
  const [tags, setTags] = React.useState<string[]>(["React", "TypeScript"]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>With Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <TagsInputWithSuggestions
          suggestions={suggestionsData}
          tags={tags}
          onTagsChange={setTags}
        />
      </CardContent>
    </Card>
  );
}
