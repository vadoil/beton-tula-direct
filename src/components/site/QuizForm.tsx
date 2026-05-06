import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Check, Truck, Boxes, ShieldCheck, Clock } from "lucide-react";
import { toast } from "sonner";

type Branch = "concrete" | "zhbi";

type Answers = {
  branch?: Branch;
  // concrete
  task?: string;
  grade?: string;
  volume?: string;
  pump?: string;
  // zhbi
  category?: string;
  qty?: string;
  delivery?: string;
  // common
  date?: string;
  city?: string;
  name?: string;
  phone?: string;
  comment?: string;
};

const CONCRETE_TASKS = ["Фундамент", "Стяжка / пол", "Монолит / стены", "Перекрытие", "Дорога / площадка", "Не знаю – подскажите"];
const CONCRETE_GRADES = ["М200", "М250", "М300", "М350", "М400", "Подберите сами"];
const CONCRETE_VOLUMES = ["до 5 м³", "5–20 м³", "20–50 м³", "50–100 м³", "100+ м³"];
const PUMP = ["Не нужен", "Нужен бетононасос", "Уточнить"];

const ZHBI_CATEGORIES = [
  "ФБС блоки", "Плиты перекрытия", "Кольца колодезные", "Перемычки",
  "Дорожные плиты", "Лотки", "Сваи", "Бордюры", "Другое / подскажите",
];
const ZHBI_QTY = ["1–10 шт.", "10–50 шт.", "50–200 шт.", "200+ шт.", "Комплект на объект"];
const DELIVERY = ["Доставка манипулятором", "Самовывоз", "Уточнить"];
const DATE = ["Сегодня / завтра", "На этой неделе", "На следующей неделе", "Через 2+ недели", "Уточняется"];

