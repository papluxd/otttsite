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
        
        <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="flex flex-col items-center gap-3 group"
              data-testid={`category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full transition-transform hover:scale-110 shadow-lg overflow-hidden">
                <img 
                  src={category.icon} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs md:text-sm font-medium text-center group-hover:text-primary transition-colors">
                {category.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
