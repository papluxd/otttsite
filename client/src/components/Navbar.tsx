import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl md:text-2xl font-black tracking-tight">
              <span className="text-primary">NEXT GEN</span>
              <span className="text-foreground"> CLICKS</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollToSection("subscriptions")}
              className="text-sm text-foreground hover-elevate px-3 py-2 rounded-lg font-medium transition-all"
              data-testid="link-subscriptions"
            >
              Plans
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm text-foreground hover-elevate px-3 py-2 rounded-lg font-medium transition-all"
              data-testid="link-contact"
            >
              Contact
            </button>
            <Button
              variant="default"
              onClick={() => scrollToSection("subscriptions")}
              className="ml-2"
              size="sm"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-2">
            <button
              onClick={() => scrollToSection("subscriptions")}
              className="block w-full text-left px-4 py-3 rounded-lg hover-elevate font-medium transition-all"
              data-testid="link-subscriptions-mobile"
            >
              Plans
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-3 rounded-lg hover-elevate font-medium transition-all"
              data-testid="link-contact-mobile"
            >
              Contact
            </button>
            <Button
              variant="default"
              className="w-full mt-4"
              onClick={() => scrollToSection("subscriptions")}
              data-testid="button-get-started-mobile"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
