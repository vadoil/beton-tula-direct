import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "Сколько бетона на фундамент 10×8?",
  "Какая марка для стяжки в гараже?",
  "Нужны ФБС и плиты — посчитайте",
  "Доставка в Алексин, когда сможете?",
];

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Здравствуйте! Я Артём, онлайн-консультант **ТулБетон**. Помогу подобрать марку, прикинуть объём и оформить заявку — менеджер перезвонит за 15 минут с точной ценой и временем доставки.\n\nЧто заливаете или какие ЖБИ нужны?",
};

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const url = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/chat`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${sessionData.session?.access_token ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || `HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const raw of lines) {
          const line = raw.trim();
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json?.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMessages((cur) => {
                const copy = [...cur];
                copy[copy.length - 1] = { role: "assistant", content: acc };
                return copy;
              });
            }
          } catch {
            /* ignore */
          }
        }
      }
    } catch (e) {
      setMessages((cur) => {
        const copy = [...cur];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            "Не удалось подключиться. Позвоните +7 910 160 03 33 или напишите в Telegram — мы на связи.",
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Открыть онлайн-консультант"
        className="fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-[60] grid h-14 w-14 lg:h-16 lg:w-16 place-items-center rounded-full bg-accent text-accent-foreground shadow-accent hover:scale-105 transition-transform"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold border-2 border-background">
            AI
          </span>
        )}
      </button>

      {/* Window */}
      {open && (
        <div className="fixed bottom-44 right-4 lg:bottom-28 lg:right-6 z-[60] w-[calc(100vw-2rem)] max-w-[400px] h-[70vh] max-h-[600px] flex flex-col rounded-xl border border-border bg-background shadow-card-hover overflow-hidden animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center gap-3 bg-primary text-primary-foreground p-4">
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground font-extrabold">
                А
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-primary" />
            </div>
            <div className="flex-1">
              <div className="font-bold leading-tight flex items-center gap-1.5">
                Артём <Sparkles className="h-3.5 w-3.5 text-accent" />
              </div>
              <div className="text-xs text-white/70">Онлайн-консультант · отвечает сейчас</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white" aria-label="Закрыть">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border text-foreground"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-strong:text-foreground prose-headings:my-2">
                      <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  )}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.content === "" && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                <Loader2 className="h-3 w-3 animate-spin" /> Артём печатает…
              </div>
            )}

            {messages.length === 1 && (
              <div className="pt-2 space-y-2">
                <div className="text-xs font-semibold text-muted-foreground px-1">Популярные вопросы:</div>
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full text-left rounded-lg border border-border bg-background px-3 py-2 text-sm hover:border-accent hover:text-accent transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick CTA */}
          <div className="border-t border-border bg-background px-3 pt-2.5 pb-1 flex gap-2">
            <Button variant="cta" size="sm" asChild className="flex-1">
              <a href="#calculator" onClick={() => setOpen(false)}>Оставить заявку</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="tel:+79101600333">Позвонить</a>
            </Button>
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 p-3 border-t border-border bg-background"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Опишите задачу или объём…"
              className="flex-1 h-10 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="grid h-10 w-10 place-items-center rounded-md bg-accent text-accent-foreground disabled:opacity-50"
              aria-label="Отправить"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
