import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const scrollToSubscriptions = () => {
    const element = document.getElementById("subscriptions");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi, I want to know more about your OTT subscriptions.");
    window.open(`https://wa.me/919443419022?text=${message}`, "_blank");
  };

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 text-center border border-primary/20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ready to Start Streaming?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get instant access to all your favorite OTT platforms at the best prices. Join thousands of happy customers today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={scrollToSubscriptions}
              className="rounded-full px-8"
              data-testid="button-browse-subscriptions"
            >
              Browse Subscriptions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleWhatsApp}
              className="rounded-full px-8"
              data-testid="button-contact-us"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
