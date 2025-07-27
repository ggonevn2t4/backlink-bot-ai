import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfect for small businesses",
    backlinks: "1,000 backlinks/month",
    features: [
      "AI Content Generation",
      "Auto CAPTCHA Solving",
      "Real-time Monitoring",
      "Basic Support",
      "Campaign Analytics"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "$299",
    description: "Most popular for agencies",
    backlinks: "5,000 backlinks/month",
    features: [
      "Everything in Starter",
      "White-label Reports",
      "Priority Support",
      "Advanced Analytics",
      "API Access",
      "Custom Integrations"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$599",
    description: "For large organizations",
    backlinks: "Unlimited backlinks",
    features: [
      "Everything in Professional",
      "Dedicated Account Manager",
      "Custom AI Training",
      "Enterprise Security",
      "SLA Guarantee",
      "Custom Development"
    ],
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 px-4 bg-gradient-secondary">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Simple, Transparent{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your SEO needs. All plans include our core features 
            with no hidden fees or setup costs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-primary bg-card shadow-primary/20 shadow-xl' 
                  : 'border-border bg-card hover:border-primary/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-primary font-medium">{plan.backlinks}</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={plan.popular ? "hero" : "outline"} 
                className="w-full" 
                size="lg"
              >
                {plan.popular ? "Start Free Trial" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            All plans include a <strong className="text-foreground">14-day free trial</strong> - no credit card required
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;