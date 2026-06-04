"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, BrainCircuit, CheckCircle2, Lightbulb, ListChecks, Play, Route, ShieldCheck, Sparkles } from "lucide-react";
import { useAccount } from "wagmi";
import { AgentVisual } from "@/components/visuals/AgentVisual";
import { AnimatedAloAgentOrb, AnimatedJudgeAgent, AnimatedLearningBadge, AnimatedQuizAgent, AnimatedScalePipeline, AnimatedTutorAgent } from "@/components/visuals/AgentWorkflowVisuals";
import { ClassifierVisual } from "@/components/visuals/ClassifierVisual";
import { DiseaseVisual } from "@/components/visuals/DiseaseVisual";
import { diseases, type Language } from "@/data/diseases";
import { cn } from "@/lib/utils";

type TaskType = "module" | "classifier" | "quiz" | "next";
type TopicKey = "common-cold" | "hypertension" | "type-2-diabetes" | "gerd" | "dengue-fever" | "blood-pressure" | "blood-sugar" | "bmi";
type Tone = "simple" | "summary" | "memory" | "steps";
type RunState = "idle" | "running" | "done";

const copy = {
  id: {
    eyebrow: "Offchain MVP",
    title: "Alo Agent",
    subtitle: "Workspace agent edukasi kesehatan yang terinspirasi SCALE.",
    description: "Buat learning task, jalankan pipeline agent simulasi, lalu dapatkan penjelasan edukatif yang aman. Alo Agent bukan dokter dan tidak memberikan diagnosis.",
    composer: "Create an Education Task",
    taskType: "Task Type",
    topic: "Topic",
    tone: "Tone",
    language: "Language",
    run: "Run Alo Agent",
    running: "Alo Agent berjalan",
    output: "Agent Output",
    idle: "Pilih task lalu jalankan Alo Agent untuk melihat output.",
    safetyTitle: "Edukasi saja, bukan diagnosis",
    safety: "Alo Agent hanya untuk edukasi umum. Alo Agent tidak memberikan diagnosis, keputusan pengobatan, atau saran medis darurat. Jika gejala berat, menetap, atau mengkhawatirkan, segera konsultasikan dengan tenaga kesehatan profesional.",
    scaleTitle: "SCALE-inspired education workflow",
    scaleCopy: "Alo Agent saat ini masih disimulasikan secara offchain. Di versi Rialo/SCALE nanti, setiap learning task bisa menjadi workflow agent: Tutor Agent menjelaskan, Quiz Agent menguji pemahaman, Judge Agent memvalidasi kualitas, lalu proof of learning dapat terbuka setelah selesai.",
    future: "Future mapping: learning task -> tutor explanation -> quiz check -> judge validation -> badge proof.",
    connected: "Wallet terhubung: setelah belajar, gunakan Passport untuk melihat progress pembelajaran.",
    disconnected: "Wallet belum terhubung: kamu tetap bisa mencoba Alo Agent tanpa menyimpan data."
  },
  en: {
    eyebrow: "Offchain MVP",
    title: "Alo Agent",
    subtitle: "A SCALE-inspired health education agent workspace.",
    description: "Create a learning task, run a simulated agent pipeline, and receive safe educational output. Alo Agent is not a doctor and does not provide diagnosis.",
    composer: "Create an Education Task",
    taskType: "Task Type",
    topic: "Topic",
    tone: "Tone",
    language: "Language",
    run: "Run Alo Agent",
    running: "Alo Agent is running",
    output: "Agent Output",
    idle: "Choose a task and run Alo Agent to see the output.",
    safetyTitle: "Education only, not diagnosis",
    safety: "Alo Agent is for educational purposes only. It does not provide diagnosis, treatment decisions, or emergency medical advice. If symptoms are severe, persistent, or concerning, consult a qualified healthcare professional.",
    scaleTitle: "SCALE-inspired education workflow",
    scaleCopy: "Alo Agent is currently simulated offchain. In a future Rialo/SCALE version, each learning task can become an agent workflow: a Tutor Agent explains, a Quiz Agent checks understanding, a Judge Agent validates quality, and proof of learning can be unlocked after completion.",
    future: "Future mapping: learning task -> tutor explanation -> quiz check -> judge validation -> badge proof.",
    connected: "Wallet connected: after learning, use Passport to view your learning progress.",
    disconnected: "Wallet disconnected: you can still try Alo Agent without storing data."
  }
};

const taskTypes = [
  { value: "module", label: { id: "Explain a disease module", en: "Explain a disease module" } },
  { value: "classifier", label: { id: "Explain a classifier result", en: "Explain a classifier result" } },
  { value: "quiz", label: { id: "Coach my quiz mistake", en: "Coach my quiz mistake" } },
  { value: "next", label: { id: "Recommend my next lesson", en: "Recommend my next lesson" } }
] as const;

