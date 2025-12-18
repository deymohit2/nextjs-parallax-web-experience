import { VariantProvider } from '@/contexts/VariantContext';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ParallaxHero } from '@/components/hero/ParallaxHero';
import { ProductSection } from '@/components/sections/ProductSection';
import { IngredientsSection } from '@/components/sections/IngredientsSection';
import { NutritionSection } from '@/components/sections/NutritionSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { variants } from '@/lib/variants';

export default function Home() {
  return (
    <VariantProvider>
      <Navigation />
      <main>
        <ParallaxHero variants={variants} />
        <ProductSection />
        <IngredientsSection />
        <NutritionSection />
        <ReviewsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </VariantProvider>
  );
}
