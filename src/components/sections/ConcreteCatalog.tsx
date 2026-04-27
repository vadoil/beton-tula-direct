import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { OrderDialog } from "@/components/site/OrderDialog";
import { ArrowRight, Check, Calculator } from "lucide-react";
import concretePour from "@/assets/concrete-pour.jpg";

const GRADES = ["М100", "М150", "М200", "М250", "М300", "М350", "М400", "М450", "М500", "М600"];

const PRODUCTS = [
  { title: "Товарный бетон", use: "Универсальное решение для большинства строительных задач — от заливки до монолита.", pros: ["Все марки в наличии", "Поставка миксером", "Свежий замес"], grades: ["М200", "М250", "М300", "М350", "М400"] },
  { title: "Раствор", use: "Кладочные и штукатурные работы, выравнивание поверхностей и инженерные задачи.", pros: ["Цементный и известковый", "Точная марка", "Стабильная подвижность"], grades: ["М75", "М100", "М150", "М200"] },
  { title: "Пескобетон", use: "Стяжка, заливка полов, фундаментные подготовки, ремонтные работы.", pros: ["Высокая прочность", "Удобная укладка", "Без расслоения"], grades: ["М150", "М200", "М300"] },
  { title: "Бетон для фундамента", use: "Ленточные, плитные и свайные фундаменты частных и коммерческих объектов.", pros: ["Морозостойкость F150+", "Водонепроницаемость W6+", "Подбор под нагрузки"], grades: ["М250", "М300", "М350"] },
  { title: "Бетон для стяжки", use: "Полы в домах, гаражах, складах и коммерческих помещениях.", pros: ["Точная подвижность", "Ровная поверхность", "Быстрый набор прочности"], grades: ["М150", "М200", "М250"] },
  { title: "Бетон для плит и перекрытий", use: "Монолитные плиты, межэтажные перекрытия, кровельные конструкции.", pros: ["Высокая марка по прочности", "Контроль состава", "Подача с насосом"], grades: ["М300", "М350", "М400"] },
  { title: "Бетон для дорожных работ", use: "Площадки, подъезды, стоянки, дороги и промышленные покрытия.", pros: ["Морозостойкость F200+", "Износостойкие составы", "Большие объёмы"], grades: ["М350", "M400", "М450"] },
  { title: "Бетон для монолитных работ", use: "Монолитные стены, колонны, ростверки, ответственные конструкции.", pros: ["Подача бетононасосом", "Стабильная марка", "Лабораторный контроль"], grades: ["М300", "М350", "М400", "М500"] },
];

export const ConcreteCatalog = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const visible = filter ? PRODUCTS.filter((p) => p.grades.includes(filter)) : PRODUCTS;

  return (
    <section id="concrete" className="py-20 lg:py-28">
      <div className="container-tight">
        <div className="mb-12 grid gap-6 overflow-hidden rounded-lg border border-border bg-surface lg:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <img src={concretePour} alt="Заливка свежего бетона из миксера на объекте в Туле"
              loading="lazy" width={1280} height={896}
              className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute left-4 top-4 rounded-sm bg-primary px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-foreground">
              Свежий замес · доставка от 1 м³
            </div>
          </div>
          <div className="flex flex-col justify-center p-6 lg:p-10">
            <SectionHeading
              label="Каталог бетона"
              title="Бетон всех марок в Туле — под любую задачу и объём"
              description="Производим товарный бетон, раствор и пескобетон. Подскажем марку под ваш объект, привезём в нужное время и в нужном объёме."
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h3 className="text-xl font-bold">Выберите марку или категорию</h3>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 h-9 rounded-full text-sm font-semibold border transition-colors ${
              filter === null ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-accent hover:text-accent"
            }`}
          >Все марки</button>
          {GRADES.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g === filter ? null : g)}
              className={`px-4 h-9 rounded-full text-sm font-semibold border transition-colors tabular-nums ${
                filter === g ? "bg-accent text-accent-foreground border-accent" : "bg-background border-border hover:border-accent hover:text-accent"
              }`}
            >{g}</button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((p) => (
            <article key={p.title} className="group flex flex-col rounded-lg border border-border bg-background p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover hover:border-accent/40">
              <h3 className="text-lg font-extrabold leading-tight">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.use}</p>
              <ul className="mt-4 space-y-1.5">
                {p.pros.map((pr) => (
                  <li key={pr} className="flex gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                    <span>{pr}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.grades.map((g) => (
                  <span key={g} className="rounded-sm bg-secondary px-2 py-1 text-xs font-bold tabular-nums text-secondary-foreground">{g}</span>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-2 pt-4 border-t border-border">
                <OrderDialog
                  product={p.title}
                  trigger={
                    <Button variant="cta" size="default">
                      Заказать с доставкой <ArrowRight className="h-4 w-4" />
                    </Button>
                  }
                />
                <Button variant="outline" size="default" asChild>
                  <a href="#calculator"><Calculator className="h-4 w-4" /> Рассчитать весь объект</a>
                </Button>
              </div>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-8 text-center text-muted-foreground">По выбранной марке нет позиций. Сбросьте фильтр.</p>
        )}
      </div>
    </section>
  );
};
