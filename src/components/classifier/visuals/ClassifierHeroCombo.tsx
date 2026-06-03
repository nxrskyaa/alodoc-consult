"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedBloodPressureHero } from "@/components/classifier/visuals/AnimatedBloodPressureHero";
import { AnimatedBloodSugarHero } from "@/components/classifier/visuals/AnimatedBloodSugarHero";

export function ClassifierHeroCombo() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] border border-cocoa/10 bg-[#FFFDF8] p-3 shadow-soft sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#E8F1DD,transparent_30%),radial-gradient(circle_at_80%_80%,#F6D77A77,transparent_30%)]" />
      <div className="relative grid gap-3 sm:grid-cols-2">
        <AnimatedBloodPressureHero size="sm" />
        <AnimatedBloodSugarHero size="sm" />
      </div>
      <motion.div
        className="relative mx-auto -mt-4 grid h-20 w-20 place-items-center rounded-[1.5rem] border border-cocoa/10 bg-parchment shadow-lift"
        animate={reduceMotion ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 60 60" className="h-14 w-14" aria-hidden="true">
          <path d="M14 31c10-14 24-14 36 0" stroke="#7C8F4E" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M16 34c8 1 13 5 16 14-8 0-14-4-16-14Z" fill="#7C8F4E" />
          <path d="M44 34c-8 1-13 5-16 14 8 0 14-4 16-14Z" fill="#F28B44" />
          <circle cx="30" cy="22" r="5" fill="#3B2418" />
        </svg>
      </motion.div>
    </div>
  );
}
