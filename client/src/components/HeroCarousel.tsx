import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import heroImage1 from "@assets/generated_images/OTT_platforms_hero_banner_4506a707.png";
import heroImage2 from "@assets/generated_images/Streaming_entertainment_lifestyle_image_6d64675c.png";
import heroImage3 from "@assets/generated_images/Multi-device_streaming_concept_b6a5993d.png";

const slides = [
  {
    image: heroImage1,
    title: "Premium Streaming",
    subtitle: "Unbeatable Prices",
  },
  {
    image: heroImage2,
    title: "Your Favorites",
    subtitle: "Always Affordable",
  },
  {
    image: heroImage3,
    title: "All Platforms",
    subtitle: "One Click Away",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSubscriptions = () => {
    const element = document.getElementById("subscriptions");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div id="home" className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-white">5000+ Happy Customers</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-8">
            {slides[currentSlide].subtitle}
          </p>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light">
            Netflix • Prime • Hotstar • Sony LIV & More
          </p>
          <Button
            size="lg"
            variant="default"
            onClick={scrollToSubscriptions}
            className="text-lg px-12 py-6 h-auto text-base font-semibold"
            data-testid="button-browse-plans"
          >
            View Plans
          </Button>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-xl text-white hover-elevate border border-white/20"
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-xl text-white hover-elevate border border-white/20"
        data-testid="button-next-slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentSlide ? "w-12 bg-primary" : "w-1.5 bg-white/40"
            }`}
            data-testid={`button-slide-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
