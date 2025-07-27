import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { CreateCampaignModal } from "@/components/campaigns/create-campaign-modal";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Play, 
  Pause, 
  Trash2, 
  Eye,
  Calendar,
  ArrowUpDown
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  targetUrl: string;
  keywords: string[];
  status: "active" | "paused" | "completed";
  progress: number;
  createdDate: string;
  successRate: number;
  backlinks: number;
  type: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Tech Blog Outreach",
    targetUrl: "https://example.com/product",
    keywords: ["SEO tools", "link building", "automation"],
    status: "active",
    progress: 65,
    createdDate: "2024-01-15",
    successRate: 87,
    backlinks: 145,
    type: "Guest Posts"
  },
  {
    id: "2",
    name: "Startup Directory Submissions",
    targetUrl: "https://example.com/startup",
    keywords: ["startup", "SaaS", "productivity"],
    status: "paused",
    progress: 34,
    createdDate: "2024-01-10",
    successRate: 72,
    backlinks: 89,
    type: "Directory"
  },
  {
    id: "3",
    name: "Forum Engagement Campaign",
    targetUrl: "https://example.com/blog",
    keywords: ["marketing", "growth hacking"],
    status: "completed",
    progress: 100,
    createdDate: "2024-01-05",
    successRate: 91,
    backlinks: 234,
    type: "Blog Comments"
  },
  {
    id: "4",
    name: "Industry News Outreach",
    targetUrl: "https://example.com/news",
    keywords: ["AI", "machine learning", "technology"],
    status: "active",
    progress: 28,
    createdDate: "2024-01-20",
    successRate: 83,
    backlinks: 67,
    type: "Guest Posts"
  }
];

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusBadge = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
      case "paused":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Paused</Badge>;
      case "completed":
        return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Completed</Badge>;
    }
  };

  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        case "progress":
          return b.progress - a.progress;
        case "success":
          return b.successRate - a.successRate;
        default:
          return 0;
      }
    });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCampaigns(filteredCampaigns.map(c => c.id));
    } else {
      setSelectedCampaigns([]);
    }
  };

  const handleSelectCampaign = (campaignId: string, checked: boolean) => {
    if (checked) {
      setSelectedCampaigns([...selectedCampaigns, campaignId]);
    } else {
      setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaignId));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on campaigns:`, selectedCampaigns);
    // Here you would implement the actual bulk action logic
    setSelectedCampaigns([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage and monitor your backlink automation campaigns.
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gradient-card border-border">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns, keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date Created</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="success">Success Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedCampaigns.length > 0 && (
            <div className="flex items-center gap-4 mt-4 p-4 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">
                {selectedCampaigns.length} campaign(s) selected
              </span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleBulkAction("pause")}
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleBulkAction("resume")}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleBulkAction("delete")}
                  className="text-error hover:text-error"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Campaigns Table */}
      <Card className="bg-gradient-card border-border">
        <CardHeader>
          <CardTitle>All Campaigns ({filteredCampaigns.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCampaigns.length === filteredCampaigns.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Campaign Name</TableHead>
                  <TableHead>Target URL</TableHead>
                  <TableHead>Keywords</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Success Rate</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCampaigns.includes(campaign.id)}
                        onCheckedChange={(checked) => handleSelectCampaign(campaign.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-muted-foreground">{campaign.type}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate text-sm">
                        {campaign.targetUrl}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {campaign.keywords.slice(0, 2).map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                        {campaign.keywords.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{campaign.keywords.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={campaign.progress} className="w-16" />
                        <span className="text-xs text-muted-foreground">
                          {campaign.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">
                        {campaign.successRate}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(campaign.createdDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
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
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-error">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Campaign
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CreateCampaignModal 
        open={showCreateModal} 
        onOpenChange={setShowCreateModal}
      />
    </div>
  );
};

export default Campaigns;