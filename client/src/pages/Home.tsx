import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import SubscriptionsSection from "@/components/SubscriptionsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroCarousel />
      <SubscriptionsSection />
      <Footer />
    </div>
  );
}
