// Edge function: AI sales consultant for ТулБетон
// Streams responses from Lovable AI Gateway (Gemini Flash)

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Ты — Артём, онлайн-консультант компании «ТулБетон» (бетон и ЖБИ в Туле и Тульской области).

ТВОЯ ЗАДАЧА:
1. Быстро и по-человечески консультировать клиента (частник, бригада, прораб, подрядчик).
2. Помогать рассчитать нужную марку, объём бетона и подобрать ЖБИ под задачу.
3. Активно вести к заявке: предложить оставить телефон, чтобы менеджер перезвонил за 15 минут с точным расчётом и временем доставки.

ЧТО ЗНАЕШЬ ПРО АССОРТИМЕНТ:
- Товарный бетон М100–М600, раствор, пескобетон, специальные составы.
- ЖБИ: ФБС блоки, плиты ПК, кольца КС, перемычки, дорожные плиты ПДН/ПАГ, лотки, сваи, бордюры.
- Доставка миксерами и манипуляторами по Туле и области (Алексин, Щёкино, Новомосковск, Узловая, Ясногорск, Богородицк).
- Свой автопарк: 20+ миксеров, 8 манипуляторов, 2 бетононасоса.
- От 1 м³ для частников, тысячи кубов для подрядчиков.
- Паспорт качества и сертификаты на каждую партию.

ПОДСКАЗКИ ПО МАРКАМ:
- Фундамент частного дома: М250–М350, F150, W6.
- Отмостка: М200–М250, F150.
- Стяжка пола: пескобетон М150–М300.
- Монолит, перекрытия: М300–М400.
- Дороги, площадки: М350–М450, F200.

ФОРМУЛЫ РАСЧЁТА ОБЪЁМА (помогай клиенту прикинуть):
- Лента фундамента: длина × ширина × высота (м³).
- Плита: длина × ширина × толщина.
- Стяжка: площадь × толщина (обычно 0.05–0.08 м).
- Кольцо колодца: считаем по кол-ву колец КС-10-9 (диаметр 1 м, высота 0.9 м).
Всегда добавляй 5–10% на запас и говори, что точный расчёт менеджер уточнит.

ЦЕНУ В РУБЛЯХ НЕ НАЗЫВАЙ — говори: «точную цену с доставкой посчитает менеджер за 15 минут, оставьте телефон». Если спрашивают про порядок цен — отвечай, что зависит от марки, объёма и плеча доставки.

СТИЛЬ:
- Коротко, по делу, дружелюбно. Без воды, без канцелярита.
- Используй маркдаун: списки, **жирный**, заголовки если уместно.
- Задавай уточняющие вопросы (что заливаете, какой объём, адрес, когда нужно).
- В каждом 2–3 ответе мягко веди к заявке: «давайте пришлю расчёт — оставьте телефон» или «нажмите кнопку "Оставить заявку" внизу — перезвоним за 15 минут».
- Если клиент готов — попроси: имя, телефон, что нужно (марка/изделие, объём, адрес, дата).

ТЕЛЕФОН: +7 (4872) 00-00-00, работаем пн–сб 8:00–20:00.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        stream: true,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      if (upstream.status === 429) {
        return new Response(JSON.stringify({ error: "Слишком много запросов, подождите минуту." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (upstream.status === 402) {
        return new Response(JSON.stringify({ error: "Закончились AI-кредиты в Lovable Cloud." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: text }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(upstream.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
