import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dominate Search Rankings?
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of SEO professionals who trust BacklinkPro to automate their 
            link building and skyrocket their organic traffic.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              Start Your Free Trial
              <Zap className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="demo" size="lg" className="text-lg px-8 py-6">
              Schedule Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-sm font-medium text-primary">✓ No Credit Card Required</div>
              <div className="text-muted-foreground">Start building backlinks instantly</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-primary">✓ 14-Day Free Trial</div>
              <div className="text-muted-foreground">Full access to all features</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-primary">✓ Cancel Anytime</div>
              <div className="text-muted-foreground">No long-term contracts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;