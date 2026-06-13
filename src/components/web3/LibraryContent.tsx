"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Activity } from "lucide-react";
import { diseases } from "@/data/diseases";
import { DiseaseCard } from "@/components/DiseaseCard";
import { Web3IssueCard } from "@/components/web3/Web3IssueCard";
import { web3Issues, web3Overview } from "@/data/web3HealthIssues";
import type { Language } from "@/data/diseases";
import { LanguageToggle } from "@/components/LanguageToggle";
import { cn } from "@/lib/utils";

type Tab = "all" | "core" | "web3";

const TABS: { id: Tab; label: Record<Language, string> }[] = [
  { id: "all", label: { en: "All topics", id: "Semua topik" } },
  { id: "core", label: { en: "Core Health Topics", id: "Topik Kesehatan Inti" } },
  { id: "web3", label: { en: "Web3 Health Issues", id: "Isu Kesehatan di Web3" } }
];

export function LibraryContent() {
  const [language, setLanguage] = useState<Language>("en");
  const [tab, setTab] = useState<Tab>("all");

  const showCore = tab === "all" || tab === "core";
  const showWeb3 = tab === "all" || tab === "web3";

  return (
    <section className="grid gap-8">
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-[11px] font-black uppercase tracking-wide text-oliveDeep">
            <BookOpen className="h-3.5 w-3.5" /> {language === "id" ? "Perpustakaan belajar" : "Learning library"}
          </span>
          <h1 className="mt-4 text-4xl font-black leading-tight text-cocoa sm:text-5xl">
            {language === "id" ? "Perpustakaan kesehatan" : "Health library"}
          </h1>
          <p className="mt-4 text-lg font-semibold leading-8 text-cocoaSoft">
            {language === "id"
              ? "Modul bilingual singkat untuk topik kesehatan umum dan gaya hidup Web3. Pelajari konsep, uji pemahaman, dan buktikan penyelesaian di Arc Testnet."
              : "Short bilingual modules for common health topics and Web3 lifestyle. Learn concepts, test understanding, and prove completion on Arc Testnet."}
          </p>
        </div>
        <LanguageToggle language={language} onChange={setLanguage} />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "focus-ring rounded-full border border-cocoa/10 px-4 py-2.5 text-sm font-black transition",
              tab === t.id ? "bg-cocoa text-cream shadow-lift" : "bg-white text-cocoaSoft hover:bg-mint/70 hover:text-cocoa"
            )}
          >
            {t.label[language]}
          </button>
        ))}
      </div>

      {/* Core Health Topics */}
      {showCore && (
        <div className="grid gap-5">
          <SectionHeading
            kicker={language === "id" ? "Topik Kesehatan Inti" : "Core Health Topics"}
            title={language === "id" ? "Penyakit umum yang penting dipahami" : "Common conditions worth understanding"}
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {diseases.map((disease) => (
              <DiseaseCard key={disease.id} disease={disease} />
            ))}
          </div>
        </div>
      )}

      {/* Web3 Health Issues */}
      {showWeb3 && (
        <div className="grid gap-5">
          <SectionHeading
            kicker={language === "id" ? "Isu Kesehatan di Web3" : "Web3 Health Issues"}
            title={language === "id" ? "Literasi kesehatan untuk ritme Web3 yang serba 24 jam" : "Health literacy for the always-on Web3 rhythm"}
            web3
          />
          <Web3OverviewBlock language={language} />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {web3Issues.map((issue) => (
              <Web3IssueCard key={issue.id} issue={issue} language={language} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function SectionHeading({ kicker, title, web3 = false }: { kicker: string; title: string; web3?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={cn("grid h-10 w-10 place-items-center rounded-2xl text-white", web3 ? "bg-oliveDeep" : "bg-orange")}>
        {web3 ? <Activity className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
      </span>
      <div>
        <p className="text-xs font-black uppercase tracking-wide text-oliveDeep">{kicker}</p>
        <h2 className="text-xl font-black leading-tight text-cocoa sm:text-2xl">{title}</h2>
      </div>
    </div>
  );
}

function Web3OverviewBlock({ language }: { language: Language }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-5 rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-lift sm:p-7 lg:grid-cols-[1fr_1.1fr]"
      >
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-oliveDeep">{web3Overview.title[language]}</p>
          <p className="mt-3 text-base font-semibold leading-7 text-cocoaSoft">{web3Overview.intro[language]}</p>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {web3Overview.roots[language].map((root, i) => (
              <span key={root} className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 text-sm font-black text-cocoa shadow-lift">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-mint text-xs text-oliveDeep">{i + 1}</span>
                {root}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm font-semibold leading-7 text-cocoaSoft sm:text-base sm:leading-8">{web3Overview.closing[language]}</p>
      </motion.div>
    </AnimatePresence>
  );
}
