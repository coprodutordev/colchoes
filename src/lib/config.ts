const DEFAULT_WHATSAPP_NUMBER = "5511947494482";
const DEFAULT_WHATSAPP_MSG = "Olá! Gostaria de conhecer mais sobre os colchões REMVITA.";

export function getWhatsAppUrl(message?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
  const text = message || DEFAULT_WHATSAPP_MSG;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
