import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { PerformanceCharts } from "@/components/dashboard/performance-charts";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Target, Link, TrendingUp, Zap } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your backlink automation campaigns.
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Campaigns"
          value="12"
          subtitle="this month"
          trend="up"
          trendValue="+20%"
          icon={<Target className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Backlinks"
          value="2,847"
          subtitle="this month"
          trend="up"
          trendValue="+345"
          icon={<Link className="h-4 w-4" />}
        />
        <StatsCard
          title="Success Rate"
          value="87.5%"
          subtitle="avg this month"
          trend="up"
          trendValue="+2.5%"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatsCard
          title="Remaining Credits"
          value="8,153"
          subtitle="of 10,000"
          trend="neutral"
          icon={<Zap className="h-4 w-4" />}
        />
      </div>

      {/* Performance Charts */}
      <PerformanceCharts />

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;