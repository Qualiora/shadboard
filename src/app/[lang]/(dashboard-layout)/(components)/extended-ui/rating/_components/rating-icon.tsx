"use client";

import * as React from "react";

import { Rating } from "@/components/ui/rating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RatingIcon() {
  const [rating, setRating] = React.useState("0");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating Icon</CardTitle>
      </CardHeader>
      <CardContent className="grid justify-center gap-2">
        <Rating value={rating} onValueChange={setRating} iconName="Heart" />
        <Rating value={rating} onValueChange={setRating} iconName="Github" />
        <Rating value={rating} onValueChange={setRating} iconName="Egg" />
      </CardContent>
    </Card>
  );
}
