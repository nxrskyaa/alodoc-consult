"use client";

import { motion } from "framer-motion";
import { Award, RotateCcw } from "lucide-react";
import { ClassifierAloGuide } from "@/components/classifier/ClassifierAloGuide";
import { ClassifierDisclaimer } from "@/components/classifier/ClassifierDisclaimer";
import { DoDontCards } from "@/components/classifier/DoDontCards";
import { RedFlagsCard } from "@/components/classifier/RedFlagsCard";
import { RelatedLearningCTA } from "@/components/classifier/RelatedLearningCTA";
import { AnimatedResultBadge } from "@/components/classifier/visuals/AnimatedResultBadge";
import { RiskMeter } from "@/components/classifier/visuals/RiskMeter";
import { SectionMiniVisual } from "@/components/classifier/visuals/SectionMiniVisual";
import type { ClassifierLanguage, ClassifierResult } from "@/lib/health-classifier";

export function ClassifierResultCard({ result, language, onReset }: { result: ClassifierResult; language: ClassifierLanguage; onReset: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="grid gap-5 rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-6"
    >
      <div className="grid gap-5 lg:grid-cols-[auto_1fr] lg:items-center">
        <AnimatedResultBadge variant={result.variant} label={result.label[language]} />
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-xs font-black uppercase text-oliveDeep">
            <Award className="h-4 w-4" />
            {language === "id" ? "Hasil edukasi lokal" : "Local educational result"}
          </div>
          <h2 className="mt-4 break-words text-3xl font-black leading-tight text-cocoa sm:text-4xl">{result.label[language]}</h2>
          <p className="mt-3 text-base font-semibold leading-7 text-cocoaSoft">{result.conclusion[language]}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[2rem] bg-white p-4 shadow-lift">
          <div className="flex flex-col gap-4 sm:flex-row">
            <SectionMiniVisual type="understand_category" />
            <div className="min-w-0">
              <p className="text-sm font-black uppercase text-oliveDeep">{language === "id" ? "Makna kategori" : "What it means"}</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-cocoaSoft">{result.meaning[language]}</p>
            </div>
          </div>
        </article>
        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3 rounded-3xl bg-white px-4 py-3 shadow-lift">
            <span className="text-sm font-black uppercase text-cocoaSoft">{language === "id" ? "Level risiko" : "Risk level"}</span>
            <span className="rounded-full bg-cream px-4 py-2 text-sm font-black text-cocoa">{result.risk[language]}</span>
          </div>
          <RiskMeter level={result.riskLevel} language={language} />
        </div>
      </div>

      <DoDontCards result={result} language={language} />
      <div className="rounded-[2rem] bg-white p-4 shadow-lift sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row">
          <SectionMiniVisual type="recommendation" />
          <div>
            <p className="text-sm font-black uppercase text-oliveDeep">{language === "id" ? "Rekomendasi edukasi" : "Educational recommendation"}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-cocoaSoft">{result.recommendation[language]}</p>
          </div>
        </div>
      </div>
      <ClassifierAloGuide
        language={language}
        text={
          language === "id"
            ? "Alo Guide: lihat tren dari pengukuran berulang bersama tenaga kesehatan, bukan dari satu angka saja."
            : "Alo Guide: interpret trends from repeated measurements with a healthcare professional, not from one number alone."
        }
      />
      <RedFlagsCard result={result} language={language} />
      <RelatedLearningCTA result={result} language={language} />
      <ClassifierDisclaimer language={language} />
      <button
        type="button"
        onClick={onReset}
        className="focus-ring inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-black text-cream shadow-lift transition hover:bg-cocoa/90 sm:w-fit"
      >
        <RotateCcw className="h-4 w-4" />
        {language === "id" ? "Cek angka lain" : "Check another value"}
      </button>
    </motion.section>
  );
}
