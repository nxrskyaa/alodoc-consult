"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  size?: "sm" | "md" | "lg";
  intensity?: "calm" | "active";
  resultState?: "normal" | "attention" | "moderate" | "high" | "crisis";
};

const sizeClass = {
  sm: "min-h-[180px]",
  md: "min-h-[260px]",
  lg: "min-h-[340px]"
};

export function AnimatedBloodPressureHero({ size = "md", intensity = "calm", resultState = "normal" }: Props) {
  const reduceMotion = useReducedMotion();
  const pulseColor = resultState === "crisis" || resultState === "high" ? "#E86F4A" : resultState === "moderate" ? "#F28B44" : "#7C8F4E";
  const float = reduceMotion ? {} : { y: intensity === "active" ? [0, -12, 0] : [0, -7, 0] };

  return (
    <div className={`relative isolate overflow-hidden rounded-[2rem] bg-[#FFFDF8] ${sizeClass[size]}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,#E8F1DD,transparent_34%),radial-gradient(circle_at_85%_80%,#F6D77A55,transparent_32%)]" />
      <svg viewBox="0 0 360 280" className="relative z-10 h-full w-full" role="img" aria-label="Animated blood pressure education visual">
        <motion.g animate={float} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <path d="M180 197s-67-39-67-88c0-47 52-55 67-23 15-32 67-24 67 23 0 49-67 88-67 88Z" fill="#F28B44" stroke="#3B2418" strokeWidth="7" />
          <circle cx="160" cy="116" r="5" fill="#3B2418" />
          <circle cx="200" cy="116" r="5" fill="#3B2418" />
          <path d="M162 139c12 10 25 10 37 0" stroke="#3B2418" strokeWidth="5" strokeLinecap="round" fill="none" />
        </motion.g>
        <motion.path d="M44 222h58l14-28 24 49 28-74 24 53h124" fill="none" stroke={pulseColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0.15 }} animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0.15, 1, 0.15] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />
        <motion.g animate={reduceMotion ? {} : { rotate: [-3, 5, -3] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}>
          <circle cx="264" cy="83" r="42" fill="#F8F3EA" stroke="#7C8F4E" strokeWidth="7" />
          <path d="M240 91a27 27 0 0 1 45-28" fill="none" stroke="#F28B44" strokeWidth="7" strokeLinecap="round" />
          <motion.path d="M264 83l19-13" stroke="#3B2418" strokeWidth="5" strokeLinecap="round" animate={reduceMotion ? {} : { rotate: [-8, 12, -8] }} style={{ transformOrigin: "264px 83px" }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.g>
        {[72, 304, 88, 292].map((x, i) => (
          <motion.circle key={x} cx={x} cy={68 + i * 38} r="7" fill={i % 2 ? "#F6D77A" : "#E8F1DD"} animate={reduceMotion ? {} : { y: [0, -12, 0], opacity: [0.55, 1, 0.55] }} transition={{ duration: 2.4 + i * 0.25, repeat: Infinity, ease: "easeInOut" }} />
        ))}
      </svg>
    </div>
  );
}
