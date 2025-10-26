import { CheckSquare, Tv } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const steps = [
  {
    number: "01",
    icon: CheckSquare,
    title: "Choose Your Plan",
    description: "Browse our subscription plans and select the one that suits you best",
  },
  {
    number: "02",
    icon: SiWhatsapp,
    title: "Contact Us",
    description: "Click 'Buy Now' to send us a WhatsApp message with your chosen plan",
  },
  {
    number: "03",
    icon: Tv,
    title: "Start Streaming",
    description: "Get instant activation and start enjoying your favorite content",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in just three simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center space-y-4 relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[65%] w-[70%] h-0.5 bg-border" />
                )}
                <div className="text-6xl font-bold text-primary/20">{step.number}</div>
                <div className="w-16 h-16 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
