"use client";

import { MessageCircle } from "lucide-react";
import { useApp } from "../context/store";

export default function WhatsAppButton() {
  const { settings } = useApp();

  const formattedPhone = settings.whatsapp
    .replace(/[^\d+]/g, "")
    .replace(/^\+/, "")
    .replace(/^2410/, "241");

  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent("Bonjour AE PRINT Services, je souhaite obtenir un devis.")}`;

  return (
    <div className="whatsapp-float">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Contacter AE PRINT Services sur WhatsApp"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
}
