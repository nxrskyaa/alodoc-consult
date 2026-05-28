"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Disease } from "@/data/diseases";
import { cn } from "@/lib/utils";

type VisualKind = Disease["slug"] | "passport" | "badge";

const visualTone: Record<string, { bg: string; accent: string; soft: string }> = {
  "common-cold": { bg: "#eaf5ef", accent: "#6aa3a1", soft: "#b9dedb" },
  hypertension: { bg: "#fff0e9", accent: "#c85f46", soft: "#f4b8a1" },
  "type-2-diabetes": { bg: "#eef4df", accent: "#7f9254", soft: "#d7e5b9" },
  gerd: { bg: "#fff2df", accent: "#db8841", soft: "#f5c98d" },
  "dengue-fever": { bg: "#eef6e6", accent: "#637d42", soft: "#c9ddb0" },
  passport: { bg: "#fff7e8", accent: "#788a4f", soft: "#f5cfaa" },
  badge: { bg: "#fff2df", accent: "#e9823c", soft: "#dfe8d0" }
};

export function AnimatedDiseaseVisual({
  slug,
  className,
  compact = false
}: {
  slug: VisualKind;
  className?: string;
  compact?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const tone = visualTone[slug] ?? visualTone.passport;

  return (
    <div
      className={cn(
        "relative isolate grid aspect-[1.15] min-h-[220px] overflow-hidden rounded-[2rem] border border-cocoa/10 shadow-soft",
        compact && "aspect-square min-h-0 rounded-[1.5rem] shadow-lift",
        className
      )}
      style={{ background: `radial-gradient(circle at 20% 10%, ${tone.soft}, transparent 36%), ${tone.bg}` }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.85),transparent_26%),radial-gradient(circle_at_10%_90%,rgba(255,255,255,0.65),transparent_30%)]" />
      <motion.div
        className="relative z-10 m-auto w-[86%]"
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 0.5 }}
      >
        {slug === "common-cold" && <CommonCold reduceMotion={Boolean(reduceMotion)} />}
        {slug === "hypertension" && <Hypertension reduceMotion={Boolean(reduceMotion)} />}
        {slug === "type-2-diabetes" && <Diabetes reduceMotion={Boolean(reduceMotion)} />}
        {slug === "gerd" && <Gerd reduceMotion={Boolean(reduceMotion)} />}
        {slug === "dengue-fever" && <Dengue reduceMotion={Boolean(reduceMotion)} />}
        {slug === "passport" && <PassportVisual reduceMotion={Boolean(reduceMotion)} />}
        {slug === "badge" && <BadgeVisual reduceMotion={Boolean(reduceMotion)} />}
      </motion.div>
    </div>
  );
}

