import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { PhoneCall, ClipboardList, Calculator, CalendarCheck, Truck } from "lucide-react";
import roadSlabs from "@/assets/road-slabs.jpg";

const STEPS = [
  { icon: PhoneCall, title: "Заявка", text: "Звонок или форма на сайте — фиксируем задачу." },
  { icon: ClipboardList, title: "Уточнение", text: "Уточняем марку, объём, особенности объекта." },
  { icon: Calculator, title: "Расчёт", text: "Считаем стоимость с доставкой за 15 минут." },
  { icon: CalendarCheck, title: "Согласование", text: "Согласовываем дату, время и окно поставки." },
  { icon: Truck, title: "Доставка", text: "Привозим на объект точно в назначенное время." },
];

export const Delivery = () => (
  <section id="delivery" className="py-20 lg:py-28">
    <div className="container-tight">
      <SectionHeading
        label="Доставка"
        title="Доставка бетона и ЖБИ по Туле и области — без срыва графика"
        description="Согласовываем окно поставки, контролируем выезд миксеров и манипуляторов, работаем по частным и коммерческим адресам без выходных."
      />

      <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {STEPS.map((s, i) => (
          <div key={s.title} className="relative rounded-lg border border-border bg-background p-4 sm:p-6 shadow-card">
            <span className="absolute -top-3 left-4 sm:left-6 rounded-sm bg-primary px-2.5 py-1 text-xs font-extrabold tabular-nums text-primary-foreground">
              ШАГ {i + 1}
            </span>
            <s.icon className="h-6 w-6 sm:h-7 sm:w-7 text-accent" />
            <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-bold">{s.title}</h3>
            <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {[
          { t: "По Туле и области", d: "Доставка в любой район Тулы и по всей Тульской области." },
          { t: "Согласование времени", d: "Привозим в назначенное окно — без простоев бригады." },
          { t: "Частным и коммерческим", d: "Работаем с физлицами, бригадами и крупными подрядчиками." },
          { t: "Оперативная отгрузка", d: "Готовы отгрузить в день обращения при наличии слотов." },
        ].map((b) => (
          <div key={b.t} className="rounded-lg bg-surface p-4 sm:p-5">
            <h4 className="text-sm sm:text-base font-bold leading-tight">{b.t}</h4>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">{b.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-lg border border-border">
        <div className="relative aspect-square sm:aspect-[21/9]">
          <img src={roadSlabs} alt="Доставка дорожных плит и ЖБИ манипулятором по Тульской области"
            loading="lazy" width={1280} height={896}
            className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-primary/20 sm:bg-gradient-to-r sm:from-primary/85 sm:via-primary/40 sm:to-transparent" />
          <div className="relative z-10 flex h-full max-w-2xl flex-col justify-end gap-2 p-6 text-white sm:p-10">
            <span className="section-label">География доставки</span>
            <h3 className="heading-md text-white text-balance">
              Тула, Алексин, Щёкино, Новомосковск, Узловая, Ясногорск, Богородицк
            </h3>
            <p className="text-sm text-white/80 max-w-lg">Привозим бетон миксерами, ЖБИ — манипуляторами с разгрузкой прямо на площадке.</p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start gap-3 rounded-lg bg-primary p-6 text-white sm:flex-row sm:items-center sm:justify-between">
        <p className="text-white/85"><strong className="text-white">Нужна доставка сегодня?</strong> Позвоните — проверим слоты и посчитаем стоимость.</p>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button variant="cta" size="lg" asChild><a href="#calculator">Оставить заявку</a></Button>
          <Button variant="onDark" size="lg" asChild><a href="tel:+79033017383">Позвонить</a></Button>
        </div>
      </div>
    </div>
  </section>
);
