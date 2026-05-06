import maxIconImg from "@/assets/max-icon.png";

export const TELEGRAM_URL = "#";
export const MAX_URL = "#";

type Variant = "icon" | "pill" | "row";

const TelegramIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.24 3.64 11.95c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.07-3-1.96 1.91c-.23.23-.42.42-.86.43z"/>
  </svg>
);

const MaxIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <img src={maxIconImg} alt="" className={className} aria-hidden />
);

export const MessengerLinks = ({ variant = "icon" }: { variant?: Variant }) => {
  if (variant === "icon") {
    return (
      <div className="flex items-center gap-1.5">
        <a href={TELEGRAM_URL} aria-label="Telegram"
          className="grid h-9 w-9 place-items-center rounded-md border border-border text-foreground/70 hover:bg-[#229ED9] hover:text-white hover:border-[#229ED9] transition-colors">
          <TelegramIcon />
        </a>
        <a href={MAX_URL} aria-label="МАКС"
          className="grid h-9 w-9 place-items-center rounded-md border border-border text-foreground/70 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors">
          <MaxIcon />
        </a>
      </div>
    );
  }

  if (variant === "row") {
    return (
      <div className="grid grid-cols-2 gap-2">
        <a href={TELEGRAM_URL} className="flex items-center justify-center gap-2 h-12 rounded-md bg-[#229ED9] text-white font-semibold">
          <TelegramIcon /> Telegram
        </a>
        <a href={MAX_URL} className="flex items-center justify-center gap-2 h-12 rounded-md bg-primary text-primary-foreground font-semibold">
          <MaxIcon /> МАКС
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <a href={TELEGRAM_URL} className="inline-flex items-center gap-2 rounded-full bg-[#229ED9] text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition">
        <TelegramIcon /> Telegram
      </a>
      <a href={MAX_URL} className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-4 py-2 text-sm font-semibold hover:bg-white/90 transition">
        <MaxIcon /> МАКС
      </a>
    </div>
  );
};

export { TelegramIcon, MaxIcon };