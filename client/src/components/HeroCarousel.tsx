import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import heroImage2 from "@assets/generated_images/Streaming_entertainment_lifestyle_image_6d64675c.png";
import heroImage3 from "@assets/WhatsApp Image 2025-10-26 at 16.53.24_45cf7795_1761477866986.jpg";

const slides = [
  {
    image: heroImage2,
    title: "Your Favorites",
    subtitle: "Always Affordable",
  },
  {
    image: heroImage3,
    title: "Unbeatable Combos",
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
      className="relative h-[45vh] md:h-[70vh] min-h-[350px] md:min-h-[450px] overflow-hidden"
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

      <div className="absolute bottom-16 right-4 md:bottom-20 md:right-12">
        <h1 
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase text-right" 
          style={{ 
            fontFamily: 'Montserrat, sans-serif', 
            letterSpacing: '0.1em',
            lineHeight: '1.1',
            textShadow: '2px 4px 12px rgba(0,0,0,0.7)'
          }}
        >
          {slides[currentSlide].title}
        </h1>
      </div>

      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-xl text-white hover-elevate border border-white/20"
        data-testid="button-prev-slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-xl text-white hover-elevate border border-white/20"
        data-testid="button-next-slide"
      >
        <ChevronLeft className="h-5 w-5" />
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
