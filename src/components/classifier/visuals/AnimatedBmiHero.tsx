"use client";

import { motion } from "framer-motion";

export function AnimatedBmiHero() {
  return (
    <div className="relative grid h-full min-h-[320px] w-full min-w-0 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-mint via-cream to-peach/30 p-5">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-5 top-6 h-16 w-16 rounded-[1.4rem] bg-white/80 shadow-lift"
      />
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-7 right-6 h-20 w-20 rounded-full bg-orange/20"
      />
      <svg viewBox="0 0 280 280" className="relative z-10 m-auto h-full max-h-[280px] w-full max-w-[280px]" role="img" aria-label="BMI education visual">
        <motion.circle cx="140" cy="140" r="104" fill="#FFFDF8" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.45 }} />
        <motion.path
          d="M76 168c13 34 42 51 64 51s51-17 64-51"
          fill="none"
          stroke="#90A090"
          strokeWidth="14"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.path
          d="M96 122a44 44 0 0 1 88 0"
          fill="none"
          stroke="#202020"
          strokeWidth="16"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
        />
        <motion.line
          x1="140"
          y1="122"
          x2="175"
          y2="96"
          stroke="#F28A3E"
          strokeWidth="10"
          strokeLinecap="round"
          animate={{ rotate: [-6, 8, -6] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "140px 122px" }}
        />
        <circle cx="140" cy="122" r="13" fill="#90A090" />
        <motion.rect
          x="91"
          y="160"
          width="98"
          height="42"
          rx="21"
          fill="#F28A3E"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "140px 181px" }}
        />
        <text x="140" y="187" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="800">
          BMI
        </text>
        <motion.circle cx="68" cy="88" r="10" fill="#90A090" animate={{ opacity: [0.45, 1, 0.45], y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="216" cy="84" r="8" fill="#F28A3E" animate={{ opacity: [0.35, 0.8, 0.35], y: [0, 7, 0] }} transition={{ duration: 3.5, repeat: Infinity }} />
      </svg>
    </div>
  );
}
