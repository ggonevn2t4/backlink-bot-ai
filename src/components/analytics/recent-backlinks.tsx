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
import { ExternalLink, CheckCircle, Clock, XCircle } from "lucide-react";

interface BacklinkData {
  id: string;
  sourceUrl: string;
  sourceDomain: string;
  targetUrl: string;
  anchorText: string;
  status: "live" | "pending" | "removed";
  dateCreated: string;
}

const recentBacklinks: BacklinkData[] = [
  {
    id: "1",
    sourceUrl: "https://techcrunch.com/2024/01/25/seo-automation-tools",
    sourceDomain: "techcrunch.com",
    targetUrl: "https://example.com/product",
    anchorText: "best SEO automation platform",
    status: "live",
    dateCreated: "2024-01-25"
  },
  {
    id: "2",
    sourceUrl: "https://medium.com/@writer/marketing-guide",
    sourceDomain: "medium.com",
    targetUrl: "https://example.com/blog",
    anchorText: "link building software",
    status: "pending",
    dateCreated: "2024-01-24"
  },
  {
    id: "3",
    sourceUrl: "https://reddit.com/r/SEO/comments/example",
    sourceDomain: "reddit.com",
    targetUrl: "https://example.com/features",
    anchorText: "automated backlinks",
    status: "live",
    dateCreated: "2024-01-23"
  },
  {
    id: "4",
    sourceUrl: "https://hackernews.com/item?id=123456",
    sourceDomain: "hackernews.com",
    targetUrl: "https://example.com/pricing",
    anchorText: "SEO tools comparison",
    status: "removed",
    dateCreated: "2024-01-22"
  },
  {
    id: "5",
    sourceUrl: "https://dev.to/author/seo-tips-for-developers",
    sourceDomain: "dev.to",
    targetUrl: "https://example.com/docs",
    anchorText: "developer SEO guide",
    status: "live",
    dateCreated: "2024-01-21"
  }
];

export function RecentBacklinks() {
  const getStatusIcon = (status: BacklinkData["status"]) => {
    switch (status) {
      case "live":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "removed":
        return <XCircle className="h-4 w-4 text-error" />;
    }
  };

  const getStatusBadge = (status: BacklinkData["status"]) => {
    switch (status) {
      case "live":
        return <Badge className="bg-success/10 text-success border-success/20">Live</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      case "removed":
        return <Badge className="bg-error/10 text-error border-error/20">Removed</Badge>;
    }
  };

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Recent Backlinks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Anchor Text</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBacklinks.map((backlink) => (
                <TableRow key={backlink.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{backlink.sourceDomain}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {backlink.sourceUrl}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{backlink.anchorText}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(backlink.status)}
                      {getStatusBadge(backlink.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(backlink.dateCreated).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a href={backlink.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
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