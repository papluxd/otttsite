import SubscriptionCard from "../SubscriptionCard";
import netflixLogo from "@assets/generated_images/Netflix_logo_34cd8c38.png";

export default function SubscriptionCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <SubscriptionCard
        platform="Netflix"
        logo={netflixLogo}
        duration="1 Month Premium"
        originalPrice={649}
        discountedPrice={199}
        features={[
          "4K Ultra HD quality",
          "Watch on 4 devices",
          "Unlimited movies & shows",
          "Cancel anytime",
        ]}
        popular={true}
      />
    </div>
  );
}
