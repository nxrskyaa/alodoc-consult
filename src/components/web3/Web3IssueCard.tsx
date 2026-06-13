"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Languages, Sparkles } from "lucide-react";
import { Web3IssueVisual } from "@/components/web3/Web3IssueVisual";
import type { Language } from "@/data/diseases";
import type { Web3Issue } from "@/data/web3HealthIssues";

export function Web3IssueCard({ issue, language = "en" }: { issue: Web3Issue; language?: Language }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className="group flex h-full flex-col rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-lift transition hover:shadow-soft sm:p-5"
    >
      <Web3IssueVisual slug={issue.slug} tone={issue.tone} compact className="mb-4" />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-[11px] font-black uppercase tracking-wide text-oliveDeep">
            <Sparkles className="h-3.5 w-3.5" /> Web3 lifestyle
          </span>
          <h2 className="mt-3 text-2xl font-black leading-tight text-cocoa sm:text-[1.6rem]">{issue.title[language]}</h2>
          <p className="mt-1 text-sm font-bold text-cocoaSoft">{language === "en" ? issue.title.id : issue.title.en}</p>
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-mint text-sm font-black text-oliveDeep">{issue.id}</div>
      </div>
      <p className="mt-4 flex-1 text-sm font-semibold leading-6 text-cocoaSoft">{issue.shortDescription[language]}</p>
      <div className="mt-5 grid grid-cols-2 gap-2.5 text-sm font-bold text-cocoa">
        <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2"><Clock className="h-4 w-4 text-orange" /> {issue.readingTime} min</span>
        <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2"><Languages className="h-4 w-4 text-orange" /> ID / EN</span>
        <span className="col-span-2 rounded-2xl bg-white px-3 py-2 text-center text-cocoaSoft">{issue.practicalTag[language]}</span>
      </div>
      <Link
        href={`/web3-health-issues/${issue.slug}`}
        className="focus-ring mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-oliveDeep px-5 py-3 text-sm font-black text-white shadow-lift transition group-hover:bg-[#5f7363]"
      >
        Start Learning <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.article>
  );
}
