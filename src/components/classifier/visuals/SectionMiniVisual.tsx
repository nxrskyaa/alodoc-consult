"use client";

import { motion, useReducedMotion } from "framer-motion";

export type SectionMiniVisualType = "learn_number" | "understand_category" | "do_actions" | "avoid_actions" | "recommendation" | "red_flags" | "privacy" | "related_learning";

export function SectionMiniVisual({ type }: { type: SectionMiniVisualType }) {
  const reduceMotion = useReducedMotion();
  const float = reduceMotion ? {} : { y: [0, -6, 0] };

  return (
    <div className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl bg-cream">
      <svg viewBox="0 0 110 110" className="h-20 w-20" aria-hidden="true">
        {type === "learn_number" && (
          <motion.g animate={float} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
            <rect x="20" y="24" width="70" height="62" rx="20" fill="#FFFDF8" stroke="#3B2418" strokeWidth="5" />
            <circle cx="39" cy="49" r="6" fill="#F28B44" />
            <circle cx="55" cy="49" r="6" fill="#7C8F4E" />
            <circle cx="71" cy="49" r="6" fill="#F6D77A" />
            <path d="M35 68h42" stroke="#7C8F4E" strokeWidth="6" strokeLinecap="round" />
          </motion.g>
        )}
        {type === "understand_category" && (
          <motion.g animate={reduceMotion ? {} : { rotate: [-4, 5, -4] }} style={{ transformOrigin: "55px 55px" }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}>
            <circle cx="55" cy="58" r="34" fill="#FFFDF8" stroke="#7C8F4E" strokeWidth="6" />
            <path d="M32 63a24 24 0 0 1 48-15" stroke="#F28B44" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M55 58l20-14" stroke="#3B2418" strokeWidth="5" strokeLinecap="round" />
          </motion.g>
        )}
        {type === "do_actions" && (
          <motion.g animate={float} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
            <rect x="24" y="22" width="62" height="70" rx="18" fill="#E8F1DD" stroke="#7C8F4E" strokeWidth="5" />
            {[43, 58, 73].map((y, index) => (
              <motion.path key={y} d={`M36 ${y}l8 8 20-22`} stroke="#4F6739" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: index * 0.2, duration: 0.5 }} />
            ))}
          </motion.g>
        )}
        {type === "avoid_actions" && (
          <motion.g animate={reduceMotion ? {} : { x: [0, -2, 2, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
            <rect x="23" y="28" width="64" height="56" rx="18" fill="#FFF2DF" stroke="#F28B44" strokeWidth="5" />
            <path d="M39 45l32 32M71 45L39 77" stroke="#E86F4A" strokeWidth="8" strokeLinecap="round" />
          </motion.g>
        )}
        {type === "recommendation" && (
          <motion.g animate={float} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}>
            <path d="M25 37c18-14 41-14 60 0v42c-19-12-42-12-60 0V37Z" fill="#FFFDF8" stroke="#3B2418" strokeWidth="5" />
            <path d="M55 37v43" stroke="#7C8F4E" strokeWidth="5" />
            <circle cx="55" cy="25" r="8" fill="#F28B44" />
          </motion.g>
        )}
        {type === "red_flags" && (
          <motion.g animate={reduceMotion ? {} : { scale: [1, 1.04, 1] }} style={{ transformOrigin: "55px 55px" }} transition={{ duration: 1.8, repeat: Infinity }}>
            <path d="M55 94c-27-12-40-28-40-55V27c17-2 29-7 40-17 11 10 23 15 40 17v12c0 27-13 43-40 55Z" fill="#FFF2DF" stroke="#E86F4A" strokeWidth="6" />
            <path d="M55 34v28" stroke="#E86F4A" strokeWidth="8" strokeLinecap="round" />
            <circle cx="55" cy="75" r="5" fill="#E86F4A" />
          </motion.g>
        )}
        {type === "privacy" && (
          <motion.g animate={float} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <rect x="22" y="35" width="66" height="50" rx="15" fill="#FFFDF8" stroke="#3B2418" strokeWidth="5" />
            <rect x="41" y="51" width="28" height="25" rx="8" fill="#E8F1DD" stroke="#7C8F4E" strokeWidth="5" />
            <path d="M46 51v-8c0-12 18-12 18 0v8" stroke="#7C8F4E" strokeWidth="5" strokeLinecap="round" fill="none" />
          </motion.g>
        )}
        {type === "related_learning" && (
          <motion.g animate={float} transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut" }}>
            <path d="M23 42c16-9 31-7 47 7v43c-16-14-31-16-47-7V42Z" fill="#E8F1DD" stroke="#7C8F4E" strokeWidth="5" />
            <path d="M70 49c15-14 30-16 47-7v43c-17-9-32-7-47 7V49Z" fill="#FFFDF8" stroke="#F28B44" strokeWidth="5" />
            <circle cx="81" cy="36" r="12" fill="#F6D77A" stroke="#3B2418" strokeWidth="4" />
          </motion.g>
        )}
      </svg>
    </div>
  );
}
