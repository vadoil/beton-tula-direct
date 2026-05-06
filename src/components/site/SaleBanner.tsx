import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ExternalLink, Phone, Loader2, CheckCircle2, Tag } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "sale-banner-shown";
export const SALE_BANNER_EVENT = "open-sale-banner";
export const openSaleBanner = () => {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(SALE_BANNER_EVENT));
};

const phoneRegex = /^[+\d][\d\s()-]{6,20}$/;
const schema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(60),
  phone: z.string().trim().regex(phoneRegex, "Введите корректный телефон").max(25),
  message: z.string().trim().max(500).optional(),
});
type Values = z.infer<typeof schema>;

export const SaleBanner = () => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => setOpen(true);
    window.addEventListener(SALE_BANNER_EVENT, handler);
    let t: number | undefined;
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      t = window.setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
      }, 1500);
    }
    return () => {
      window.removeEventListener(SALE_BANNER_EVENT, handler);
      if (t) clearTimeout(t);
    };
  }, []);

  const onSubmit = async (_v: Values) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setDone(true);
    toast.success("Заявка принята", { description: "Свяжусь с вами в ближайшее время." });
    reset();
    setTimeout(() => { setDone(false); setOpen(false); }, 1800);
  };

  return (
    <>
      {/* Постоянно видимая «бирка» – продаётся */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Сайт продаётся – открыть"
        className="fixed left-3 bottom-24 lg:left-5 lg:bottom-5 z-[55] group inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground pl-3 pr-4 py-2 text-xs font-extrabold uppercase tracking-wider shadow-accent hover:scale-105 transition-transform"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-foreground/60 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-foreground" />
        </span>
        <Tag className="h-3.5 w-3.5" />
        Сайт продаётся
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent mb-2">
            <Tag className="h-3.5 w-3.5" /> Сайт продаётся
          </div>
          <DialogTitle className="text-2xl font-extrabold leading-tight">
            Этот сайт продаётся
          </DialogTitle>
          <DialogDescription className="text-base">
            Готовый лендинг для бетонного бизнеса в Туле – с каталогом, калькулятором, формами и AI-консультантом. Оставьте заявку или свяжитесь напрямую.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 mt-2">
          <a
            href="https://триии.рф"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 rounded-md border border-border bg-secondary/50 p-3 hover:border-accent transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-accent text-accent-foreground">
                <ExternalLink className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Портфолио</div>
                <div className="font-bold">триии.рф</div>
              </div>
            </div>
            <span className="text-sm font-semibold text-accent">Открыть →</span>
          </a>

          <a
            href="tel:+79033017383"
            className="flex items-center justify-between gap-3 rounded-md border border-border bg-secondary/50 p-3 hover:border-accent transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-accent text-accent-foreground">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Позвонить / написать</div>
                <div className="font-bold tabular-nums">+7 903 301 73 83</div>
              </div>
            </div>
            <span className="text-sm font-semibold text-accent">Связаться →</span>
          </a>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-4 pt-4 border-t border-border">
          <div className="text-sm font-semibold">Или оставьте заявку – я перезвоню</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>Имя</Label>
              <Input placeholder="Как к вам обращаться" {...register("name")} />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div>
              <Label>Телефон</Label>
              <Input type="tel" placeholder="+7 (___) ___-__-__" {...register("phone")} />
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
            </div>
          </div>
          <div>
            <Label>Комментарий</Label>
            <Textarea rows={2} placeholder="Удобное время для звонка, вопросы по сайту" {...register("message")} />
          </div>
          <Button type="submit" variant="cta" size="lg" disabled={submitting}>
            {submitting ? <Loader2 className="animate-spin" /> : done ? <CheckCircle2 /> : null}
            Отправить заявку
          </Button>
        </form>
      </DialogContent>
      </Dialog>
    </>
  );
};