export const QuizForm = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const steps = useMemo(() => {
    const base = [
      "branch",
      ...(answers.branch === "concrete"
        ? ["task", "grade", "volume", "pump"]
        : answers.branch === "zhbi"
        ? ["category", "qty", "delivery"]
        : []),
      "date",
      "city",
      "contact",
    ];
    return base;
  }, [answers.branch]);

  const total = steps.length;
  const current = steps[step];
  const progress = Math.round((step / Math.max(total - 1, 1)) * 100);

  const set = (k: keyof Answers, v: string) => setAnswers((a) => ({ ...a, [k]: v }));
  const choose = (k: keyof Answers, v: string) => {
    set(k, v);
    setTimeout(() => setStep((s) => Math.min(s + 1, total - 1)), 150);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));
  const next = () => setStep((s) => Math.min(total - 1, s + 1));

  const canNext = (() => {
    switch (current) {
      case "branch": return !!answers.branch;
      case "task": return !!answers.task;
      case "grade": return !!answers.grade;
      case "volume": return !!answers.volume;
      case "pump": return !!answers.pump;
      case "category": return !!answers.category;
      case "qty": return !!answers.qty;
      case "delivery": return !!answers.delivery;
      case "date": return !!answers.date;
      case "city": return !!answers.city && answers.city.trim().length >= 2;
      case "contact": return !!answers.name && /^[\d+()\-\s]{10,}$/.test(answers.phone ?? "");
      default: return false;
    }
  })();

  const submit = async () => {
    if (!canNext) return;
    setSubmitting(true);
    // Имитация отправки – менеджер перезвонит
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setDone(true);
    toast.success("Заявка принята! Перезвоним за 15 минут.");
  };

  if (done) {
    return (
      <div className="rounded-lg border border-border bg-background p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-2xl font-extrabold">Заявка принята!</h3>
        <p className="mt-2 text-muted-foreground">
          Менеджер перезвонит в течение 15 минут на номер{" "}
          <strong className="text-foreground tabular-nums">{answers.phone}</strong> с точным расчётом и временем доставки.
        </p>
        <div className="mt-6 grid gap-3 text-left rounded-md bg-surface p-4 text-sm">
          <Row label="Запрос" value={answers.branch === "concrete" ? "Бетон" : "ЖБИ"} />
          {answers.task && <Row label="Задача" value={answers.task} />}
          {answers.grade && <Row label="Марка" value={answers.grade} />}
          {answers.volume && <Row label="Объём" value={answers.volume} />}
          {answers.pump && <Row label="Бетононасос" value={answers.pump} />}
          {answers.category && <Row label="Изделие" value={answers.category} />}
          {answers.qty && <Row label="Количество" value={answers.qty} />}
          {answers.delivery && <Row label="Доставка" value={answers.delivery} />}
          {answers.date && <Row label="Срок" value={answers.date} />}
          {answers.city && <Row label="Адрес / город" value={answers.city} />}
        </div>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setAnswers({});
            setStep(0);
            setDone(false);
          }}
        >
          Оставить ещё одну заявку
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background p-6 lg:p-8 shadow-card">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>Шаг {step + 1} из {total}</span>
          <span className="text-accent">{progress}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-accent transition-all duration-300" style={{ width: `${Math.max(progress, 4)}%` }} />
        </div>
      </div>

      {/* Step content */}
      <div className="min-h-[260px]">
        {current === "branch" && (
          <Step title="Что вам нужно?" subtitle="Выберите направление – дальше уточним детали.">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <BigOption
                icon={Truck}
                title="Бетон с доставкой"
                desc="Товарный бетон, раствор, пескобетон – миксером"
                selected={answers.branch === "concrete"}
                onClick={() => choose("branch", "concrete")}
              />
              <BigOption
                icon={Boxes}
                title="ЖБИ изделия"
                desc="ФБС, плиты, кольца, перемычки, дорожные плиты"
                selected={answers.branch === "zhbi"}
                onClick={() => choose("branch", "zhbi")}
              />
            </div>
          </Step>
        )}

        {current === "task" && (
          <Step title="Под какую задачу нужен бетон?" subtitle="Подскажем оптимальную марку.">
            <Pills options={CONCRETE_TASKS} value={answers.task} onSelect={(v) => choose("task", v)} />
          </Step>
        )}
        {current === "grade" && (
          <Step title="Какая марка?" subtitle="Если не уверены – выберите «Подберите сами».">
            <Pills options={CONCRETE_GRADES} value={answers.grade} onSelect={(v) => choose("grade", v)} />
          </Step>
        )}
        {current === "volume" && (
          <Step title="Какой объём?" subtitle="Можно ориентировочно – уточним по телефону.">
            <Pills options={CONCRETE_VOLUMES} value={answers.volume} onSelect={(v) => choose("volume", v)} />
          </Step>
        )}
        {current === "pump" && (
          <Step title="Нужен бетононасос?" subtitle="Подача на этажи или в труднодоступные зоны.">
            <Pills options={PUMP} value={answers.pump} onSelect={(v) => choose("pump", v)} />
          </Step>
        )}

        {current === "category" && (
          <Step title="Какое изделие нужно?" subtitle="Если несколько – выберите основное, остальное уточним.">
            <Pills options={ZHBI_CATEGORIES} value={answers.category} onSelect={(v) => choose("category", v)} />
          </Step>
        )}
        {current === "qty" && (
          <Step title="Какое количество?" subtitle="Поможем подобрать оптимальную поставку.">
            <Pills options={ZHBI_QTY} value={answers.qty} onSelect={(v) => choose("qty", v)} />
          </Step>
        )}
        {current === "delivery" && (
          <Step title="Доставка или самовывоз?" subtitle="Доставляем манипулятором по Туле и области.">
            <Pills options={DELIVERY} value={answers.delivery} onSelect={(v) => choose("delivery", v)} />
          </Step>
        )}

        {current === "date" && (
          <Step title="Когда нужна поставка?" subtitle="Согласуем удобное окно.">
            <Pills options={DATE} value={answers.date} onSelect={(v) => choose("date", v)} />
          </Step>
        )}

        {current === "city" && (
          <Step title="Куда везти?" subtitle="Город, район или адрес объекта.">
            <Input
              autoFocus
              placeholder="Например: Тула, Зареченский р-н"
              value={answers.city ?? ""}
              onChange={(e) => set("city", e.target.value)}
              className="h-12 text-base"
            />
          </Step>
        )}

        {current === "contact" && (
          <Step title="Куда отправить расчёт?" subtitle="Перезвоним за 15 минут с точной ценой и временем доставки.">
            <div className="space-y-3">
              <Input
                placeholder="Ваше имя"
                value={answers.name ?? ""}
                onChange={(e) => set("name", e.target.value)}
                className="h-12 text-base"
              />
              <Input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={answers.phone ?? ""}
                onChange={(e) => set("phone", e.target.value)}
                className="h-12 text-base tabular-nums"
              />
              <Textarea
                placeholder="Комментарий (необязательно)"
                value={answers.comment ?? ""}
                onChange={(e) => set("comment", e.target.value)}
                rows={3}
              />
              <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-accent" /> Перезвон за 15 мин</li>
                <li className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-accent" /> Без спама</li>
              </ul>
            </div>
          </Step>
        )}
      </div>

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between gap-3 pt-5 border-t border-border">
        <Button variant="ghost" onClick={back} disabled={step === 0}>
          <ArrowLeft className="h-4 w-4" /> Назад
        </Button>
        {current === "contact" ? (
          <Button variant="cta" size="lg" onClick={submit} disabled={!canNext || submitting}>
            {submitting ? "Отправляем…" : "Получить расчёт"}
          </Button>
        ) : (
          <Button variant="cta" size="lg" onClick={next} disabled={!canNext}>
            Далее <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-semibold text-right">{value}</span>
  </div>
);

const Step = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="animate-in fade-in slide-in-from-right-2 duration-200">
    <h3 className="text-xl font-extrabold leading-tight">{title}</h3>
    {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
    <div className="mt-5">{children}</div>
  </div>
);

const Pills = ({ options, value, onSelect }: { options: string[]; value?: string; onSelect: (v: string) => void }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((o) => {
      const active = value === o;
      return (
        <button
          key={o}
          type="button"
          onClick={() => onSelect(o)}
          className={`rounded-md border px-4 py-2.5 text-sm font-semibold transition-all ${
            active
              ? "border-accent bg-accent text-accent-foreground shadow-accent"
              : "border-border bg-background hover:border-accent hover:text-accent"
          }`}
        >
          {o}
        </button>
      );
    })}
  </div>
);

const BigOption = ({
  icon: Icon, title, desc, selected, onClick,
}: { icon: typeof Truck; title: string; desc: string; selected: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group flex flex-col items-start gap-3 rounded-lg border-2 p-5 text-left transition-all ${
      selected ? "border-accent bg-accent/5" : "border-border bg-background hover:border-accent/60 hover:-translate-y-0.5"
    }`}
  >
    <span className="grid h-12 w-12 place-items-center rounded-md bg-primary text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <h4 className="text-lg font-extrabold leading-tight">{title}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  </button>
);
