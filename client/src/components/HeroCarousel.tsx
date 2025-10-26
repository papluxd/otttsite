import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import heroImage2 from "@assets/generated_images/Streaming_entertainment_lifestyle_image_6d64675c.png";
import heroImage3 from "@assets/generated_images/Multi-device_streaming_concept_b6a5993d.png";

const slides = [
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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStart - touchEnd;
    if (swipeDistance > 75) {
      nextSlide();
    } else if (swipeDistance < -75) {
      prevSlide();
    }
  };

  return (
    <div 
      id="home" 
      className="relative h-[60vh] md:h-[70vh] min-h-[450px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
        <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 mb-4 md:mb-6">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="text-xs font-semibold text-white">5000+ Customers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-3 md:mb-4 leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-4 md:mb-6">
            {slides[currentSlide].subtitle}
          </p>
          <p className="text-sm md:text-base lg:text-lg text-white/90 mb-6 md:mb-8 max-w-xl mx-auto font-light">
            Netflix • Prime • Hotstar • Sony LIV & More
          </p>
          <Button
            variant="default"
            size="sm"
            onClick={scrollToSubscriptions}
            className="px-6 shadow-xl hover:shadow-2xl rounded-full"
            data-testid="button-browse-plans"
          >
            View Plans
          </Button>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-xl text-white hover-elevate border border-white/20"
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-xl text-white hover-elevate border border-white/20"
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
