import { Star } from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    name: "David Chen",
    title: "CEO, TechScale Solutions",
    image: testimonial1,
    content: "BacklinkPro increased our organic traffic by 340% in just 3 months. The AI content generation is incredible - each backlink feels natural and relevant.",
    rating: 5,
    results: "340% traffic increase"
  },
  {
    name: "Sarah Martinez",
    title: "Marketing Director, GrowthLab",
    image: testimonial2,
    content: "We've tried every backlink tool out there, but nothing compares to BacklinkPro's automation. It's like having a team of 50 SEO experts working 24/7.",
    rating: 5,
    results: "First page rankings for 80+ keywords"
  },
  {
    name: "Alex Thompson",
    title: "Founder, StartupBoost",
    image: testimonial3,
    content: "The ROI is insane. We're getting high-quality backlinks for a fraction of the cost of manual outreach. Our domain authority jumped from 15 to 45.",
    rating: 5,
    results: "Domain authority: 15 → 45"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Trusted by{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              SEO Experts
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how industry leaders are achieving extraordinary results with BacklinkPro's 
            AI-powered automation platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-primary/10 hover:shadow-lg"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Content */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              {/* Results badge */}
              <div className="mb-6">
                <span className="inline-block bg-gradient-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/20">
                  {testimonial.results}
                </span>
              </div>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;