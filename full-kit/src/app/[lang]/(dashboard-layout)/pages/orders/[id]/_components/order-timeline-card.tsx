import type { OrderType } from "../../types"

import { formatDateWithTime } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "@/components/ui/timeline"

interface OrderTimelineCardProps {
  order: OrderType
}

export function OrderTimelineCard({ order }: OrderTimelineCardProps) {
  const { timeline } = order

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Timeline>
          {timeline.map((event, index) => {
            const isLast = index === timeline.length - 1

            return (
              <TimelineItem key={event.status + event.date} status="done">
                <TimelineDot status={isLast ? "current" : "done"} />
                {!isLast && <TimelineLine done />}
                <TimelineHeading>{event.status}</TimelineHeading>
                <TimelineContent>
                  <p className="text-xs text-muted-foreground">
                    {formatDateWithTime(event.date)}
                  </p>
                  <p className="text-sm">{event.description}</p>
                </TimelineContent>
              </TimelineItem>
            )
          })}
        </Timeline>
      </CardContent>
    </Card>
  )
}
