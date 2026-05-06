import { useState } from "react";
import { MessageCircle, X, Sparkles, Tag, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openSaleBanner } from "@/components/site/SaleBanner";

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Открыть онлайн-консультант"
        className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-[60] grid h-14 w-14 lg:h-16 lg:w-16 place-items-center rounded-full bg-accent text-accent-foreground shadow-accent hover:scale-105 transition-transform"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold border-2 border-background">
            AI
          </span>
        )}
      </button>

      {/* Window */}
      {open && (
        <div className="fixed bottom-44 right-4 lg:bottom-28 lg:right-6 z-[60] w-[calc(100vw-2rem)] max-w-[400px] flex flex-col rounded-xl border border-border bg-background shadow-card-hover overflow-hidden animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center gap-3 bg-primary text-primary-foreground p-4">
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground font-extrabold">
                А
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-yellow-400 border-2 border-primary" />
            </div>
            <div className="flex-1">
              <div className="font-bold leading-tight flex items-center gap-1.5">
                AI-консультант <Sparkles className="h-3.5 w-3.5 text-accent" />
              </div>
              <div className="text-xs text-white/70">Сейчас на паузе</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white" aria-label="Закрыть">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sale notice */}
          <div className="p-5 bg-surface space-y-4">
            <div className="rounded-lg border border-border bg-background p-4 text-sm leading-relaxed">
              Это <strong>AI-консультант</strong> для расчета бетона и ЖБИ в городе Тула
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                <Tag className="h-3.5 w-3.5" /> Сейчас он отключён
              </div>
              <p className="mt-3 text-muted-foreground">
                Сайт продаётся вместе со всей механикой: каталогом, калькулятором, формами и AI-ассистентом. Покупаете – включаем, обучаем под ваш ассортимент.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="cta"
                size="lg"
                onClick={() => { setOpen(false); openSaleBanner(); }}
              >
                <Tag className="h-4 w-4" /> Купить сайт
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+77777777777"><Phone className="h-4 w-4" /> +7 777 777 77 77</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
