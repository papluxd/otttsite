import { useState } from "react";
import SubscriptionCard from "./SubscriptionCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import netflixLogo from "@assets/generated_images/Netflix_logo_34cd8c38.png";
import primeLogo from "@assets/generated_images/Amazon_Prime_logo_dd129cd5.png";
import hotstarLogo from "@assets/generated_images/Disney_Hotstar_logo_9eda79b4.png";
import sonyLogo from "@assets/generated_images/Sony_LIV_logo_ad6026b8.png";
import zee5Logo from "@assets/generated_images/Zee5_logo_fixed_1c188143.png";
import youtubeLogo from "@assets/generated_images/YouTube_Premium_logo_fixed_07e3d842.png";

//todo: remove mock functionality
const subscriptions = [
  {
    platform: "Netflix",
    logo: netflixLogo,
    duration: "1 Month Premium",
    months: 1,
    originalPrice: 649,
    discountedPrice: 199,
    features: [
      "4K Ultra HD quality",
      "Watch on 4 devices",
      "Unlimited movies & shows",
      "Cancel anytime",
    ],
    popular: true,
  },
  {
    platform: "Amazon Prime",
    logo: primeLogo,
    duration: "3 Months",
    months: 3,
    originalPrice: 459,
    discountedPrice: 149,
    features: [
      "Prime Video access",
      "Free delivery benefits",
      "Prime Music included",
      "Watch on multiple devices",
    ],
  },
  {
    platform: "Disney+ Hotstar",
    logo: hotstarLogo,
    duration: "1 Year Super",
    months: 12,
    originalPrice: 899,
    discountedPrice: 299,
    features: [
      "Live sports & cricket",
      "Disney+ originals",
      "Full HD streaming",
      "2 devices simultaneously",
    ],
  },
  {
    platform: "Sony LIV",
    logo: sonyLogo,
    duration: "6 Months",
    months: 6,
    originalPrice: 699,
    discountedPrice: 199,
    features: [
      "Live TV channels",
      "Sports & WWE",
      "Sony originals",
      "Ad-free experience",
    ],
  },
  {
    platform: "Zee5",
    logo: zee5Logo,
    duration: "1 Year",
    months: 12,
    originalPrice: 999,
    discountedPrice: 299,
    features: [
      "5000+ movies",
      "Regional content",
      "Zindagi originals",
      "Download offline",
    ],
  },
  {
    platform: "YouTube Premium",
    logo: youtubeLogo,
    duration: "3 Months",
    months: 3,
    originalPrice: 399,
    discountedPrice: 129,
    features: [
      "Ad-free videos",
      "Background play",
      "YouTube Music",
      "Download videos",
    ],
  },
  {
    platform: "Netflix",
    logo: netflixLogo,
    duration: "6 Months Premium",
    months: 6,
    originalPrice: 3894,
    discountedPrice: 1199,
    features: [
      "4K Ultra HD quality",
      "Watch on 4 devices",
      "Unlimited movies & shows",
      "Cancel anytime",
    ],
  },
  {
    platform: "Amazon Prime",
    logo: primeLogo,
    duration: "1 Month",
    months: 1,
    originalPrice: 299,
    discountedPrice: 99,
    features: [
      "Prime Video access",
      "Free delivery benefits",
      "Prime Music included",
      "Watch on multiple devices",
    ],
  },
];

export default function SubscriptionsSection() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");

  const filteredSubscriptions = selectedPeriod === "all" 
    ? subscriptions 
    : subscriptions.filter(sub => sub.months === parseInt(selectedPeriod));

  return (
    <section id="subscriptions" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Choose Your Plan</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Premium subscriptions at unbeatable prices
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Durations</SelectItem>
              <SelectItem value="1">1 Month</SelectItem>
              <SelectItem value="3">3 Months</SelectItem>
              <SelectItem value="6">6 Months</SelectItem>
              <SelectItem value="12">12 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubscriptions.map((subscription, index) => (
            <SubscriptionCard key={index} {...subscription} />
          ))}
        </div>
      </div>
    </section>
  );
}
