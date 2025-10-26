import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "919433419022";
  const message = "Can I get more info about all plans";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
      data-testid="button-whatsapp"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
    </button>
  );
}
