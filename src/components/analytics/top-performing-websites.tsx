import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, TrendingUp, TrendingDown } from "lucide-react";

interface WebsiteData {
  domain: string;
  da: number;
  pa: number;
  successRate: number;
  totalBacklinks: number;
  trend: "up" | "down" | "stable";
  category: string;
}

const topWebsites: WebsiteData[] = [
  {
    domain: "techcrunch.com",
    da: 92,
    pa: 78,
    successRate: 95.2,
    totalBacklinks: 127,
    trend: "up",
    category: "News"
  },
  {
    domain: "medium.com",
    da: 86,
    pa: 72,
    successRate: 89.7,
    totalBacklinks: 203,
    trend: "up",
    category: "Blog"
  },
  {
    domain: "reddit.com",
    da: 91,
    pa: 68,
    successRate: 76.4,
    totalBacklinks: 156,
    trend: "down",
    category: "Forum"
  },
  {
    domain: "hackernews.com",
    da: 88,
    pa: 74,
    successRate: 92.1,
    totalBacklinks: 89,
    trend: "up",
    category: "Tech"
  },
  {
    domain: "dev.to",
    da: 72,
    pa: 65,
    successRate: 87.3,
    totalBacklinks: 134,
    trend: "stable",
    category: "Tech"
  }
];

export function TopPerformingWebsites() {
  const getTrendIcon = (trend: WebsiteData["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-error" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const variants: Record<string, string> = {
      "News": "bg-primary/10 text-primary border-primary/20",
      "Blog": "bg-success/10 text-success border-success/20",
      "Forum": "bg-warning/10 text-warning border-warning/20",
      "Tech": "bg-purple-500/10 text-purple-500 border-purple-500/20"
    };
    
    return (
      <Badge className={variants[category] || "bg-muted/10 text-muted-foreground border-muted/20"}>
        {category}
      </Badge>
    );
  };

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Top Performing Websites</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>DA/PA</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Total Backlinks</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topWebsites.map((website, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium">{website.domain}</div>
                  </TableCell>
                  <TableCell>
                    {getCategoryBadge(website.category)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <span className="font-medium">{website.da}</span>
                      <span className="text-muted-foreground mx-1">/</span>
                      <span className="font-medium">{website.pa}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{website.successRate}%</span>
                      <div 
                        className="w-16 bg-muted rounded-full h-1.5"
                      >
                        <div 
                          className="bg-success h-1.5 rounded-full" 
                          style={{ width: `${website.successRate}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{website.totalBacklinks}</span>
                  </TableCell>
                  <TableCell>
                    {getTrendIcon(website.trend)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
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