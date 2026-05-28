"use client";

import { motion } from "framer-motion";
import { DiseaseSection, Language } from "@/data/diseases";
import { SectionMiniAnimation } from "@/components/SectionMiniAnimation";

export function LearningCard({ section, language, index, total }: { section: DiseaseSection; language: Language; index: number; total: number }) {
  return (
    <motion.article
      key={`${section.title.en}-${language}`}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-6 md:p-8"
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionMiniAnimation section={section} />
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-mint px-4 py-2 text-xs font-black uppercase text-oliveDeep">
              Card {index + 1} of {total}
            </span>
            <span className="text-sm font-black text-cocoaSoft">{Math.round(((index + 1) / total) * 100)}%</span>
          </div>
          <h2 className="mt-6 text-3xl font-black leading-tight text-cocoa sm:text-4xl">{section.title[language]}</h2>
          <p className="mt-4 text-base font-semibold leading-7 text-cocoaSoft sm:text-lg sm:leading-8">{section.body[language]}</p>
        </div>
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {section.bullets[language].slice(0, 4).map((bullet, bulletIndex) => (
          <motion.li
            key={bullet}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: bulletIndex * 0.06 }}
            className="rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-cocoa shadow-lift"
          >
            {bullet}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}
