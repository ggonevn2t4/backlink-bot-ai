import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-white">BP</span>
          </div>
          <span className="text-xl font-bold">BacklinkPro</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">Pricing</a>
          <a href="#testimonials" className="text-foreground/80 hover:text-foreground transition-colors">Reviews</a>
          <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">Contact</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:inline-flex">
            Login
          </Button>
          <a href="/dashboard">
            <Button variant="hero">
              Start Free Trial
            </Button>
          </a>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;