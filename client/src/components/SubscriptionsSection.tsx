import SubscriptionCard from "./SubscriptionCard";
import netflixLogo from "@assets/generated_images/Netflix_logo_34cd8c38.png";
import primeLogo from "@assets/generated_images/Amazon_Prime_logo_dd129cd5.png";
import hotstarLogo from "@assets/generated_images/Disney_Hotstar_logo_9eda79b4.png";
import sonyLogo from "@assets/generated_images/Sony_LIV_logo_ad6026b8.png";
import zee5Logo from "@assets/generated_images/Zee5_logo_fixed_1c188143.png";
import youtubeLogo from "@assets/generated_images/YouTube_Premium_logo_fixed_07e3d842.png";

//todo: remove mock functionality
const platformsData = [
  {
    platform: "Netflix",
    logo: netflixLogo,
    popular: true,
    features: [
      "4K Ultra HD quality",
      "Watch on 4 devices",
      "Unlimited movies & shows",
      "Cancel anytime",
    ],
    plans: [
      { duration: "1 Month", months: 1, originalPrice: 649, discountedPrice: 199 },
      { duration: "3 Months", months: 3, originalPrice: 1947, discountedPrice: 597 },
      { duration: "6 Months", months: 6, originalPrice: 3894, discountedPrice: 1199 },
      { duration: "12 Months", months: 12, originalPrice: 7788, discountedPrice: 2399 },
    ],
  },
  {
    platform: "Amazon Prime",
    logo: primeLogo,
    features: [
      "Prime Video access",
      "Free delivery benefits",
      "Prime Music included",
      "Watch on multiple devices",
    ],
    plans: [
      { duration: "1 Month", months: 1, originalPrice: 299, discountedPrice: 99 },
      { duration: "3 Months", months: 3, originalPrice: 459, discountedPrice: 149 },
      { duration: "6 Months", months: 6, originalPrice: 899, discountedPrice: 299 },
      { duration: "12 Months", months: 12, originalPrice: 1799, discountedPrice: 599 },
    ],
  },
  {
    platform: "Disney+ Hotstar",
    logo: hotstarLogo,
    features: [
      "Live sports & cricket",
      "Disney+ originals",
      "Full HD streaming",
      "2 devices simultaneously",
    ],
    plans: [
      { duration: "1 Month", months: 1, originalPrice: 299, discountedPrice: 99 },
      { duration: "3 Months", months: 3, originalPrice: 699, discountedPrice: 249 },
      { duration: "6 Months", months: 6, originalPrice: 1199, discountedPrice: 449 },
      { duration: "12 Months", months: 12, originalPrice: 899, discountedPrice: 299 },
    ],
  },
  {
    platform: "Sony LIV",
    logo: sonyLogo,
    features: [
      "Live TV channels",
      "Sports & WWE",
      "Sony originals",
      "Ad-free experience",
    ],
    plans: [
      { duration: "1 Month", months: 1, originalPrice: 299, discountedPrice: 99 },
      { duration: "3 Months", months: 3, originalPrice: 599, discountedPrice: 199 },
      { duration: "6 Months", months: 6, originalPrice: 699, discountedPrice: 199 },
      { duration: "12 Months", months: 12, originalPrice: 999, discountedPrice: 399 },
    ],
  },
  {
    platform: "Zee5",
    logo: zee5Logo,
    features: [
      "5000+ movies",
      "Regional content",
      "Zindagi originals",
      "Download offline",
    ],
    plans: [
      { duration: "1 Month", months: 1, originalPrice: 299, discountedPrice: 99 },
      { duration: "3 Months", months: 3, originalPrice: 699, discountedPrice: 249 },
      { duration: "6 Months", months: 6, originalPrice: 899, discountedPrice: 349 },
      { duration: "12 Months", months: 12, originalPrice: 999, discountedPrice: 299 },
    ],
  },
  {
    platform: "YouTube Premium",
    logo: youtubeLogo,
    features: [
      "Ad-free videos",
      "Background play",
      "YouTube Music",
      "Download videos",
    ],
    plans: [
      { duration: "1 Month", months: 1, originalPrice: 149, discountedPrice: 49 },
      { duration: "3 Months", months: 3, originalPrice: 399, discountedPrice: 129 },
      { duration: "6 Months", months: 6, originalPrice: 799, discountedPrice: 259 },
      { duration: "12 Months", months: 12, originalPrice: 1499, discountedPrice: 499 },
    ],
  },
];

interface SubscriptionsSectionProps {
  searchQuery?: string;
}

export default function SubscriptionsSection({ searchQuery = "" }: SubscriptionsSectionProps) {
  const filteredPlatforms = searchQuery 
    ? platformsData.filter(platform => 
        platform.platform.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : platformsData;

  return (
    <section id="subscriptions" className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Choose Your Plan</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Premium subscriptions at unbeatable prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlatforms.map((platformData, index) => (
            <SubscriptionCard key={index} {...platformData} />
          ))}
        </div>
      </div>
    </section>
  );
}
