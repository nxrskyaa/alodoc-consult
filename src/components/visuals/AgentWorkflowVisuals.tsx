"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function repeat(reduceMotion: boolean | null, animate: Record<string, unknown>, duration = 3): any {
  return reduceMotion ? {} : { animate, transition: { duration, repeat: Infinity, ease: "easeInOut" as const } };
}

export function AnimatedHealthParticles({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <motion.span
          key={index}
          className={cn("absolute rounded-full", index % 2 ? "bg-orange/20" : "bg-olive/20")}
          style={{
            left: `${12 + index * 15}%`,
            top: `${18 + ((index * 19) % 58)}%`,
            width: `${10 + (index % 3) * 5}px`,
            height: `${10 + (index % 3) * 5}px`
          }}
          {...repeat(reduceMotion, { y: [0, -12, 0], opacity: [0.35, 0.85, 0.35], scale: [0.94, 1.08, 0.94] }, 3 + index * 0.25)}
        />
      ))}
    </div>
  );
}

export function AnimatedPulseLine({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <svg viewBox="0 0 220 64" className={cn("h-16 w-full", className)} aria-hidden="true">
      <path d="M10 34h38l12-20 22 42 22-52 20 30h86" fill="none" stroke="#90A090" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.24" />
      <motion.path
        d="M10 34h38l12-20 22 42 22-52 20 30h86"
        fill="none"
        stroke="#F28A3E"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0, 1, 1], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.1, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function AnimatedGlucoseDots({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className={cn("relative h-28 w-full overflow-hidden", className)}>
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.span
          key={index}
          className={cn("absolute h-8 w-8 rounded-xl shadow-lift", index % 2 ? "bg-orange/30" : "bg-mint")}
          style={{ left: `${10 + index * 18}%`, top: `${20 + (index % 2) * 34}%` }}
          {...repeat(reduceMotion, { y: [0, -14, 0], rotate: [-6, 8, -6] }, 2.8 + index * 0.18)}
        />
      ))}
    </div>
  );
}

