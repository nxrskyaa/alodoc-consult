"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  size?: "sm" | "md" | "lg";
  intensity?: "calm" | "active";
  resultState?: "normal" | "attention" | "high" | "inconclusive";
};

const sizeClass = {
  sm: "min-h-[180px]",
  md: "min-h-[260px]",
  lg: "min-h-[340px]"
};

export function AnimatedBloodSugarHero({ size = "md", intensity = "calm" }: Props) {
  const reduceMotion = useReducedMotion();
  const drift = intensity === "active" ? 14 : 8;

  return (
    <div className={`relative isolate overflow-hidden rounded-[2rem] bg-[#FFFDF8] ${sizeClass[size]}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,#F6D77A88,transparent_34%),radial-gradient(circle_at_85%_75%,#E8F1DD,transparent_34%)]" />
      <svg viewBox="0 0 360 280" className="relative z-10 h-full w-full" role="img" aria-label="Animated blood sugar education visual">
        <motion.g animate={reduceMotion ? {} : { y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <rect x="105" y="63" width="150" height="150" rx="34" fill="#FFFDF8" stroke="#3B2418" strokeWidth="7" />
          <rect x="132" y="91" width="96" height="28" rx="14" fill="#E8F1DD" />
          <motion.rect x="132" y="91" width="70" height="28" rx="14" fill="#7C8F4E" initial={{ width: 20 }} animate={reduceMotion ? { width: 70 } : { width: [24, 78, 52] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }} />
          <path d="M143 159l22 22 52-61" stroke="#F28B44" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </motion.g>
        {[72, 278, 83, 288, 55].map((x, i) => (
          <motion.g key={x} animate={reduceMotion ? {} : { y: [0, -drift, 0], rotate: [-5, 6, -5] }} transition={{ duration: 2.2 + i * 0.25, repeat: Infinity, ease: "easeInOut" }}>
            <rect x={x} y={62 + i * 32} width="34" height="34" rx="12" fill={i % 2 ? "#F6D77A" : "#F28B44"} stroke="#3B2418" strokeWidth="4" />
            <circle cx={x + 12} cy={78 + i * 32} r="2.5" fill="#3B2418" />
            <circle cx={x + 22} cy={78 + i * 32} r="2.5" fill="#3B2418" />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
