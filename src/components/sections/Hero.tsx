import heroImg from "@/assets/hero-concrete.jpg";
import { Button } from "@/components/ui/button";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Truck, ShieldCheck, Clock, Ruler, BadgeCheck } from "lucide-react";

const QUICK = [
  { icon: Truck, text: "Доставка по Туле и области" },
  { icon: Clock, text: "Отгрузка точно в срок" },
  { icon: ShieldCheck, text: "Паспорт качества на каждую партию" },
  { icon: Ruler, text: "Точный объём, без недолива" },
];

export const Hero = () => (
  <section id="top" className="relative overflow-hidden bg-primary text-white">
    <img
      src={heroImg}
      alt="Бетоновоз заливает свежий бетон на строительном объекте в Туле"
      className="absolute inset-0 h-full w-full object-cover opacity-90"
      width={1920}
      height={1280}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/20" />
    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/40" />

    <div className="container-tight relative z-10 grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:py-24">
      <div>
        <span className="section-label">Производство и доставка · Тула</span>
        <h1 className="heading-xl mt-5 text-balance text-white">
          Бетон с доставкой по Туле и области –{" "}
          <span className="text-accent">точно в срок</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          Все марки от М100 до М600, раствор, пескобетон и полный каталог ЖБИ.
          Отгрузка на объект в день заказа, помощь с подбором марки, честный объём
          и понятные условия для частных и коммерческих заказчиков.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="cta" size="xl" asChild>
            <a href="#calculator">Рассчитать стоимость</a>
          </Button>
          <Button variant="onDark" size="xl" asChild>
            <a href="#quick-form">Получить цену сегодня</a>
          </Button>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {QUICK.map((q) => (
            <li key={q.text} className="flex items-center gap-3 text-sm text-white/90">
              <span className="grid h-9 w-9 place-items-center rounded-sm bg-white/10 border border-white/15">
                <q.icon className="h-4 w-4 text-accent" />
              </span>
              <span className="font-medium">{q.text}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">
          <BadgeCheck className="h-4 w-4 text-accent" />
          <span className="text-white/80">Работаем с частными и коммерческими объектами по всей Тульской области</span>
        </div>
      </div>

      <div id="quick-form" className="rounded-lg bg-white p-6 text-foreground shadow-card-hover lg:p-8 self-start">
        <div className="flex items-baseline justify-between">
          <h2 className="heading-md">Быстрая заявка</h2>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">15 минут</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Перезвоним за 15 минут, посчитаем стоимость и срок доставки.
        </p>
        <div className="mt-5">
          <QuoteForm variant="full" submitLabel="Получить цену" />
        </div>
      </div>
    </div>
  </section>
);
