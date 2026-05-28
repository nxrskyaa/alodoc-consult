"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, Clock, Languages } from "lucide-react";
import { AnimatedDiseaseVisual } from "@/components/AnimatedDiseaseVisual";
import { Disease } from "@/data/diseases";

export function DiseaseCard({ disease }: { disease: Disease }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      className="group flex h-full flex-col rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-lift transition hover:shadow-soft sm:p-5"
    >
      <AnimatedDiseaseVisual slug={disease.slug} compact className="mb-4 min-h-[190px]" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase text-oliveDeep">{disease.category.en}</p>
          <h2 className="mt-3 text-2xl font-black leading-tight text-cocoa sm:text-3xl">{disease.title.en}</h2>
          <p className="mt-1 text-sm font-bold text-cocoaSoft">{disease.title.id}</p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-oliveDeep">{disease.id}</div>
      </div>
      <p className="mt-5 flex-1 text-sm font-semibold leading-6 text-cocoaSoft">{disease.shortDescription.en}</p>
      <div className="mt-6 grid grid-cols-2 gap-3 text-sm font-bold text-cocoa">
        <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2"><Clock className="h-4 w-4 text-orange" /> {disease.estimatedMinutes} min</span>
        <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2"><Languages className="h-4 w-4 text-orange" /> ID / EN</span>
        <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2"><Award className="h-4 w-4 text-orange" /> Badge</span>
        <span className="rounded-2xl bg-white px-3 py-2">{disease.difficulty}</span>
      </div>
      <Link href={`/disease/${disease.slug}`} className="focus-ring mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition group-hover:bg-[#dc7432]">
        Start Quest <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.article>
  );
}
