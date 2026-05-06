import { Phone, FileText } from "lucide-react";

export const MobileStickyBar = () => (
  <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur shadow-card-hover">
    <div className="grid grid-cols-2 gap-2 p-2.5">
      <a
        href="tel:+77777777777"
        className="flex items-center justify-center gap-2 h-14 rounded-md border border-border font-semibold text-sm"
        aria-label="Позвонить"
      >
        <Phone className="h-4 w-4 text-accent" /> Позвонить
      </a>
      <a
        href="#calculator"
        className="flex items-center justify-center gap-2 h-14 rounded-md bg-accent text-accent-foreground font-semibold text-sm"
      >
        <FileText className="h-4 w-4" /> Заявка
      </a>
    </div>
  </div>
);
