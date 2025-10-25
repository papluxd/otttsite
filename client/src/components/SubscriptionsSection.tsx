import SubscriptionCard from "./SubscriptionCard";

//todo: remove mock functionality
const subscriptions = [
  {
    platform: "Netflix",
    icon: "🎬",
    duration: "1 Month Premium",
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
    icon: "📺",
    duration: "3 Months",
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
    icon: "🏰",
    duration: "1 Year Super",
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
    icon: "📱",
    duration: "6 Months",
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
    icon: "🎭",
    duration: "1 Year",
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
    icon: "▶️",
    duration: "3 Months",
    originalPrice: 399,
    discountedPrice: 129,
    features: [
      "Ad-free videos",
      "Background play",
      "YouTube Music",
      "Download videos",
    ],
  },
];

export default function SubscriptionsSection() {
  return (
    <section id="subscriptions" className="py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Choose Your Perfect Plan</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Get premium subscriptions at prices that won't break the bank
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subscriptions.map((subscription, index) => (
            <SubscriptionCard key={index} {...subscription} />
          ))}
        </div>
      </div>
    </section>
  );
}
