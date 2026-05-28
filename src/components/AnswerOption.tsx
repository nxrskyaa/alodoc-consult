"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnswerOption({
  label,
  selected,
  revealed,
  correct,
  onClick
}: {
  label: string;
  selected: boolean;
  revealed: boolean;
  correct: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      animate={revealed && selected && !correct ? { x: [0, -5, 5, -3, 3, 0] } : revealed && correct ? { scale: [1, 1.025, 1] } : {}}
      transition={{ duration: 0.35 }}
      whileTap={{ scale: 0.98 }}
      disabled={revealed}
      onClick={onClick}
      className={cn(
        "focus-ring flex min-h-[58px] w-full items-center gap-3 rounded-2xl border border-cocoa/10 bg-white px-4 py-3 text-left text-base font-black text-cocoa shadow-lift transition hover:-translate-y-0.5",
        selected && "border-orange bg-orange/10",
        revealed && correct && "border-olive bg-mint",
        revealed && selected && !correct && "border-orange bg-peach/40"
      )}
    >
      {selected || (revealed && correct) ? <CheckCircle2 className="h-5 w-5 text-oliveDeep" /> : <Circle className="h-5 w-5 text-cocoaSoft" />}
      {label}
    </motion.button>
  );
}
