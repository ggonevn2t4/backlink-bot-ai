import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KeywordData {
  keyword: string;
  backlinksCount: number;
  averageDA: number;
  trafficImpact: string;
  trend: "up" | "down" | "stable";
  changePercent: number;
}

const keywordPerformance: KeywordData[] = [
  {
    keyword: "SEO automation",
    backlinksCount: 347,
    averageDA: 78.4,
    trafficImpact: "8.2K",
    trend: "up",
    changePercent: 23.5
  },
  {
    keyword: "link building tools",
    backlinksCount: 289,
    averageDA: 72.1,
    trafficImpact: "6.7K",
    trend: "up",
    changePercent: 18.2
  },
  {
    keyword: "backlink software",
    backlinksCount: 234,
    averageDA: 69.8,
    trafficImpact: "5.4K",
    trend: "down",
    changePercent: -5.3
  },
  {
    keyword: "SEO tools",
    backlinksCount: 198,
    averageDA: 81.2,
    trafficImpact: "4.9K",
    trend: "up",
    changePercent: 12.7
  },
  {
    keyword: "automated marketing",
    backlinksCount: 156,
    averageDA: 67.3,
    trafficImpact: "3.8K",
    trend: "stable",
    changePercent: 2.1
  }
];

export function KeywordPerformance() {
  const getTrendIcon = (trend: KeywordData["trend"], changePercent: number) => {
    if (trend === "up") {
      return (
        <div className="flex items-center gap-1 text-success text-xs">
          <TrendingUp className="h-3 w-3" />
          +{changePercent}%
        </div>
      );
    } else if (trend === "down") {
      return (
        <div className="flex items-center gap-1 text-error text-xs">
          <TrendingDown className="h-3 w-3" />
          {changePercent}%
        </div>
      );
    }
    return (
      <div className="text-muted-foreground text-xs">
        {changePercent > 0 ? "+" : ""}{changePercent}%
      </div>
    );
  };

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Keyword Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Backlinks</TableHead>
                <TableHead>Avg DA</TableHead>
                <TableHead>Traffic</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keywordPerformance.map((keyword, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Badge variant="outline" className="font-medium">
                      {keyword.keyword}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{keyword.backlinksCount}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{keyword.averageDA}</span>
                      <div 
                        className="w-12 bg-muted rounded-full h-1.5"
                      >
                        <div 
                          className="bg-primary h-1.5 rounded-full" 
                          style={{ width: `${(keyword.averageDA / 100) * 100}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{keyword.trafficImpact}</span>
                  </TableCell>
                  <TableCell>
                    {getTrendIcon(keyword.trend, keyword.changePercent)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}