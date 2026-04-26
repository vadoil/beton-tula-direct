import { Header } from "@/components/site/Header";
import { MobileStickyBar } from "@/components/site/MobileStickyBar";
import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { ConcreteCatalog } from "@/components/sections/ConcreteCatalog";
import { ZhbiCatalog } from "@/components/sections/ZhbiCatalog";
import { MaterialSelector } from "@/components/sections/MaterialSelector";
import { Delivery } from "@/components/sections/Delivery";
import { Trust } from "@/components/sections/Trust";
import { Calculator } from "@/components/sections/Calculator";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  const ld = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ТулБетон — бетон и ЖБИ в Туле",
    description: "Производство и доставка бетона и ЖБИ в Туле и Тульской области.",
    telephone: "+7 (4872) 00-00-00",
    address: { "@type": "PostalAddress", addressLocality: "Тула", addressRegion: "Тульская область", streetAddress: "ул. Промышленная, 1", addressCountry: "RU" },
    areaServed: "Тульская область",
    openingHours: "Mo-Sa 08:00-20:00",
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
        <Trust />
        <Calculator />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default Index;
