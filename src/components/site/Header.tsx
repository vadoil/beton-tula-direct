import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MessengerLinks } from "@/components/site/MessengerLinks";
import logoTB from "@/assets/logo-tb.png";

const NAV = [
  { href: "#concrete", label: "Бетон" },
  { href: "#zhbi", label: "ЖБИ" },
  { href: "#delivery", label: "Доставка" },
  { href: "#calculator", label: "Калькулятор" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacts", label: "Контакты" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-background"}`}>
      <div className="container-tight flex h-16 items-center justify-between gap-6 lg:h-20">
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src={logoTB}
            alt="ТулаБетон — логотип"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-extrabold tracking-tight">ТулаБетон</span>
            <span className="text-xs text-muted-foreground">Бетон и ЖБИ в Туле</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <MessengerLinks variant="icon" />
          <a
            href="tel:+77777777777"
            className="flex items-center gap-1.5 font-bold text-foreground hover:text-accent transition-colors"
          >
            <Phone className="h-4 w-4 text-accent" />
            <span className="tabular-nums text-sm sm:text-base">
              <span className="sm:hidden">+7 777 777 77 77</span>
              <span className="hidden sm:inline">+7 777 777 77 77</span>
            </span>
          </a>
          <Button variant="cta" size="default" asChild className="hidden sm:inline-flex">
            <a href="#calculator">Заказать звонок</a>
          </Button>
          <button
            className="lg:hidden grid h-10 w-10 place-items-center rounded-md border border-border"
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-tight flex flex-col gap-1 py-3">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium hover:bg-secondary"
              >
                {n.label}
              </a>
            ))}
            <a href="tel:+77777777777" className="rounded-md px-3 py-3 text-base font-bold text-accent">
              +7 777 777 77 77
            </a>
            <div className="px-1 pt-2 pb-1">
              <MessengerLinks variant="row" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
