import { Hero } from "@/components/Hero";
import { ProductCatalog } from "@/components/ProductCatalog";
import { TechStackSection } from "@/components/TechStackSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ProductCatalog />
      <TechStackSection />
    </div>
  );
}
