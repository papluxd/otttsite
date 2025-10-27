import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <Navbar onSearch={() => {}} />
      <FAQ />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
