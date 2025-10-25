import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import SubscriptionsSection from "@/components/SubscriptionsSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen">
      <Navbar onSearch={setSearchQuery} />
      <HeroCarousel />
      <SubscriptionsSection searchQuery={searchQuery} />
      <Footer />
    </div>
  );
}
