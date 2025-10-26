import subscriptionsIcon from "@assets/generated_images/Yellow_subscription_clapperboard_icon_51213d81.png";
import comboPackIcon from "@assets/generated_images/Purple_combo_pack_text_2c47f1f8.png";
import adultIcon from "@assets/generated_images/Red_18_plus_icon_12143b59.png";
import musicIcon from "@assets/generated_images/Music_category_icon_0c07203d.png";
import softwareIcon from "@assets/generated_images/Software_category_icon_a3fdff93.png";
import otherItemsIcon from "@assets/generated_images/Other_Items_category_icon_afd5eaa8.png";

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
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Categories</h2>
        </div>
        
        <div className="md:grid md:grid-cols-6 md:gap-8 flex md:flex-none overflow-x-auto gap-6 pb-4 md:pb-0 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="flex flex-col items-center gap-3 group flex-shrink-0"
              data-testid={`category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden transition-transform hover:scale-110 shadow-md hover:shadow-lg bg-white dark:bg-white p-3">
                <img 
                  src={category.icon} 
                  alt={category.name}
                  className="w-full h-full object-contain"
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
