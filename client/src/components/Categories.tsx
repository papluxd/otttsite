import subscriptionsIcon from "@assets/generated_images/Subscriptions_category_icon_78f6261c.png";
import comboPackIcon from "@assets/generated_images/Combo_Pack_category_icon_a1dbc4db.png";
import adultIcon from "@assets/generated_images/Adult_content_category_icon_d41e91c0.png";
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
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className="flex flex-col items-center gap-3 group"
              data-testid={`category-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden transition-transform hover:scale-110 shadow-md hover:shadow-lg">
                <img 
                  src={category.icon} 
                  alt={category.name}
                  className="w-full h-full object-cover"
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
