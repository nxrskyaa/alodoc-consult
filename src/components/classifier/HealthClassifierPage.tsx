"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { diseases, getDiseaseBySlug } from "@/data/diseases";
import { cn } from "@/lib/utils";

type ClassifierTopic = {
  label: string;
  slug: string;
  explanation: string;
};

const topics: ClassifierTopic[] = [
  {
    label: "Cold & respiratory basics",
    slug: "common-cold",
    explanation: "Learn how common colds usually spread and why they are often viral. This module is a friendly starting point for respiratory basics."
  },
  {
    label: "Blood pressure basics",
    slug: "hypertension",
    explanation: "Learn why high blood pressure is often silent and how lifestyle and repeated professional measurement matter. This module keeps the focus on literacy."
  },
  {
    label: "Blood sugar basics",
    slug: "type-2-diabetes",
    explanation: "Learn the basics of blood sugar, insulin resistance, and long-term metabolic health. This module helps you understand key concepts before any quiz or badge."
  },
  {
    label: "Stomach acid & digestion",
    slug: "gerd",
    explanation: "Learn how stomach acid can flow back into the esophagus and what common triggers mean. This module is a simple first stop for digestion education."
  },
  {
    label: "Fever & mosquito-borne illness",
    slug: "dengue-fever",
    explanation: "Learn why mosquito bite prevention and dengue warning signs matter. This module is for awareness and education, not prediction."
  }
];

export function HealthClassifierPage() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedTopic = useMemo(() => topics.find((topic) => topic.slug === selectedSlug) ?? null, [selectedSlug]);
  const recommended = selectedTopic ? getDiseaseBySlug(selectedTopic.slug) ?? diseases[0] : null;

  return (
    <div className="grid gap-8">
      <section className="alodoc-surface rounded-[2.4rem] border border-cocoa/10 p-5 shadow-soft sm:p-8">
        <div className="max-w-3xl">
          <span className="rounded-full bg-mint px-4 py-2 text-xs font-bold uppercase text-oliveDeep">Learning Classifier</span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-normal text-cocoa sm:text-6xl">Find what to learn first.</h1>
          <p className="mt-5 text-base leading-7 text-cocoaSoft sm:text-lg">
            Choose a general topic and Alodoc will suggest a learning module. This is not a diagnosis.
          </p>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6">
          <p className="text-sm font-bold uppercase text-oliveDeep">Step 1</p>
          <h2 className="mt-2 text-2xl font-extrabold text-cocoa">Choose a general topic</h2>
          <div className="mt-5 grid gap-3">
            {topics.map((topic) => {
              const active = selectedSlug === topic.slug;
              return (
                <motion.button
                  key={topic.slug}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedSlug(topic.slug)}
                  className={cn(
                    "focus-ring rounded-[1.4rem] border p-4 text-left text-base font-bold transition",
                    active ? "border-olive bg-mint text-cocoa shadow-lift" : "border-cocoa/10 bg-white text-cocoaSoft hover:border-olive/50 hover:text-cocoa"
                  )}
                >
                  {topic.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6">
          <p className="text-sm font-bold uppercase text-oliveDeep">Result</p>
          <AnimatePresence mode="wait">
            {recommended && selectedTopic ? (
              <motion.div
                key={recommended.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-5 rounded-[1.6rem] bg-white p-5 shadow-lift"
              >
                <p className="text-xs font-bold uppercase text-oliveDeep">Recommended learning module</p>
                <h2 className="mt-3 text-3xl font-extrabold text-cocoa">{recommended.title.en}</h2>
                <p className="mt-3 text-sm leading-6 text-cocoaSoft">{selectedTopic.explanation}</p>
                <p className="mt-4 rounded-2xl bg-orange/10 px-4 py-3 text-sm font-semibold leading-6 text-cocoa">
                  This is not a diagnosis. It only helps you choose an education module.
                </p>
                <Link href={`/disease/${recommended.slug}`} className="focus-ring mt-5 inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-bold text-cream shadow-lift transition hover:bg-deepBlack">
                  Start Learning <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-5 rounded-[1.6rem] bg-white p-5 text-sm font-semibold leading-6 text-cocoaSoft shadow-lift"
              >
                Select one topic card to see the recommended learning module.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
