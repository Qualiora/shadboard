import { Overview } from "./_components/overview";
import { SalesPipeline } from "./_components/sales-pipeline";
import { LeadSources } from "./_components/lead-sources";
import { CustomerSatisfaction } from "./_components/customer-satisfaction";
import { ActiveProjects } from "./_components/active-projects";
import { RevenueTrend } from "./_components/revenue-trend";
import { SalesByCountry } from "./_components/sales-by-country";
import { TopSalesRepresentatives } from "./_components/top-sales-representatives";

export default function CRMPage() {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-2">
      <Overview />
      <SalesPipeline />
      <TopSalesRepresentatives />
      <LeadSources />
      <CustomerSatisfaction />
      <ActiveProjects />
      <RevenueTrend />
      <SalesByCountry />
    </div>
  );
}
