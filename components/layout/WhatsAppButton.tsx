import React from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const whatsappUrl =
    "https://wa.me/919876543210?text=Hello%20MEX%20Automation%2C%20I%20am%20interested%20in%20your%20industrial%20AI%20and%20automation%20solutions.";

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40 print:hidden">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#0B7A3B] hover:bg-[#08612E] text-white rounded-full shadow-xl shadow-[#0B7A3B]/25 transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0B7A3B]"
        aria-label="Chat with MEX Automation on WhatsApp [WHATSAPP NUMBER: +91 98765 43210]"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping opacity-75" />
        </span>
        <span className="text-sm font-semibold tracking-wide hidden sm:inline-block">
          Chat with Us
        </span>
      </a>
    </aside>
  );
}