export function AnimatedBMIRing({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <svg viewBox="0 0 180 180" className={cn("h-44 w-44", className)} aria-hidden="true">
      <circle cx="90" cy="90" r="66" fill="#FFFDF8" stroke="#EFE6DA" strokeWidth="12" />
      <motion.circle
        cx="90"
        cy="90"
        r="66"
        fill="none"
        stroke="#90A090"
        strokeWidth="12"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
        initial={{ strokeDashoffset: 1 }}
        animate={reduceMotion ? { strokeDashoffset: 0.2 } : { strokeDashoffset: [1, 0.22, 0.28, 0.22] }}
        transition={{ duration: 2.4, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
        transform="rotate(-90 90 90)"
      />
      <motion.path
        d="M54 100c12 24 31 36 36 36s24-12 36-36"
        fill="none"
        stroke="#202020"
        strokeWidth="9"
        strokeLinecap="round"
        {...repeat(reduceMotion, { y: [0, -4, 0] }, 2.5)}
      />
      <path d="M64 78a26 26 0 0 1 52 0" fill="none" stroke="#F28A3E" strokeWidth="9" strokeLinecap="round" />
      <circle cx="90" cy="78" r="9" fill="#90A090" />
    </svg>
  );
}

export function AnimatedAloAgentOrb({
  active = false,
  mood = "idle",
  compact = false,
  className
}: {
  active?: boolean;
  mood?: "idle" | "thinking" | "explaining" | "success" | "caution" | "happy";
  compact?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const moodActive = active || mood !== "idle";
  const happyMood = mood === "happy" || mood === "success";
  const cautionMood = mood === "caution";
  const accent = cautionMood ? "#F28A3E" : "#90A090";
  return (
    <div className={cn("relative isolate grid place-items-center overflow-visible rounded-[2rem]", compact ? "min-h-[104px]" : "min-h-[280px]", className)}>
      <AnimatedHealthParticles />
      <motion.svg
        viewBox="0 0 260 260"
        className={cn("relative z-10 h-full w-full", compact ? "max-h-[116px] max-w-[116px]" : "max-h-[300px] max-w-[300px]")}
        role="img"
        aria-label="Animated Alo Agent education orb"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={reduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: happyMood ? [1, 1.04, 1] : 1, y: moodActive ? [0, -7, 0] : [0, -3, 0] }}
        transition={{ duration: happyMood ? 1.2 : 2.8, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
      >
        <motion.circle
          cx="130"
          cy="130"
          r="86"
          fill="#FFFDF8"
          stroke={accent}
          strokeWidth="9"
          animate={reduceMotion ? undefined : { scale: moodActive ? [1, 1.04, 1] : [1, 1.02, 1] }}
          transition={{ duration: moodActive ? 1.6 : 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "130px 130px" }}
        />
        <motion.path d="M87 128c18-28 66-28 86 0" fill="none" stroke="#202020" strokeWidth="16" strokeLinecap="round" {...repeat(reduceMotion, { y: [0, -4, 0] }, 3)} />
        <motion.path d="M72 160c25 42 91 42 116 0" fill="none" stroke={accent} strokeWidth="12" strokeLinecap="round" {...repeat(reduceMotion, { pathLength: [0.75, 1, 0.75] }, 2.6)} />
        <motion.path d="M108 67c10-22 34-22 44 0 9-12 31-7 31 12 0 24-31 40-53 57-22-17-53-33-53-57 0-19 22-24 31-12Z" fill="#90A090" {...repeat(reduceMotion, { y: [0, -7, 0], scale: [1, 1.04, 1] }, 2.7)} style={{ transformOrigin: "130px 90px" }} />
        <motion.ellipse cx="110" cy="125" rx="5" ry="5" fill="#202020" animate={reduceMotion ? undefined : { scaleY: [1, 1, 0.12, 1] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "110px 125px" }} />
        <motion.ellipse cx="150" cy="125" rx="5" ry="5" fill="#202020" animate={reduceMotion ? undefined : { scaleY: [1, 1, 0.12, 1] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "150px 125px" }} />
        <circle cx="96" cy="138" r="7" fill="#F5CFAA" opacity="0.8" />
        <circle cx="164" cy="138" r="7" fill="#F5CFAA" opacity="0.8" />
        <path d={happyMood ? "M108 143c14 17 30 17 44 0" : cautionMood ? "M112 148c12-8 25-8 37 0" : "M113 145c12 10 25 10 37 0"} fill="none" stroke="#202020" strokeWidth="6" strokeLinecap="round" />
        <motion.rect x="96" y="174" width="68" height="36" rx="18" fill="#F28A3E" {...repeat(reduceMotion, { y: [0, 5, 0] }, 3.2)} />
        {(mood === "thinking" || mood === "explaining") && (
          <g>
            {[90, 112, 134].map((x, index) => (
              <motion.circle key={x} cx={x} cy="220" r="5" fill={index === 1 ? "#F28A3E" : "#90A090"} {...repeat(reduceMotion, { y: [0, -8, 0], opacity: [0.35, 1, 0.35] }, 1.1 + index * 0.1)} />
            ))}
          </g>
        )}
        {happyMood && <path d="M184 54l7 14 15 2-11 10 3 15-14-8-14 8 3-15-11-10 15-2 7-14Z" fill="#F28A3E" opacity="0.82" />}
        {cautionMood && <path d="M188 52l22 42h-44l22-42Z" fill="#F5CFAA" stroke="#F28A3E" strokeWidth="5" strokeLinejoin="round" />}
      </motion.svg>
    </div>
  );
}

function AgentShell({ children, active, tone = "olive" }: { children: ReactNode; active?: boolean; tone?: "olive" | "orange" | "cocoa" }) {
  const reduceMotion = useReducedMotion();
  const stroke = tone === "orange" ? "#F28A3E" : tone === "cocoa" ? "#202020" : "#90A090";
  return (
    <motion.svg
      viewBox="0 0 170 170"
      className="h-32 w-32"
      initial={{ opacity: 0, y: 10, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      animate={reduceMotion ? undefined : { y: active ? [0, -7, 0] : [0, -3, 0] }}
      transition={{ duration: active ? 1.6 : 3, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <rect x="20" y="24" width="130" height="122" rx="34" fill="#FFFDF8" stroke={stroke} strokeWidth="7" />
      <circle cx="66" cy="74" r="6" fill="#202020" />
      <circle cx="104" cy="74" r="6" fill="#202020" />
      <path d="M66 98c13 10 25 10 38 0" fill="none" stroke="#202020" strokeWidth="6" strokeLinecap="round" />
      {children}
    </motion.svg>
  );
}

export function AnimatedTutorAgent({ active = false }: { active?: boolean }) {
  return (
    <AgentShell active={active}>
      <path d="M50 123h70" stroke="#F28A3E" strokeWidth="8" strokeLinecap="round" />
      <path d="M58 119c13-11 28-11 42 0 6-7 14-9 25-8" fill="none" stroke="#90A090" strokeWidth="6" strokeLinecap="round" />
    </AgentShell>
  );
}

export function AnimatedQuizAgent({ active = false }: { active?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <AgentShell active={active} tone="orange">
      {[58, 84, 110].map((x, index) => (
        <motion.circle key={x} cx={x} cy="120" r="7" fill={index === 1 ? "#F28A3E" : "#90A090"} {...repeat(reduceMotion, { y: [0, -8, 0], opacity: [0.45, 1, 0.45] }, 1.2 + index * 0.1)} />
      ))}
    </AgentShell>
  );
}

export function AnimatedLifestyleAgent({ active = false }: { active?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <AgentShell active={active} tone="olive">
      <motion.path d="M54 122c18-25 44-24 58 0" fill="none" stroke="#90A090" strokeWidth="7" strokeLinecap="round" {...repeat(reduceMotion, { y: [0, -5, 0] }, 2.6)} />
      <path d="M101 119c12-18 24-24 41-22-3 20-16 33-41 34" fill="#F28A3E" opacity="0.82" />
      <path d="M54 130h76" stroke="#202020" strokeWidth="6" strokeLinecap="round" opacity="0.78" />
    </AgentShell>
  );
}

export function AnimatedJudgeAgent({ active = false }: { active?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <AgentShell active={active} tone="cocoa">
      <motion.circle cx="85" cy="121" r="24" fill="none" stroke="#90A090" strokeWidth="7" initial={{ pathLength: 0 }} animate={reduceMotion ? { pathLength: 1 } : { pathLength: active ? [0, 1] : 1 }} transition={{ duration: 0.8, repeat: active && !reduceMotion ? Infinity : 0, repeatDelay: 1.4 }} />
      <path d="M73 121l9 9 18-22" fill="none" stroke="#F28A3E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </AgentShell>
  );
}

export function AnimatedLearningBadge({ active = false }: { active?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 170 170"
      className="h-32 w-32"
      initial={{ opacity: 0, scale: 0.84 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      animate={reduceMotion ? undefined : { scale: active ? [1, 1.08, 1] : [1, 1.03, 1] }}
      transition={{ duration: active ? 1.2 : 2.8, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <circle cx="85" cy="76" r="48" fill="#F5CFAA" stroke="#F28A3E" strokeWidth="8" />
      <path d="M85 39l11 23 25 3-18 17 5 25-23-13-23 13 5-25-18-17 25-3 11-23Z" fill="#FFFDF8" stroke="#202020" strokeWidth="6" strokeLinejoin="round" />
      <path d="M58 113l-12 40 39-22 39 22-12-40" fill="#90A090" opacity="0.95" />
    </motion.svg>
  );
}

export function AnimatedScalePipeline({ activeStep = -1, compact = false, className }: { activeStep?: number; compact?: boolean; className?: string }) {
  const items = [
    { title: "Signal", visual: <AnimatedQuizAgent active={activeStep === 0} /> },
    { title: "Task", visual: <AnimatedAloAgentOrb compact mood={activeStep === 1 ? "thinking" : "idle"} /> },
    { title: "Tutor", visual: <AnimatedTutorAgent active={activeStep === 2} /> },
    { title: "Lifestyle", visual: <AnimatedLifestyleAgent active={activeStep === 3} /> },
    { title: "Judge", visual: <AnimatedJudgeAgent active={activeStep === 4} /> },
    { title: "Proof", visual: <AnimatedLearningBadge active={activeStep === 5} /> }
  ];

  return (
    <div className={cn("relative isolate w-full max-w-full overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft", compact ? "p-3" : "sm:p-6", className)}>
      <AnimatedHealthParticles />
      <div className={cn("relative z-10 grid min-w-0 gap-3", compact ? "grid-cols-1 min-[430px]:grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6")}>
        {items.map((item, index) => {
          const active = activeStep === index;
          const done = activeStep > index;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className={cn("grid min-w-0 place-items-center overflow-hidden rounded-[1.5rem] border bg-white/88 text-center shadow-lift transition", compact ? "min-h-[104px] p-2" : "p-3", active && "border-orange ring-4 ring-orange/15", done && "border-olive/40 bg-mint/35")}
            >
              <div className={cn("grid place-items-center overflow-visible", compact ? "h-20 w-20 scale-[0.62]" : "h-32 w-32")}>{item.visual}</div>
              <p className="mt-1 text-xs font-black uppercase text-cocoaSoft">{item.title}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
