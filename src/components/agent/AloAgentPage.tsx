"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type AgentStepKey = "signal" | "task" | "tutor" | "lifestyle" | "judge" | "proof";

type AgentStep = {
  key: AgentStepKey;
  number: string;
  title: string;
  short: string;
  detail: string;
  why: string;
  example: string;
};

const agentSteps: AgentStep[] = [
  {
    key: "signal",
    number: "01",
    title: "Signal",
    short: "Health learning context enters the flow.",
    detail: "User inputs such as classifier results or health learning context are treated as signals. Alo Agent reads them as educational starting points, not medical conclusions.",
    why: "This keeps raw numbers or learning moments from being presented as diagnosis.",
    example: "Example: a blood pressure classifier result becomes a signal for hypertension literacy."
  },
  {
    key: "task",
    number: "02",
    title: "Task",
    short: "The signal becomes a clear learning objective.",
    detail: "Alo Agent turns the signal into a structured educational objective. The task is framed around learning what a range means, what context matters, and what module to open next.",
    why: "A focused task makes the experience feel guided instead of random.",
    example: "Example: explain why repeated blood pressure measurement matters."
  },
  {
    key: "tutor",
    number: "03",
    title: "Tutor",
    short: "Simple bilingual education is prepared.",
    detail: "The Tutor layer explains the topic in friendly language. It breaks down definitions, common misconceptions, and the safest next learning concept.",
    why: "Clear tutoring helps users understand before they quiz or claim learning proof.",
    example: "Example: hypertension can be silent, so learning should not rely only on how someone feels."
  },
  {
    key: "lifestyle",
    number: "04",
    title: "Lifestyle",
    short: "Safe habits are added as education.",
    detail: "The Lifestyle layer adds practical context such as food swaps, gentle movement ideas, and habit challenges. It avoids personal treatment instructions.",
    why: "Users need useful education that still stays inside safe boundaries.",
    example: "Example: reduce very salty foods more often and learn balanced plate ideas."
  },
  {
    key: "judge",
    number: "05",
    title: "Judge",
    short: "Safety boundaries are checked.",
    detail: "The Judge layer checks that the output remains educational, non-diagnostic, and clear about when professional care matters.",
    why: "This makes the agent feel trustworthy without pretending to be a doctor.",
    example: "Example: red flags such as chest pain or severe shortness of breath stay visible."
  },
  {
    key: "proof",
    number: "06",
    title: "Proof",
    short: "Learning actions connect to progress.",
    detail: "The final layer connects the user to modules, quizzes, passport progress, and proof of learning. The proof is about education, not medical records.",
    why: "The outcome becomes a learning journey instead of a one-off answer.",
    example: "Example: open the Hypertension module, take the quiz, then build learning proof."
  }
];

const scenarioItems = [
  "Blood pressure is elevated",
  "Signal detected",
  "Educational task created",
  "Tutor explains basics",
  "Lifestyle context added",
  "Safety check applied",
  "Learning proof available"
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } }
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } }
};

export function AloAgentPage() {
  const [activeStep, setActiveStep] = useState<AgentStepKey>("signal");
  const active = agentSteps.find((step) => step.key === activeStep) ?? agentSteps[0];

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-10 overflow-x-hidden pb-8 md:pb-0">
      <AgentHero />
      <AgentPipeline activeStep={activeStep} onSelect={setActiveStep} />
      <AgentStepDetails active={active} activeStep={activeStep} onSelect={setActiveStep} />
      <AgentScenarioDemo />
      <AgentSafetyNote />
    </div>
  );
}

