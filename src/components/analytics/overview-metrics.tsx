import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Target, Globe, BarChart3, Zap } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  suffix?: string;
}

function MetricCard({ title, value, change, icon, suffix = "" }: MetricCardProps) {
  const isPositive = change >= 0;
  
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">
          {value}{suffix}
        </div>
        <div className="flex items-center text-xs">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-success mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-error mr-1" />
          )}
          <span className={isPositive ? "text-success" : "text-error"}>
            {isPositive ? "+" : ""}{change}%
          </span>
          <span className="text-muted-foreground ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function OverviewMetrics() {
  const metrics = [
    {
      title: "Total Backlinks",
      value: "2,847",
      change: 23.5,
      icon: <Target className="h-4 w-4" />
    },
    {
      title: "Average Domain Authority",
      value: "68.4",
      change: 5.2,
      icon: <Globe className="h-4 w-4" />
    },
    {
      title: "Success Rate",
      value: "87.5",
      change: 2.1,
      icon: <BarChart3 className="h-4 w-4" />,
      suffix: "%"
    },
    {
      title: "Traffic Impact",
      value: "34.2",
      change: 18.7,
      icon: <Zap className="h-4 w-4" />,
      suffix: "K"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}