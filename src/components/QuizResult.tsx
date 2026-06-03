"use client";

import { Award, Loader2, RotateCcw, Send } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedDiseaseVisual } from "@/components/AnimatedDiseaseVisual";
import { NetworkGate } from "@/components/NetworkGate";

export function QuizResult({
  score,
  canComplete,
  canClaim,
  alreadyCompleted,
  alreadyClaimed,
  busyLabel,
  onRetry,
  onComplete,
  onClaim
}: {
  score: number;
  canComplete: boolean;
  canClaim: boolean;
  alreadyCompleted?: boolean;
  alreadyClaimed?: boolean;
  busyLabel?: string;
  onRetry: () => void;
  onComplete: () => void;
  onClaim: () => void;
}) {
  const passed = score >= 60;

  return (
    <motion.section initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 text-center shadow-soft md:p-8">
      <div className="mx-auto max-w-xs">
        <AnimatedDiseaseVisual slug={passed ? "badge" : "passport"} compact className="min-h-[210px]" />
      </div>
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mx-auto mt-5 grid h-24 w-24 place-items-center rounded-[2rem] bg-mint text-3xl font-black text-oliveDeep shadow-lift">
        {score}%
      </motion.div>
      <h1 className="mt-6 text-3xl font-black text-cocoa sm:text-4xl">{passed ? "Badge almost unlocked" : "Review and retry"}</h1>
      <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-cocoaSoft">
        {passed ? "Score is high enough to complete this learning quest on Arc Testnet. XP preview: +100 learning XP." : "A score of 60 or higher is required before onchain completion."}
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        {!passed && (
          <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={onRetry} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-black text-cream shadow-lift">
            <RotateCcw className="h-4 w-4" /> Retry Quiz
          </motion.button>
        )}
        {passed && (
          <NetworkGate compact>
            <button
              onClick={onComplete}
              disabled={!canComplete || Boolean(busyLabel)}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:bg-[#dc7432] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busyLabel === "complete" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {alreadyCompleted ? "Quest Completed" : "Complete Quest Onchain"}
            </button>
            <button
              onClick={onClaim}
              disabled={!canClaim || alreadyClaimed || Boolean(busyLabel)}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-black text-cream shadow-lift transition hover:bg-cocoa/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busyLabel === "claim" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Award className="h-4 w-4" />}
              {alreadyClaimed ? "Badge Claimed" : "Claim Badge"}
            </button>
          </NetworkGate>
        )}
      </div>
    </motion.section>
  );
}
