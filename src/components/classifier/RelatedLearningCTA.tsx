"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, HelpCircle } from "lucide-react";
import { SectionMiniVisual } from "@/components/classifier/visuals/SectionMiniVisual";
import type { ClassifierLanguage, ClassifierResult } from "@/lib/health-classifier";

export function RelatedLearningCTA({ result, language }: { result: ClassifierResult; language: ClassifierLanguage }) {
  return (
    <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-lift sm:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <SectionMiniVisual type="related_learning" />
          <div>
            <p className="text-sm font-black uppercase text-oliveDeep">{language === "id" ? "Lanjut belajar" : "Keep learning"}</p>
            <h3 className="mt-1 text-2xl font-black text-cocoa">{result.related.primaryLabel[language]}</h3>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-cocoaSoft">
              {language === "id"
                ? "Alat ini hanya pintu masuk edukasi. Modul Alodoc menjelaskan konteksnya dengan kartu belajar dan quiz."
                : "This tool is only an educational entry point. Alodoc modules explain the context with learning cards and quizzes."}
            </p>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 md:min-w-[320px]">
          <Link href={result.related.primaryHref} className="focus-ring inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift">
            <BookOpen className="h-4 w-4" />
            {language === "id" ? "Buka Modul" : "Open Module"}
          </Link>
          <Link href={result.related.quizHref} className="focus-ring inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-cocoa shadow-lift">
            <HelpCircle className="h-4 w-4" />
            Quiz
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
