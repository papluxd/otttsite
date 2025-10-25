import { Mail, Phone, MapPin } from "lucide-react";
import { SiWhatsapp, SiInstagram, SiFacebook } from "react-icons/si";
import logoImage from "@assets/generated_images/Next_Gen_Clicks_logo_f7a3e46b.png";

export default function Footer() {
  return (
    <footer id="contact" className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImage} alt="Next Gen Clicks" className="h-10 w-10" />
              <span className="text-xl font-bold">Next Gen Clicks</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted source for premium OTT subscriptions at unbeatable prices. Serving 5000+ happy customers.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/919443419022"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-elevate p-2 rounded-full"
                data-testid="link-whatsapp"
              >
                <SiWhatsapp className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover-elevate p-2 rounded-full"
                data-testid="link-instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover-elevate p-2 rounded-full"
                data-testid="link-facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#subscriptions" className="hover-elevate inline-block px-2 py-1 rounded">
                  Subscriptions
                </a>
              </li>
              <li>
                <a href="#features" className="hover-elevate inline-block px-2 py-1 rounded">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover-elevate inline-block px-2 py-1 rounded">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover-elevate inline-block px-2 py-1 rounded">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+919443419022" className="hover-elevate" data-testid="text-phone">
                  +91 94434 19022
                </a>
              </li>
              <li className="flex items-center gap-2">
                <SiWhatsapp className="h-4 w-4 text-primary" />
                <a
                  href="https://wa.me/919443419022"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-elevate"
                  data-testid="text-whatsapp"
                >
                  WhatsApp Support
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:support@nextgenclicks.com" className="hover-elevate">
                  support@nextgenclicks.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Next Gen Clicks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
