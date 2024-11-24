import { Overview } from "./_components/overview";
import { TrafficSources } from "./_components/traffic-sources";
import { EngagementByDevice } from "./_components/engagement-by-device";
import { TopPages } from "./_components/top-pages";
import { ConversionFunnel } from "./_components/conversion-funnel";
import { PerformanceOverTime } from "./_components/performance-over-time";

export default function AnalyticsPage() {
  return (
    <section className="container grid gap-4 p-4 md:grid-cols-2">
      <Overview />
      <ConversionFunnel />
      <TrafficSources />
      <TopPages />
      <PerformanceOverTime />
      <EngagementByDevice />
    </section>
  );
}
