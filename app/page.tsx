import { Loader } from "@/components/sections/Loader";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { ShopByRoom } from "@/components/sections/ShopByRoom";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Materials } from "@/components/sections/Materials";
import { Testimonials } from "@/components/sections/Testimonials";
import { SocialGrid } from "@/components/sections/SocialGrid";
import { ConsultationCTA } from "@/components/sections/ConsultationCTA";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative selection:bg-[var(--accent-terracotta)] selection:text-white">
      {/* First-load Brand Wordmark & Counter Curtain */}
      <Loader />

      {/* Floating Glass Pill Navbar */}
      <Header />

      {/* 1. Hero with Interactive 3D Sofa */}
      <Hero />

      {/* 2. Infinite Marquee */}
      <MarqueeSection />

      {/* 3. Shop by Room Bento Grid */}
      <ShopByRoom />

      {/* 4. Featured Products Horizontal Scroll */}
      <FeaturedProducts />

      {/* 5. Design Philosophy & Stats */}
      <Philosophy />

      {/* 6. Turnkey 4-Step Services Timeline */}
      <Services />

      {/* 7. Realized Portfolio & Before/After Slider */}
      <Portfolio />

      {/* 8. Interactive Materials & Craft Swatches */}
      <Materials />

      {/* 9. Client Reverberations / Testimonials */}
      <Testimonials />

      {/* 10. Social Grid */}
      <SocialGrid />

      {/* 11. Consultation Glass Form */}
      <ConsultationCTA />

      {/* 12. Footer */}
      <Footer />
    </main>
  );
}
