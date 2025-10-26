import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Trash2, ChevronDown, Phone } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation("/")}
            className="p-2 hover:bg-muted rounded-full transition-colors"
            data-testid="button-back"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">Cart</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <Collapsible open={orderSummaryOpen} onOpenChange={setOrderSummaryOpen}>
          <CollapsibleTrigger className="w-full" data-testid="toggle-order-summary">
            <div className="flex items-center justify-between py-3">
              <h2 className="text-lg font-bold">Order Summary</h2>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  orderSummaryOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-3 pb-4">
              {items.map((item) => {
                const savings = Math.round(
                  ((item.originalPrice - item.discountedPrice) / item.originalPrice) * 100
                );
                return (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img
                            src={item.logo}
                            alt={item.platform}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-base" data-testid={`text-cart-item-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}>
                                {item.platform}
                              </h3>
                              <p className="text-sm text-muted-foreground">{item.duration}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
                              data-testid={`button-remove-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-lg font-bold">₹{item.discountedPrice}</span>
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{item.originalPrice}
                            </span>
                            <Badge
                              variant="secondary"
                              className="text-xs bg-green-500 hover:bg-green-600 text-white"
                            >
                              {savings}% OFF
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-3 py-1 hover:bg-muted transition-colors"
                                data-testid={`button-decrease-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                -
                              </button>
                              <span className="px-4 py-1 font-medium" data-testid={`text-quantity-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}>{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-3 py-1 hover:bg-muted transition-colors"
                                data-testid={`button-increase-${item.platform.toLowerCase().replace(/\s+/g, '-')}`}
                              >
                                +
                              </button>
                            </div>
                            <span className="font-bold">
                              ₹{item.discountedPrice * item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        <Collapsible open={offersOpen} onOpenChange={setOffersOpen}>
          <CollapsibleTrigger className="w-full" data-testid="toggle-offers">
            <div className="flex items-center justify-between py-3">
              <h2 className="text-lg font-bold">Available offers</h2>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  1 Offers Available
                </Badge>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${offersOpen ? "rotate-180" : ""}`}
                />
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  Get instant activation on WhatsApp purchase
                </p>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        <div>
          <h2 className="text-lg font-bold mb-4">Store Location</h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              <div>
                <p className="font-semibold">Weewoo</p>
                <p className="text-sm text-muted-foreground">9437519360</p>
              </div>
              <p className="text-sm italic text-muted-foreground">
                Check with store if pickup is available today
              </p>
              <Button
                variant="outline"
                className="w-full text-primary hover:text-primary"
                onClick={() => window.open("tel:9437519360")}
                data-testid="button-call-store"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Store
              </Button>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-base">
            <span>Item Total</span>
            <span className="font-semibold" data-testid="text-subtotal">₹{subtotal.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-lg font-bold">
            <span>Grand Total</span>
            <span data-testid="text-grand-total">₹ {grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="max-w-2xl mx-auto">
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6 rounded-lg"
            onClick={handleCheckout}
            disabled={items.length === 0}
            data-testid="button-pay-now"
          >
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
}
