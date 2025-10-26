import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Trash2, ChevronDown, Phone, Minus, Plus, ShoppingBag, ShieldCheck, BadgeCheck } from "lucide-react";
import { useLocation } from "wouter";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getSubtotal } = useCart();
  const [, setLocation] = useLocation();
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(true);
  const [offersOpen, setOffersOpen] = useState(false);

  const subtotal = getSubtotal();
  const grandTotal = subtotal;

  const handleCheckout = () => {
    if (items.length === 0) return;

    const itemsList = items
      .map(
        (item) =>
          `${item.platform} (${item.duration}) x${item.quantity} - ₹${item.discountedPrice * item.quantity}`
      )
      .join("\n");

    const message = encodeURIComponent(
      `Hi! I want to buy the following subscriptions:\n\n${itemsList}\n\nGrand Total: ₹${grandTotal}`
    );
    window.open(`https://wa.me/919433419022?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation("/")}
            className="p-2 hover:bg-primary/10 rounded-full transition-all hover:scale-105"
            data-testid="button-back"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h1 className="text-xl md:text-2xl font-bold">My Cart</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-32 space-y-6">
        {items.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Add some subscriptions to get started</p>
              <Button onClick={() => setLocation("/")} className="rounded-full px-8">
                Browse Plans
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Collapsible open={orderSummaryOpen} onOpenChange={setOrderSummaryOpen}>
              <Card className="shadow-lg overflow-hidden">
                <CollapsibleTrigger className="w-full" data-testid="toggle-order-summary">
                  <div className="flex items-center justify-between p-5 bg-muted/30 hover:bg-muted/50 transition-colors">
                    <h2 className="text-lg font-bold">Order Summary ({items.length} items)</h2>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        orderSummaryOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 space-y-4">
                    {items.map((item) => {
                      const savings = Math.round(
                        ((item.originalPrice - item.discountedPrice) / item.originalPrice) * 100
                      );
                      return (
                        <div key={item.id} className="bg-muted/20 rounded-xl p-4 hover:bg-muted/30 transition-all">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-xl bg-background shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
                              <img
                                src={item.logo}
                                alt={item.platform}
                                className="w-full h-full object-contain p-2"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-3">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-base md:text-lg mb-1" data-testid={`text-cart-item-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}>
                                    {item.platform}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">{item.duration}</p>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-full transition-all hover:scale-110"
                                  data-testid={`button-remove-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2 mb-4">
                                <span className="text-xl font-black text-primary">₹{item.discountedPrice}</span>
                                <span className="text-sm text-muted-foreground line-through">
                                  ₹{item.originalPrice}
                                </span>
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-green-500 hover:bg-green-600 text-white border-0"
                                >
                                  {savings}% OFF
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 bg-background rounded-full shadow-sm border">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-2 hover:bg-primary/10 rounded-full transition-all hover:scale-110"
                                    data-testid={`button-decrease-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="px-2 py-1 font-bold min-w-[2rem] text-center" data-testid={`text-quantity-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}>{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-2 hover:bg-primary/10 rounded-full transition-all hover:scale-110"
                                    data-testid={`button-increase-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>
                                <span className="text-lg font-black">
                                  ₹{item.discountedPrice * item.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            <Collapsible open={offersOpen} onOpenChange={setOffersOpen}>
              <Card className="shadow-lg overflow-hidden">
                <CollapsibleTrigger className="w-full" data-testid="toggle-offers">
                  <div className="flex items-center justify-between p-5 bg-muted/30 hover:bg-muted/50 transition-colors">
                    <h2 className="text-lg font-bold">Available Offers</h2>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-green-500 text-white border-0">
                        1 Offer Available
                      </Badge>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${offersOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                    <p className="text-sm font-medium">
                      ✨ Get instant activation on WhatsApp purchase
                    </p>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            <Card className="shadow-lg">
              <div className="p-5 bg-muted/30">
                <h2 className="text-lg font-bold mb-4">Store Location</h2>
              </div>
              <CardContent className="p-5 space-y-4">
                <div>
                  <p className="font-bold text-lg">SubFlix</p>
                  <p className="text-muted-foreground">9433419022</p>
                </div>
                <p className="text-sm italic text-muted-foreground bg-muted/30 p-3 rounded-lg">
                  Check with store if pickup is available today
                </p>
                <Button
                  variant="outline"
                  className="w-full rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => window.open("tel:9433419022")}
                  data-testid="button-call-store"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Store
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between text-base">
                  <span className="text-muted-foreground">Item Total</span>
                  <span className="font-bold text-lg" data-testid="text-subtotal">₹{subtotal.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">Grand Total</span>
                  <span className="text-2xl font-black text-primary" data-testid="text-grand-total">₹{grandTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent border-t shadow-2xl p-4 md:p-6">
          <div className="max-w-4xl mx-auto space-y-3">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg md:text-xl font-semibold py-4 md:py-5 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
              onClick={handleCheckout}
              data-testid="button-order-now"
            >
              Order Now · ₹{grandTotal.toFixed(2)}
            </Button>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <span>Secured Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5" />
                <span>Verified Merchant</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
