import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const categoryData = [
  { name: "Guest Posts", value: 45, color: "#6366f1" },
  { name: "Directories", value: 28, color: "#10b981" },
  { name: "Blog Comments", value: 18, color: "#f59e0b" },
  { name: "Forums", value: 9, color: "#ef4444" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 mb-1">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: data.color }}
          />
          <span className="font-medium">{data.name}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          {data.value}% of total backlinks
        </p>
      </div>
    );
  }
  return null;
};

export function WebsiteCategories() {
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Website Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          {categoryData.map((category, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-foreground">{category.name}</span>
              </div>
              <span className="text-muted-foreground font-medium">{category.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}