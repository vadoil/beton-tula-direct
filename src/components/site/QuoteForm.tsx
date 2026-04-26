import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

const phoneRegex = /^[+\d][\d\s()-]{6,20}$/;

const schema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(60),
  phone: z.string().trim().regex(phoneRegex, "Введите корректный телефон").max(25),
  product: z.string().trim().max(80).optional(),
  grade: z.string().trim().max(40).optional(),
  volume: z.string().trim().max(40).optional(),
  address: z.string().trim().max(200).optional(),
  comment: z.string().trim().max(500).optional(),
});

export type QuoteFormValues = z.infer<typeof schema>;

interface Props {
  variant?: "compact" | "full" | "onDark";
  defaultProduct?: string;
  submitLabel?: string;
  onSuccess?: () => void;
}

export const QuoteForm = ({ variant = "full", defaultProduct, submitLabel = "Получить расчёт стоимости", onSuccess }: Props) => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { product: defaultProduct ?? "" },
  });

  const onDark = variant === "onDark";
  const inputCls = onDark
    ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent"
    : "";
  const labelCls = onDark ? "text-white/90" : "";

  const onSubmit = async (values: QuoteFormValues) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setDone(true);
    toast.success("Заявка принята", { description: "Перезвоним в течение 15 минут и подготовим расчёт." });
    reset({ product: defaultProduct ?? "" });
    onSuccess?.();
    setTimeout(() => setDone(false), 4000);
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <div>
          <Input placeholder="Ваше имя" aria-label="Имя" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <Input type="tel" placeholder="+7 (___) ___-__-__" aria-label="Телефон" {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
        </div>
        <Button type="submit" variant="cta" size="lg" disabled={submitting}>
          {submitting ? <Loader2 className="animate-spin" /> : done ? <CheckCircle2 /> : null}
          {submitLabel}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Label className={labelCls}>Что нужно</Label>
        <Input placeholder="Бетон / раствор / ЖБИ" className={inputCls} {...register("product")} />
      </div>
      <div>
        <Label className={labelCls}>Марка / тип</Label>
        <Input placeholder="Например, М300 или ФБС 24-4-6" className={inputCls} {...register("grade")} />
      </div>
      <div>
        <Label className={labelCls}>Объём / количество</Label>
        <Input placeholder="м³ или шт." className={inputCls} {...register("volume")} />
      </div>
      <div className="sm:col-span-2">
        <Label className={labelCls}>Адрес доставки</Label>
        <Input placeholder="Тула, ул. ..." className={inputCls} {...register("address")} />
      </div>
      <div>
        <Label className={labelCls}>Имя <span className="text-accent">*</span></Label>
        <Input placeholder="Как к вам обращаться" className={inputCls} {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div>
        <Label className={labelCls}>Телефон <span className="text-accent">*</span></Label>
        <Input type="tel" placeholder="+7 (___) ___-__-__" className={inputCls} {...register("phone")} />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
      </div>
      <div className="sm:col-span-2">
        <Label className={labelCls}>Комментарий</Label>
        <Textarea rows={3} placeholder="Сроки, особенности объекта, удобное время доставки" className={inputCls} {...register("comment")} />
      </div>
      <div className="sm:col-span-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-xs ${onDark ? "text-white/60" : "text-muted-foreground"}`}>
          Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
        </p>
        <Button type="submit" variant="cta" size="xl" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? <Loader2 className="animate-spin" /> : done ? <CheckCircle2 /> : null}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
