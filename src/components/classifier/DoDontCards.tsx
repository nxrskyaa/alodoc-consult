"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { SectionMiniVisual } from "@/components/classifier/visuals/SectionMiniVisual";
import type { ClassifierLanguage, ClassifierResult } from "@/lib/health-classifier";

export function DoDontCards({ result, language }: { result: ClassifierResult; language: ClassifierLanguage }) {
  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-2">
      <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="min-w-0 overflow-hidden rounded-[2rem] border border-olive/15 bg-mint/70 p-4 shadow-lift sm:p-5">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row">
          <SectionMiniVisual type="do_actions" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-black uppercase text-oliveDeep">
              <CheckCircle2 className="h-4 w-4" />
              {language === "id" ? "Yang membantu" : "Helpful actions"}
            </div>
            <ul className="mt-3 grid gap-2">
              {result.do[language].map((item) => (
                <li key={item} className="rounded-2xl bg-white/75 px-4 py-3 text-sm font-bold leading-5 text-cocoa">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
      <motion.article initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="min-w-0 overflow-hidden rounded-[2rem] border border-orange/15 bg-orange/10 p-4 shadow-lift sm:p-5">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row">
          <SectionMiniVisual type="avoid_actions" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-black uppercase text-orange">
              <XCircle className="h-4 w-4" />
              {language === "id" ? "Sebaiknya hindari" : "Better to avoid"}
            </div>
            <ul className="mt-3 grid gap-2">
              {result.dont[language].map((item) => (
                <li key={item} className="rounded-2xl bg-white/75 px-4 py-3 text-sm font-bold leading-5 text-cocoa">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