const topics = [
  { value: "common-cold", label: { id: "Common Cold", en: "Common Cold" }, href: "/disease/common-cold" },
  { value: "hypertension", label: { id: "Hypertension", en: "Hypertension" }, href: "/disease/hypertension" },
  { value: "type-2-diabetes", label: { id: "Type 2 Diabetes", en: "Type 2 Diabetes" }, href: "/disease/type-2-diabetes" },
  { value: "gerd", label: { id: "GERD", en: "GERD" }, href: "/disease/gerd" },
  { value: "dengue-fever", label: { id: "Dengue Fever", en: "Dengue Fever" }, href: "/disease/dengue-fever" },
  { value: "blood-pressure", label: { id: "Blood Pressure Result", en: "Blood Pressure Result" }, href: "/disease/hypertension" },
  { value: "blood-sugar", label: { id: "Blood Sugar Result", en: "Blood Sugar Result" }, href: "/disease/type-2-diabetes" },
  { value: "bmi", label: { id: "BMI Result", en: "BMI Result" }, href: "/classifier" }
] as const;

const tones = [
  { value: "simple", label: { id: "Simple", en: "Simple" } },
  { value: "summary", label: { id: "Short Summary", en: "Short Summary" } },
  { value: "memory", label: { id: "Memory Trick", en: "Memory Trick" } },
  { value: "steps", label: { id: "Step-by-step", en: "Step-by-step" } }
] as const;

const pipeline = [
  { title: { id: "Tutor Agent membaca task", en: "Tutor Agent reading task" }, detail: { id: "Mengambil konteks edukasi.", en: "Pulling education context." } },
  { title: { id: "Quiz Agent menyiapkan cek belajar", en: "Quiz Agent preparing learning check" }, detail: { id: "Mencari konsep yang sering keliru.", en: "Finding commonly missed concepts." } },
  { title: { id: "Judge Agent memvalidasi pemahaman", en: "Judge Agent validating understanding" }, detail: { id: "Memastikan aman dan bukan diagnosis.", en: "Checking safety and non-diagnosis framing." } },
  { title: { id: "Rekomendasi belajar siap", en: "Learning recommendation ready" }, detail: { id: "Mengarahkan ke modul berikutnya.", en: "Routing to the next lesson." } }
];

const learningPath: TopicKey[] = ["common-cold", "dengue-fever", "hypertension", "type-2-diabetes", "gerd"];

export function AloAgentPage() {
  const { isConnected } = useAccount();
  const [taskType, setTaskType] = useState<TaskType>("module");
  const [topic, setTopic] = useState<TopicKey>("hypertension");
  const [tone, setTone] = useState<Tone>("simple");
  const [language, setLanguage] = useState<Language>("en");
  const [runState, setRunState] = useState<RunState>("idle");
  const [activeStep, setActiveStep] = useState(-1);
  const timers = useRef<number[]>([]);
  const t = copy[language];

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  function resetForChange<T>(setter: (value: T) => void, value: T) {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setter(value);
    setRunState("idle");
    setActiveStep(-1);
  }

  function runAgent() {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setRunState("running");
    setActiveStep(-1);
    pipeline.forEach((_, index) => {
      timers.current.push(window.setTimeout(() => setActiveStep(index), 220 + index * 330));
    });
    timers.current.push(window.setTimeout(() => setRunState("done"), 1680));
  }

  const output = useMemo(() => buildOutput({ taskType, topic, tone, language, isConnected }), [taskType, topic, tone, language, isConnected]);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 overflow-x-hidden">
      <section className="alodoc-surface grid gap-8 overflow-visible rounded-[2.5rem] border border-cocoa/10 p-5 shadow-soft sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.82fr)] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <span className="inline-flex rounded-full bg-mint px-4 py-2 text-xs font-black uppercase text-oliveDeep">{t.eyebrow}</span>
          <h1 className="mt-5 text-4xl font-black leading-tight text-cocoa sm:text-5xl lg:text-6xl">{t.title}</h1>
          <p className="mt-4 text-xl font-extrabold leading-8 text-cocoa">{t.subtitle}</p>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-cocoaSoft">{t.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Offchain MVP", "SCALE-inspired", "Education only"].map((pill) => (
              <span key={pill} className="rounded-full bg-white px-4 py-2 text-xs font-black text-cocoaSoft shadow-lift">{pill}</span>
            ))}
          </div>
          <a href="#task-composer" className="focus-ring mt-6 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-alertClay/90 active:scale-[0.98]">
            {t.run} <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
        <div className="relative min-h-[430px] overflow-visible rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft">
          <AnimatedAloAgentOrb active={runState === "running"} mood={runState === "running" ? "thinking" : runState === "done" ? "happy" : "idle"} />
          <div className="absolute inset-x-5 bottom-5">
            <AnimatedScalePipeline activeStep={activeStep} compact />
          </div>
        </div>
      </section>

      <section id="task-composer" className="grid scroll-mt-28 gap-5 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-oliveDeep shadow-lift">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-black uppercase text-oliveDeep">Task Composer</p>
              <h2 className="text-2xl font-black text-cocoa">{t.composer}</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            <SelectField label={t.taskType} value={taskType} onChange={(value) => resetForChange(setTaskType, value as TaskType)} options={taskTypes} language={language} />
            <SelectField label={t.topic} value={topic} onChange={(value) => resetForChange(setTopic, value as TopicKey)} options={topics} language={language} />
            <SelectField label={t.tone} value={tone} onChange={(value) => resetForChange(setTone, value as Tone)} options={tones} language={language} />
            <SelectField label={t.language} value={language} onChange={(value) => resetForChange(setLanguage, value as Language)} options={[{ value: "id", label: { id: "Indonesia", en: "Indonesia" } }, { value: "en", label: { id: "English", en: "English" } }]} language={language} />
          </div>
          <button
            type="button"
            onClick={runAgent}
            disabled={runState === "running"}
            className="focus-ring mt-6 inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-alertClay/90 active:scale-[0.98] disabled:cursor-wait disabled:opacity-75"
          >
            <Play className="h-4 w-4" />
            {runState === "running" ? t.running : t.run}
          </button>
          <p className="mt-4 text-xs font-bold leading-5 text-cocoaSoft">
            {language === "id" ? "Simulasi ini memakai state lokal saja. Tidak ada API, backend, kontrak, atau penyimpanan data medis." : "This simulation uses local state only. No API, backend, contract call, or medical-data storage."}
          </p>
        </motion.div>

        <div className="grid min-w-0 gap-5">
          <PipelinePanel language={language} activeStep={activeStep} runState={runState} />
          <OutputPanel language={language} runState={runState} output={output} idle={t.idle} title={t.output} />
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch">
        <AnimatedScalePipeline activeStep={runState === "done" ? 4 : activeStep} />
        <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-8">
          <p className="text-sm font-black uppercase text-oliveDeep">Rialo / SCALE</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-cocoa sm:text-4xl">{t.scaleTitle}</h2>
          <p className="mt-4 text-base font-semibold leading-7 text-cocoaSoft">{t.scaleCopy}</p>
          <p className="mt-5 rounded-[1.5rem] bg-white p-4 text-sm font-black leading-6 text-cocoa shadow-lift">{t.future}</p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-orange/20 bg-orange/10 p-5 shadow-lift sm:p-8">
        <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
          <div className="grid h-16 w-16 place-items-center rounded-[1.5rem] bg-white text-orange shadow-lift">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-cocoa">{t.safetyTitle}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">{t.safety}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  language
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly { value: T; label: Record<Language, string> }[];
  language: Language;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-cocoa">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value as T)} className="focus-ring min-h-[58px] w-full min-w-0 rounded-2xl border border-cocoa/10 bg-white px-4 py-3 text-base font-bold text-cocoa shadow-lift transition focus:border-olive">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label[language]}
          </option>
        ))}
      </select>
    </label>
  );
}

