import { useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { QuoteForm } from "@/components/site/QuoteForm";

interface Props {
  product: string;
  trigger: ReactNode;
  title?: string;
  description?: string;
}

export const OrderDialog = ({ product, trigger, title, description }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold leading-tight">
            {title ?? `Заказать с доставкой: ${product}`}
          </DialogTitle>
          <DialogDescription>
            {description ?? "Перезвоним за 15 минут с точной ценой и временем доставки."}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <QuoteForm
            variant="full"
            defaultProduct={product}
            submitLabel="Заказать с доставкой"
            onSuccess={() => setTimeout(() => setOpen(false), 1500)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};