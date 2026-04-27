import zhbiImg from "@/assets/zhbi-blocks.jpg";
import imgFbs from "@/assets/zhbi/fbs.jpg";
import imgPlity from "@/assets/zhbi/plity.jpg";
import imgPeremychki from "@/assets/zhbi/peremychki.jpg";
import imgKoltsa from "@/assets/zhbi/koltsa.jpg";
import imgKryshki from "@/assets/zhbi/kryshki.jpg";
import imgDorozhnye from "@/assets/zhbi/dorozhnye.jpg";
import imgLotki from "@/assets/zhbi/lotki.jpg";
import imgSvai from "@/assets/zhbi/svai.jpg";
import imgBordury from "@/assets/zhbi/bordury.jpg";
import imgOpory from "@/assets/zhbi/opory.jpg";
import imgFundament from "@/assets/zhbi/fundament.jpg";
import imgProchie from "@/assets/zhbi/prochie.jpg";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/SectionHeading";
import { OrderDialog } from "@/components/site/OrderDialog";
import { Calculator } from "lucide-react";

const ITEMS = [
  { img: imgFbs, title: "ФБС блоки", desc: "Стеновые блоки для ленточных фундаментов и подвалов." },
  { img: imgPlity, title: "Плиты перекрытия", desc: "Пустотные ПК и сплошные плиты для перекрытий любых этажей." },
  { img: imgPeremychki, title: "Перемычки", desc: "Брусковые и плитные перемычки для оконных и дверных проёмов." },
  { img: imgKoltsa, title: "Кольца колодезные", desc: "КС для канализационных, водопроводных и инженерных колодцев." },
  { img: imgKryshki, title: "Крышки и днища", desc: "Плиты перекрытия и днища колодцев — комплектом или отдельно." },
  { img: imgDorozhnye, title: "Дорожные плиты", desc: "ПДН, ПАГ и 1П — для временных и постоянных дорог, площадок." },
  { img: imgLotki, title: "Лотки", desc: "Водоотводные и теплотрассные лотки разных типоразмеров." },
  { img: imgSvai, title: "Сваи", desc: "Забивные железобетонные сваи под фундаменты любых нагрузок." },
  { img: imgBordury, title: "Бордюры", desc: "Дорожные и тротуарные бордюрные камни всех профилей." },
  { img: imgOpory, title: "Опорные элементы", desc: "Опоры, башмаки, оголовки и подколонники для конструкций." },
  { img: imgFundament, title: "Фундаментные элементы", desc: "Подушки ФЛ, стаканы, элементы под индивидуальный проект." },
  { img: imgProchie, title: "Прочие ЖБИ", desc: "Нестандартные изделия, ливнёвка, парапеты и комплектующие." },
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

      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {ITEMS.map((it) => (
          <article key={it.title}
            className="group flex flex-col overflow-hidden rounded-lg bg-primary-soft/60 border border-white/10 transition-all hover:-translate-y-0.5 hover:border-accent/50">
            <div className="relative aspect-[4/3] overflow-hidden bg-primary-soft">
              <img
                src={it.img}
                alt={it.title}
                loading="lazy"
                width={800}
                height={600}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-3 sm:p-5">
              <h3 className="text-sm sm:text-base font-bold leading-tight">{it.title}</h3>
              <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-white/65 leading-relaxed flex-1">{it.desc}</p>
              <div className="mt-3 sm:mt-4 flex gap-1.5 sm:gap-2">
                <Button
                  variant="ctaOutline"
                  size="sm"
                  asChild
                  aria-label="Рассчитать весь объект"
                  title="Рассчитать весь объект"
                  className="border-white/25 text-white hover:bg-white hover:text-primary shrink-0 w-9 px-0"
                >
                  <a href="#calculator"><Calculator className="h-4 w-4" /></a>
                </Button>
                <OrderDialog
                  product={it.title}
                  trigger={
                    <Button variant="cta" size="sm" className="flex-1">Заказать</Button>
                  }
                />
              </div>
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
