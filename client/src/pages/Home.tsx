import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import SubscriptionsSection from "@/components/SubscriptionsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import PopularPlatforms from "@/components/PopularPlatforms";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroCarousel />
      <SubscriptionsSection />
      <FeaturesSection />
      <HowItWorks />
      <PopularPlatforms />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}