function AgentHero() {
  return (
    <section className="relative isolate overflow-hidden rounded-[2.5rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-8 lg:grid lg:min-h-[620px] lg:grid-cols-[minmax(0,0.98fr)_minmax(360px,0.82fr)] lg:items-center lg:gap-10">
      <div className="pointer-events-none absolute right-4 top-4 z-0 hidden h-40 w-40 rounded-full bg-mint/45 blur-3xl sm:block" />
      <div className="pointer-events-none absolute bottom-4 left-10 z-0 hidden h-36 w-36 rounded-full bg-orange/15 blur-3xl sm:block" />
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="relative z-10 min-w-0">
        <span className="inline-flex rounded-full bg-mint px-4 py-2 text-xs font-black uppercase text-oliveDeep">Alo Agent</span>
        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.04] text-cocoa sm:text-5xl lg:text-6xl">
          A visual health education pipeline.
        </h1>
        <p className="mt-5 max-w-2xl text-lg font-extrabold leading-8 text-cocoa sm:text-xl">
          Alo Agent helps transform health signals into safe educational guidance through a structured multi-step flow.
        </p>
        <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-cocoaSoft sm:text-base">
          It is not a doctor and does not provide diagnosis. It turns user input into safer learning tasks, tutoring, lifestyle guidance, evaluation, and proof of learning.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#agent-flow" className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-alertClay/90 active:scale-[0.98]">
            Explore Agent Flow <ArrowRight className="h-4 w-4" />
          </a>
          <Link href="/classifier" className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-cocoa shadow-lift transition hover:-translate-y-0.5 hover:bg-mint active:scale-[0.98]">
            Try Classifier
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.12, duration: 0.5 }}
        className="relative z-10 mt-8 min-w-0 rounded-[2.2rem] border border-cocoa/10 bg-cream/85 p-4 shadow-soft sm:p-5 lg:mt-0"
      >
        <div className="rounded-[1.8rem] bg-white p-4 shadow-lift">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase text-oliveDeep">Live structure</p>
              <h2 className="mt-1 text-2xl font-black text-cocoa">Signal to proof</h2>
            </div>
            <span className="rounded-full bg-mint px-3 py-2 text-xs font-black text-oliveDeep">Built on Rialo</span>
          </div>
          <div className="mt-5 grid gap-3">
            {agentSteps.slice(0, 4).map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22 + index * 0.06, duration: 0.35 }}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl bg-cream px-3 py-3"
              >
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-mint">
                  <AgentStepIllustration step={step.key} compact />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-cocoa">{step.title}</p>
                  <p className="truncate text-xs font-bold text-cocoaSoft">{step.short}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function AgentPipeline({ activeStep, onSelect }: { activeStep: AgentStepKey; onSelect: (step: AgentStepKey) => void }) {
  return (
    <section id="agent-flow" className="relative z-10 scroll-mt-28">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase text-oliveDeep">Agent flow</p>
          <h2 className="mt-2 text-3xl font-black leading-tight text-cocoa sm:text-4xl">Six steps, one clean learning journey.</h2>
        </div>
        <p className="max-w-md text-sm font-semibold leading-6 text-cocoaSoft">
          A structured pipeline makes the agent feel guided, safe, and useful instead of acting like a generic answer box.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="relative overflow-hidden rounded-[2.4rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-6">
        <div className="pointer-events-none absolute left-8 right-8 top-[7.25rem] hidden h-px bg-gradient-to-r from-transparent via-olive/35 to-transparent lg:block" />
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {agentSteps.map((step) => (
            <AgentStepCard key={step.key} step={step} active={activeStep === step.key} onSelect={() => onSelect(step.key)} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function AgentStepCard({ step, active, onSelect }: { step: AgentStep; active: boolean; onSelect: () => void }) {
  return (
    <motion.button
      type="button"
      variants={item}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "focus-ring group relative grid min-h-[230px] w-full min-w-0 overflow-hidden rounded-[1.8rem] border bg-white p-4 text-left shadow-lift transition",
        active ? "border-orange ring-4 ring-orange/15" : "border-cocoa/10 hover:border-olive/30"
      )}
    >
      <div className="pointer-events-none absolute inset-x-5 top-5 h-20 rounded-full bg-mint/45 opacity-0 blur-2xl transition group-hover:opacity-100" />
      <div className="relative z-10 flex items-start justify-between gap-3">
        <span className={cn("rounded-full px-3 py-1 text-xs font-black", active ? "bg-orange text-white" : "bg-cream text-cocoaSoft")}>{step.number}</span>
        {active && <CheckCircle2 className="h-5 w-5 text-orange" />}
      </div>
      <div className="relative z-10 mx-auto mt-3 grid h-24 w-24 place-items-center rounded-[1.6rem] bg-cream p-3">
        <AgentStepIllustration step={step.key} active={active} />
      </div>
      <div className="relative z-10 mt-4">
        <h3 className="text-xl font-black text-cocoa">{step.title}</h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">{step.short}</p>
      </div>
    </motion.button>
  );
}

function AgentStepDetails({ active, activeStep, onSelect }: { active: AgentStep; activeStep: AgentStepKey; onSelect: (step: AgentStepKey) => void }) {
  return (
    <section className="relative z-10 grid gap-5 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start">
      <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-5">
        <p className="px-1 text-sm font-black uppercase text-oliveDeep">Step explorer</p>
        <div className="mt-4 grid gap-2">
          {agentSteps.map((step) => (
            <button
              key={step.key}
              type="button"
              onClick={() => onSelect(step.key)}
              className={cn(
                "focus-ring flex min-w-0 items-center gap-3 rounded-2xl px-4 py-3 text-left transition",
                activeStep === step.key ? "bg-mint text-cocoa shadow-lift" : "bg-white text-cocoaSoft hover:bg-cream"
              )}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-xs font-black text-oliveDeep">{step.number}</span>
              <span className="min-w-0">
                <span className="block font-black">{step.title}</span>
                <span className="block truncate text-xs font-bold opacity-80">{step.short}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <motion.article
        key={active.key}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-7"
      >
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-mint/40 blur-3xl" />
        <div className="relative z-10 grid gap-6 md:grid-cols-[auto_minmax(0,1fr)] md:items-start">
          <div className="mx-auto grid h-40 w-40 place-items-center rounded-[2rem] bg-white p-5 shadow-lift md:mx-0">
            <AgentStepIllustration step={active.key} active large />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black uppercase text-oliveDeep">{active.number} / {active.title}</p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-cocoa">{active.title} layer</h2>
            <p className="mt-4 text-base font-semibold leading-8 text-cocoaSoft">{active.detail}</p>
          </div>
        </div>
        <div className="relative z-10 mt-6 grid gap-4 md:grid-cols-2">
          <InfoCard title="Why it matters" text={active.why} />
          <InfoCard title="Example educational output" text={active.example} />
        </div>
      </motion.article>
    </section>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-4 shadow-lift">
      <p className="text-xs font-black uppercase text-oliveDeep">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">{text}</p>
    </div>
  );
}

function AgentScenarioDemo() {
  return (
    <section className="relative z-10 overflow-hidden rounded-[2.4rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase text-oliveDeep">How Alo Agent works</p>
          <h2 className="mt-2 text-3xl font-black leading-tight text-cocoa sm:text-4xl">A simple example flow.</h2>
        </div>
        <p className="max-w-lg text-sm font-semibold leading-6 text-cocoaSoft">
          This is a visual example only. It does not store medical data and does not provide diagnosis.
        </p>
      </div>
      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-7 grid gap-3">
        {scenarioItems.map((text, index) => (
          <motion.div key={text} variants={item} className="grid min-w-0 gap-3 rounded-[1.5rem] bg-white p-4 shadow-lift sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <span className={cn("grid h-10 w-10 place-items-center rounded-full text-sm font-black", index === 0 ? "bg-orange text-white" : "bg-mint text-oliveDeep")}>{index + 1}</span>
            <div className="min-w-0">
              <p className="font-black text-cocoa">{text}</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-cocoaSoft">{scenarioCopy(index)}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function scenarioCopy(index: number) {
  const copy = [
    "The classifier gives an educational signal, not a diagnosis.",
    "Alo Agent recognizes the signal as a learning context.",
    "The signal becomes a safer educational objective.",
    "The Tutor layer explains hypertension basics in simple language.",
    "The Lifestyle layer adds salt, movement, and habit context.",
    "The Judge layer keeps red flags and safety boundaries visible.",
    "The user can continue to modules, quiz, passport, and proof of learning."
  ];
  return copy[index] ?? copy[0];
}

function AgentSafetyNote() {
  return (
    <section className="relative z-10 rounded-[2rem] border border-orange/20 bg-orange/10 p-5 shadow-lift sm:p-8">
      <div className="grid gap-5 md:grid-cols-[auto_minmax(0,1fr)] md:items-center">
        <div className="grid h-16 w-16 place-items-center rounded-[1.5rem] bg-white text-orange shadow-lift">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <div className="min-w-0">
          <h2 className="text-2xl font-black text-cocoa">Education only, always.</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">
            Alo Agent is not a doctor and does not provide diagnosis, treatment, or emergency medical advice. It is designed for education only.
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">
            Alo Agent bukan dokter dan tidak memberikan diagnosis, pengobatan, atau saran medis darurat. Fitur ini dirancang hanya untuk edukasi.
          </p>
        </div>
      </div>
    </section>
  );
}

function AgentStepIllustration({ step, active = false, compact = false, large = false }: { step: AgentStepKey; active?: boolean; compact?: boolean; large?: boolean }) {
  const size = compact ? "h-8 w-8" : large ? "h-28 w-28" : "h-20 w-20";
  const pulse = active ? { scale: [1, 1.035, 1], y: [0, -3, 0] } : { y: [0, -2, 0] };

  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={cn(size, "overflow-visible")}
      aria-hidden="true"
      animate={pulse}
      transition={{ duration: active ? 2.1 : 3.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <circle cx="60" cy="60" r="48" fill="#FFFDF8" stroke="#90A090" strokeWidth="5" />
      {step === "signal" && <SignalGlyph active={active} />}
      {step === "task" && <TaskGlyph active={active} />}
      {step === "tutor" && <TutorGlyph active={active} />}
      {step === "lifestyle" && <LifestyleGlyph active={active} />}
      {step === "judge" && <JudgeGlyph active={active} />}
      {step === "proof" && <ProofGlyph active={active} />}
    </motion.svg>
  );
}

function SignalGlyph({ active }: { active: boolean }) {
  return (
    <g>
      <path d="M29 63h18l7-17 13 33 9-23h15" fill="none" stroke="#202020" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <motion.circle cx="47" cy="63" r="6" fill="#F28A3E" animate={active ? { opacity: [0.4, 1, 0.4] } : undefined} transition={{ duration: 1.5, repeat: Infinity }} />
      <circle cx="84" cy="56" r="5" fill="#90A090" />
    </g>
  );
}

function TaskGlyph({ active }: { active: boolean }) {
  return (
    <g>
      <rect x="34" y="32" width="52" height="60" rx="15" fill="#DFE8D0" stroke="#202020" strokeWidth="5" />
      <path d="M47 51h27M47 65h21M47 79h28" stroke="#90A090" strokeWidth="5" strokeLinecap="round" />
      <motion.path d="M77 35l7 7 12-16" fill="none" stroke="#F28A3E" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" animate={active ? { pathLength: [0, 1] } : { pathLength: 1 }} transition={{ duration: 1, repeat: active ? Infinity : 0, repeatDelay: 1.2 }} />
    </g>
  );
}

function TutorGlyph({ active }: { active: boolean }) {
  return (
    <g>
      <path d="M34 78c17-13 35-13 52 0" fill="none" stroke="#F28A3E" strokeWidth="6" strokeLinecap="round" />
      <path d="M34 76V43c15-9 31-9 47 0v33c-16-9-32-9-47 0Z" fill="#FFFDF8" stroke="#202020" strokeWidth="5" strokeLinejoin="round" />
      <path d="M81 43c8-5 14-5 20-1v33c-6-4-12-4-20 1" fill="#DFE8D0" stroke="#202020" strokeWidth="5" strokeLinejoin="round" />
      <motion.circle cx="58" cy="58" r="4" fill="#90A090" animate={active ? { y: [0, -5, 0] } : undefined} transition={{ duration: 1.6, repeat: Infinity }} />
    </g>
  );
}

function LifestyleGlyph({ active }: { active: boolean }) {
  return (
    <g>
      <path d="M36 77c15-24 38-25 52 0" fill="none" stroke="#202020" strokeWidth="6" strokeLinecap="round" />
      <motion.path d="M58 74c7-23 22-36 42-35-2 23-18 38-42 35Z" fill="#90A090" animate={active ? { rotate: [-2, 3, -2] } : undefined} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: "75px 60px" }} />
      <path d="M30 84h61" stroke="#F28A3E" strokeWidth="6" strokeLinecap="round" />
      <circle cx="47" cy="54" r="8" fill="#F5CFAA" />
    </g>
  );
}

function JudgeGlyph({ active }: { active: boolean }) {
  return (
    <g>
      <path d="M60 93c-23-10-36-25-36-47V34c15-1 27-6 36-15 9 9 21 14 36 15v12c0 22-13 37-36 47Z" fill="#DFE8D0" stroke="#202020" strokeWidth="5" strokeLinejoin="round" />
      <motion.path d="M43 59l12 12 24-29" fill="none" stroke="#F28A3E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" animate={active ? { pathLength: [0, 1] } : { pathLength: 1 }} transition={{ duration: 1.1, repeat: active ? Infinity : 0, repeatDelay: 1.2 }} />
    </g>
  );
}

function ProofGlyph({ active }: { active: boolean }) {
  return (
    <g>
      <motion.circle cx="60" cy="52" r="25" fill="#F5CFAA" stroke="#F28A3E" strokeWidth="5" animate={active ? { scale: [1, 1.06, 1] } : undefined} transition={{ duration: 1.8, repeat: Infinity }} style={{ transformOrigin: "60px 52px" }} />
      <path d="M60 28l6 13 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2 6-13Z" fill="#FFFDF8" stroke="#202020" strokeWidth="4" strokeLinejoin="round" />
      <path d="M41 73l-8 27 27-15 27 15-8-27" fill="#90A090" opacity="0.95" />
    </g>
  );
}
