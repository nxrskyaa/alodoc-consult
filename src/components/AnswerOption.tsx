"use client";

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
    <button
      disabled={revealed}
      onClick={onClick}
      className={cn(
        "focus-ring flex w-full items-center gap-3 rounded-2xl border border-cocoa/10 bg-white px-4 py-3 text-left text-sm font-black text-cocoa shadow-lift transition hover:-translate-y-0.5",
        selected && "border-orange bg-orange/10",
        revealed && correct && "border-olive bg-mint",
        revealed && selected && !correct && "border-orange bg-peach/40"
      )}
    >
      {selected || (revealed && correct) ? <CheckCircle2 className="h-5 w-5 text-oliveDeep" /> : <Circle className="h-5 w-5 text-cocoaSoft" />}
      {label}
    </button>
  );
}
