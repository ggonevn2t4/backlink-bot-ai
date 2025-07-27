import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const timelineData = [
  { date: "Jan 1", daily: 12, weekly: 78, monthly: 324 },
  { date: "Jan 8", daily: 18, weekly: 98, monthly: 412 },
  { date: "Jan 15", daily: 25, weekly: 145, monthly: 589 },
  { date: "Jan 22", daily: 32, weekly: 189, monthly: 756 },
  { date: "Jan 29", daily: 28, weekly: 167, monthly: 698 },
  { date: "Feb 5", daily: 35, weekly: 203, monthly: 823 },
  { date: "Feb 12", daily: 42, weekly: 234, monthly: 945 },
  { date: "Feb 19", daily: 38, weekly: 221, monthly: 887 },
  { date: "Feb 26", daily: 45, weekly: 267, monthly: 1024 },
  { date: "Mar 5", daily: 52, weekly: 298, monthly: 1167 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="capitalize">{entry.dataKey}:</span>
            </div>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function BacklinksTimeline() {
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Backlinks Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="daily" 
              stroke="#6366f1" 
              strokeWidth={2}
              dot={{ fill: "#6366f1", strokeWidth: 2, r: 3 }}
              name="Daily"
            />
            <Line 
              type="monotone" 
              dataKey="weekly" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
              name="Weekly"
            />
            <Line 
              type="monotone" 
              dataKey="monthly" 
              stroke="#f59e0b" 
              strokeWidth={2}
              dot={{ fill: "#f59e0b", strokeWidth: 2, r: 3 }}
              name="Monthly"
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6366f1]" />
            <span>Daily</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]" />
            <span>Weekly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <span>Monthly</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}