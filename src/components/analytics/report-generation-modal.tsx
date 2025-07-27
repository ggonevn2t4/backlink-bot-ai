import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Mail, 
  Calendar,
  Palette,
  Globe,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportGenerationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReportGenerationModal({ open, onOpenChange }: ReportGenerationModalProps) {
  const [reportConfig, setReportConfig] = useState({
    dateRange: "30",
    format: "pdf",
    sections: {
      overview: true,
      charts: true,
      tables: true,
      keywords: true
    },
    whiteLabel: false,
    schedule: false,
    frequency: "weekly",
    email: "",
    logoUrl: "",
    companyName: "",
    brandColor: "#6366f1"
  });

  const { toast } = useToast();

  const handleSectionChange = (section: string, checked: boolean) => {
    setReportConfig({
      ...reportConfig,
      sections: {
        ...reportConfig.sections,
        [section]: checked
      }
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated!",
      description: "Your analytics report has been generated and will be downloaded shortly.",
    });
    onOpenChange(false);
  };

  const handleScheduleReport = () => {
    toast({
      title: "Report Scheduled!",
      description: `Automated ${reportConfig.frequency} reports have been set up for ${reportConfig.email}.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate Analytics Report</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Date Range */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Date Range</Label>
            <Select value={reportConfig.dateRange} onValueChange={(value) => 
              setReportConfig({ ...reportConfig, dateRange: value })
            }>
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

          {/* Export Format */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Export Format</Label>
            <RadioGroup 
              value={reportConfig.format} 
              onValueChange={(value) => setReportConfig({ ...reportConfig, format: value })}
            >
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/30">
                <RadioGroupItem value="pdf" id="pdf" />
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-error" />
                  <Label htmlFor="pdf">PDF Report</Label>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/30">
                <RadioGroupItem value="excel" id="excel" />
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-success" />
                  <Label htmlFor="excel">Excel Spreadsheet</Label>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/30">
                <RadioGroupItem value="csv" id="csv" />
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-warning" />
                  <Label htmlFor="csv">CSV Data</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Report Sections */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Include Sections</Label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries({
                overview: "Overview Metrics",
                charts: "Performance Charts", 
                tables: "Detailed Tables",
                keywords: "Keyword Analysis"
              }).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-2 p-3 border rounded-lg">
                  <Checkbox
                    id={key}
                    checked={reportConfig.sections[key as keyof typeof reportConfig.sections]}
                    onCheckedChange={(checked) => handleSectionChange(key, checked as boolean)}
                  />
                  <Label htmlFor={key} className="text-sm">{label}</Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* White Label Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="white-label"
                checked={reportConfig.whiteLabel}
                onCheckedChange={(checked) => 
                  setReportConfig({ ...reportConfig, whiteLabel: checked as boolean })
                }
              />
              <Label htmlFor="white-label" className="text-base font-semibold">
                White-label Report
              </Label>
            </div>

            {reportConfig.whiteLabel && (
              <Card className="bg-muted/30">
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input
                        id="company-name"
                        placeholder="Your Company"
                        value={reportConfig.companyName}
                        onChange={(e) => 
                          setReportConfig({ ...reportConfig, companyName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logo-url">Logo URL</Label>
                      <Input
                        id="logo-url"
                        placeholder="https://example.com/logo.png"
                        value={reportConfig.logoUrl}
                        onChange={(e) => 
                          setReportConfig({ ...reportConfig, logoUrl: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Brand Color</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={reportConfig.brandColor}
                        onChange={(e) => 
                          setReportConfig({ ...reportConfig, brandColor: e.target.value })
                        }
                        className="w-12 h-8 border border-border rounded cursor-pointer"
                      />
                      <Input
                        value={reportConfig.brandColor}
                        onChange={(e) => 
                          setReportConfig({ ...reportConfig, brandColor: e.target.value })
                        }
                        className="font-mono"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Separator />

          {/* Email Scheduling */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="schedule"
                checked={reportConfig.schedule}
                onCheckedChange={(checked) => 
                  setReportConfig({ ...reportConfig, schedule: checked as boolean })
                }
              />
              <Label htmlFor="schedule" className="text-base font-semibold">
                Schedule Automated Reports
              </Label>
            </div>

            {reportConfig.schedule && (
              <Card className="bg-muted/30">
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="reports@company.com"
                        value={reportConfig.email}
                        onChange={(e) => 
                          setReportConfig({ ...reportConfig, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Frequency</Label>
                      <Select 
                        value={reportConfig.frequency} 
                        onValueChange={(value) => 
                          setReportConfig({ ...reportConfig, frequency: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          
          <div className="flex gap-3">
            {reportConfig.schedule && (
              <Button onClick={handleScheduleReport} variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Reports
              </Button>
            )}
            <Button onClick={handleGenerateReport}>
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}