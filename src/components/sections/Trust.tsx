import { SectionHeading } from "@/components/site/SectionHeading";
import { ShieldCheck, Scale, Clock, MessageSquare, Users, FileText, Handshake } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, title: "Контроль качества", text: "Лабораторные испытания каждой партии — прочность, подвижность, морозостойкость." },
  { icon: Scale, title: "Честный объём", text: "Поставляем ровно столько, сколько заказано. Без недолива и пересортицы." },
  { icon: Clock, title: "Соблюдение сроков", text: "Выезжаем в согласованное окно — без срыва графика заливки." },
  { icon: MessageSquare, title: "Консультация по марке", text: "Подскажем оптимальную марку и состав под вашу задачу." },
  { icon: Users, title: "Физлица и организации", text: "От 1 м³ для частного клиента до тысяч кубов для подрядчиков." },
  { icon: FileText, title: "Документы", text: "Паспорт качества, сертификаты, закрывающие документы — по первому запросу." },
  { icon: Handshake, title: "Понятные условия", text: "Прозрачные цены, фиксированный срок, договор — без скрытых платежей." },
];

export const Trust = () => (
  <section className="bg-surface py-12 lg:py-16">
    <div className="container-tight">
      <SectionHeading
        label="Почему нам доверяют"
        title="Работаем так, чтобы к нам возвращались"
        description="Главные принципы — качество материала, честный объём и соблюдение сроков. Это то, за что нас выбирают строители Тулы."
      />
      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {ITEMS.map((it) => (
          <div key={it.title} className="rounded-lg bg-background p-4 sm:p-6 shadow-card">
            <span className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-sm bg-accent/10 text-accent">
              <it.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-bold leading-tight">{it.title}</h3>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{it.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
