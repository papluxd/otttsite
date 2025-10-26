import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import Categories from "@/components/Categories";
import SubscriptionsSection from "@/components/SubscriptionsSection";
import PopularPlatforms from "@/components/PopularPlatforms";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      <Navbar onSearch={setSearchQuery} />
      <HeroCarousel />
      <Categories onCategoryClick={setSearchQuery} />
      <SubscriptionsSection searchQuery={searchQuery} />
      <PopularPlatforms onPlatformClick={setSearchQuery} />
      <HowItWorks />
      <FAQ />
      <Footer />
    </div>
  );
}
