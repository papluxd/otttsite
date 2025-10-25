import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import heroImage1 from "@assets/generated_images/OTT_platforms_hero_banner_4506a707.png";
import heroImage2 from "@assets/generated_images/Streaming_entertainment_lifestyle_image_6d64675c.png";
import heroImage3 from "@assets/generated_images/Multi-device_streaming_concept_b6a5993d.png";

const slides = [
  {
    image: heroImage1,
    title: "Premium OTT Subscriptions",
    subtitle: "at Unbeatable Prices",
  },
  {
    image: heroImage2,
    title: "Stream Your Favorite Shows",
    subtitle: "Without Breaking the Bank",
  },
  {
    image: heroImage3,
    title: "All Platforms, One Place",
    subtitle: "Instant Activation & Support",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSubscriptions = () => {
    const element = document.getElementById("subscriptions");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi, I'm interested in OTT subscriptions. Please share more details.");
    window.open(`https://wa.me/919443419022?text=${message}`, "_blank");
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div id="home" className="relative h-[80vh] min-h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6 bg-primary/20 backdrop-blur-md text-primary-foreground border-primary/30">
            <Users className="h-4 w-4 mr-2" />
            5000+ Happy Customers
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-8">
            {slides[currentSlide].subtitle}
          </p>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Get Netflix, Amazon Prime, Disney+ Hotstar, and more at discounted rates. Genuine accounts with instant activation and 24/7 support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="default"
              onClick={scrollToSubscriptions}
              className="rounded-full px-8 text-lg"
              data-testid="button-browse-plans"
            >
              Browse Plans
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleWhatsApp}
              className="rounded-full px-8 text-lg bg-background/10 backdrop-blur-md border-white/30 text-white hover:bg-background/20"
              data-testid="button-contact-whatsapp"
            >
              Contact on WhatsApp
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover-elevate"
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover-elevate"
        data-testid="button-next-slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            data-testid={`button-slide-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
