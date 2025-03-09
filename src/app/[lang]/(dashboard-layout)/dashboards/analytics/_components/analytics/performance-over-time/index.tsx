import { performanceOverTimeData } from "../../../_data/performance-over-time"

import { DashboardCard } from "@/components/dashboards/dashboard-card"
import { PerformanceOverTimeChart } from "./performance-over-time-chart"
import { PerformanceOverTimeSummary } from "./performance-over-time-summary"

export async function PerformanceOverTime() {
  return (
    <DashboardCard title="Performance over Time" contentClassName="space-y-6">
      <PerformanceOverTimeSummary data={performanceOverTimeData.summary} />
      <PerformanceOverTimeChart data={performanceOverTimeData.performance} />
    </DashboardCard>
  )
}
