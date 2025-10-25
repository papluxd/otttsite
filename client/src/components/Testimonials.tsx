import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

//todo: remove mock functionality
const testimonials = [
  {
    name: "Rajesh Kumar",
    initials: "RK",
    rating: 5,
    text: "Best service for OTT subscriptions! Got my Netflix Premium at half price and it works perfectly. Highly recommended!",
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    rating: 5,
    text: "Amazing support and instant activation. I've been using their service for 6 months now. Very reliable and affordable.",
  },
  {
    name: "Amit Patel",
    initials: "AP",
    rating: 5,
    text: "Genuine accounts at great prices. Customer service is excellent and they respond very quickly on WhatsApp.",
  },
  {
    name: "Sneha Reddy",
    initials: "SR",
    rating: 5,
    text: "Saved so much money on my Disney+ Hotstar subscription. The process was super smooth and hassle-free!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Join thousands of satisfied customers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-elevate">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold" data-testid={`text-customer-${index}`}>{testimonial.name}</h4>
                      <div className="flex gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{testimonial.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
