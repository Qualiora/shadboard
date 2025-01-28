"use client";

import * as React from "react";

import { Ratings } from "@/components/ui/ratings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RatingsSizes() {
  const [rating, setRating] = React.useState("0");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sizes</CardTitle>
      </CardHeader>
      <CardContent className="grid justify-center gap-2">
        <div className="space-y-1.5">
          <h4>Default</h4>
          <Ratings value={rating} onValueChange={setRating} />
        </div>
        <div className="space-y-1.5">
          <h4>Small</h4>
          <Ratings size="sm" value={rating} onValueChange={setRating} />
        </div>
        <div className="space-y-1.5">
          <h4>Large</h4>
          <Ratings
            size="lg"
            value={rating}
            onValueChange={setRating}
          />
        </div>
      </CardContent>
    </Card>
  );
}
