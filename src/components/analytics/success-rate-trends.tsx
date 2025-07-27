import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const successData = [
  { date: "Week 1", rate: 78.5 },
  { date: "Week 2", rate: 82.1 },
  { date: "Week 3", rate: 79.8 },
  { date: "Week 4", rate: 85.2 },
  { date: "Week 5", rate: 87.5 },
  { date: "Week 6", rate: 84.9 },
  { date: "Week 7", rate: 89.3 },
  { date: "Week 8", rate: 91.2 },
  { date: "Week 9", rate: 88.7 },
  { date: "Week 10", rate: 92.5 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-medium mb-1">{label}</p>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span>Success Rate: {payload[0].value}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export function SuccessRateTrends() {
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Success Rate Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={successData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span>Current Rate: 92.5%</span>
          </div>
          <div className="text-muted-foreground">
            +14% from start of period
          </div>
        </div>
      </CardContent>
    </Card>
  );
}