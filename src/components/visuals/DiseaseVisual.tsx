"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedGlucoseDots, AnimatedHealthParticles, AnimatedPulseLine } from "@/components/visuals/AgentWorkflowVisuals";
import type { Disease } from "@/data/diseases";
import { cn } from "@/lib/utils";

export function DiseaseVisual({ slug, className }: { slug: Disease["slug"] | string; className?: string; compact?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className={cn("relative isolate grid min-h-[280px] place-items-center overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft", className)}>
      <AnimatedHealthParticles />
      {slug === "hypertension" && <HeartVisual reduceMotion={Boolean(reduceMotion)} />}
      {slug === "type-2-diabetes" && <DiabetesVisual />}
      {slug === "gerd" && <GerdVisual reduceMotion={Boolean(reduceMotion)} />}
      {slug === "dengue-fever" && <DengueVisual reduceMotion={Boolean(reduceMotion)} />}
      {slug !== "hypertension" && slug !== "type-2-diabetes" && slug !== "gerd" && slug !== "dengue-fever" && <ColdVisual reduceMotion={Boolean(reduceMotion)} />}
    </div>
  );
}

function ColdVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg viewBox="0 0 260 220" className="relative z-10 h-full max-h-[250px] w-full max-w-[300px]" aria-hidden="true">
      <motion.circle cx="76" cy="78" r="34" fill="#B9DEDB" stroke="#90A090" strokeWidth="7" {...(reduceMotion ? {} : { animate: { y: [0, -10, 0] }, transition: { duration: 3, repeat: Infinity } })} />
      <motion.path d="M132 112c28-26 75 0 51 34 28 2 30 41-2 45h-94c-32-4-29-44 1-45-10-28 22-53 44-34Z" fill="#FFFDF8" stroke="#90A090" strokeWidth="7" {...(reduceMotion ? {} : { animate: { x: [0, 10, 0], opacity: [0.72, 1, 0.72] }, transition: { duration: 2.4, repeat: Infinity } })} />
      <circle cx="68" cy="72" r="4" fill="#202020" />
      <circle cx="84" cy="72" r="4" fill="#202020" />
      <path d="M67 88c8 6 17 6 25 0" fill="none" stroke="#202020" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function HeartVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="relative z-10 grid w-full place-items-center">
      <svg viewBox="0 0 260 170" className="h-44 w-full max-w-[320px]" aria-hidden="true">
        <motion.path d="M130 130s-58-31-58-73c0-38 45-45 58-16 13-29 58-22 58 16 0 42-58 73-58 73Z" fill="#F5B8A1" stroke="#202020" strokeWidth="8" {...(reduceMotion ? {} : { animate: { scale: [1, 1.06, 1] }, transition: { duration: 1.5, repeat: Infinity } })} style={{ transformOrigin: "130px 80px" }} />
      </svg>
      <AnimatedPulseLine className="-mt-8 max-w-[260px]" />
    </div>
  );
}

function DiabetesVisual() {
  return (
    <div className="relative z-10 grid w-full place-items-center">
      <AnimatedGlucoseDots className="max-w-[290px]" />
      <div className="grid h-24 w-44 place-items-center rounded-[2rem] border-4 border-olive/35 bg-white/80 shadow-lift">
        <motion.div className="h-5 w-28 rounded-full bg-orange" initial={{ scaleX: 0.2 }} whileInView={{ scaleX: 0.82 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ transformOrigin: "left" }} />
      </div>
    </div>
  );
}

function GerdVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg viewBox="0 0 260 220" className="relative z-10 h-full max-h-[250px] w-full max-w-[300px]" aria-hidden="true">
      <motion.path d="M130 38c17 24 12 47 7 67-6 25 5 40 31 45 24 5 44 21 35 47-9 25-55 28-88 14-38-16-58-49-43-79 12-23 41-19 45-40 4-19 2-36-8-54h21Z" fill="#FFFDF8" stroke="#8B5E3C" strokeWidth="8" strokeLinejoin="round" {...(reduceMotion ? {} : { animate: { y: [0, -5, 0] }, transition: { duration: 3, repeat: Infinity } })} />
      <motion.path d="M91 164c29 18 72 18 102-3" fill="none" stroke="#F28A3E" strokeWidth="11" strokeLinecap="round" {...(reduceMotion ? {} : { animate: { pathLength: [0.45, 1, 0.45] }, transition: { duration: 2, repeat: Infinity } })} />
      {[60, 210, 225].map((x, i) => <motion.circle key={x} cx={x} cy={80 + i * 35} r="8" fill="#F5CFAA" {...(reduceMotion ? {} : { animate: { y: [10, -16, 10], opacity: [0.4, 1, 0.4] }, transition: { duration: 2.4 + i * 0.2, repeat: Infinity } })} />)}
    </svg>
  );
}

function DengueVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg viewBox="0 0 260 220" className="relative z-10 h-full max-h-[250px] w-full max-w-[300px]" aria-hidden="true">
      <motion.path d="M130 190c-41-16-64-43-64-83V77c27-2 47-11 64-26 17 15 37 24 64 26v30c0 40-23 67-64 83Z" fill="#DFE8D0" stroke="#90A090" strokeWidth="8" {...(reduceMotion ? {} : { animate: { scale: [0.98, 1.04, 0.98] }, transition: { duration: 2, repeat: Infinity } })} style={{ transformOrigin: "130px 120px" }} />
      <path d="M107 117l17 18 34-42" fill="none" stroke="#202020" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <motion.g {...(reduceMotion ? {} : { animate: { x: [-10, 10, -10], y: [0, -8, 0] }, transition: { duration: 2.2, repeat: Infinity } })}>
        <ellipse cx="125" cy="75" rx="29" ry="17" fill="#8B5E3C" />
        <circle cx="158" cy="73" r="12" fill="#8B5E3C" />
        <path d="M98 72L71 55M100 82L67 91M150 62L178 45M151 84L184 98" stroke="#8B5E3C" strokeWidth="5" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}
