import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Eraser, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { platformsData } from "./SubscriptionsSection";
import { useCart } from "@/context/CartContext";
import { useLocation } from "wouter";
import logoImage from "@assets/unnamed_1761490359361.jpg";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getTotalItems } = useCart();
  const [, setLocation] = useLocation();
  const cartItemCount = getTotalItems();

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
    <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Menu Icon */}
          <div className="flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Center - Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img 
              src={logoImage} 
              alt="SUBFLIX" 
              className="h-12 md:h-14 w-auto object-contain mix-blend-darken dark:mix-blend-lighten"
              style={{ 
                filter: 'brightness(1.1) contrast(1.2)',
                imageRendering: 'crisp-edges'
              }}
              data-testid="img-logo"
            />
          </div>

          {/* Right - Search & Cart Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              data-testid="button-search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setLocation("/cart")}
              className="p-2 hover:bg-muted rounded-lg transition-colors relative"
              data-testid="button-cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center" data-testid="text-cart-count">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            data-testid="overlay-mobile-menu"
          />
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-border z-50 animate-in slide-in-from-left duration-300">
            <div className="px-4 py-6 space-y-2">
              <div className="mb-6">
                <img 
                  src={logoImage} 
                  alt="SUBFLIX" 
                  className="h-14 w-auto object-contain mix-blend-darken dark:mix-blend-lighten"
                  style={{ 
                    filter: 'brightness(1.1) contrast(1.2)',
                    imageRendering: 'crisp-edges'
                  }}
                  data-testid="img-logo-mobile"
                />
              </div>
              <button
                onClick={() => scrollToSection("subscriptions")}
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-muted font-medium transition-all"
                data-testid="link-subscriptions-mobile"
              >
                Plans
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-4 py-3 rounded-lg hover:bg-muted font-medium transition-all"
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
        </>
      )}

<Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogPortal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-0 right-0 top-0 bottom-0 z-50 w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top duration-200">
            <div className="bg-background/95 backdrop-blur-xl shadow-2xl border-b border-border/50 overflow-hidden max-w-2xl mx-auto h-full">
              <div className="p-6">
                <div className="relative flex items-center gap-3 bg-muted/30 rounded-full px-5 py-3 border border-border/50 focus-within:border-primary transition-all">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for platforms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1 bg-transparent border-0 outline-none text-base placeholder:text-muted-foreground"
                    autoFocus
                    data-testid="input-search"
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="p-1 hover:bg-muted rounded-full transition-colors"
                      data-testid="button-clear-search"
                    >
                      <Eraser className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="p-1.5 hover:bg-muted rounded-full transition-colors"
                    data-testid="button-close-search"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
                {searchQuery && filteredSuggestions.length > 0 && (
                  <div className="border-t border-border/30">
                    {filteredSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-6 py-3.5 hover:bg-muted/50 transition-colors flex items-center gap-3 border-b border-border/20 last:border-b-0"
                        data-testid={`suggestion-${suggestion.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}
                
                {!searchQuery && (
                  <div className="px-6 py-4 border-t border-border/30">
                    <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Top Searches</p>
                    <div className="space-y-1">
                      {topSearches.map((search) => (
                        <button
                          key={search}
                          onClick={() => handleSuggestionClick(search)}
                          className="w-full text-left px-4 py-2.5 hover:bg-muted/50 rounded-lg transition-colors flex items-center gap-3"
                          data-testid={`top-search-${search.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <Search className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="px-6 py-6 border-t border-border/30">
                  <p className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Recommended for you</p>
                  <div className="flex gap-4 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                    {platformsData.slice(0, 8).map((platform) => (
                      <button
                        key={platform.platform}
                        onClick={() => handleSuggestionClick(platform.platform)}
                        className="flex-shrink-0 w-40 group"
                        data-testid={`recommended-${platform.platform.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="bg-muted/30 hover:bg-muted/50 rounded-xl p-4 transition-all border border-border/30 hover:border-primary/50 hover:scale-105">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-lg bg-background flex items-center justify-center overflow-hidden">
                              <img 
                                src={platform.logo} 
                                alt={platform.platform}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-semibold line-clamp-2">{platform.platform}</p>
                              <p className="text-xs text-muted-foreground mt-1">₹{platform.plans[0].discountedPrice}/mo</p>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </nav>
  );
}
