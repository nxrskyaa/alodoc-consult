"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCcw, Scale } from "lucide-react";
import { ClassifierAloGuide } from "@/components/classifier/ClassifierAloGuide";
import { bmiDisclaimer, type BmiResult } from "@/lib/bmi-classifier";
import type { ClassifierLanguage } from "@/lib/health-classifier";
import { cn } from "@/lib/utils";

function toneClasses(tone: BmiResult["tone"]) {
  if (tone === "green") return "bg-mint text-oliveDeep ring-olive/20";
  if (tone === "blue") return "bg-[#dbeafe] text-[#315a7d] ring-[#93c5fd]/30";
  if (tone === "red") return "bg-orange/15 text-orange ring-orange/25";
  return "bg-peach/25 text-cocoa ring-peach/30";
}

export function BmiResultCard({ result, language, onReset }: { result: BmiResult; language: ClassifierLanguage; onReset: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="grid w-full min-w-0 max-w-full gap-5 overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6"
    >
      <div className="grid min-w-0 gap-5 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
        <div className="mx-auto grid h-32 w-32 place-items-center rounded-[2rem] bg-white shadow-lift lg:mx-0">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.95, 1.05, 1] }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={cn("grid h-24 w-24 place-items-center rounded-full text-3xl font-black ring-8", toneClasses(result.tone))}
          >
            {result.value.toFixed(1)}
          </motion.div>
        </div>
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase text-oliveDeep shadow-lift">
            <Scale className="h-4 w-4" />
            BMI
          </div>
          <h2 className="mt-4 break-words text-3xl font-black leading-tight text-cocoa sm:text-4xl">{result.category[language]}</h2>
          <p className="mt-3 text-base font-semibold leading-7 text-cocoaSoft">{result.message[language]}</p>
          <div className={cn("mt-4 inline-flex rounded-full px-4 py-2 text-sm font-extrabold ring-4", toneClasses(result.tone))}>
            {language === "id" ? "BMI: " : "BMI: "}
            {result.value.toFixed(1)}
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] bg-white p-4 shadow-lift sm:p-5">
        <p className="text-sm font-black uppercase text-oliveDeep">{language === "id" ? "Recommended learning modules" : "Recommended learning modules"}</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {result.related.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-cocoa px-5 py-3 text-sm font-black text-cream shadow-lift transition hover:-translate-y-0.5 hover:bg-cocoa/90 active:scale-[0.98] sm:w-fit"
            >
              {item.label[language]}
            </Link>
          ))}
        </div>
      </div>

      <ClassifierAloGuide
        language={language}
        text={
          language === "id"
            ? "Alo Guide: BMI tidak menangkap semua konteks tubuh. Gunakan sebagai pintu masuk belajar, bukan kesimpulan medis."
            : "Alo Guide: BMI does not capture every body context. Use it as a learning starting point, not a medical conclusion."
        }
      />
      <div className="rounded-[2rem] bg-white p-4 text-sm font-semibold leading-6 text-cocoaSoft shadow-lift sm:p-5">
        <p>{bmiDisclaimer[language]}</p>
        <p className="mt-3 font-black text-cocoa">{language === "id" ? "This is not a diagnosis." : "This is not a diagnosis."}</p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="focus-ring inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-black text-cream shadow-lift transition hover:-translate-y-0.5 hover:bg-cocoa/90 active:scale-[0.98] sm:w-fit"
      >
        <RotateCcw className="h-4 w-4" />
        {language === "id" ? "Cek angka lain" : "Check another value"}
      </button>
    </motion.section>
  );
}
