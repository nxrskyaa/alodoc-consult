"use client";

import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { AnswerOption } from "@/components/AnswerOption";
import { AloGuideBubble } from "@/components/AloGuideBubble";
import { Language, QuizQuestion } from "@/data/diseases";

export function QuizCard({
  question,
  language,
  index,
  total,
  selected,
  revealed,
  onSelect,
  onNext
}: {
  question: QuizQuestion;
  language: Language;
  index: number;
  total: number;
  selected: number | null;
  revealed: boolean;
  onSelect: (index: number) => void;
  onNext: () => void;
}) {
  return (
    <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-mint px-4 py-2 text-xs font-black uppercase text-oliveDeep">
          Question {index + 1} of {total}
        </span>
        <span className="text-sm font-black text-cocoaSoft">{Math.round(((index + 1) / total) * 100)}%</span>
      </div>
      <h1 className="mt-7 text-2xl font-black leading-tight text-cocoa sm:text-3xl">{question.question[language]}</h1>
      <div className="mt-6 grid gap-3">
        {question.options.map((option, optionIndex) => (
          <AnswerOption
            key={option.label.en}
            label={option.label[language]}
            selected={selected === optionIndex}
            revealed={revealed}
            correct={option.isCorrect}
            onClick={() => onSelect(optionIndex)}
          />
        ))}
      </div>
      <AnimatePresence>
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-5">
            <AloGuideBubble text={question.explanation[language]} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ y: selected === null ? 0 : -2 }}
        whileTap={{ scale: selected === null ? 1 : 0.98 }}
        disabled={selected === null}
        onClick={onNext}
        className="focus-ring mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:bg-[#dc7432] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {revealed ? (index === total - 1 ? "See Result" : "Next Question") : "Check Answer"}
        <ArrowRight className="h-4 w-4" />
      </motion.button>
    </motion.article>
  );
}
