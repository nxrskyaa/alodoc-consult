"use client";

import { ArrowRight } from "lucide-react";
import { AnswerOption } from "@/components/AnswerOption";
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
    <article className="rounded-[2rem] border border-cocoa/10 bg-parchment p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-mint px-4 py-2 text-xs font-black uppercase text-oliveDeep">
          Question {index + 1} of {total}
        </span>
        <span className="text-sm font-black text-cocoaSoft">{Math.round(((index + 1) / total) * 100)}%</span>
      </div>
      <h1 className="mt-7 text-3xl font-black leading-tight text-cocoa">{question.question[language]}</h1>
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
      {revealed && (
        <div className="mt-5 rounded-2xl bg-mint/80 p-4 text-sm font-semibold leading-6 text-cocoa">
          {question.explanation[language]}
        </div>
      )}
      <button
        disabled={selected === null}
        onClick={onNext}
        className="focus-ring mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:bg-[#dc7432] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {revealed ? (index === total - 1 ? "See Result" : "Next Question") : "Check Answer"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </article>
  );
}
