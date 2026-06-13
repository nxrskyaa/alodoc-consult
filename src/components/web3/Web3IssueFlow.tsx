"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Languages, Quote, Activity } from "lucide-react";
import { Web3IssueVisual } from "@/components/web3/Web3IssueVisual";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SafetyDisclaimer } from "@/components/SafetyDisclaimer";
import type { Language } from "@/data/diseases";
import { web3Issues, type Web3Issue } from "@/data/web3HealthIssues";

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const }
};

export function Web3IssueFlow({ issue }: { issue: Web3Issue }) {
  const [language, setLanguage] = useState<Language>("id");
  const related = web3Issues.filter((item) => item.slug !== issue.slug).slice(0, 3);

  return (
    <div className="grid gap-6">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-5 lg:grid-cols-[1fr_440px] lg:items-center"
      >
        <div className="min-w-0">
          <Link href="/library" className="inline-flex items-center gap-2 text-sm font-black text-cocoaSoft hover:text-cocoa">
            <ArrowLeft className="h-4 w-4" /> Back to library
          </Link>
          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-[11px] font-black uppercase tracking-wide text-oliveDeep">
            <Activity className="h-3.5 w-3.5" /> Web3 lifestyle
          </span>
          <h1 className="mt-3 text-4xl font-black leading-tight text-cocoa sm:text-5xl">{issue.title[language]}</h1>
          <p className="mt-2 text-lg font-bold text-cocoaSoft">{language === "en" ? issue.title.id : issue.title.en}</p>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-cocoaSoft sm:text-lg sm:leading-8">{issue.intro[language]}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm font-black text-cocoa">
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lift"><Clock className="h-4 w-4 text-orange" /> {issue.readingTime} min</span>
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lift"><Languages className="h-4 w-4 text-orange" /> ID / EN</span>
            <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lift text-cocoaSoft">{issue.practicalTag[language]}</span>
          </div>
          <div className="mt-5">
            <LanguageToggle language={language} onChange={setLanguage} />
          </div>
        </div>
        <Web3IssueVisual slug={issue.slug} tone={issue.tone} />
      </motion.section>

      {/* Section storytelling */}
      <div className="grid gap-5">
        {issue.sections.map((section, i) => (
          <motion.section
            key={`${section.title.en}-${i}`}
            {...reveal}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.04 }}
            className="rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-lift sm:p-6 md:p-8"
          >
            <div className="grid gap-5 lg:grid-cols-[0.42fr_1fr] lg:items-start">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-xs font-black uppercase tracking-wide text-oliveDeep">
                  {String(i + 1).padStart(2, "0")} · {section.label[language]}
                </span>
                <h2 className="mt-4 text-2xl font-black leading-tight text-cocoa sm:text-3xl">{section.title[language]}</h2>
              </div>
              <div className="min-w-0">
                <p className="text-base font-semibold leading-7 text-cocoaSoft sm:text-lg sm:leading-8">{section.body[language]}</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {section.bullets[language].map((bullet, bi) => (
                    <motion.li
                      key={bullet}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: bi * 0.05 }}
                      className="rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-cocoa shadow-lift"
                    >
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      {/* Key health message */}
      <motion.section
        {...reveal}
        className="overflow-hidden rounded-[2rem] border border-cocoa/10 bg-oliveDeep p-6 text-cream shadow-soft sm:p-9"
      >
        <Quote className="h-8 w-8 text-cream/70" />
        <p className="mt-4 text-2xl font-black leading-snug sm:text-3xl">{issue.keyMessage[language]}</p>
        <p className="mt-4 text-sm font-bold uppercase tracking-wide text-cream/70">
          {language === "id" ? "Pesan kesehatan utama" : "Key health message"}
        </p>
      </motion.section>

      {/* Summary / reflection */}
      <motion.section {...reveal} className="rounded-[2rem] border border-cocoa/10 bg-white p-6 shadow-lift sm:p-8">
        <p className="text-sm font-black uppercase tracking-wide text-oliveDeep">
          {language === "id" ? "Ringkasan dan refleksi" : "Summary and reflection"}
        </p>
        <p className="mt-3 text-base font-semibold leading-7 text-cocoaSoft sm:text-lg sm:leading-8">
          {language === "id"
            ? "Topik ini adalah edukasi literasi kesehatan, bukan diagnosis. Tujuannya membantumu mengenali kebiasaan, memahami risiko, dan membangun rutinitas yang lebih sehat sambil tetap aktif di Web3."
            : "This topic is health literacy education, not diagnosis. The goal is to help you recognise habits, understand risks, and build healthier routines while staying active in Web3."}
        </p>
        <SafetyDisclaimer language={language} />
      </motion.section>

      {/* Explore more */}
      <motion.section {...reveal} className="grid gap-4">
        <h3 className="text-2xl font-black text-cocoa sm:text-3xl">
          {language === "id" ? "Jelajahi isu Web3 lainnya" : "Explore more Web3 Health Issues"}
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <Link
              key={item.slug}
              href={`/web3-health-issues/${item.slug}`}
              className="group rounded-[1.6rem] border border-cocoa/10 bg-parchment p-4 shadow-lift transition hover:-translate-y-1 hover:shadow-soft"
            >
              <Web3IssueVisual slug={item.slug} tone={item.tone} compact className="mb-3 min-h-[150px]" />
              <p className="text-lg font-black leading-tight text-cocoa">{item.title[language]}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-black text-oliveDeep">
                {language === "id" ? "Pelajari" : "Learn"} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/library"
          className="focus-ring mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:bg-[#dc7432]"
        >
          <ArrowLeft className="h-4 w-4" /> {language === "id" ? "Kembali ke Library" : "Back to Library"}
        </Link>
      </motion.section>
    </div>
  );
}
