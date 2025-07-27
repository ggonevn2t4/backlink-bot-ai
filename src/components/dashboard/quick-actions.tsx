import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Eye, Activity, Download } from "lucide-react";

export function QuickActions() {
  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          <Button className="w-full justify-start" size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Create New Campaign
          </Button>
          
          <Button variant="outline" className="w-full justify-start" size="lg">
            <Eye className="mr-2 h-4 w-4" />
            View All Backlinks
          </Button>
          
          <Button variant="outline" className="w-full justify-start" size="lg">
            <Activity className="mr-2 h-4 w-4" />
            Check Website Health
          </Button>
          
          <Button variant="outline" className="w-full justify-start" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}