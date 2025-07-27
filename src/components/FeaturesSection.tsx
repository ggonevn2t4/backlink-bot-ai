import { Brain, Shield, BarChart3, Rocket, FileText, Headphones } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Content Generation",
    description: "Our advanced AI creates unique, contextual content for each backlink submission, ensuring high acceptance rates."
  },
  {
    icon: Shield,
    title: "Auto CAPTCHA Solving",
    description: "Automatically solves CAPTCHAs using advanced AI, eliminating manual intervention and speeding up submissions."
  },
  {
    icon: BarChart3,
    title: "Real-time Monitoring",
    description: "Track your backlink campaigns in real-time with detailed analytics and performance metrics."
  },
  {
    icon: Rocket,
    title: "Mass Submission",
    description: "Submit to thousands of websites simultaneously with our high-speed, scalable infrastructure."
  },
  {
    icon: FileText,
    title: "White-label Reports",
    description: "Generate branded reports for clients with comprehensive backlink data and SEO insights."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert support team available around the clock to help optimize your campaigns."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Powerful Features for{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              SEO Success
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to dominate search rankings with automated, 
            AI-powered backlink building campaigns.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-primary/10 hover:shadow-lg"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;