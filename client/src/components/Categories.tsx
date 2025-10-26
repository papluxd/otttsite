import { useEffect, useRef } from "react";
import subscriptionsIcon from "@assets/WhatsApp Image 2025-10-26 at 08.19.58_fb1dc434_1761461124963.jpg";
import comboPackIcon from "@assets/WhatsApp Image 2025-10-26 at 08.19.59_d77a2884_1761461132534.jpg";
import adultIcon from "@assets/WhatsApp Image 2025-10-26 at 08.19.59_08f2cc8a_1761461142379.jpg";
import musicIcon from "@assets/WhatsApp Image 2025-10-26 at 08.20.00_354c60ba_1761461166917.jpg";
import softwareIcon from "@assets/WhatsApp Image 2025-10-26 at 08.19.59_86192320_1761461159045.jpg";
import otherItemsIcon from "@assets/WhatsApp Image 2025-10-26 at 08.19.59_5d9de9b8_1761461150404.jpg";

interface CategoriesProps {
  onCategoryClick: (category: string) => void;
}

const categories = [
  { name: "Subscriptions", icon: subscriptionsIcon },
  { name: "Combo Pack", icon: comboPackIcon },
  { name: "Adult", icon: adultIcon },
  { name: "Music", icon: musicIcon },
  { name: "Software", icon: softwareIcon },
  { name: "Other Items", icon: otherItemsIcon },
];

export default function Categories({ onCategoryClick }: CategoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollIndexRef = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const autoScroll = () => {
      const containerWidth = scrollContainer.offsetWidth;
      const scrollWidth = scrollContainer.scrollWidth;
      const itemWidth = scrollWidth / categories.length;
      const itemsPerView = 3;
      
      scrollIndexRef.current += 1;
      
      if (scrollIndexRef.current * itemsPerView >= categories.length) {
        scrollIndexRef.current = 0;
      }
      
      const scrollPosition = scrollIndexRef.current * itemWidth * itemsPerView;
      
      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    };

    const interval = setInterval(autoScroll, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSubscriptions = () => {
    const element = document.getElementById("subscriptions");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoryClick = (category: string) => {
    onCategoryClick(category);
    scrollToSubscriptions();
  };

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Categories</h2>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 md:gap-8 pb-4 md:pb-0 md:justify-center md:flex-wrap categories-scroll px-2 py-4"
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="flex flex-col items-center gap-3 group flex-shrink-0 min-w-[28%] md:min-w-0"
              data-testid={`category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full transition-transform hover:scale-110 shadow-lg overflow-hidden">
                <img 
                  src={category.icon} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs md:text-sm font-medium text-center group-hover:text-primary transition-colors whitespace-nowrap">
                {category.name}
              </p>
            </button>
          ))}
        </div>
      </div>
      
      <style>{`
        .categories-scroll {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
          transition: scrollbar-color 0.3s ease;
        }
        
        .categories-scroll:hover,
        .categories-scroll:active {
          scrollbar-color: #ff6b35 rgba(0, 0, 0, 0.05);
        }
        
        .categories-scroll::-webkit-scrollbar {
          height: 6px;
        }
        
        .categories-scroll::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
        
        .categories-scroll::-webkit-scrollbar-thumb {
          background: transparent;
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        
        .categories-scroll:hover::-webkit-scrollbar-thumb,
        .categories-scroll:active::-webkit-scrollbar-thumb {
          background: #ff6b35;
        }
        
        .categories-scroll:hover::-webkit-scrollbar-track,
        .categories-scroll:active::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
        }
        
        .categories-scroll::-webkit-scrollbar-thumb:hover {
          background: #ff5722;
        }
        
        @media (min-width: 768px) {
          .categories-scroll::-webkit-scrollbar {
            display: none;
          }
          .categories-scroll {
            scrollbar-width: none;
          }
        }
      `}</style>
    </section>
  );
}
