import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

const geographicData = [
  { country: "United States", code: "US", backlinks: 1247, percentage: 43.8 },
  { country: "United Kingdom", code: "UK", backlinks: 568, percentage: 20.0 },
  { country: "Canada", code: "CA", backlinks: 342, percentage: 12.0 },
  { country: "Australia", code: "AU", backlinks: 284, percentage: 10.0 },
  { country: "Germany", code: "DE", backlinks: 227, percentage: 8.0 },
  { country: "Others", code: "XX", backlinks: 179, percentage: 6.2 },
];

export function GeographicDistribution() {
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Geographic Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {geographicData.map((location, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="w-8 text-xs font-mono">
                  {location.code}
                </Badge>
                <span className="font-medium">{location.country}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${location.percentage}%` }}
                  />
                </div>
                <div className="text-right min-w-[80px]">
                  <div className="font-medium">{location.backlinks.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{location.percentage}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Countries:</span>
            <span className="font-medium">24</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-muted-foreground">Top 3 Countries:</span>
            <span className="font-medium">75.8% of backlinks</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}