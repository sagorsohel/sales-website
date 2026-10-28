import { HeroBanner } from "@/components/HeroBanner";
import { CategoryPillBar } from "@/components/CategoryPillBar";
import { TrustBadges } from "@/components/TrustBadges";
import { ProductCatalog } from "@/components/ProductCatalog";
import { DualPromoBanners } from "@/components/DualPromoBanners";
import { TestimonialSection } from "@/components/TestimonialSection";
import { ThreeColumnShowcase } from "@/components/ThreeColumnShowcase";
import { WidePromoBanner } from "@/components/WidePromoBanner";
import { LatestBlogSection } from "@/components/LatestBlogSection";
import { BrandLogosStrip } from "@/components/BrandLogosStrip";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Floating Circular Category Selector */}
      <CategoryPillBar />

      {/* 3. 3-Pillar Trust Badges */}
      <TrustBadges />

      {/* 4. Featured Products (Dynamic from MySQL backend) */}
      <ProductCatalog />

      {/* 5. Dual Promotional Banners (Barbie Doll & Teddy Bear) */}
      <DualPromoBanners />

      {/* 6. Testimonial Wave Section */}
      <TestimonialSection />

      {/* 7. 3-Column Showcase: Latest, Bestsellers, Special */}
      <ThreeColumnShowcase />

      {/* 8. Wide Promotional Banner: Teddy & Soft Toys */}
      <WidePromoBanner />

      {/* 9. Latest Blog Section */}
      <LatestBlogSection />

      {/* 10. Brand Logos Strip */}
      <BrandLogosStrip />
    </div>
  );
}
