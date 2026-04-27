import { Phone, FileText } from "lucide-react";
import { TELEGRAM_URL, MAX_URL, TelegramIcon, MaxIcon } from "@/components/site/MessengerLinks";

export const MobileStickyBar = () => (
  <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur shadow-card-hover">
    <div className="grid grid-cols-4 gap-2 p-2.5">
      <a
        href="tel:+79101600333"
        className="flex flex-col items-center justify-center gap-0.5 h-14 rounded-md border border-border font-semibold text-[11px]"
        aria-label="Позвонить"
      >
        <Phone className="h-4 w-4 text-accent" /> Звонок
      </a>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-0.5 h-14 rounded-md bg-[#229ED9] text-white font-semibold text-[11px]"
        aria-label="Telegram"
      >
        <TelegramIcon className="h-4 w-4" /> Telegram
      </a>
      <a
        href={MAX_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center gap-0.5 h-14 rounded-md bg-primary text-primary-foreground font-semibold text-[11px]"
        aria-label="МАКС"
      >
        <MaxIcon className="h-4 w-4" /> МАКС
      </a>
      <a
        href="#calculator"
        className="flex flex-col items-center justify-center gap-0.5 h-14 rounded-md bg-accent text-accent-foreground font-semibold text-[11px]"
      >
        <FileText className="h-4 w-4" /> Заявка
      </a>
    </div>
  </div>
);
