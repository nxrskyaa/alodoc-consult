"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DiseaseSection } from "@/data/diseases";

type MiniKind = "definition" | "causes" | "transmission" | "risk" | "symptoms" | "care" | "prevention" | "red";

export function getSectionKind(section: DiseaseSection): MiniKind {
  const text = `${section.title.en} ${section.body.en}`.toLowerCase();
  if (text.includes("red") || text.includes("warning")) return "red";
  if (text.includes("spread") || text.includes("transmit")) return "transmission";
  if (text.includes("risk") || text.includes("trigger")) return "risk";
  if (text.includes("symptom")) return "symptoms";
  if (text.includes("prevent")) return "prevention";
  if (text.includes("management") || text.includes("helps") || text.includes("habits")) return "care";
  if (text.includes("cause")) return "causes";
  return "definition";
}

export function SectionMiniAnimation({ section }: { section: DiseaseSection }) {
  const kind = getSectionKind(section);
  const reduceMotion = useReducedMotion();
  const pulse = reduceMotion ? {} : { animate: { y: [0, -8, 0] }, transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } };

  return (
    <div className="grid min-h-[150px] place-items-center rounded-[1.5rem] bg-white/80 p-4 shadow-lift">
      <svg viewBox="0 0 220 150" className="h-full min-h-[130px] w-full" role="img" aria-label={`${kind} learning card animation`}>
        {kind === "definition" && (
          <motion.g {...pulse}>
            <path d="M38 42c25-14 48-12 72 8v68c-24-20-47-22-72-8V42Z" fill="#dfe8d0" stroke="#788a4f" strokeWidth="5" />
            <path d="M110 50c24-20 47-22 72-8v68c-25-14-48-12-72 8V50Z" fill="#fffaf1" stroke="#e9823c" strokeWidth="5" />
            <path d="M58 65h33M58 84h38M129 65h33M129 84h26" stroke="#6f5543" strokeWidth="5" strokeLinecap="round" />
          </motion.g>
        )}
        {kind === "causes" && (
          <>
            {[54, 94, 136, 174].map((x, i) => (
              <motion.circle key={x} cx={x} cy={62 + (i % 2) * 30} r={16 - i} fill={i % 2 ? "#f5cfaa" : "#dfe8d0"} stroke="#6f5543" strokeWidth="4" {...(reduceMotion ? {} : { animate: { y: [0, -12, 8], scale: [0.95, 1.08, 0.98] }, transition: { duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" } })} />
            ))}
          </>
        )}
        {kind === "transmission" && (
          <>
            <motion.path d="M38 105C76 20 144 132 184 46" fill="none" stroke="#788a4f" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 12" {...(reduceMotion ? {} : { animate: { strokeDashoffset: [0, -44] }, transition: { duration: 2, repeat: Infinity, ease: "linear" } })} />
            <circle cx="38" cy="105" r="14" fill="#f5cfaa" />
            <circle cx="184" cy="46" r="14" fill="#dfe8d0" />
          </>
        )}
        {kind === "risk" && (
          <motion.g {...pulse}>
            {[0, 1, 2].map((i) => (
              <rect key={i} x={55 + i * 16} y={82 - i * 24} width="94" height="24" rx="9" fill={i % 2 ? "#f5cfaa" : "#dfe8d0"} stroke="#6f5543" strokeWidth="4" />
            ))}
            <path d="M70 118h84" stroke="#788a4f" strokeWidth="7" strokeLinecap="round" />
          </motion.g>
        )}
        {kind === "symptoms" && (
          <>
            {[62, 110, 158].map((x, i) => (
              <motion.g key={x} {...(reduceMotion ? {} : { animate: { y: [0, -10, 0] }, transition: { duration: 2 + i * 0.25, repeat: Infinity, ease: "easeInOut" } })}>
                <rect x={x - 24} y={50 + i * 10} width="48" height="48" rx="18" fill={i % 2 ? "#f5cfaa" : "#dfe8d0"} stroke="#6f5543" strokeWidth="4" />
                <circle cx={x - 8} cy={70 + i * 10} r="3" fill="#382417" />
                <circle cx={x + 8} cy={70 + i * 10} r="3" fill="#382417" />
              </motion.g>
            ))}
          </>
        )}
        {kind === "care" && (
          <motion.g {...pulse}>
            <rect x="62" y="52" width="96" height="68" rx="18" fill="#fffaf1" stroke="#6f5543" strokeWidth="5" />
            <path d="M110 67v38M91 86h38" stroke="#e9823c" strokeWidth="9" strokeLinecap="round" />
            <path d="M76 52V36h68v16" stroke="#788a4f" strokeWidth="6" strokeLinecap="round" />
          </motion.g>
        )}
        {kind === "prevention" && (
          <motion.g {...pulse}>
            <path d="M110 125c-38-15-56-38-56-74V35c23-2 39-9 56-23 17 14 33 21 56 23v16c0 36-18 59-56 74Z" fill="#dfe8d0" stroke="#788a4f" strokeWidth="6" />
            <path d="M85 72l18 18 34-41" stroke="#e9823c" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </motion.g>
        )}
        {kind === "red" && (
          <motion.g {...(reduceMotion ? {} : { animate: { scale: [1, 1.04, 1] }, transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } })}>
            <rect x="54" y="35" width="112" height="86" rx="22" fill="#fff2df" stroke="#e9823c" strokeWidth="6" />
            <path d="M110 54v32" stroke="#c85f46" strokeWidth="9" strokeLinecap="round" />
            <circle cx="110" cy="101" r="6" fill="#c85f46" />
          </motion.g>
        )}
      </svg>
    </div>
  );
}
