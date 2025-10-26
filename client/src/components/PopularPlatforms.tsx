import { platformsData } from "./SubscriptionsSection";

interface PopularPlatformsProps {
  onPlatformClick: (platform: string) => void;
}

export default function PopularPlatforms({ onPlatformClick }: PopularPlatformsProps) {
  const scrollToSubscriptions = () => {
    const element = document.getElementById("subscriptions");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePlatformClick = (platformName: string) => {
    onPlatformClick(platformName);
    scrollToSubscriptions();
  };

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Recommended for you</h2>
          <p className="text-muted-foreground">Popular streaming platforms at best prices</p>
        </div>
        
        <div className="flex gap-4 overflow-x-auto py-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {platformsData.map((platform) => (
            <button
              key={platform.platform}
              onClick={() => handlePlatformClick(platform.platform)}
              className="flex-shrink-0 w-48 group"
              data-testid={`popular-${platform.platform.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="bg-background hover:bg-muted/50 rounded-xl p-6 transition-all border border-border/50 hover:border-primary/50 hover:scale-105 shadow-sm hover:shadow-md">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-lg bg-muted/30 flex items-center justify-center overflow-hidden">
                    <img 
                      src={platform.logo} 
                      alt={platform.platform}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-base font-semibold mb-1">{platform.platform}</p>
                    <p className="text-sm text-muted-foreground">Starting at</p>
                    <p className="text-lg font-bold text-primary">₹{platform.plans[0].discountedPrice}/mo</p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
