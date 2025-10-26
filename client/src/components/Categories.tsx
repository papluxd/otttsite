import subscriptionsIcon from "@assets/generated_images/Subscriptions_category_white_background_4f3b5d54.png";
import comboPackIcon from "@assets/generated_images/Simple_Combo_Pack_text_only_1cc55646.png";
import adultIcon from "@assets/generated_images/Red_18_plus_icon_12143b59.png";
import musicIcon from "@assets/generated_images/Music_category_icon_0c07203d.png";
import softwareIcon from "@assets/generated_images/Software_category_icon_a3fdff93.png";
import otherItemsIcon from "@assets/generated_images/Clean_green_bag_no_text_84a38612.png";

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
        
        <div className="flex overflow-x-auto gap-6 md:gap-8 pb-4 md:pb-0 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent md:grid md:grid-cols-6" style={{ scrollSnapType: 'x mandatory' }}>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="flex flex-col items-center gap-3 group flex-shrink-0 w-[30%] md:w-auto"
              style={{ scrollSnapAlign: 'start' }}
              data-testid={`category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full transition-transform hover:scale-110 shadow-md hover:shadow-lg bg-white flex items-center justify-center overflow-hidden ${category.name === "Adult" ? "border-4 border-white" : ""}`}>
                <img 
                  src={category.icon} 
                  alt={category.name}
                  className="w-[85%] h-[85%] object-contain"
                />
              </div>
              <p className="text-sm md:text-base font-medium text-center group-hover:text-primary transition-colors">
                {category.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
