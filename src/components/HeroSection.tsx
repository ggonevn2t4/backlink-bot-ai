import { Button } from "@/components/ui/button";
import { Play, TrendingUp, Users, Zap } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Automate Your SEO with{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                AI-Powered Backlinks
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Get 500+ high-quality backlinks per day on autopilot. Our AI generates content, 
              solves CAPTCHAs, and monitors your campaigns 24/7 for maximum SEO impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="/dashboard">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  Start Free Trial
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Button variant="demo" size="lg" className="text-lg px-8 py-6">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Key metrics */}
            <div className="grid grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground">Websites</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Automation</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-3xl" />
            <img 
              src={heroImage} 
              alt="BacklinkPro Dashboard Preview" 
              className="relative z-10 w-full rounded-2xl shadow-2xl border border-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;