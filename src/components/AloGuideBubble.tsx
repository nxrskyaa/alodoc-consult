"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AloGuideBubble({ text }: { text: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-3xl bg-mint p-4 shadow-lift sm:p-5">
      <div className="flex gap-3">
        <motion.div
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-oliveDeep shadow-lift"
          animate={reduceMotion ? {} : { y: [0, -4, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
            <path d="M13 25c8-12 20-12 28 0" stroke="#788a4f" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M15 27c6 1 10 4 12 10-6 0-11-3-12-10Z" fill="#8fa261" />
            <path d="M37 27c-6 1-10 4-12 10 6 0 11-3 12-10Z" fill="#e9823c" />
            <circle cx="26" cy="17" r="4" fill="#6f4028" />
            <path d="M19 24c4 4 10 4 14 0" stroke="#6f4028" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        </motion.div>
        <div>
          <p className="text-sm font-black text-cocoa">Alo Guide</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-cocoaSoft">{text}</p>
        </div>
      </div>
    </div>
  );
}
