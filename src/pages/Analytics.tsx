import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/analytics/date-range-picker";
import { OverviewMetrics } from "@/components/analytics/overview-metrics";
import { BacklinksTimeline } from "@/components/analytics/backlinks-timeline";
import { WebsiteCategories } from "@/components/analytics/website-categories";
import { GeographicDistribution } from "@/components/analytics/geographic-distribution";
import { SuccessRateTrends } from "@/components/analytics/success-rate-trends";
import { TopPerformingWebsites } from "@/components/analytics/top-performing-websites";
import { RecentBacklinks } from "@/components/analytics/recent-backlinks";
import { KeywordPerformance } from "@/components/analytics/keyword-performance";
import { ReportGenerationModal } from "@/components/analytics/report-generation-modal";
import { 
  Calendar,
  Download,
  FileText,
  Filter,
  RefreshCw,
  Search
} from "lucide-react";

const Analytics = () => {
  const [dateRange, setDateRange] = useState<string>("30");
  const [campaignFilter, setCampaignFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRealTime, setIsRealTime] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);

  const campaigns = [
    { value: "all", label: "All Campaigns" },
    { value: "tech-blogs", label: "Tech Blog Outreach" },
    { value: "startup-directories", label: "Startup Directory Submissions" },
    { value: "forum-engagement", label: "Forum Engagement Campaign" },
    { value: "industry-news", label: "Industry News Outreach" }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "guest-posts", label: "Guest Posts" },
    { value: "directories", label: "Directories" },
    { value: "blog-comments", label: "Blog Comments" },
    { value: "forums", label: "Forums" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track and analyze your backlink performance metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button onClick={() => setShowReportModal(true)}>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Filters and Controls */}
      <Card className="bg-gradient-card border-border">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Campaign</label>
              <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.value} value={campaign.value}>
                      {campaign.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search websites, keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Real-time Data</label>
              <div className="flex items-center pt-2">
                <button
                  onClick={() => setIsRealTime(!isRealTime)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isRealTime ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isRealTime ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="ml-2 text-sm">
                  {isRealTime && (
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
                      Live
                    </div>
                  )}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Metrics */}
      <OverviewMetrics />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BacklinksTimeline />
        <WebsiteCategories />
        <GeographicDistribution />
        <SuccessRateTrends />
      </div>

      {/* Detailed Tables */}
      <div className="space-y-6">
        <TopPerformingWebsites />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentBacklinks />
          <KeywordPerformance />
        </div>
      </div>

      <ReportGenerationModal 
        open={showReportModal} 
        onOpenChange={setShowReportModal}
      />
    </div>
  );
};

export default Analytics;