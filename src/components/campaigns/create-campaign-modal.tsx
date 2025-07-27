import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  X, 
  Upload, 
  Wand2, 
  Clock,
  Zap,
  Globe,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CampaignData {
  name: string;
  targetUrl: string;
  type: string;
  keywords: string[];
  contentType: string;
  customContent: string;
  submissionRate: number;
  minDA: number;
  minPA: number;
  countries: string[];
}

const campaignTypes = [
  { value: "guest-posts", label: "Guest Posts", description: "High-quality guest posting opportunities" },
  { value: "directory", label: "Directory Listings", description: "Submit to relevant business directories" },
  { value: "blog-comments", label: "Blog Comments", description: "Engage with relevant blog posts" }
];

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "global", label: "Global" }
];

export function CreateCampaignModal({ open, onOpenChange }: CreateCampaignModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: "",
    targetUrl: "",
    type: "",
    keywords: [],
    contentType: "auto",
    customContent: "",
    submissionRate: 25,
    minDA: 20,
    minPA: 15,
    countries: ["global"]
  });
  const [newKeyword, setNewKeyword] = useState("");
  const { toast } = useToast();

  const steps = [
    { number: 1, title: "Basic Info", icon: Target },
    { number: 2, title: "Keywords & Content", icon: Wand2 },
    { number: 3, title: "Settings", icon: Globe },
    { number: 4, title: "Review & Launch", icon: Check }
  ];

  const addKeyword = () => {
    if (newKeyword.trim() && !campaignData.keywords.includes(newKeyword.trim())) {
      setCampaignData({
        ...campaignData,
        keywords: [...campaignData.keywords, newKeyword.trim()]
      });
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setCampaignData({
      ...campaignData,
      keywords: campaignData.keywords.filter(k => k !== keyword)
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLaunch = () => {
    toast({
      title: "Campaign Created!",
      description: "Your campaign has been created and will start shortly.",
    });
    onOpenChange(false);
    setCurrentStep(1);
    setCampaignData({
      name: "",
      targetUrl: "",
      type: "",
      keywords: [],
      contentType: "auto",
      customContent: "",
      submissionRate: 25,
      minDA: 20,
      minPA: 15,
      countries: ["global"]
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return campaignData.name && campaignData.targetUrl && campaignData.type;
      case 2:
        return campaignData.keywords.length > 0;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const estimatedCompletion = Math.ceil((1000 / campaignData.submissionRate));
  const estimatedCredits = campaignData.submissionRate * estimatedCompletion;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-muted bg-background text-muted-foreground'
              }`}>
                {currentStep > step.number ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <step.icon className="h-4 w-4" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 ${
                  currentStep > step.number ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name *</Label>
                <Input
                  id="campaign-name"
                  placeholder="Enter campaign name"
                  value={campaignData.name}
                  onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-url">Target URL *</Label>
                <Input
                  id="target-url"
                  placeholder="https://example.com/page"
                  value={campaignData.targetUrl}
                  onChange={(e) => setCampaignData({ ...campaignData, targetUrl: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <Label>Campaign Type *</Label>
                <RadioGroup
                  value={campaignData.type}
                  onValueChange={(value) => setCampaignData({ ...campaignData, type: value })}
                >
                  {campaignTypes.map((type) => (
                    <div key={type.value} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/30">
                      <RadioGroupItem value={type.value} id={type.value} className="mt-1" />
                      <div className="grid gap-1.5">
                        <Label htmlFor={type.value} className="font-medium">
                          {type.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Keywords & Content</h3>

              <div className="space-y-3">
                <Label>Primary Keywords *</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter keyword"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                  />
                  <Button onClick={addKeyword} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {campaignData.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="px-3 py-1">
                      {keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Content Generation</Label>
                <RadioGroup
                  value={campaignData.contentType}
                  onValueChange={(value) => setCampaignData({ ...campaignData, contentType: value })}
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="auto" id="auto" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="auto" className="font-medium">
                        AI Auto-Generate
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Let our AI create unique content for each submission
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="custom" id="custom" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="custom" className="font-medium">
                        Upload Custom Content
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Use your own pre-written content templates
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {campaignData.contentType === "custom" && (
                <div className="space-y-2">
                  <Label htmlFor="custom-content">Custom Content Template</Label>
                  <Textarea
                    id="custom-content"
                    placeholder="Enter your content template..."
                    value={campaignData.customContent}
                    onChange={(e) => setCampaignData({ ...campaignData, customContent: e.target.value })}
                    rows={6}
                  />
                </div>
              )}

              {campaignData.contentType === "auto" && (
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-sm">Content Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground italic">
                      AI will generate unique, contextual content based on your keywords and target website. 
                      Each submission will be personalized for maximum acceptance rates.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Campaign Settings</h3>

              <div className="space-y-3">
                <Label>Submission Rate: {campaignData.submissionRate} per day</Label>
                <Slider
                  value={[campaignData.submissionRate]}
                  onValueChange={(value) => setCampaignData({ ...campaignData, submissionRate: value[0] })}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Conservative (10/day)</span>
                  <span>Aggressive (100/day)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Minimum Domain Authority</Label>
                  <Select
                    value={campaignData.minDA.toString()}
                    onValueChange={(value) => setCampaignData({ ...campaignData, minDA: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10+</SelectItem>
                      <SelectItem value="20">20+</SelectItem>
                      <SelectItem value="30">30+</SelectItem>
                      <SelectItem value="40">40+</SelectItem>
                      <SelectItem value="50">50+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Minimum Page Authority</Label>
                  <Select
                    value={campaignData.minPA.toString()}
                    onValueChange={(value) => setCampaignData({ ...campaignData, minPA: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10+</SelectItem>
                      <SelectItem value="15">15+</SelectItem>
                      <SelectItem value="20">20+</SelectItem>
                      <SelectItem value="25">25+</SelectItem>
                      <SelectItem value="30">30+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Geographic Targeting</Label>
                <Select
                  value={campaignData.countries[0]}
                  onValueChange={(value) => setCampaignData({ ...campaignData, countries: [value] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Review & Launch</h3>

              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Campaign Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{campaignData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Target URL:</span>
                      <span className="font-medium truncate max-w-[200px]">{campaignData.targetUrl}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">
                        {campaignTypes.find(t => t.value === campaignData.type)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Keywords:</span>
                      <span className="font-medium">{campaignData.keywords.length} keywords</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{estimatedCompletion} days</div>
                      <div className="text-sm text-muted-foreground">Estimated completion</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{estimatedCredits}</div>
                      <div className="text-sm text-muted-foreground">Credits required</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleLaunch}>
              Launch Campaign
              <Check className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}