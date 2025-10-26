import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { platformsData } from "./SubscriptionsSection";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleSearch = () => {
    onSearch(searchQuery.trim());
    scrollToSection("subscriptions");
    setSearchOpen(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  const platformNames = platformsData.map(p => p.platform);
  const topSearches = ["YouTube Premium", "Netflix", "Amazon Prime"];
  
  const filteredSuggestions = searchQuery 
    ? platformNames.filter(name => 
        name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    scrollToSection("subscriptions");
    setSearchOpen(false);
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
              onClick={() => setSearchOpen(true)}
              className="text-sm text-foreground hover-elevate p-2 rounded-lg font-medium transition-all"
              data-testid="button-search"
            >
              <Search className="h-5 w-5" />
            </button>
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
              className="ml-2 rounded-full"
              size="sm"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-foreground"
              data-testid="button-search-mobile-header"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
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
              className="w-full mt-4 rounded-full"
              onClick={() => scrollToSection("subscriptions")}
              data-testid="button-get-started-mobile"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}

<Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogPortal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-[50%] top-20 z-50 grid w-full max-w-lg translate-x-[-50%] gap-6 border-0 bg-transparent backdrop-blur-xl p-8 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top rounded-2xl">
            <DialogPrimitive.Close className="absolute right-6 top-6 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-muted/50 p-2">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
            <DialogHeader>
              <DialogTitle className="text-2xl">Search Subscriptions</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="relative">
                <Input
                  placeholder="Search for platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="h-12 text-base rounded-xl border-2 focus:border-primary bg-transparent"
                  autoFocus
                />
                {searchQuery && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-background border-2 border-primary/20 rounded-xl shadow-xl z-10 max-h-64 overflow-y-auto">
                    {filteredSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors text-sm border-b last:border-b-0 border-border/20"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {!searchQuery && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground font-semibold">Top Searches</p>
                  <div className="flex flex-col gap-2">
                    {topSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => handleSuggestionClick(search)}
                        className="px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-sm font-medium transition-all hover:scale-105 text-left"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchQuery && (
                <Button variant="outline" onClick={handleClearSearch} className="w-full h-11 rounded-xl">
                  Clear Search
                </Button>
              )}
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </nav>
  );
}
