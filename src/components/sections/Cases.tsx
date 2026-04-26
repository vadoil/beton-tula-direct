import caseHouse from "@/assets/case-house.jpg";
import caseWarehouse from "@/assets/case-warehouse.jpg";
import caseWells from "@/assets/case-wells.jpg";
import caseRoad from "@/assets/road-slabs.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const CASES = [
  { img: caseHouse, tag: "Частный дом", title: "Монолитный фундамент и перекрытия", meta: "Тула, Зареченский р-н · 320 м³ · М300 W6 F150" },
  { img: caseWarehouse, tag: "Склад", title: "Полы и стены логистического комплекса", meta: "Тульская обл., Ленинский р-н · 1 200 м³ · М350" },
  { img: caseWells, tag: "Инженерные сети", title: "Канализационные колодцы под коттеджный посёлок", meta: "Алексин · 48 колец КС · доставка манипулятором" },
  { img: caseRoad, tag: "Дорожные работы", title: "Площадка под технику и подъездная дорога", meta: "Щёкино · 86 плит ПДН · М400 F200" },
];

export const Cases = () => (
  <section id="cases" className="py-20 lg:py-28">
    <div className="container-tight">
      <SectionHeading
        label="Наши объекты"
        title="С нами строят в Туле и по всей области"
        description="Поставляем бетон и ЖБИ на частные стройки, коммерческие объекты, дорожные и инженерные работы. Несколько типичных примеров — ниже."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CASES.map((c) => (
          <article key={c.title} className="group overflow-hidden rounded-lg border border-border bg-background shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={c.img} alt={c.title} loading="lazy" width={1024} height={768}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-sm bg-accent px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider text-accent-foreground">
                {c.tag}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold leading-tight">{c.title}</h3>
              <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground leading-relaxed">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-accent" />
                <span>{c.meta}</span>
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {[
          { n: "12+", t: "лет на рынке Тулы и области" },
          { n: "850+", t: "выполненных поставок ежегодно" },
          { n: "30+", t: "районов области в зоне доставки" },
        ].map((s) => (
          <div key={s.t} className="rounded-lg border border-border bg-surface p-6 text-center">
            <div className="text-4xl font-extrabold tabular-nums text-accent">{s.n}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.t}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start gap-3 rounded-lg bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-foreground"><strong>Хотите так же на свой объект?</strong> Посчитаем стоимость и согласуем поставку под ваш график.</p>
        <Button variant="cta" size="lg" asChild><a href="#calculator">Рассчитать мой объект</a></Button>
      </div>
    </div>
  </section>
);