function PipelinePanel({ language, activeStep, runState }: { language: Language; activeStep: number; runState: RunState }) {
  const visuals = [AnimatedTutorAgent, AnimatedQuizAgent, AnimatedJudgeAgent, AnimatedLearningBadge];
  return (
    <section className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6">
      <p className="text-sm font-black uppercase text-oliveDeep">Agent Pipeline</p>
      <div className="mt-5 grid gap-3">
        {pipeline.map((step, index) => {
          const Visual = visuals[index];
          const active = runState === "running" && activeStep === index;
          const done = runState === "done" || activeStep > index;
          return (
            <motion.div
              key={step.title.en}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: runState === "idle" ? 0.72 : 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className={cn("grid min-w-0 gap-3 rounded-[1.5rem] border bg-white p-3 shadow-lift sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center", active && "border-orange ring-4 ring-orange/15", done && "border-olive/30 bg-mint/35")}
            >
              <div className="scale-75 sm:scale-[0.68]">
                <Visual active={active} />
              </div>
              <div className="min-w-0">
                <p className="font-black text-cocoa">{step.title[language]}</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-cocoaSoft">{step.detail[language]}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function OutputPanel({ language, runState, output, idle, title }: { language: Language; runState: RunState; output: AgentOutput; idle: string; title: string }) {
  return (
    <motion.section layout className="min-w-0 overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mint text-oliveDeep shadow-lift">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-black uppercase text-oliveDeep">{title}</p>
          <h2 className="truncate text-2xl font-black text-cocoa">{runState === "done" ? output.heading : "Alo Agent"}</h2>
        </div>
      </div>
      {runState !== "done" ? (
        <div className="mt-6 rounded-[1.6rem] bg-white p-5 shadow-lift">
          <div className="flex items-center gap-3">
            <AgentVisual compact mood={runState === "running" ? "thinking" : "idle"} className="h-28 min-h-0 w-28 shrink-0 shadow-none" />
            <p className="text-sm font-bold leading-6 text-cocoaSoft">{runState === "running" ? (language === "id" ? "Pipeline sedang berjalan. Output akan muncul setelah Judge Agent selesai." : "The pipeline is running. Output appears after the Judge Agent finishes.") : idle}</p>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="mt-6 grid gap-4">
          <MascotIntroBubble language={language} text={output.intro} />
          <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-[1.8rem] bg-white p-5 shadow-lift">
            <div className="flex items-center gap-2 text-sm font-black uppercase text-oliveDeep">
              <BrainCircuit className="h-4 w-4" />
              {language === "id" ? "Penjelasan utama" : "Main explanation"}
            </div>
            <div className="mt-4 grid gap-3">
              {output.explanation.map((paragraph) => (
                <p key={paragraph} className="text-sm font-semibold leading-7 text-cocoaSoft">{paragraph}</p>
              ))}
            </div>
          </motion.article>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
            <KeyPointsCard language={language} points={output.keyPoints} />
            <MiniSupportVisual kind={output.visualKind} />
          </motion.div>
          <KeyPointChips chips={output.chips} />
          <MemoryTrickCard language={language} text={output.remember} />
          {output.cautions.length > 0 && <CautionCard language={language} items={output.cautions} />}
          <MiniProgressFlow language={language} />
          <div className="rounded-[1.6rem] bg-orange/10 p-4 text-sm font-bold leading-6 text-cocoaSoft">{output.safety}</div>
          <RelatedActions language={language} output={output} />
        </motion.div>
      )}
    </motion.section>
  );
}

function MascotIntroBubble({ language, text }: { language: Language; text: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid gap-3 rounded-[1.8rem] bg-white p-4 shadow-lift sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
      <AgentVisual compact mood="happy" className="mx-auto h-24 min-h-0 w-24 shrink-0 shadow-none sm:mx-0" />
      <div className="relative rounded-[1.5rem] bg-mint p-4 text-sm font-black leading-6 text-oliveDeep">
        <span className="block text-xs uppercase text-oliveDeep/70">{language === "id" ? "Alo Agent bilang" : "Alo Agent says"}</span>
        {text}
      </div>
    </motion.div>
  );
}

function KeyPointsCard({ language, points }: { language: Language; points: string[] }) {
  return (
    <article className="rounded-[1.8rem] bg-white p-5 shadow-lift">
      <div className="flex items-center gap-2 text-sm font-black uppercase text-oliveDeep">
        <ListChecks className="h-4 w-4" />
        {language === "id" ? "Key points" : "Key points"}
      </div>
      <div className="mt-4 grid gap-2">
        {points.map((point, index) => (
          <motion.div
            key={point}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 + index * 0.04 }}
            className="flex gap-3 rounded-2xl bg-cream px-4 py-3 text-sm font-bold leading-6 text-cocoaSoft"
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint text-xs font-black text-oliveDeep">{index + 1}</span>
            {point}
          </motion.div>
        ))}
      </div>
    </article>
  );
}

function MiniSupportVisual({ kind }: { kind: TopicKey }) {
  if (kind === "blood-pressure") return <ClassifierVisual type="blood_pressure" className="min-h-[220px] shadow-lift" />;
  if (kind === "blood-sugar") return <ClassifierVisual type="blood_sugar" className="min-h-[220px] shadow-lift" />;
  if (kind === "bmi") return <ClassifierVisual type="bmi" className="min-h-[220px] shadow-lift" />;
  return <DiseaseVisual slug={kind} className="min-h-[220px] shadow-lift" />;
}

function KeyPointChips({ chips }: { chips: string[] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="flex flex-wrap gap-2">
      {chips.map((chip, index) => (
        <motion.span
          key={chip}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 + index * 0.04 }}
          className="rounded-full bg-white px-4 py-2 text-xs font-black text-cocoaSoft shadow-lift"
        >
          {chip}
        </motion.span>
      ))}
    </motion.div>
  );
}

function MemoryTrickCard({ language, text }: { language: Language; text: string }) {
  return (
    <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="rounded-[1.8rem] border border-olive/20 bg-mint p-5 shadow-lift">
      <div className="flex items-center gap-2 text-sm font-black uppercase text-oliveDeep">
        <Lightbulb className="h-4 w-4" />
        {language === "id" ? "Yang perlu diingat" : "What to remember"}
      </div>
      <p className="mt-3 text-sm font-black leading-6 text-oliveDeep">{text}</p>
    </motion.article>
  );
}

function CautionCard({ language, items }: { language: Language; items: string[] }) {
  return (
    <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="rounded-[1.8rem] border border-orange/20 bg-orange/10 p-5 shadow-lift">
      <div className="flex items-center gap-2 text-sm font-black uppercase text-orange">
        <AlertTriangle className="h-4 w-4" />
        {language === "id" ? "Red flags / caution" : "Red flags / caution"}
      </div>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-cocoaSoft">
            {item}
          </div>
        ))}
      </div>
    </motion.article>
  );
}

