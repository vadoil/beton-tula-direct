import fleetImg from "@/assets/fleet.jpg";
import { Button } from "@/components/ui/button";
import { Truck, Wrench, Gauge, Package } from "lucide-react";

const SPECS = [
  { icon: Truck, n: "20+", t: "автомиксеров", d: "Объём от 5 до 12 м³, работа без простоев на площадке" },
  { icon: Wrench, n: "8", t: "манипуляторов", d: "Доставка ЖБИ с разгрузкой прямо на объекте" },
  { icon: Gauge, n: "2", t: "бетононасоса", d: "Подача бетона на этажи и в труднодоступные зоны" },
  { icon: Package, n: "24/7", t: "диспетчерская", d: "Принимаем заявки и согласуем слоты доставки" },
];

export const Fleet = () => (
  <section id="fleet" className="relative overflow-hidden bg-primary text-white py-20 lg:py-28">
    <img src={fleetImg} alt="Автопарк бетоновозов на бетонном заводе" loading="lazy" width={1280} height={896}
      className="absolute inset-0 h-full w-full object-cover opacity-30" />
    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/40" />

    <div className="container-tight relative z-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16 items-center">
      <div>
        <span className="section-label">Свой автопарк</span>
        <h2 className="heading-lg mt-5 text-white text-balance">
          Своя техника — <span className="text-accent">своя ответственность</span> за сроки
        </h2>
        <p className="mt-5 text-lg text-white/75 leading-relaxed">
          Не зависим от подрядчиков по логистике. Сами планируем рейсы, контролируем выезды и держим резервные машины — поэтому доставляем бетон и ЖБИ точно в окно поставки.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
          {SPECS.map((s) => (
            <div key={s.t} className="rounded-lg border border-white/15 bg-white/5 p-4 sm:p-5">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-sm bg-accent text-accent-foreground shrink-0">
                  <s.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold tabular-nums leading-none">{s.n}</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mt-1">{s.t}</div>
                </div>
              </div>
              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="cta" size="lg" asChild><a href="#calculator">Заказать доставку</a></Button>
          <Button variant="onDark" size="lg" asChild><a href="tel:+79101600333">Позвонить диспетчеру</a></Button>
        </div>
      </div>

      <div className="hidden lg:block" />
    </div>
  </section>
);
