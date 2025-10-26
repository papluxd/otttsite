import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";

interface Plan {
  duration: string;
  months: number;
  originalPrice: number;
  discountedPrice: number;
}

interface SubscriptionCardProps {
  platform: string;
  logo: string;
  plans: Plan[];
  features: string[];
  popular?: boolean;
}

export default function SubscriptionCard({
  platform,
  logo,
  plans,
  features,
  popular = false,
}: SubscriptionCardProps) {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const selectedPlan = plans[selectedPlanIndex];

  const handleBuyNow = () => {
    const message = encodeURIComponent(
      `Hi! I want to buy ${platform} ${selectedPlan.duration} subscription at ₹${selectedPlan.discountedPrice}`
    );
    window.open(`https://wa.me/919433419022?text=${message}`, "_blank");
  };

  const savings = Math.round(((selectedPlan.originalPrice - selectedPlan.discountedPrice) / selectedPlan.originalPrice) * 100);

  return (
    <Card className={`relative overflow-visible hover-elevate transition-all duration-300 h-full flex flex-col group ${popular ? 'border-primary/50' : ''}`}>
      {popular && (
        <div className="absolute -top-2 right-3">
          <Badge variant="default" className="shadow-lg text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}
      <CardContent className="p-6 flex flex-col h-full gap-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2" data-testid={`text-platform-${platform.toLowerCase().replace(/\s+/g, '-')}`}>{platform}</h3>
            <Select value={selectedPlanIndex.toString()} onValueChange={(value) => setSelectedPlanIndex(parseInt(value))}>
              <SelectTrigger className="w-full text-xs h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {plans.map((plan, index) => (
                  <SelectItem key={index} value={index.toString()} className="text-xs">
                    {plan.duration}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-12 h-12 flex items-center justify-center">
            <img src={logo} alt={platform} className="w-full h-full object-contain rounded-lg" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-foreground" data-testid={`text-price-${platform.toLowerCase().replace(/\s+/g, '-')}`}>₹{selectedPlan.discountedPrice}</span>
            <span className="text-xs text-muted-foreground line-through">₹{selectedPlan.originalPrice}</span>
          </div>
          <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-orange-500 hover:bg-orange-600 text-white border-0 w-fit">Save {savings}%</Badge>
        </div>

        <div className="border-t pt-3 space-y-1.5 flex-1">
          {features.map((feature, index) => (
            <p key={index} className="text-xs text-muted-foreground">
              {feature}
            </p>
          ))}
        </div>

        <Button
          className="w-full group-hover:shadow-lg transition-all rounded-full"
          onClick={handleBuyNow}
          data-testid={`button-buy-${platform.toLowerCase().replace(/\s+/g, '-')}`}
        >
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
}
