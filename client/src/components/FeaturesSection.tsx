import { Zap, HeadphonesIcon, Shield, BadgeCheck, Lock, DollarSign } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Activation",
    description: "Get your subscription activated within minutes of payment",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your queries",
  },
  {
    icon: BadgeCheck,
    title: "Genuine Accounts",
    description: "100% authentic and verified subscription accounts",
  },
  {
    icon: DollarSign,
    title: "Best Prices",
    description: "Guaranteed lowest prices on all OTT subscriptions",
  },
  {
    icon: Lock,
    title: "Secure Transactions",
    description: "Your payments and data are completely secure with us",
  },
  {
    icon: Shield,
    title: "Money-back Guarantee",
    description: "Full refund if subscription doesn't work as promised",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We provide the best service and support for all your streaming needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center space-y-4 p-6 rounded-lg hover-elevate"
                data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
