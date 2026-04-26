import { Truck, Layers, Boxes, Calculator, Clock4, ShieldCheck, Route, Building2 } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const ITEMS = [
  { icon: Truck, title: "Доставка по Туле и области", text: "Собственный автопарк миксеров и манипуляторов. Доставим в город и в любой район области." },
  { icon: Layers, title: "Все марки бетона", text: "От М100 до М600. Товарный бетон, раствор, пескобетон, специальные составы под задачу." },
  { icon: Boxes, title: "Полный каталог ЖБИ", text: "ФБС, плиты перекрытия, кольца, перемычки, дорожные плиты, лотки, сваи и бордюры в наличии." },
  { icon: Calculator, title: "Расчёт стоимости за 15 минут", text: "Считаем точную цену с доставкой, подсказываем оптимальную марку под ваш объект." },
  { icon: Clock4, title: "Соблюдение сроков", text: "Согласовываем окно доставки и приезжаем в назначенное время — без срыва графика заливки." },
  { icon: ShieldCheck, title: "Контроль качества", text: "Лабораторный контроль каждой партии. Паспорт качества и сертификаты — вместе с поставкой." },
  { icon: Route, title: "Удобная логистика", text: "Прямые маршруты до объекта, оперативная отгрузка и работа без простоев на площадке." },
  { icon: Building2, title: "Частные и оптовые заказы", text: "Работаем с физлицами от 1 м³ и с подрядчиками на объёмах от десятков до тысяч кубов." },
];

export const Benefits = () => (
  <section id="benefits" className="bg-surface py-20 lg:py-28">
    <div className="container-tight">
      <SectionHeading
        label="Почему выбирают нас"
        title="Сильный поставщик бетона и ЖБИ для строителей Тулы"
        description="Производим, доставляем и контролируем качество сами — поэтому отвечаем за каждый куб и каждое изделие, которое уезжает к вам на объект."
      />
      <div className="mt-12 grid gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((it) => (
          <div key={it.title} className="bg-background p-6 transition-colors hover:bg-surface">
            <span className="grid h-12 w-12 place-items-center rounded-sm bg-primary text-accent">
              <it.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-bold leading-tight">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
