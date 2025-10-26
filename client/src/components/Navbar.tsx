import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

{searchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50" onClick={() => setSearchOpen(false)} />
      )}

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-md backdrop-blur-xl z-[60]">
          <DialogHeader>
            <DialogTitle>Search Subscriptions</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-2 relative">
              <div className="flex-1 relative">
                <Input
                  placeholder="Search for platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1"
                  autoFocus
                />
                {searchQuery && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {filteredSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-4 py-2.5 hover:bg-muted/50 transition-colors text-sm border-b last:border-b-0"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>
            
            {!searchQuery && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Top Searches</p>
                <div className="flex flex-wrap gap-2">
                  {topSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => handleSuggestionClick(search)}
                      className="px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-sm font-medium transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchQuery && (
              <Button variant="outline" onClick={handleClearSearch} className="w-full">
                Clear Search
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
