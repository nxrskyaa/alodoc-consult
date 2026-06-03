"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { SectionMiniVisual } from "@/components/classifier/visuals/SectionMiniVisual";
import type { ClassifierLanguage, ClassifierResult } from "@/lib/health-classifier";

export function RedFlagsCard({ result, language }: { result: ClassifierResult; language: ClassifierLanguage }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full min-w-0 overflow-hidden rounded-[2rem] border border-orange/20 bg-[#fff4e4] p-4 shadow-lift sm:p-5"
    >
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row">
        <SectionMiniVisual type="red_flags" />
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm font-black uppercase text-orange">
            <AlertTriangle className="h-4 w-4" />
            {language === "id" ? "Tanda bahaya" : "Red flags"}
          </div>
          <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">
            {language === "id"
              ? "Cari bantuan medis segera jika angka tinggi disertai tanda berikut."
              : "Seek urgent medical help if high readings appear with these signs."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {result.redFlags[language].map((item) => (
              <span key={item} className="max-w-full rounded-full bg-white px-4 py-2 text-xs font-black text-cocoa shadow-lift">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
