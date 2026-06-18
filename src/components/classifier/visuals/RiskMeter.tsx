"use client";

import { motion } from "framer-motion";
import type { ClassifierLanguage, RiskLevel } from "@/lib/health-classifier";

const levels = [
  { key: "low", en: "Low", id: "Rendah", color: "var(--risk-low)" },
  { key: "attention", en: "Attention", id: "Perhatian", color: "var(--risk-attention)" },
  { key: "moderate", en: "Moderate", id: "Sedang", color: "var(--risk-moderate)" },
  { key: "high", en: "High", id: "Tinggi", color: "var(--risk-high)" },
  { key: "very_high", en: "Very High", id: "Sangat Tinggi", color: "var(--risk-very-high)" }
] as const;

const indexByLevel: Record<RiskLevel, number> = {
  low: 0,
  attention: 1,
  moderate: 2,
  high: 3,
  very_high: 4,
  context: 1
};

export function RiskMeter({ level, language }: { level: RiskLevel; language: ClassifierLanguage }) {
  const activeIndex = indexByLevel[level];
  const percent = activeIndex / (levels.length - 1);

  return (
    <div className="rounded-3xl bg-white p-4 shadow-lift">
      <div className="relative h-4 rounded-full bg-cream">
        <div className="absolute inset-0 grid grid-cols-5 overflow-hidden rounded-full">
          {levels.map((item) => <span key={item.key} style={{ background: item.color }} />)}
        </div>
        <motion.div className="absolute top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border-4 border-white bg-cocoa shadow-lift" initial={{ left: "0%" }} animate={{ left: `calc(${percent * 100}% - 14px)` }} transition={{ duration: 0.7, ease: "easeOut" }} />
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1 text-center text-[10px] font-black uppercase text-cocoaSoft">
        {levels.map((item, index) => <span key={item.key} className={index === activeIndex ? "text-cocoa" : ""}>{item[language]}</span>)}
      </div>
      {level === "context" && <p className="mt-3 text-xs font-bold text-cocoaSoft">{language === "id" ? "GDS butuh konteks tambahan." : "Random glucose needs more context."}</p>}
    </div>
  );
}