function loop(reduceMotion: boolean, animate: Record<string, unknown>, duration = 3): any {
  return reduceMotion ? {} : { animate, transition: { duration, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" } };
}

function CommonCold({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full" role="img" aria-label="Animated common cold learning visual">
      <motion.g {...loop(reduceMotion, { x: [0, 12, -6], y: [0, -10, 8] }, 5)}>
        <circle cx="80" cy="72" r="27" fill="#8fc5bf" />
        <circle cx="72" cy="66" r="4" fill="#31514d" />
        <circle cx="88" cy="66" r="4" fill="#31514d" />
        <path d="M72 80c8 7 18 7 26 0" stroke="#31514d" strokeWidth="4" strokeLinecap="round" fill="none" />
        {[52, 68, 91, 109].map((x, i) => (
          <motion.circle key={x} cx={x} cy={44 + i * 9} r="5" fill="#d8efec" {...loop(reduceMotion, { scale: [0.8, 1.25], opacity: [0.45, 1] }, 2 + i * 0.2)} />
        ))}
      </motion.g>
      <motion.g {...loop(reduceMotion, { x: [0, 18], opacity: [0.35, 1] }, 2.8)}>
        <path d="M172 92c30-25 66 5 44 34 33 1 36 45 0 50h-86c-32-6-29-49 4-50-10-31 18-53 38-34Z" fill="#fff" stroke="#9bd5d0" strokeWidth="5" />
        <path d="M174 137c18-11 35-11 52 0" stroke="#6aa3a1" strokeWidth="5" strokeLinecap="round" fill="none" />
      </motion.g>
      <motion.g {...loop(reduceMotion, { rotate: [-3, 4], y: [0, -8] }, 3.2)}>
        <rect x="72" y="158" width="86" height="52" rx="16" fill="#fffaf1" stroke="#e9823c" strokeWidth="5" />
        <path d="M92 182h46" stroke="#f5cfaa" strokeWidth="7" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

function Hypertension({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full" role="img" aria-label="Animated hypertension learning visual">
      <motion.g {...loop(reduceMotion, { scale: [1, 1.05, 1], y: [0, -4, 0] }, 1.8)}>
        <path d="M160 194s-70-40-70-91c0-48 56-57 70-22 15-35 70-26 70 22 0 51-70 91-70 91Z" fill="#ef8069" stroke="#8d412e" strokeWidth="7" />
        <circle cx="140" cy="108" r="5" fill="#51281d" />
        <circle cx="180" cy="108" r="5" fill="#51281d" />
        <path d="M143 130c12 10 26 10 38 0" stroke="#51281d" strokeWidth="5" strokeLinecap="round" fill="none" />
      </motion.g>
      <motion.path d="M43 207h49l15-28 23 48 25-69 21 49h101" fill="none" stroke="#788a4f" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" {...loop(reduceMotion, { pathLength: [0.25, 1], opacity: [0.35, 1] }, 2.2)} />
      <motion.g {...loop(reduceMotion, { rotate: [-4, 4], y: [0, -5] }, 2.8)}>
        <circle cx="238" cy="70" r="36" fill="#fffaf1" stroke="#c85f46" strokeWidth="6" />
        <path d="M222 77a20 20 0 0 1 32-22" fill="none" stroke="#f5a373" strokeWidth="6" strokeLinecap="round" />
        <path d="M238 70l16-12" stroke="#382417" strokeWidth="5" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

function Diabetes({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full" role="img" aria-label="Animated type 2 diabetes learning visual">
      {[68, 238, 258, 92].map((x, i) => (
        <motion.rect key={x} x={x} y={55 + i * 35} width="30" height="30" rx="10" fill={i % 2 ? "#f5cfaa" : "#b8ce83"} {...loop(reduceMotion, { y: [0, -14, 6], rotate: [-6, 8] }, 3 + i * 0.25)} />
      ))}
      <motion.g {...loop(reduceMotion, { y: [0, -8], rotate: [-2, 2] }, 3)}>
        <circle cx="160" cy="135" r="62" fill="#fffaf1" stroke="#788a4f" strokeWidth="7" />
        <path d="M118 136c26-26 58-26 84 0" stroke="#e9823c" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M118 136c17 24 67 24 84 0" stroke="#b8ce83" strokeWidth="8" strokeLinecap="round" fill="none" />
        <circle cx="142" cy="116" r="5" fill="#382417" />
        <circle cx="178" cy="116" r="5" fill="#382417" />
      </motion.g>
      <motion.g {...loop(reduceMotion, { x: [-8, 8], rotate: [-8, 8] }, 2.4)}>
        <path d="M213 184l43-43" stroke="#6f5543" strokeWidth="10" strokeLinecap="round" />
        <circle cx="258" cy="139" r="17" fill="none" stroke="#6f5543" strokeWidth="8" />
        <path d="M224 173l14 14" stroke="#6f5543" strokeWidth="7" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

function Gerd({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full" role="img" aria-label="Animated GERD learning visual">
      <motion.path d="M155 38c20 28 14 53 8 77-5 20-1 36 22 42 31 8 57 26 46 58-12 34-74 33-113 16-41-18-62-54-45-88 13-27 45-20 50-45 5-24 3-42-8-60h40Z" fill="#fffaf1" stroke="#9c663d" strokeWidth="7" strokeLinejoin="round" {...loop(reduceMotion, { y: [0, -5, 2] }, 3.5)} />
      <motion.path d="M100 177c31 24 83 19 118-5 8 24-5 43-35 48-32 5-66-7-83-43Z" fill="#f0a35d" {...loop(reduceMotion, { d: ["M100 177c31 24 83 19 118-5 8 24-5 43-35 48-32 5-66-7-83-43Z", "M100 178c33 13 81 31 118-5 8 24-5 43-35 48-32 5-66-7-83-43Z"] }, 2.2)} />
      <circle cx="143" cy="147" r="5" fill="#382417" />
      <circle cx="181" cy="147" r="5" fill="#382417" />
      <path d="M145 165c10 7 25 7 35 0" stroke="#382417" strokeWidth="5" strokeLinecap="round" fill="none" />
      {[86, 232, 249].map((x, i) => (
        <motion.circle key={x} cx={x} cy={90 + i * 32} r={8 + i} fill="#f5cfaa" {...loop(reduceMotion, { y: [18, -18], opacity: [0.35, 1] }, 2.5 + i * 0.3)} />
      ))}
    </svg>
  );
}

function Dengue({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full" role="img" aria-label="Animated dengue awareness visual">
      <motion.g {...loop(reduceMotion, { x: [-12, 12], y: [0, -8], rotate: [-5, 5] }, 2.4)}>
        <ellipse cx="161" cy="104" rx="38" ry="23" fill="#6f5543" />
        <circle cx="204" cy="100" r="17" fill="#6f5543" />
        <path d="M127 98l-34-22M128 111l-42 6M189 91l39-27M188 116l41 19" stroke="#6f5543" strokeWidth="6" strokeLinecap="round" />
        <motion.ellipse cx="156" cy="70" rx="28" ry="12" fill="#ffffffb5" stroke="#b8ce83" strokeWidth="4" {...loop(reduceMotion, { rotate: [-10, 18] }, 0.8)} />
        <motion.ellipse cx="157" cy="138" rx="28" ry="12" fill="#ffffffb5" stroke="#b8ce83" strokeWidth="4" {...loop(reduceMotion, { rotate: [10, -18] }, 0.8)} />
      </motion.g>
      <motion.g {...loop(reduceMotion, { scale: [0.96, 1.04] }, 2)}>
        <path d="M160 213c-44-18-67-45-67-89V91c28-2 48-11 67-27 19 16 39 25 67 27v33c0 44-23 71-67 89Z" fill="#dfe8d0" stroke="#788a4f" strokeWidth="7" />
        <path d="M132 135l20 20 42-48" stroke="#637d42" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>
      <motion.path d="M62 209c20-22 36-22 56 0 20 22 38 22 58 0 20-22 38-22 58 0" stroke="#8fc5bf" strokeWidth="7" strokeLinecap="round" fill="none" {...loop(reduceMotion, { x: [-12, 12] }, 2.8)} />
    </svg>
  );
}

function PassportVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full" role="img" aria-label="Animated Alodoc passport visual">
      <motion.rect x="78" y="42" width="164" height="178" rx="32" fill="#fffaf1" stroke="#6f5543" strokeWidth="7" {...loop(reduceMotion, { y: [0, -8] }, 3)} />
      <circle cx="160" cy="96" r="31" fill="#dfe8d0" />
      <path d="M126 156h68M126 180h46" stroke="#e9823c" strokeWidth="8" strokeLinecap="round" />
      <motion.path d="M213 55l10 20 22 3-16 15 4 22-20-11-20 11 4-22-16-15 22-3 10-20Z" fill="#f5cfaa" stroke="#e9823c" strokeWidth="5" {...loop(reduceMotion, { scale: [0.92, 1.1], rotate: [-4, 6] }, 2.2)} />
    </svg>
  );
}

function BadgeVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg viewBox="0 0 320 260" className="h-full w-full" role="img" aria-label="Animated badge unlock visual">
      <motion.circle cx="160" cy="122" r="62" fill="#f5cfaa" stroke="#e9823c" strokeWidth="8" {...loop(reduceMotion, { scale: [0.95, 1.08] }, 1.8)} />
      <path d="M160 70l14 32 34 3-26 22 8 34-30-18-30 18 8-34-26-22 34-3 14-32Z" fill="#fffaf1" stroke="#6f5543" strokeWidth="6" strokeLinejoin="round" />
      <path d="M126 170l-15 52 49-25 49 25-15-52" fill="#788a4f" opacity="0.9" />
      {[64, 258, 86, 233].map((x, i) => (
        <motion.circle key={x} cx={x} cy={66 + i * 38} r="6" fill={i % 2 ? "#788a4f" : "#e9823c"} {...loop(reduceMotion, { y: [0, -18], opacity: [0.35, 1] }, 2 + i * 0.2)} />
      ))}
    </svg>
  );
}
