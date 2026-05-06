import { Header } from "@/components/site/Header";
import { MobileStickyBar } from "@/components/site/MobileStickyBar";
import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { ConcreteCatalog } from "@/components/sections/ConcreteCatalog";
import { ZhbiCatalog } from "@/components/sections/ZhbiCatalog";
import { MaterialSelector } from "@/components/sections/MaterialSelector";
import { Delivery } from "@/components/sections/Delivery";
import { Trust } from "@/components/sections/Trust";
import { Fleet } from "@/components/sections/Fleet";
import { Cases } from "@/components/sections/Cases";
import { Calculator } from "@/components/sections/Calculator";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { ChatWidget } from "@/components/site/ChatWidget";
import { SaleBanner } from "@/components/site/SaleBanner";

const Index = () => {
  const SITE = "https://xn----8sbbq5akg5adk.xn--p1ai";
  const FAQ_ITEMS = [
    { q: "Какая марка бетона нужна для фундамента?", a: "Для большинства частных домов оптимальны марки М250–М350 с морозостойкостью F150 и водонепроницаемостью W6. Точную марку подбираем под тип фундамента, нагрузки и грунт." },
    { q: "Доставляете ли по Тульской области?", a: "Да, доставляем по всей области: Тула, Алексин, Щёкино, Новомосковск, Ясногорск, Узловая, Богородицк и др. Стоимость доставки рассчитываем по адресу." },
    { q: "Можно ли заказать небольшой объём бетона?", a: "Да, работаем с частными клиентами от 1 м³ бетона. ЖБИ — поштучно или комплектами." },
    { q: "Как быстро рассчитаете стоимость?", a: "В течение 15 минут после заявки или звонка: цена материала, доставка и ближайшие свободные слоты отгрузки." },
    { q: "Есть ли ЖБИ в наличии?", a: "ФБС, кольца КС, плиты ПК, перемычки, дорожные плиты — основные позиции в наличии. Нестандартные изделия — под заказ." },
  ];
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#org`,
        name: "ТулаБетон",
        url: SITE,
        logo: `${SITE}/favicon.png`,
        telephone: "+7 777 777 77 77",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "ТулаБетон — бетон и ЖБИ в Туле",
        inLanguage: "ru-RU",
        publisher: { "@id": `${SITE}/#org` },
      },
      {
        "@type": ["LocalBusiness", "Store"],
        "@id": `${SITE}/#business`,
        name: "ТулаБетон — бетон и ЖБИ в Туле",
        description:
          "Производство и доставка товарного бетона, раствора, пескобетона и ЖБИ (ФБС, плиты, кольца, перемычки) в Туле и Тульской области.",
        url: SITE,
        image: `${SITE}/favicon.png`,
        telephone: "+7 777 777 77 77",
        priceRange: "₽₽",
        currenciesAccepted: "RUB",
        paymentAccepted: "Cash, Bank transfer",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Тула",
          addressRegion: "Тульская область",
          streetAddress: "ул. Промышленная, 1",
          addressCountry: "RU",
        },
        geo: { "@type": "GeoCoordinates", latitude: 54.193122, longitude: 37.617348 },
        areaServed: [
          { "@type": "City", name: "Тула" },
          { "@type": "AdministrativeArea", name: "Тульская область" },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "08:00",
            closes: "20:00",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE}/#faq-data`,
        mainEntity: FAQ_ITEMS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Header />
      <main>
        <Hero />
        <Benefits />
        <ConcreteCatalog />
        <ZhbiCatalog />
        <MaterialSelector />
        <Delivery />
        <Fleet />
        <Trust />
        <Cases />
        <Calculator />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileStickyBar />
      <ChatWidget />
      <SaleBanner />
    </div>
  );
};

export default Index;
