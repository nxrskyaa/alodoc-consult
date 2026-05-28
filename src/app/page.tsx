import { HeroSection } from "@/components/HeroSection";
import { DiseaseLibrary } from "@/components/DiseaseLibrary";

export default function HomePage() {
  return (
    <div className="grid gap-16">
      <HeroSection />
      <section id="library" className="rounded-[2rem] border border-cocoa/10 bg-parchment p-6 shadow-soft md:p-8">
        <DiseaseLibrary />
      </section>
    </div>
  );
}
