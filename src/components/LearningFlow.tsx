"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { AloGuideBubble } from "@/components/AloGuideBubble";
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
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/library" className="inline-flex items-center gap-2 text-sm font-black text-cocoaSoft hover:text-cocoa">
            <ArrowLeft className="h-4 w-4" /> Back to library
          </Link>
          <p className="mt-5 text-sm font-black uppercase text-oliveDeep">{disease.category[language]}</p>
          <h1 className="mt-2 text-5xl font-black leading-tight text-cocoa">{disease.title[language]}</h1>
          <p className="mt-3 max-w-2xl text-lg font-semibold leading-8 text-cocoaSoft">{disease.shortDescription[language]}</p>
        </div>
        <LanguageToggle language={language} onChange={setLanguage} />
      </div>

      <div className="h-3 rounded-full bg-white shadow-lift">
        <div className="h-3 rounded-full bg-orange transition-all" style={{ width: `${((index + 1) / disease.sections.length) * 100}%` }} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <LearningCard section={disease.sections[index]} language={language} index={index} total={disease.sections.length} />
        <div className="grid content-start gap-5">
          <AloGuideBubble text={language === "id" ? "Ambil satu kartu dulu. Tujuannya memahami konsep, bukan menilai kondisi pribadi." : "Take one card at a time. The goal is understanding concepts, not judging your personal condition."} />
          <SafetyDisclaimer language={language} />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 sm:flex-row">
        <button
          disabled={index === 0}
          onClick={() => setIndex((value) => Math.max(0, value - 1))}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-cocoa/10 bg-white px-5 py-3 text-sm font-black text-cocoa shadow-lift disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Previous
        </button>
        {atEnd ? (
          <Link href={`/disease/${disease.slug}/quiz`} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:bg-[#dc7432]">
            <CheckCircle2 className="h-4 w-4" /> Start Quiz
          </Link>
        ) : (
          <button onClick={() => setIndex((value) => value + 1)} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:bg-[#dc7432]">
            Next <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
