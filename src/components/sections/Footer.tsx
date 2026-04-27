import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => (
  <footer id="contacts" className="bg-primary text-white pt-16 pb-24 lg:pb-12">
    <div className="container-tight grid gap-10 lg:grid-cols-4">
      <div>
        <div className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-sm bg-accent text-accent-foreground font-extrabold">ТБ</span>
          <span className="font-extrabold text-lg">ТулБетон</span>
        </div>
        <p className="mt-4 text-sm text-white/65 leading-relaxed">
          Производство и доставка бетона и ЖБИ в Туле и Тульской области. Работаем с частными и коммерческими объектами.
        </p>
        <Button variant="cta" size="lg" asChild className="mt-6">
          <a href="#calculator">Заказать звонок</a>
        </Button>
      </div>

      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-white/50">Каталог</h4>
        <ul className="mt-4 space-y-2.5 text-sm">
          {[
            ["#concrete", "Бетон всех марок"],
            ["#concrete", "Раствор и пескобетон"],
            ["#zhbi", "ФБС и плиты"],
            ["#zhbi", "Кольца и перемычки"],
            ["#zhbi", "Дорожные плиты"],
            ["#selector", "Подбор под задачу"],
          ].map(([href, label]) => (
            <li key={label}><a href={href} className="text-white/80 hover:text-accent transition-colors">{label}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-white/50">Разделы</h4>
        <ul className="mt-4 space-y-2.5 text-sm">
          {[
            ["#benefits", "Преимущества"],
            ["#delivery", "Доставка"],
            ["#calculator", "Калькулятор"],
            ["#faq", "FAQ"],
          ].map(([href, label]) => (
            <li key={label}><a href={href} className="text-white/80 hover:text-accent transition-colors">{label}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-white/50">Контакты</h4>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="flex gap-3">
            <Phone className="h-4 w-4 text-accent mt-1 shrink-0" />
            <a href="tel:+79101600333" className="font-bold text-white tabular-nums hover:text-accent">+7 910 160 03 33</a>
          </li>
          <li className="flex gap-3">
            <Mail className="h-4 w-4 text-accent mt-1 shrink-0" />
            <a href="mailto:zakaz@tulbeton.ru" className="text-white/80 hover:text-accent">zakaz@tulbeton.ru</a>
          </li>
          <li className="flex gap-3">
            <MapPin className="h-4 w-4 text-accent mt-1 shrink-0" />
            <span className="text-white/80">г. Тула, ул. Промышленная, 1</span>
          </li>
          <li className="flex gap-3">
            <Clock className="h-4 w-4 text-accent mt-1 shrink-0" />
            <span className="text-white/80">пн–сб: 8:00 — 20:00<br />вс: по заявке</span>
          </li>
        </ul>
      </div>
    </div>

    <div className="container-tight mt-12 border-t border-white/10 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-white/50">
      <span>© {new Date().getFullYear()} ТулБетон. Бетон и ЖБИ с доставкой по Туле.</span>
      <span>Не является публичной офертой. Цены уточняйте у менеджера.</span>
    </div>
  </footer>
);
