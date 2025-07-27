import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MoreHorizontal } from "lucide-react";

interface ActivityItem {
  id: string;
  website: string;
  url: string;
  status: "success" | "pending" | "failed";
  timestamp: string;
  anchor: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    website: "techcrunch.com",
    url: "https://techcrunch.com/startup-news",
    status: "success",
    timestamp: "2 minutes ago",
    anchor: "best SEO tools"
  },
  {
    id: "2",
    website: "medium.com",
    url: "https://medium.com/@author/article",
    status: "pending",
    timestamp: "5 minutes ago",
    anchor: "link building automation"
  },
  {
    id: "3",
    website: "hackernews.com",
    url: "https://news.ycombinator.com/item?id=123",
    status: "success",
    timestamp: "12 minutes ago",
    anchor: "backlink strategy"
  },
  {
    id: "4",
    website: "reddit.com",
    url: "https://reddit.com/r/SEO/comments/abc",
    status: "failed",
    timestamp: "18 minutes ago",
    anchor: "SEO automation"
  },
  {
    id: "5",
    website: "dev.to",
    url: "https://dev.to/article/seo-tips",
    status: "success",
    timestamp: "25 minutes ago",
    anchor: "organic traffic growth"
  }
];

export function RecentActivity() {
  const getStatusBadge = (status: ActivityItem["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-success/10 text-success border-success/20">Success</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      case "failed":
        return <Badge className="bg-error/10 text-error border-error/20">Failed</Badge>;
    }
  };

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Activity
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between space-x-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-foreground">{activity.website}</span>
                  {getStatusBadge(activity.status)}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  Anchor: "{activity.anchor}"
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}