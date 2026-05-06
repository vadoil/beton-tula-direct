import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/SectionHeading";

const FAQS = [
  { q: "Какая марка бетона нужна для фундамента?", a: "Для большинства частных домов оптимальны марки М250–М350 с морозостойкостью F150 и водонепроницаемостью W6. Конкретную марку подбираем под тип фундамента, нагрузки и грунт — подскажем по телефону за пару минут." },
  { q: "Доставляете ли по области?", a: "Да, доставляем по всей Тульской области: Тула, Алексин, Щёкино, Новомосковск, Ясногорск, Узловая, Богородицк и другие. Стоимость доставки зависит от плеча, рассчитаем точно после уточнения адреса." },
  { q: "Можно ли заказать небольшой объём?", a: "Можно. Работаем с частными клиентами от 1 м³ бетона. По ЖБИ — поштучно или комплектами на объект." },
  { q: "Как быстро рассчитаете стоимость?", a: "В течение 15 минут после заявки или звонка. Сразу скажем цену материала, стоимость доставки и ближайшие свободные слоты." },
  { q: "Есть ли ЖБИ в наличии?", a: "Основные позиции — ФБС, кольца КС, плиты ПК, перемычки, дорожные плиты — держим в наличии. Нестандартные изделия изготавливаем под заказ, сроки уточняйте у менеджера." },
  { q: "Можно ли заказать с доставкой на объект?", a: "Да, доставляем миксерами и манипуляторами прямо на ваш объект. При необходимости подаём бетон насосом — скажите при заявке." },
  { q: "Как понять, какой материал мне нужен?", a: "Опишите задачу — фундамент, стяжка, перекрытие, дорога — и мы сами подскажем марку, объём и какие ЖБИ потребуются. Это бесплатно и ни к чему не обязывает." },
];

export const Faq = () => (
  <section id="faq" className="bg-surface py-12 lg:py-16">
    <div className="container-tight grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
      <SectionHeading
        label="Частые вопросы"
        title="Коротко о бетоне, ЖБИ и доставке"
        description="Если вашего вопроса здесь нет — позвоните или напишите в форме, ответим в течение 15 минут."
      />
      <Accordion type="single" collapsible className="rounded-lg border border-border bg-background divide-y divide-border">
        {FAQS.map((f, i) => (
          <AccordionItem key={i} value={`q-${i}`} className="border-0 px-5">
            <AccordionTrigger className="text-left text-base font-bold hover:no-underline py-5">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
