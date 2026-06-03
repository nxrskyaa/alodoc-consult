"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Award, CheckCircle2, Clock, Layers } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AloGuideBubble } from "@/components/AloGuideBubble";
import { AnimatedDiseaseVisual } from "@/components/AnimatedDiseaseVisual";
import { LanguageToggle } from "@/components/LanguageToggle";
import { LearningCard } from "@/components/LearningCard";
import { SafetyDisclaimer } from "@/components/SafetyDisclaimer";
import { Disease, Language } from "@/data/diseases";

export function LearningFlow({ disease }: { disease: Disease }) {
  const [language, setLanguage] = useState<Language>("id");
  const [index, setIndex] = useState(0);
  const atEnd = index === disease.sections.length - 1;

  return (
    <div className="grid gap-6">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="grid gap-5 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="min-w-0">
          <Link href="/library" className="inline-flex items-center gap-2 text-sm font-black text-cocoaSoft hover:text-cocoa">
            <ArrowLeft className="h-4 w-4" /> Back to library
          </Link>
          <p className="mt-5 text-sm font-black uppercase text-oliveDeep">{disease.category[language]}</p>
          <h1 className="mt-2 text-4xl font-black leading-tight text-cocoa sm:text-5xl">{disease.title[language]}</h1>
          <p className="mt-3 max-w-2xl text-lg font-semibold leading-8 text-cocoaSoft">{disease.shortDescription[language]}</p>
          <div className="mt-5 grid grid-cols-2 gap-2 text-sm font-black text-cocoa sm:flex sm:flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lift"><Clock className="h-4 w-4 text-orange" /> {disease.estimatedMinutes} min</span>
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lift"><Layers className="h-4 w-4 text-orange" /> {disease.difficulty}</span>
            <span className="col-span-2 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lift"><Award className="h-4 w-4 text-orange" /> {disease.badgeName[language]}</span>
          </div>
          <div className="mt-5">
            <LanguageToggle language={language} onChange={setLanguage} />
          </div>
        </div>
        <AnimatedDiseaseVisual slug={disease.slug} />
      </motion.div>

      <div className="h-3 rounded-full bg-white shadow-lift">
        <div className="h-3 rounded-full bg-orange transition-all duration-500" style={{ width: `${((index + 1) / disease.sections.length) * 100}%` }} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${language}-${index}`}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <LearningCard section={disease.sections[index]} language={language} index={index} total={disease.sections.length} />
          </motion.div>
        </AnimatePresence>
        <div className="grid content-start gap-5">
          <AloGuideBubble text={language === "id" ? "Ambil satu kartu dulu. Tujuannya memahami konsep, bukan menilai kondisi pribadi." : "Take one card at a time. The goal is understanding concepts, not judging your personal condition."} />
          {atEnd && (
            <motion.div initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="rounded-3xl border border-cocoa/10 bg-white p-5 shadow-lift">
              <p className="text-sm font-black uppercase text-oliveDeep">Quick Summary</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">
                {language === "id"
                  ? "Kamu sudah menyelesaikan kartu ringkas. Lanjut quiz untuk membuktikan pemahaman."
                  : "You finished the bite-sized cards. Take the quiz to prove what you understood."}
              </p>
            </motion.div>
          )}
          <SafetyDisclaimer language={language} />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        <motion.button
          whileHover={{ y: index === 0 ? 0 : -2 }}
          whileTap={{ scale: index === 0 ? 1 : 0.98 }}
          disabled={index === 0}
          onClick={() => setIndex((value) => Math.max(0, value - 1))}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-cocoa/10 bg-white px-5 py-3 text-sm font-black text-cocoa shadow-lift disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </motion.button>
        {atEnd ? (
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
          <Link href={`/disease/${disease.slug}/quiz`} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:bg-[#dc7432]">
            <CheckCircle2 className="h-4 w-4" /> Start Quiz
          </Link>
          </motion.div>
        ) : (
          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => setIndex((value) => value + 1)} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:bg-[#dc7432]">
            Next <ArrowRight className="h-4 w-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
