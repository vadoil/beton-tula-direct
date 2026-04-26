import { SectionHeading } from "@/components/site/SectionHeading";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Clock, Phone, ShieldCheck } from "lucide-react";

export const Calculator = () => (
  <section id="calculator" className="py-20 lg:py-28">
    <div className="container-tight">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            label="Расчёт стоимости"
            title="Заполните заявку — посчитаем точную цену с доставкой"
            description="Опишите задачу или просто оставьте телефон. Перезвоним за 15 минут, подберём марку и согласуем удобное время доставки."
          />
          <ul className="mt-8 space-y-4">
            <li className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-accent text-accent-foreground"><Clock className="h-5 w-5" /></span>
              <div>
                <h4 className="font-bold">Расчёт за 15 минут</h4>
                <p className="text-sm text-muted-foreground">Считаем стоимость материала, доставки и подсказываем оптимальную марку.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-accent text-accent-foreground"><ShieldCheck className="h-5 w-5" /></span>
              <div>
                <h4 className="font-bold">Никаких скрытых условий</h4>
                <p className="text-sm text-muted-foreground">Фиксируем цену в договоре. Объём, срок и состав — прозрачно.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-accent text-accent-foreground"><Phone className="h-5 w-5" /></span>
              <div>
                <h4 className="font-bold">Не любите формы?</h4>
                <p className="text-sm text-muted-foreground">
                  Звоните напрямую: <a href="tel:+74872000000" className="font-bold text-foreground hover:text-accent">+7 (4872) 00-00-00</a>
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-background p-6 shadow-card lg:p-8">
          <QuoteForm variant="full" />
        </div>
      </div>
    </div>
  </section>
);
