import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Home, Footprints, LayoutPanelTop, Building, Layers, Map, Pipette, ArrowUpRight } from "lucide-react";

const TASKS = [
  { icon: Home, title: "Для фундамента", text: "Ленточные, плитные, свайно-ростверковые. Подберём марку М250–М350." },
  { icon: Footprints, title: "Для отмостки", text: "М200–М250 с морозостойкостью F150 — служит десятки лет." },
  { icon: LayoutPanelTop, title: "Для стяжки", text: "Пескобетон М150–М300 под жилые и коммерческие помещения." },
  { icon: Building, title: "Для монолита", text: "М300–М500 для стен, колонн и ответственных конструкций." },
  { icon: Layers, title: "Для перекрытий", text: "Плиты ПК и монолитный бетон М300–М400 с подачей насосом." },
  { icon: Map, title: "Для дорожных работ", text: "М350–М450 + плиты ПДН/ПАГ для площадок и подъездов." },
  { icon: Pipette, title: "Для колодцев и инженерки", text: "Кольца КС, крышки, днища, лотки — с доставкой и монтажом." },
];

export const MaterialSelector = () => (
  <section id="selector" className="bg-surface py-12 lg:py-16">
    <div className="container-tight">
      <SectionHeading
        label="Подбор материала"
        title="Что заливаете? Подскажем, какой бетон или ЖБИ нужен"
        description="Выберите задачу — расскажем, какая марка подойдёт, в каком объёме считать и какие изделия нужны в комплект."
      />

      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {TASKS.map((t) => (
          <a key={t.title} href="#calculator"
            className="group relative flex flex-col rounded-lg border border-border bg-background p-4 sm:p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover hover:border-accent">
            <span className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-sm bg-accent text-accent-foreground">
              <t.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <h3 className="mt-3 sm:mt-4 text-sm sm:text-lg font-bold leading-tight">{t.title}</h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{t.text}</p>
            <span className="mt-3 sm:mt-4 inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-accent">
              Подобрать <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        ))}

        <div className="col-span-2 lg:col-span-1 rounded-lg bg-primary text-primary-foreground p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold">Не знаете, что выбрать?</h3>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Опишите задачу — подберём бетон или ЖБИ под ваш объект и посчитаем с доставкой.
            </p>
          </div>
          <Button variant="cta" size="lg" asChild className="mt-5 w-full">
            <a href="#calculator">Получить подбор</a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);
