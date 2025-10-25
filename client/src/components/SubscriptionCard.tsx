import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";

interface SubscriptionCardProps {
  platform: string;
  icon: string;
  duration: string;
  originalPrice: number;
  discountedPrice: number;
  features: string[];
  popular?: boolean;
}

export default function SubscriptionCard({
  platform,
  icon,
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

  return (
    <Card className="relative overflow-visible hover-elevate transition-all duration-300 h-full flex flex-col">
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="default" className="rounded-full">
            <Zap className="h-3 w-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}
      <CardHeader className="text-center space-y-4 pb-4">
        <div className="text-5xl mx-auto">{icon}</div>
        <div>
          <h3 className="text-2xl font-bold" data-testid={`text-platform-${platform.toLowerCase().replace(/\s+/g, '-')}`}>{platform}</h3>
          <p className="text-muted-foreground">{duration}</p>
        </div>
      </CardHeader>
      <CardContent className="text-center space-y-4 flex-1">
        <div>
          <p className="text-muted-foreground line-through text-lg">₹{originalPrice}</p>
          <p className="text-4xl font-bold text-primary" data-testid={`text-price-${platform.toLowerCase().replace(/\s+/g, '-')}`}>₹{discountedPrice}</p>
          <Badge variant="secondary" className="mt-2">
            Save ₹{originalPrice - discountedPrice}
          </Badge>
        </div>
        <ul className="space-y-2 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4">
        <Button
          className="w-full rounded-full"
          size="lg"
          onClick={handleBuyNow}
          data-testid={`button-buy-${platform.toLowerCase().replace(/\s+/g, '-')}`}
        >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}
