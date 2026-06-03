"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ResultVariant } from "@/lib/health-classifier";

const palette: Record<ResultVariant, { bg: string; stroke: string; mark: string }> = {
  normal: { bg: "#E8F1DD", stroke: "#7C8F4E", mark: "#4F6739" },
  attention: { bg: "#F6D77A", stroke: "#B59A32", mark: "#7C6A26" },
  moderate: { bg: "#FAD3A7", stroke: "#F28B44", mark: "#A65320" },
  high: { bg: "#F4B19C", stroke: "#E86F4A", mark: "#93351F" },
  crisis: { bg: "#F4A08E", stroke: "#E86F4A", mark: "#7F2417" },
  inconclusive: { bg: "#FFF4C9", stroke: "#D4AE38", mark: "#7C6A26" }
};

export function AnimatedResultBadge({ variant, label }: { variant: ResultVariant; label?: string }) {
  const reduceMotion = useReducedMotion();
  const tone = palette[variant];

  return (
    <div className="grid justify-items-center gap-2">
      <motion.svg viewBox="0 0 150 150" className="h-28 w-28" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }} role="img" aria-label={label ?? "Educational result badge"}>
        <motion.circle cx="75" cy="75" r="54" fill={tone.bg} stroke={tone.stroke} strokeWidth="8" animate={reduceMotion ? {} : { scale: variant === "crisis" ? [1, 1.06, 1] : [1, 1.035, 1] }} transition={{ duration: variant === "crisis" ? 1.5 : 2.6, repeat: Infinity, ease: "easeInOut" }} />
        {variant === "normal" ? (
          <motion.path d="M48 76l18 18 38-45" stroke={tone.mark} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.2 }} />
        ) : variant === "inconclusive" ? (
          <>
            <rect x="45" y="48" width="58" height="42" rx="14" fill="#FFFDF8" stroke={tone.mark} strokeWidth="6" />
            <circle cx="88" cy="100" r="6" fill={tone.mark} />
          </>
        ) : (
          <>
            <path d="M75 42v44" stroke={tone.mark} strokeWidth="12" strokeLinecap="round" />
            <circle cx="75" cy="105" r="7" fill={tone.mark} />
          </>
        )}
      </motion.svg>
      {label && <p className="text-sm font-black text-cocoa">{label}</p>}
    </div>
  );
}
