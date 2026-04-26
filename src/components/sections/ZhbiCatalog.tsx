import zhbiImg from "@/assets/zhbi-blocks.jpg";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Box, Layers3, Minus, CircleDashed, Disc, Square, Waves, Anchor, Construction, Component, Hexagon, Wrench } from "lucide-react";

const ITEMS = [
  { icon: Box, title: "ФБС блоки", desc: "Стеновые блоки для ленточных фундаментов и подвалов." },
  { icon: Layers3, title: "Плиты перекрытия", desc: "Пустотные ПК и сплошные плиты для перекрытий любых этажей." },
  { icon: Minus, title: "Перемычки", desc: "Брусковые и плитные перемычки для оконных и дверных проёмов." },
  { icon: CircleDashed, title: "Кольца колодезные", desc: "КС для канализационных, водопроводных и инженерных колодцев." },
  { icon: Disc, title: "Крышки и днища", desc: "Плиты перекрытия и днища колодцев — комплектом или отдельно." },
  { icon: Square, title: "Дорожные плиты", desc: "ПДН, ПАГ и 1П — для временных и постоянных дорог, площадок." },
  { icon: Waves, title: "Лотки", desc: "Водоотводные и теплотрассные лотки разных типоразмеров." },
  { icon: Anchor, title: "Сваи", desc: "Забивные железобетонные сваи под фундаменты любых нагрузок." },
  { icon: Construction, title: "Бордюры", desc: "Дорожные и тротуарные бордюрные камни всех профилей." },
  { icon: Component, title: "Опорные элементы", desc: "Опоры, башмаки, оголовки и подколонники для конструкций." },
  { icon: Hexagon, title: "Фундаментные элементы", desc: "Подушки ФЛ, стаканы, элементы под индивидуальный проект." },
  { icon: Wrench, title: "Прочие ЖБИ", desc: "Нестандартные изделия, ливнёвка, парапеты и комплектующие." },
];

export const ZhbiCatalog = () => (
  <section id="zhbi" className="relative bg-primary text-white py-20 lg:py-28 overflow-hidden">
    <img src={zhbiImg} alt="Склад железобетонных изделий" loading="lazy" width={1600} height={1000}
      className="absolute inset-0 h-full w-full object-cover opacity-15" />
    <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />

    <div className="container-tight relative z-10">
      <SectionHeading
        invert
        label="Каталог ЖБИ"
        title="Полный каталог железобетонных изделий в Туле"
        description="ФБС, плиты, кольца, перемычки, дорожные плиты, лотки и сваи — в наличии и под заказ. Поможем подобрать типоразмер и доставим манипулятором на объект."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ITEMS.map((it) => (
          <article key={it.title} className="group bg-primary p-6 transition-colors hover:bg-primary-soft">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-accent/15 text-accent border border-accent/30">
                <it.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-bold leading-tight">{it.title}</h3>
                <p className="mt-1.5 text-sm text-white/65 leading-relaxed">{it.desc}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button variant="ctaOutline" size="sm" asChild className="border-white/25 text-white hover:bg-white hover:text-primary">
                <a href="#calculator">Запросить цену</a>
              </Button>
              <Button variant="cta" size="sm" asChild>
                <a href="#calculator">Оставить заявку</a>
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start gap-3 rounded-lg border border-white/15 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-white/85"><strong className="text-white">Не нашли нужное изделие?</strong> Подберём аналог или изготовим под ваш проект.</p>
        <Button variant="cta" size="lg" asChild><a href="#calculator">Получить подбор ЖБИ</a></Button>
      </div>
    </div>
  </section>
);
