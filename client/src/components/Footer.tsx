import { SiWhatsapp } from "react-icons/si";

export default function Footer() {
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi, I want to know more about your OTT subscriptions.");
    window.open(`https://wa.me/919433419022?text=${message}`, "_blank");
  };

  return (
    <footer id="contact" className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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
              className="flex items-center justify-center md:justify-start gap-3 hover-elevate p-4 rounded-full w-full transition-all bg-primary text-primary-foreground shadow-lg hover:shadow-xl"
              data-testid="button-whatsapp-footer"
            >
              <SiWhatsapp className="h-5 w-5" />
              <div className="text-left">
                <p className="font-semibold text-sm" data-testid="text-phone">+91 94334 19022</p>
                <p className="text-xs opacity-90" data-testid="text-whatsapp">Message on WhatsApp</p>
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
