import { SectionHeading } from "@/components/site/SectionHeading";
import { QuizForm } from "@/components/site/QuizForm";
import { Clock, Phone, ShieldCheck, ListChecks, Gift, Percent, Truck } from "lucide-react";

export const Calculator = () => (
  <section id="calculator" className="py-20 lg:py-28">
    <div className="container-tight">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            label="Расчёт за 2 минуты"
            title="Пройдите короткий опрос — получите скидку до 7% и бесплатную доставку по Туле"
            description="Ответьте на 5–7 простых вопросов о вашем объекте — менеджер за 15 минут подготовит точный расчёт с лучшей ценой и подскажет, какую марку бетона или ЖБИ выбрать. Без звонков-навязок и обязательств."
          />

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-accent px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-accent-foreground">
              <Percent className="h-3.5 w-3.5" /> Скидка до 7%
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-foreground">
              <Truck className="h-3.5 w-3.5" /> Доставка в подарок
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-surface px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider">
              <Gift className="h-3.5 w-3.5 text-accent" /> Бонус: подбор марки
            </span>
          </div>

          <ul className="mt-8 space-y-4">
            <li className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-accent text-accent-foreground"><ListChecks className="h-5 w-5" /></span>
              <div>
                <h4 className="font-bold">Всего 5–7 вопросов — 2 минуты</h4>
                <p className="text-sm text-muted-foreground">Без длинных форм. Только то, что нужно для точного расчёта.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-accent text-accent-foreground"><Clock className="h-5 w-5" /></span>
              <div>
                <h4 className="font-bold">Точная цена за 15 минут</h4>
                <p className="text-sm text-muted-foreground">Стоимость материала, доставки и оптимальная марка под вашу задачу.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-accent text-accent-foreground"><ShieldCheck className="h-5 w-5" /></span>
              <div>
                <h4 className="font-bold">Цена зафиксирована в договоре</h4>
                <p className="text-sm text-muted-foreground">Никаких доплат «по факту». Объём, срок и состав — прозрачно.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-accent text-accent-foreground"><Phone className="h-5 w-5" /></span>
              <div>
                <h4 className="font-bold">Удобнее позвонить?</h4>
                <p className="text-sm text-muted-foreground">
                  Звоните напрямую: <a href="tel:+74872000000" className="font-bold text-foreground hover:text-accent">+7 (4872) 00-00-00</a>
                </p>
              </div>
            </li>
          </ul>

          <p className="mt-6 text-xs text-muted-foreground">
            * Скидка и бесплатная доставка действуют при оформлении заявки через опрос. Сумма скидки зависит от объёма и удалённости объекта.
          </p>
        </div>

        <QuizForm />
      </div>
    </div>
  </section>
);
