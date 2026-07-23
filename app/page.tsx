import { Hero } from "@/components/sections/Hero";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ProductPhotoShowcase } from "@/components/sections/ProductPhotoShowcase";
import { ProductSection } from "@/components/sections/ProductSection";
import { LifestyleShowcase } from "@/components/sections/LifestyleShowcase";
import { ColorGallery } from "@/components/sections/ColorGallery";
import { CollectionTeaser } from "@/components/sections/CollectionTeaser";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { RecentlyViewedStrip } from "@/components/RecentlyViewedStrip";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturesSection />
      <ProductPhotoShowcase />
      <ProductSection />
      <LifestyleShowcase />
      <ColorGallery />
      <CollectionTeaser />
      <StatsSection />
      <ReviewsSection />
      <FAQSection />
      <RecentlyViewedStrip />
    </main>
  );
}
