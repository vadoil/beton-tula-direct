import textureImg from "@/assets/concrete-texture.jpg";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Phone, Clock } from "lucide-react";
import { MessengerLinks } from "@/components/site/MessengerLinks";

export const FinalCta = () => (
  <section className="relative overflow-hidden bg-primary text-white py-20 lg:py-28">
    <img src={textureImg} alt="" loading="lazy" width={1600} height={900} aria-hidden
      className="absolute inset-0 h-full w-full object-cover opacity-[0.08] mix-blend-screen" />
    <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

    <div className="container-tight relative z-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-center">
      <div>
        <span className="section-label">Готовы посчитать?</span>
        <h2 className="heading-lg mt-5 text-white text-balance">
          Нужен бетон или ЖБИ в Туле? <span className="text-accent">Рассчитаем стоимость</span> и организуем доставку
        </h2>
        <p className="mt-5 text-lg text-white/75 leading-relaxed">
          Оставьте заявку — перезвоним за 15 минут, согласуем марку, объём и время доставки. Без воды, без обещаний — только цифры и сроки.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/5 p-4">
            <Clock className="h-6 w-6 text-accent" />
            <div>
              <div className="font-bold">Ответ за 15 минут</div>
              <div className="text-xs text-white/60">в рабочие часы</div>
            </div>
          </div>
          <a href="tel:+79101600333" className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/5 p-4 hover:bg-white/10 transition-colors">
            <Phone className="h-6 w-6 text-accent" />
            <div>
              <div className="font-bold tabular-nums">+7 910 160 03 33</div>
              <div className="text-xs text-white/60">пн–сб с 8:00 до 20:00</div>
            </div>
          </a>
        </div>

        <div className="mt-6">
          <div className="text-xs uppercase tracking-wider text-white/60 mb-3">Или напишите в мессенджер</div>
          <MessengerLinks variant="pill" />
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 text-foreground shadow-card-hover lg:p-8">
        <h3 className="heading-md">Заявка с быстрым откликом</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Перезвоним в течение 15 минут и подготовим расчёт под вашу задачу.
        </p>
        <div className="mt-5">
          <QuoteForm variant="full" submitLabel="Отправить заявку" />
        </div>
      </div>
    </div>
  </section>
);
