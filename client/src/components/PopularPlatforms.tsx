const platforms = [
  { name: "Netflix", icon: "🎬" },
  { name: "Prime Video", icon: "📺" },
  { name: "Disney+ Hotstar", icon: "🏰" },
  { name: "Sony LIV", icon: "📱" },
  { name: "Zee5", icon: "🎭" },
  { name: "Apple TV+", icon: "🍎" },
  { name: "YouTube Premium", icon: "▶️" },
  { name: "Voot", icon: "🎪" },
];

export default function PopularPlatforms() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Platforms</h2>
          <p className="text-lg text-muted-foreground">
            All your favorite streaming services in one place
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="bg-background p-6 rounded-lg text-center hover-elevate transition-all"
              data-testid={`platform-${platform.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="text-5xl mb-3">{platform.icon}</div>
              <p className="font-semibold">{platform.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
