import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { StatsCard } from "@/components/dashboard/stats-card";
import { 
  Play, 
  Pause, 
  Edit, 
  Calendar, 
  Globe, 
  TrendingUp, 
  Clock,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

interface CampaignDetailsProps {
  campaignId: string;
}

interface SubmissionLog {
  id: string;
  website: string;
  url: string;
  status: "success" | "pending" | "failed";
  timestamp: string;
  reason?: string;
}

interface Backlink {
  id: string;
  sourceUrl: string;
  sourceDomain: string;
  anchorText: string;
  dateCreated: string;
  domainAuthority: number;
  pageAuthority: number;
  status: "live" | "removed" | "pending";
}

const mockSubmissions: SubmissionLog[] = [
  {
    id: "1",
    website: "techcrunch.com",
    url: "https://techcrunch.com/submit",
    status: "success",
    timestamp: "2024-01-25 14:30:00"
  },
  {
    id: "2",
    website: "medium.com",
    url: "https://medium.com/@author/new-post",
    status: "pending",
    timestamp: "2024-01-25 14:25:00"
  },
  {
    id: "3",
    website: "hackernews.com",
    url: "https://news.ycombinator.com/submit",
    status: "failed",
    timestamp: "2024-01-25 14:20:00",
    reason: "CAPTCHA failed"
  }
];

const mockBacklinks: Backlink[] = [
  {
    id: "1",
    sourceUrl: "https://techcrunch.com/article/seo-tools-2024",
    sourceDomain: "techcrunch.com",
    anchorText: "best SEO automation tools",
    dateCreated: "2024-01-20",
    domainAuthority: 92,
    pageAuthority: 78,
    status: "live"
  },
  {
    id: "2",
    sourceUrl: "https://medium.com/@writer/marketing-tips",
    sourceDomain: "medium.com",
    anchorText: "link building software",
    dateCreated: "2024-01-18",
    domainAuthority: 78,
    pageAuthority: 65,
    status: "live"
  },
  {
    id: "3",
    sourceUrl: "https://reddit.com/r/SEO/comments/example",
    sourceDomain: "reddit.com",
    anchorText: "automated backlinks",
    dateCreated: "2024-01-15",
    domainAuthority: 91,
    pageAuthority: 45,
    status: "pending"
  }
];

export function CampaignDetails({ campaignId }: CampaignDetailsProps) {
  const [campaign] = useState({
    id: campaignId,
    name: "Tech Blog Outreach",
    status: "active",
    progress: 65,
    targetUrl: "https://example.com/product",
    createdDate: "2024-01-15",
    keywords: ["SEO tools", "link building", "automation"],
    submissionRate: 25,
    totalSubmissions: 847,
    successfulSubmissions: 549,
    failedSubmissions: 98,
    pendingSubmissions: 200
  });

  const [realtimeSubmissions, setRealtimeSubmissions] = useState(mockSubmissions);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newSubmission: SubmissionLog = {
        id: Date.now().toString(),
        website: `site${Math.floor(Math.random() * 100)}.com`,
        url: `https://site${Math.floor(Math.random() * 100)}.com/submit`,
        status: Math.random() > 0.3 ? "success" : "failed",
        timestamp: new Date().toISOString()
      };
      
      setRealtimeSubmissions(prev => [newSubmission, ...prev.slice(0, 9)]);
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: SubmissionLog["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-error" />;
    }
  };

  const getStatusBadge = (status: SubmissionLog["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-success/10 text-success border-success/20">Success</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      case "failed":
        return <Badge className="bg-error/10 text-error border-error/20">Failed</Badge>;
    }
  };

  const getBacklinkStatusBadge = (status: Backlink["status"]) => {
    switch (status) {
      case "live":
        return <Badge className="bg-success/10 text-success border-success/20">Live</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      case "removed":
        return <Badge className="bg-error/10 text-error border-error/20">Removed</Badge>;
    }
  };

  const successRate = Math.round((campaign.successfulSubmissions / campaign.totalSubmissions) * 100);
  const avgDA = Math.round(mockBacklinks.reduce((sum, b) => sum + b.domainAuthority, 0) / mockBacklinks.length);
  const avgPA = Math.round(mockBacklinks.reduce((sum, b) => sum + b.pageAuthority, 0) / mockBacklinks.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">{campaign.name}</h1>
          <p className="text-muted-foreground mt-1">
            Created on {new Date(campaign.createdDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Campaign
          </Button>
          <Button variant={campaign.status === "active" ? "outline" : "default"}>
            {campaign.status === "active" ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause Campaign
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Resume Campaign
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Campaign Progress"
          value={`${campaign.progress}%`}
          subtitle="completion"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatsCard
          title="Success Rate"
          value={`${successRate}%`}
          subtitle="submissions accepted"
          trend="up"
          trendValue="+2.1%"
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <StatsCard
          title="Average DA"
          value={avgDA}
          subtitle="domain authority"
          icon={<Globe className="h-4 w-4" />}
        />
        <StatsCard
          title="Live Backlinks"
          value={mockBacklinks.filter(b => b.status === "live").length}
          subtitle="total created"
          trend="up"
          trendValue="+12"
          icon={<ExternalLink className="h-4 w-4" />}
        />
      </div>

      {/* Campaign Timeline & Real-time Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Progress */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle>Campaign Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{campaign.progress}%</span>
              </div>
              <Progress value={campaign.progress} className="h-2" />
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Submissions</span>
                <span className="font-medium">{campaign.totalSubmissions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Successful</span>
                <span className="font-medium text-success">{campaign.successfulSubmissions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Pending</span>
                <span className="font-medium text-warning">{campaign.pendingSubmissions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Failed</span>
                <span className="font-medium text-error">{campaign.failedSubmissions}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {campaign.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Submission Log */}
        <Card className="bg-gradient-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Real-time Activity
              <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {realtimeSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(submission.status)}
                    <div>
                      <div className="font-medium text-sm">{submission.website}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(submission.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  {getStatusBadge(submission.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backlinks Generated */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle>Generated Backlinks ({mockBacklinks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source Website</TableHead>
                  <TableHead>Anchor Text</TableHead>
                  <TableHead>DA/PA</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBacklinks.map((backlink) => (
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
                      <span className="text-sm font-medium">{backlink.anchorText}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="font-medium">{backlink.domainAuthority}</span>
                        <span className="text-muted-foreground mx-1">/</span>
                        <span className="font-medium">{backlink.pageAuthority}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(backlink.dateCreated).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getBacklinkStatusBadge(backlink.status)}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
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
    </div>
  );
}