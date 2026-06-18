import { HeroSection } from "@/components/HeroSection";
import { DiseaseLibrary } from "@/components/DiseaseLibrary";
import { LandingStorySections } from "@/components/LandingStorySections";

export default function HomePage() {
  return (
    <div className="grid gap-16">
      <HeroSection />
      <LandingStorySections />
      <section id="library" className="glyph-frame rounded-[2rem] border border-cocoa/10 bg-parchment p-6 shadow-soft md:p-8">
        <DiseaseLibrary />
      </section>
    </div>
  );
}
