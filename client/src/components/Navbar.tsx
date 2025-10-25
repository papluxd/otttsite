import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/generated_images/Next_Gen_Clicks_logo_f7a3e46b.png";

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
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Next Gen Clicks" className="h-10 w-10 md:h-12 md:w-12" />
            <span className="text-xl md:text-2xl font-bold text-foreground">Next Gen Clicks</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium"
              data-testid="link-home"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("subscriptions")}
              className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium"
              data-testid="link-subscriptions"
            >
              Subscriptions
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium"
              data-testid="link-features"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover-elevate px-3 py-2 rounded-md font-medium"
              data-testid="link-contact"
            >
              Contact
            </button>
            <Button
              variant="default"
              onClick={() => scrollToSection("subscriptions")}
              className="rounded-full"
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
        <div className="md:hidden border-t bg-background">
          <div className="px-4 py-4 space-y-2">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left px-3 py-2 rounded-md hover-elevate font-medium"
              data-testid="link-home-mobile"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("subscriptions")}
              className="block w-full text-left px-3 py-2 rounded-md hover-elevate font-medium"
              data-testid="link-subscriptions-mobile"
            >
              Subscriptions
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left px-3 py-2 rounded-md hover-elevate font-medium"
              data-testid="link-features-mobile"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-3 py-2 rounded-md hover-elevate font-medium"
              data-testid="link-contact-mobile"
            >
              Contact
            </button>
            <Button
              variant="default"
              className="w-full rounded-full mt-4"
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
