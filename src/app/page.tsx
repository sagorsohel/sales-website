import { HeroBanner } from "@/components/HeroBanner";
import { CategoryPillBar } from "@/components/CategoryPillBar";
import { ProductCatalog } from "@/components/ProductCatalog";
import { TrustBadges } from "@/components/TrustBadges";
import { DualPromoBanners } from "@/components/DualPromoBanners";
import { NewArrivalsSection } from "@/components/NewArrivalsSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Banner: Big Smiles, Bigger Adventures */}
      <HeroBanner />

      {/* 2. 6 Rounded Pastel Category Cards */}
      <CategoryPillBar />

      {/* 3. Best Sellers: Loved by parents, trusted by kids! */}
      <ProductCatalog />

      {/* 4. 4 Trust Badges Container */}
      <TrustBadges />

      {/* 5. Dual Promotional Banners: Kids Fashion (Blue) & Smart Learning (Yellow) */}
      <DualPromoBanners />

      {/* 6. New Arrivals: Fresh picks for your little ones! */}
      <NewArrivalsSection />
    </div>
  );
}
