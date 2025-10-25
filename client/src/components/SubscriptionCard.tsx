import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface SubscriptionCardProps {
  platform: string;
  logo: string;
  duration: string;
  originalPrice: number;
  discountedPrice: number;
  features: string[];
  popular?: boolean;
}

export default function SubscriptionCard({
  platform,
  logo,
  duration,
  originalPrice,
  discountedPrice,
  features,
  popular = false,
}: SubscriptionCardProps) {
  const handleBuyNow = () => {
    const message = encodeURIComponent(
      `Hi! I want to buy ${platform} ${duration} subscription at ₹${discountedPrice}`
    );
    window.open(`https://wa.me/919443419022?text=${message}`, "_blank");
  };

  const savings = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

  return (
    <Card className={`relative overflow-visible hover-elevate transition-all duration-300 h-full flex flex-col group ${popular ? 'border-primary/50' : ''}`}>
      {popular && (
        <div className="absolute -top-3 right-4">
          <Badge variant="default" className="shadow-lg">
            <Sparkles className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}
      <CardContent className="p-8 flex flex-col h-full gap-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-1" data-testid={`text-platform-${platform.toLowerCase().replace(/\s+/g, '-')}`}>{platform}</h3>
            <p className="text-sm text-muted-foreground">{duration}</p>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={logo} alt={platform} className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="flex items-baseline gap-3">
          <div>
            <span className="text-4xl font-black text-foreground" data-testid={`text-price-${platform.toLowerCase().replace(/\s+/g, '-')}`}>₹{discountedPrice}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground line-through">₹{originalPrice}</span>
            <Badge variant="secondary" className="text-xs">Save {savings}%</Badge>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2 flex-1">
          {features.map((feature, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {feature}
            </p>
          ))}
        </div>

        <Button
          className="w-full group-hover:shadow-lg transition-all"
          size="lg"
          onClick={handleBuyNow}
          data-testid={`button-buy-${platform.toLowerCase().replace(/\s+/g, '-')}`}
        >
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
}
