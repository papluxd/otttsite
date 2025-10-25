import { SiWhatsapp } from "react-icons/si";

export default function Footer() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi, I want to know more about your OTT subscriptions.");
    window.open(`https://wa.me/919443419022?text=${message}`, "_blank");
  };

  return (
    <footer id="contact" className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              <span className="text-primary">NEXT GEN</span>
              <span className="text-foreground"> CLICKS</span>
            </h2>
            <p className="text-sm text-muted-foreground mb-2">
              Premium OTT subscriptions at unbeatable prices.
            </p>
            <p className="text-sm text-muted-foreground">
              Trusted by 5000+ customers across India.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-base mb-3">Contact Us</h3>
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-3 hover-elevate p-3 rounded-lg w-full transition-all bg-card"
              data-testid="button-whatsapp-footer"
            >
              <div className="bg-primary/10 p-2.5 rounded-full">
                <SiWhatsapp className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm" data-testid="text-phone">+91 94434 19022</p>
                <p className="text-xs text-muted-foreground" data-testid="text-whatsapp">WhatsApp Support</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="border-t py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground text-xs">
            © {new Date().getFullYear()} Next Gen Clicks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