function MiniProgressFlow({ language }: { language: Language }) {
  const steps = language === "id" ? ["Pahami", "Ingat", "Latih", "Lanjut"] : ["Understand", "Remember", "Practice", "Continue"];
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="rounded-[1.8rem] bg-white p-4 shadow-lift">
      <div className="flex items-center gap-2 text-sm font-black uppercase text-oliveDeep">
        <Route className="h-4 w-4" />
        {language === "id" ? "Mini learning flow" : "Mini learning flow"}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step} className="relative rounded-2xl bg-cream px-3 py-3 text-center text-xs font-black text-cocoaSoft">
            <span className="mx-auto mb-2 grid h-7 w-7 place-items-center rounded-full bg-orange text-white">{index + 1}</span>
            {step}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RelatedActions({ language, output }: { language: Language; output: AgentOutput }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="rounded-[1.8rem] bg-white p-4 shadow-lift">
      <p className="text-sm font-black uppercase text-oliveDeep">{language === "id" ? "Recommended next action" : "Recommended next action"}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-cocoaSoft">{output.nextStep}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href={output.href} className="focus-ring inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-black text-cream transition hover:-translate-y-0.5 hover:bg-cocoa/90">
          {output.action} <ArrowRight className="h-4 w-4" />
        </Link>
        {output.related.map((item) => (
          <Link key={`${item.href}-${item.label}`} href={item.href} className="focus-ring inline-flex min-h-[46px] items-center justify-center rounded-full bg-mint px-5 py-3 text-sm font-black text-oliveDeep transition hover:-translate-y-0.5 hover:bg-mint/80">
            {item.label}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

type AgentOutput = {
  heading: string;
  intro: string;
  explanation: string[];
  keyPoints: string[];
  chips: string[];
  remember: string;
  cautions: string[];
  safety: string;
  nextStep: string;
  href: string;
  action: string;
  related: { label: string; href: string }[];
  visualKind: TopicKey;
};

function buildOutput({ taskType, topic, tone, language, isConnected }: { taskType: TaskType; topic: TopicKey; tone: Tone; language: Language; isConnected: boolean }): AgentOutput {
  const topicInfo = topics.find((item) => item.value === topic) ?? topics[0];
  const disease = diseases.find((item) => item.slug === topic);
  const href = topicInfo.href;
  const action = language === "id" ? "Mulai belajar" : "Start learning";
  const topicCopy = getTopicCopy(topic, language);
  const tonePrefix = {
    simple: { id: "Aku jelaskan dengan bahasa sederhana.", en: "I’ll explain this in simple language." },
    summary: { id: "Aku buatkan ringkasan singkat dan jelas.", en: "I’ll keep this as a clear short summary." },
    memory: { id: "Aku tambahkan trik ingat supaya mudah menempel.", en: "I’ll add a memory trick so it sticks." },
    steps: { id: "Aku susun langkah demi langkah.", en: "I’ll organize it step by step." }
  }[tone][language];
  const safety =
    language === "id"
      ? "Alo Agent hanya untuk edukasi. Ini bukan diagnosis, keputusan pengobatan, atau saran medis darurat."
      : "Alo Agent is for education only. This is not diagnosis, a treatment decision, or emergency medical advice.";

  if (taskType === "classifier") {
    const moduleName = topic === "blood-pressure" ? "Hypertension" : topic === "blood-sugar" ? "Type 2 Diabetes" : "BMI and healthy lifestyle";
    const visualKind = topic === "blood-pressure" || topic === "blood-sugar" || topic === "bmi" ? topic : "blood-pressure";
    return {
      heading: language === "id" ? `Penjelasan contoh ${topicInfo.label.id}` : `Sample ${topicInfo.label.en} explanation`,
      intro: language === "id" ? "Mari kita baca contoh hasil ini sebagai bahan belajar, bukan sebagai keputusan medis." : "Let’s read this sample result as learning material, not as a medical decision.",
      explanation: language === "id"
        ? [
            `${tonePrefix} Rentang seperti ini membantu kamu memahami konsep, tetapi satu angka tidak cukup untuk menyimpulkan kondisi kesehatan.`,
            `Alo Agent menghubungkan contoh ini dengan modul ${moduleName}, supaya kamu belajar konteks: cara pengukuran, faktor yang memengaruhi angka, kebiasaan yang relevan, dan kapan perlu bantuan profesional.`,
            "Tujuannya adalah membuat hasil classifier terasa lebih mudah dipahami tanpa menyimpan data atau membuat diagnosis."
          ]
        : [
            `${tonePrefix} A range like this helps you understand the concept, but one number is not enough to conclude a health condition.`,
            `Alo Agent connects this sample to the ${moduleName} module so you learn the context: how values are measured, what can influence them, relevant habits, and when professional help matters.`,
            "The goal is to make classifier results easier to understand without storing data or making a diagnosis."
          ],
      keyPoints: language === "id"
        ? ["Bukan diagnosis dan bukan rekomendasi pengobatan.", "Perhatikan jenis pengukuran dan konteksnya.", `Modul terkait: ${moduleName}.`, "Diskusikan dengan tenaga kesehatan bila hasil atau keluhan terasa mengkhawatirkan."]
        : ["Not a diagnosis and not a treatment recommendation.", "Pay attention to measurement type and context.", `Related learning module: ${moduleName}.`, "Discuss with a healthcare professional when results or concerns feel worrying."],
      chips: topicCopy.chips,
      remember: tone === "memory" ? (language === "id" ? "Angka + cara ukur + konteks + konfirmasi. Jangan berhenti di angka saja." : "Number plus method plus context plus confirmation. Do not stop at the number alone.") : (language === "id" ? "Gunakan hasil sebagai pintu belajar, bukan kesimpulan medis." : "Use the result as a learning doorway, not a medical conclusion."),
      cautions: topicCopy.cautions,
      safety,
      nextStep: language === "id" ? "Pelajari modul terkait untuk memahami pencegahan dan tanda bahaya." : "Learn the related module to understand prevention and red flags.",
      href,
      action,
      related: topic === "bmi" ? relatedButtons(language, ["type-2-diabetes", "hypertension"]) : relatedButtons(language, [hrefToTopic(href)]),
      visualKind
    };
  }

  if (taskType === "quiz") {
    return {
      heading: language === "id" ? `Pelatih quiz: ${topicInfo.label.id}` : `Quiz coach: ${topicInfo.label.en}`,
      intro: language === "id" ? "Alo Agent akan mengubah momen salah jawab menjadi kartu belajar kecil." : "Alo Agent will turn the missed-answer moment into a tiny learning card.",
      explanation: language === "id"
        ? [
            `${tonePrefix} Saat jawaban quiz meleset, biasanya penyebabnya adalah konsep yang mirip tetapi tidak sama.`,
            `Untuk topik ${topicInfo.label.id}, fokuskan ulang pada satu ide inti: ${topicCopy.misconception}`,
            "Setelah paham alasan di balik jawaban, ulangi quiz agar ingatan berpindah dari hafalan ke pemahaman."
          ]
        : [
            `${tonePrefix} When a quiz answer misses, the cause is often two similar concepts getting mixed together.`,
            `For ${topicInfo.label.en}, refocus on one core idea: ${topicCopy.misconception}`,
            "After understanding the reason behind the answer, retake the quiz so the memory moves from guessing to understanding."
          ],
      keyPoints: language === "id"
        ? ["Cari kata kunci pada pertanyaan.", "Jangan tertukar antara penyebab, gejala, pencegahan, dan red flags.", "Ulangi satu kalimat takeaway sebelum retake quiz.", "Gunakan penjelasan quiz sebagai peta belajar singkat."]
        : ["Look for the keyword in the question.", "Do not mix up causes, symptoms, prevention, and red flags.", "Repeat one takeaway sentence before retaking the quiz.", "Use the quiz explanation as a short learning map."],
      chips: topicCopy.chips,
      remember: tone === "memory" ? (language === "id" ? "Satu quiz salah = satu kalimat belajar baru." : "One missed quiz equals one new learning sentence.") : (language === "id" ? "Quiz menguji pemahaman, bukan diagnosis." : "The quiz tests understanding, not diagnosis."),
      cautions: topicCopy.cautions.slice(0, 2),
      safety,
      nextStep: language === "id" ? "Mulai modul terkait, lalu ulangi quiz." : "Start the related module, then retake the quiz.",
      href: disease ? `/disease/${disease.slug}/quiz` : href,
      action: language === "id" ? "Buka quiz" : "Open quiz",
      related: relatedButtons(language, [topic]),
      visualKind: topic
    };
  }

  if (taskType === "next") {
    const next = diseases.find((item) => item.slug === learningPath[0]) ?? diseases[0];
    return {
      heading: language === "id" ? "Rekomendasi belajar berikutnya" : "Next learning recommendation",
      intro: language === "id" ? "Alo Agent menyusun jalur belajar aman tanpa membaca data medis pribadi." : "Alo Agent is arranging a safe learning path without reading private medical data.",
      explanation: language === "id"
        ? [
            `${tonePrefix} Jalur ini dimulai dari topik yang paling ringan untuk membangun rasa percaya diri, lalu bergerak ke topik yang lebih konseptual.`,
            "Urutannya membantu kamu melihat pola: infeksi umum, infeksi yang perlu tanda bahaya, tekanan darah, metabolisme gula, lalu pencernaan.",
            isConnected ? copy.id.connected : copy.id.disconnected
          ]
        : [
            `${tonePrefix} This path starts with a lighter topic to build confidence, then moves into more conceptual topics.`,
            "The sequence helps you see patterns: common infection, warning-sign infection, blood pressure, sugar metabolism, then digestion.",
            isConnected ? copy.en.connected : copy.en.disconnected
          ],
      keyPoints: learningPath.map((slug, index) => {
        const item = diseases.find((diseaseItem) => diseaseItem.slug === slug) ?? diseases[0];
        return `${index + 1}. ${item.title[language]}`;
      }),
      chips: language === "id" ? ["Mulai ringan", "Bangun streak", "Quiz setelah modul", "Passport belajar"] : ["Start light", "Build streak", "Quiz after module", "Learning passport"],
      remember: isConnected ? copy[language].connected : copy[language].disconnected,
      cautions: [],
      safety,
      nextStep: language === "id" ? "Mulai dari modul pertama, lalu bangun Passport setelah quiz." : "Start with the first module, then build your Passport after quizzes.",
      href: `/disease/${next.slug}`,
      action,
      related: relatedButtons(language, ["dengue-fever", "hypertension"]),
      visualKind: "common-cold"
    };
  }

  const redFlag = disease?.sections.find((section) => /red|bahaya/i.test(`${section.title.en} ${section.title.id}`));
  return {
    heading: language === "id" ? `Tutor Agent: ${topicInfo.label.id}` : `Tutor Agent: ${topicInfo.label.en}`,
    intro: language === "id" ? "Mari kita pecah modul ini jadi bagian kecil yang mudah dipahami." : "Let’s break this module into small, easy-to-understand pieces.",
    explanation: language === "id"
      ? [
          `${tonePrefix} ${disease?.shortDescription.id ?? "Topik ini dipakai sebagai contoh edukasi umum."}`,
          `${topicCopy.why} Modul ini penting karena membantu kamu mengenali konsep dasar, bukan menebak diagnosis.`,
          `Kesalahpahaman umum: ${topicCopy.misconception}`
        ]
      : [
          `${tonePrefix} ${disease?.shortDescription.en ?? "This topic is used as a general education example."}`,
          `${topicCopy.why} This module matters because it helps you recognize the basic concept instead of guessing a diagnosis.`,
          `Common misconception: ${topicCopy.misconception}`
        ],
    keyPoints: [
      disease?.sections[0]?.body[language] ?? (language === "id" ? "Pahami definisi topik dengan bahasa sederhana." : "Understand the topic definition in simple language."),
      disease?.sections[1]?.body[language] ?? (language === "id" ? "Kenali penyebab, pemicu, atau konteks umum." : "Recognize causes, triggers, or general context."),
      disease?.sections[2]?.body[language] ?? (language === "id" ? "Pelajari langkah dasar yang aman dan umum." : "Learn safe and general basics."),
      redFlag?.body[language] ?? (language === "id" ? "Ingat tanda bahaya dan cari bantuan bila mengkhawatirkan." : "Remember red flags and seek help if concerning.")
    ],
    chips: topicCopy.chips,
    remember: tone === "memory" ? (language === "id" ? "Definisi, penyebab, tanda bahaya, lalu langkah belajar berikutnya." : "Definition, causes, red flags, then the next learning step.") : (language === "id" ? "Fokus pada literasi kesehatan, bukan diagnosis mandiri." : "Focus on health literacy, not self-diagnosis."),
    cautions: topicCopy.cautions,
    safety,
    nextStep: language === "id" ? "Buka modul lengkap dan lanjutkan ke quiz." : "Open the full module and continue to the quiz.",
    href,
    action,
    related: relatedButtons(language, [topic, "classifier-link"]),
    visualKind: topic
  };
}

function getTopicCopy(topic: TopicKey, language: Language) {
  const map: Record<TopicKey, { why: Record<Language, string>; misconception: Record<Language, string>; chips: Record<Language, string[]>; cautions: Record<Language, string[]> }> = {
    "common-cold": {
      why: { id: "Pilek biasa sering terasa sepele, tetapi literasi yang baik membantu membedakan pemulihan normal dan tanda bahaya.", en: "Common cold feels ordinary, but good literacy helps separate normal recovery from red flags." },
      misconception: { id: "Pilek biasa umumnya viral, jadi antibiotik tidak rutin menjadi jawaban.", en: "Common colds are usually viral, so antibiotics are not routinely the answer." },
      chips: { id: ["Biasanya viral", "Istirahat & cairan", "Antibiotik tidak rutin", "Pantau red flags"], en: ["Usually viral", "Rest & fluids", "Antibiotics not routine", "Watch red flags"] },
      cautions: { id: ["Sesak napas, nyeri dada, demam tinggi, gejala memburuk, atau durasi lama perlu perhatian profesional."], en: ["Shortness of breath, chest pain, high fever, worsening symptoms, or long duration need professional attention."] }
    },
    hypertension: {
      why: { id: "Hipertensi penting dipelajari karena sering tidak terasa tetapi berdampak jangka panjang.", en: "Hypertension matters because it can be silent yet important over the long term." },
      misconception: { id: "Merasa baik-baik saja tidak selalu berarti tekanan darah normal.", en: "Feeling fine does not always mean blood pressure is normal." },
      chips: { id: ["Silent risk", "Ukur berulang", "Garam & aktivitas", "Red flags neurologis"], en: ["Silent risk", "Repeat checks", "Salt & movement", "Neuro red flags"] },
      cautions: { id: ["Nyeri dada, sesak, sakit kepala berat, kebingungan, gangguan bicara, atau kelemahan satu sisi perlu bantuan segera."], en: ["Chest pain, shortness of breath, severe headache, confusion, speech difficulty, or one-sided weakness need prompt help."] }
    },
    "type-2-diabetes": {
      why: { id: "Diabetes Tipe 2 membantu kamu memahami hubungan metabolisme, kebiasaan, dan pemeriksaan terkonfirmasi.", en: "Type 2 Diabetes helps you understand metabolism, habits, and confirmed testing." },
      misconception: { id: "Satu angka gula darah tanpa jenis tes dan konteks tidak cukup untuk menyimpulkan diagnosis.", en: "One glucose number without test type and context is not enough for diagnosis." },
      chips: { id: ["Konfirmasi tes", "Metabolisme", "Kebiasaan seimbang", "Luka & dehidrasi"], en: ["Confirm testing", "Metabolism", "Balanced habits", "Wounds & dehydration"] },
      cautions: { id: ["Sangat lemas, muntah terus, bingung, dehidrasi berat, atau luka memburuk perlu perhatian profesional."], en: ["Extreme weakness, persistent vomiting, confusion, severe dehydration, or worsening wounds need professional attention."] }
    },
    gerd: {
      why: { id: "GERD membantu kamu memahami pemicu makan, posisi tubuh, dan kapan keluhan perlu diperiksa.", en: "GERD helps you understand meal triggers, body position, and when symptoms should be checked." },
      misconception: { id: "Tidak semua nyeri dada atau rasa tidak nyaman dada adalah GERD.", en: "Not every chest discomfort is GERD." },
      chips: { id: ["Pemicu makan", "Jangan langsung rebahan", "Rasa asam", "Red flags dada"], en: ["Meal triggers", "Avoid lying down", "Sour taste", "Chest red flags"] },
      cautions: { id: ["Nyeri dada yang mungkin terkait jantung, sulit menelan, muntah darah, BAB hitam, atau turun berat badan tanpa sebab perlu evaluasi."], en: ["Chest pain that may be heart-related, trouble swallowing, vomiting blood, black stool, or unexplained weight loss need evaluation."] }
    },
    "dengue-fever": {
      why: { id: "Dengue penting karena infeksi dapat berubah cepat dan tanda peringatan harus dikenali.", en: "Dengue matters because infection can change quickly and warning signs should be recognized." },
      misconception: { id: "Dengue bukan hanya demam; tanda bahaya menentukan kapan harus mencari pertolongan.", en: "Dengue is not just fever; warning signs guide when to seek help." },
      chips: { id: ["Aedes", "Cegah genangan", "Tanda bahaya", "Bantuan cepat"], en: ["Aedes", "Remove standing water", "Warning signs", "Prompt help"] },
      cautions: { id: ["Nyeri perut berat, muntah terus, perdarahan, lemas ekstrem, sesak, atau kulit dingin/lembap perlu perawatan segera."], en: ["Severe abdominal pain, persistent vomiting, bleeding, extreme weakness, breathing difficulty, or cold clammy skin need urgent care."] }
    },
    "blood-pressure": {
      why: { id: "Hasil tekanan darah lebih berguna ketika dipahami bersama teknik ukur dan pengukuran berulang.", en: "Blood pressure results are more useful when understood with measurement technique and repeat checks." },
      misconception: { id: "Satu hasil tinggi tidak otomatis menjadi diagnosis, tetapi tetap perlu perhatian konteks.", en: "One high result is not automatically a diagnosis, but context still matters." },
      chips: { id: ["mmHg", "Sistolik/diastolik", "Ukur ulang", "Hipertensi"], en: ["mmHg", "Systolic/diastolic", "Repeat checks", "Hypertension"] },
      cautions: { id: ["Cari bantuan jika angka mengkhawatirkan disertai nyeri dada, sesak, kelemahan satu sisi, atau kebingungan."], en: ["Seek help if concerning values come with chest pain, shortness of breath, one-sided weakness, or confusion."] }
    },
    "blood-sugar": {
      why: { id: "Hasil gula darah perlu jenis tes yang jelas agar tidak salah dibaca.", en: "Blood sugar results need a clear test type to avoid misreading." },
      misconception: { id: "GDP, GDS, dan HbA1c tidak dibaca dengan cara yang sama.", en: "Fasting glucose, random glucose, and HbA1c are not interpreted the same way." },
      chips: { id: ["mg/dL", "Jenis tes", "Konfirmasi", "Diabetes Tipe 2"], en: ["mg/dL", "Test type", "Confirmation", "Type 2 Diabetes"] },
      cautions: { id: ["Bingung, sangat lemas, muntah terus, dehidrasi berat, atau luka memburuk perlu perhatian profesional."], en: ["Confusion, extreme weakness, persistent vomiting, severe dehydration, or worsening wounds need professional attention."] }
    },
    bmi: {
      why: { id: "BMI membantu memulai percakapan edukatif tentang kebiasaan sehat, tetapi tidak menggambarkan semua konteks tubuh.", en: "BMI can start an educational conversation about healthy habits, but it does not describe every body context." },
      misconception: { id: "BMI bukan ukuran lemak tubuh langsung dan bukan diagnosis.", en: "BMI is not a direct body-fat measurement and not a diagnosis." },
      chips: { id: ["Skrining sederhana", "Tidak menyimpan data", "Konteks tubuh", "Kebiasaan sehat"], en: ["Simple screening", "No data stored", "Body context", "Healthy habits"] },
      cautions: { id: ["BMI tidak mempertimbangkan massa otot, kehamilan, usia, jenis kelamin, atau konteks medis individu."], en: ["BMI does not account for muscle mass, pregnancy, age, sex, or individual medical context."] }
    }
  };

  return {
    why: map[topic].why[language],
    misconception: map[topic].misconception[language],
    chips: map[topic].chips[language],
    cautions: map[topic].cautions[language]
  };
}

function relatedButtons(language: Language, items: (TopicKey | "classifier-link")[]) {
  return items
    .map((item) => {
      if (item === "classifier-link") return { label: language === "id" ? "Cek Classifier" : "Check Classifier", href: "/classifier" };
      const found = topics.find((topic) => topic.value === item);
      if (!found) return null;
      return { label: found.label[language], href: found.href };
    })
    .filter((item): item is { label: string; href: string } => Boolean(item));
}

function hrefToTopic(href: string): TopicKey {
  if (href.includes("hypertension")) return "hypertension";
  if (href.includes("type-2-diabetes")) return "type-2-diabetes";
  if (href.includes("gerd")) return "gerd";
  if (href.includes("dengue")) return "dengue-fever";
  return "common-cold";
}
