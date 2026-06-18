import { diseases } from "@/data/diseases";
import { DiseaseCard } from "@/components/DiseaseCard";

export function DiseaseLibrary() {
  return (
    <section>
      <div className="mb-8 max-w-3xl">
        <h1 className="glyph-display text-4xl font-black leading-tight text-cocoa sm:text-5xl">Disease library</h1>
        <p className="mt-4 text-lg font-semibold leading-8 text-cocoaSoft">
          Short bilingual modules for common conditions. Learn concepts, test understanding, and prove completion on Arc Testnet.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {diseases.map((disease) => (
          <DiseaseCard key={disease.id} disease={disease} />
        ))}
      </div>
    </section>
  );
}
