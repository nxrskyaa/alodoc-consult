import { DiseaseSection, Language } from "@/data/diseases";

export function LearningCard({ section, language, index, total }: { section: DiseaseSection; language: Language; index: number; total: number }) {
  return (
    <article className="rounded-[2rem] border border-cocoa/10 bg-parchment p-6 shadow-soft md:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-mint px-4 py-2 text-xs font-black uppercase text-oliveDeep">
          Card {index + 1} of {total}
        </span>
        <span className="text-sm font-black text-cocoaSoft">{Math.round(((index + 1) / total) * 100)}%</span>
      </div>
      <h2 className="mt-8 text-4xl font-black leading-tight text-cocoa">{section.title[language]}</h2>
      <p className="mt-5 text-lg font-semibold leading-8 text-cocoaSoft">{section.body[language]}</p>
      <ul className="mt-6 grid gap-3">
        {section.bullets[language].map((bullet) => (
          <li key={bullet} className="rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-cocoa shadow-lift">
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}
