"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, BrainCircuit, CheckCircle2, Lightbulb, ListChecks, Play, Route, ShieldCheck, Sparkles } from "lucide-react";
import { useAccount } from "wagmi";
import { AgentVisual } from "@/components/visuals/AgentVisual";
import { AnimatedAloAgentOrb, AnimatedJudgeAgent, AnimatedLearningBadge, AnimatedLifestyleAgent, AnimatedQuizAgent, AnimatedScalePipeline, AnimatedTutorAgent } from "@/components/visuals/AgentWorkflowVisuals";
import { ClassifierVisual } from "@/components/visuals/ClassifierVisual";
import { DiseaseVisual } from "@/components/visuals/DiseaseVisual";
import { diseases, type Language } from "@/data/diseases";
import { cn } from "@/lib/utils";

type TaskType = "module" | "classifier" | "quiz" | "next";
type BaseTopicKey = "common-cold" | "hypertension" | "type-2-diabetes" | "gerd" | "dengue-fever" | "blood-pressure" | "blood-sugar" | "bmi";
type TopicKey = BaseTopicKey | "blood-pressure-high" | "blood-pressure-elevated" | "blood-sugar-elevated" | "blood-sugar-low" | "bmi-overweight" | "bmi-obesity";
type Tone = "simple" | "summary" | "memory" | "steps";
type RunState = "idle" | "running" | "done";

const copy = {
  id: {
    eyebrow: "Built on Rialo",
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
    scaleTitle: "Why this fits Rialo SCALE",
    scaleCopy: "Classifier memberi sinyal edukatif mentah. Alo Agent mengubahnya menjadi learning task: Tutor Agent menjelaskan, Lifestyle Agent menyusun kebiasaan aman, Judge Agent mengecek batas keamanan, lalu aksi belajar direkomendasikan.",
    future: "Prototype currently deployed on Arc Testnet while designed for Rialo. Future mapping: classifier signal -> learning task -> tutor agent -> lifestyle agent -> judge agent -> learning proof.",
    connected: "Wallet terhubung: setelah belajar, gunakan Passport untuk melihat progress pembelajaran.",
    disconnected: "Wallet belum terhubung: kamu tetap bisa mencoba Alo Agent tanpa menyimpan data."
  },
  en: {
    eyebrow: "Built on Rialo",
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
    scaleTitle: "Why this fits Rialo SCALE",
    scaleCopy: "The classifier gives a raw educational signal. Alo Agent turns it into a learning task: a Tutor Agent explains, a Lifestyle Agent builds safe habit guidance, a Judge Agent checks safety boundaries, and a learning action is recommended.",
    future: "Prototype currently deployed on Arc Testnet while designed for Rialo. Future mapping: classifier signal -> learning task -> tutor agent -> lifestyle agent -> judge agent -> learning proof.",
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
  { value: "blood-pressure-high", label: { id: "High Blood Pressure Range", en: "High Blood Pressure Range" }, href: "/disease/hypertension" },
  { value: "blood-pressure-elevated", label: { id: "Elevated Blood Pressure Range", en: "Elevated Blood Pressure Range" }, href: "/disease/hypertension" },
  { value: "blood-sugar", label: { id: "Blood Sugar Result", en: "Blood Sugar Result" }, href: "/disease/type-2-diabetes" },
  { value: "blood-sugar-elevated", label: { id: "Elevated Blood Sugar Range", en: "Elevated Blood Sugar Range" }, href: "/disease/type-2-diabetes" },
  { value: "blood-sugar-low", label: { id: "Low Blood Sugar Range", en: "Low Blood Sugar Range" }, href: "/disease/type-2-diabetes" },
  { value: "bmi", label: { id: "BMI Result", en: "BMI Result" }, href: "/classifier" },
  { value: "bmi-overweight", label: { id: "BMI Overweight Range", en: "BMI Overweight Range" }, href: "/classifier" },
  { value: "bmi-obesity", label: { id: "BMI Obesity Education Range", en: "BMI Obesity Education Range" }, href: "/classifier" }
] as const;

const tones = [
  { value: "simple", label: { id: "Simple", en: "Simple" } },
  { value: "summary", label: { id: "Short Summary", en: "Short Summary" } },
  { value: "memory", label: { id: "Memory Trick", en: "Memory Trick" } },
  { value: "steps", label: { id: "Step-by-step", en: "Step-by-step" } }
] as const;

const pipeline = [
  { title: { id: "Membaca task edukasi kesehatan", en: "Reading health education task" }, detail: { id: "Alo Agent membaca pilihan task, topik, tone, dan bahasa.", en: "Alo Agent reads the selected task, topic, tone, and language." } },
  { title: { id: "Mencocokkan konteks belajar", en: "Matching learning context" }, detail: { id: "Tutor Agent memilih modul dan konsep yang paling relevan.", en: "Tutor Agent matches the most relevant module and concept." } },
  { title: { id: "Menyusun penjelasan aman", en: "Building safe explanation" }, detail: { id: "Penjelasan dibuat edukatif, bukan diagnosis.", en: "The explanation is framed as education, not diagnosis." } },
  { title: { id: "Membuat rencana kebiasaan", en: "Generating habit plan" }, detail: { id: "Lifestyle Agent menyiapkan food swaps, gerak ringan, dan challenge.", en: "Lifestyle Agent prepares food swaps, gentle movement, and a challenge." } },
  { title: { id: "Review keamanan selesai", en: "Safety review complete" }, detail: { id: "Judge Agent mengecek red flags dan batas saran medis.", en: "Judge Agent checks red flags and medical-safety boundaries." } },
  { title: { id: "Aksi belajar siap", en: "Learning action ready" }, detail: { id: "Alo Agent memberi modul, quiz, classifier, dan Passport action.", en: "Alo Agent returns module, quiz, classifier, and Passport actions." } }
];

const learningPath: BaseTopicKey[] = ["common-cold", "dengue-fever", "hypertension", "type-2-diabetes", "gerd"];

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
      timers.current.push(window.setTimeout(() => setActiveStep(index), 180 + index * 280));
    });
    timers.current.push(window.setTimeout(() => setRunState("done"), 2050));
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
            {["Built on Rialo", "SCALE-inspired", "Education only", "Privacy-safe"].map((pill) => (
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
        <AnimatedScalePipeline activeStep={runState === "done" ? 5 : activeStep} />
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
  const visuals = [AnimatedQuizAgent, AnimatedTutorAgent, AnimatedTutorAgent, AnimatedLifestyleAgent, AnimatedJudgeAgent, AnimatedLearningBadge];
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
  const report = getReportGuidance(output.visualKind, language);
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
            <p className="text-sm font-bold leading-6 text-cocoaSoft">{runState === "running" ? (language === "id" ? "Pipeline sedang berjalan. Output muncul setelah safety review dan action plan selesai." : "The pipeline is running. Output appears after the safety review and action plan are ready.") : idle}</p>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="mt-6 grid gap-4">
          <MascotIntroBubble language={language} text={output.intro} />
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="grid gap-4">
              <AgentReportCard language={language} title={language === "id" ? "Result insight" : "Result insight"} icon="brain" paragraphs={output.explanation} />
              <AgentReportCard language={language} title={language === "id" ? "Kenapa ini penting" : "Why it matters"} icon="check" paragraphs={report.whyItMatters} />
            </div>
            <MiniSupportVisual kind={output.visualKind} />
          </motion.div>
          <KeyPointsCard language={language} points={output.keyPoints} />
          <KeyPointChips chips={output.chips} />
          <MemoryTrickCard language={language} text={output.remember} />
          <HabitSwapCard language={language} swaps={report.foodSwaps} guidance={report.nutritionGuidance} />
          <ExerciseIdeaGrid language={language} ideas={report.exerciseIdeas} />
          <ReduceCard language={language} items={report.reduce} />
          <SevenDayChallengeCard language={language} days={report.challenge} />
          {(output.cautions.length > 0 || report.cautions.length > 0) && <SafetyReviewCard language={language} items={[...report.cautions, ...output.cautions].slice(0, 5)} />}
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

function AgentReportCard({ language, title, icon, paragraphs }: { language: Language; title: string; icon: "brain" | "check"; paragraphs: string[] }) {
  const Icon = icon === "brain" ? BrainCircuit : CheckCircle2;
  return (
    <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="rounded-[1.8rem] bg-white p-5 shadow-lift">
      <div className="flex items-center gap-2 text-sm font-black uppercase text-oliveDeep">
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <div className="mt-4 grid gap-3">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm font-semibold leading-7 text-cocoaSoft">{paragraph}</p>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-cream px-4 py-3 text-xs font-black uppercase text-cocoaSoft">
        {language === "id" ? "Aman dibaca sebagai edukasi, bukan diagnosis." : "Safe to read as education, not diagnosis."}
      </div>
    </motion.article>
  );
}

function MiniSupportVisual({ kind }: { kind: TopicKey }) {
  const base = normalizeTopic(kind);
  if (base === "blood-pressure") return <ClassifierVisual type="blood_pressure" className="min-h-[220px] shadow-lift" />;
  if (base === "blood-sugar") return <ClassifierVisual type="blood_sugar" className="min-h-[220px] shadow-lift" />;
  if (base === "bmi") return <ClassifierVisual type="bmi" className="min-h-[220px] shadow-lift" />;
  return <DiseaseVisual slug={base} className="min-h-[220px] shadow-lift" />;
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

function HabitSwapCard({ language, swaps, guidance }: { language: Language; swaps: FoodSwap[]; guidance: string }) {
  return (
    <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-[1.8rem] bg-white p-5 shadow-lift">
      <div className="flex items-center gap-2 text-sm font-black uppercase text-oliveDeep">
        <Lightbulb className="h-4 w-4" />
        {language === "id" ? "Food swaps / nutrisi" : "Food swaps / nutrition"}
      </div>
      <p className="mt-3 text-sm font-semibold leading-6 text-cocoaSoft">{guidance}</p>
      <div className="mt-4 grid gap-3">
        {swaps.map((swap, index) => (
          <motion.div
            key={`${swap.reduce}-${swap.try}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22 + index * 0.04 }}
            className="grid gap-2 rounded-2xl bg-cream p-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center"
          >
            <div className="rounded-xl bg-orange/10 px-3 py-2 text-sm font-bold leading-5 text-cocoaSoft">
              <span className="block text-[10px] font-black uppercase text-orange">{language === "id" ? "Kurangi sering" : "Reduce often"}</span>
              {swap.reduce}
            </div>
            <ArrowRight className="mx-auto h-4 w-4 text-oliveDeep" />
            <div className="rounded-xl bg-mint px-3 py-2 text-sm font-bold leading-5 text-oliveDeep">
              <span className="block text-[10px] font-black uppercase text-oliveDeep/70">{language === "id" ? "Coba lebih sering" : "Try more often"}</span>
              {swap.try}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.article>
  );
}

function ExerciseIdeaGrid({ language, ideas }: { language: Language; ideas: string[] }) {
  return (
    <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="rounded-[1.8rem] bg-white p-5 shadow-lift">
      <div className="flex items-center gap-2 text-sm font-black uppercase text-oliveDeep">
        <Route className="h-4 w-4" />
        {language === "id" ? "Gerak ringan di rumah" : "Home movement ideas"}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {ideas.map((idea, index) => (
          <motion.div key={idea} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 + index * 0.03 }} className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3 text-sm font-bold text-cocoaSoft">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint text-xs font-black text-oliveDeep">{index + 1}</span>
            {idea}
          </motion.div>
        ))}
      </div>
    </motion.article>
  );
}

function ReduceCard({ language, items }: { language: Language; items: string[] }) {
  return (
    <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="rounded-[1.8rem] border border-orange/20 bg-orange/10 p-5 shadow-lift">
      <div className="flex items-center gap-2 text-sm font-black uppercase text-orange">
        <AlertTriangle className="h-4 w-4" />
        {language === "id" ? "Yang sebaiknya dikurangi" : "What to avoid / reduce"}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full bg-white px-4 py-2 text-xs font-black text-cocoaSoft shadow-lift">{item}</span>
        ))}
      </div>
    </motion.article>
  );
}

function SevenDayChallengeCard({ language, days }: { language: Language; days: string[] }) {
  return (
    <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-[1.8rem] bg-white p-5 shadow-lift">
      <div className="flex items-center gap-2 text-sm font-black uppercase text-oliveDeep">
        <ListChecks className="h-4 w-4" />
        {language === "id" ? "7-day mini challenge" : "7-day mini challenge"}
      </div>
      <div className="mt-4 grid gap-2">
        {days.map((day, index) => (
          <motion.div key={day} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 + index * 0.03 }} className="flex gap-3 rounded-2xl bg-cream px-4 py-3 text-sm font-bold leading-6 text-cocoaSoft">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange text-xs font-black text-white">{index + 1}</span>
            {day}
          </motion.div>
        ))}
      </div>
    </motion.article>
  );
}

function SafetyReviewCard({ language, items }: { language: Language; items: string[] }) {
  return (
    <motion.article initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }} className="rounded-[1.8rem] border border-orange/20 bg-orange/10 p-5 shadow-lift">
      <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
        <AgentVisual compact mood="caution" className="mx-auto h-20 min-h-0 w-20 shrink-0 shadow-none sm:mx-0" />
        <div>
          <div className="flex items-center gap-2 text-sm font-black uppercase text-orange">
            <ShieldCheck className="h-4 w-4" />
            {language === "id" ? "Judge Agent safety review" : "Judge Agent safety review"}
          </div>
          <p className="mt-1 text-sm font-bold leading-6 text-cocoaSoft">{language === "id" ? "Batas keamanan tetap jelas: edukasi saja, bukan keputusan medis." : "Safety boundary stays clear: education only, not a medical decision."}</p>
        </div>
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
  const base = normalizeTopic(output.visualKind);
  const quizTopic = base === "blood-pressure" || base === "bmi" ? "hypertension" : base === "blood-sugar" ? "type-2-diabetes" : base;
  const quizHref = diseases.some((disease) => disease.slug === quizTopic) ? `/disease/${quizTopic}/quiz` : "/library";
  const actions = uniqueActions([
    { label: output.action, href: output.href, primary: true },
    { label: language === "id" ? "Cek classifier lagi" : "Try classifier again", href: "/classifier" },
    { label: language === "id" ? "Buka quiz" : "Go to quiz", href: quizHref },
    { label: language === "id" ? "Lihat Passport" : "View passport", href: "/passport" },
    ...output.related
  ]);
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="rounded-[1.8rem] bg-white p-4 shadow-lift">
      <p className="text-sm font-black uppercase text-oliveDeep">{language === "id" ? "Recommended next action" : "Recommended next action"}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-cocoaSoft">{output.nextStep}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {actions.map((item) => (
          <Link key={`${item.href}-${item.label}`} href={item.href} className={cn("focus-ring inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black transition hover:-translate-y-0.5", item.primary ? "bg-cocoa text-cream hover:bg-cocoa/90" : "bg-mint text-oliveDeep hover:bg-mint/80")}>
            {item.label}
            {item.primary && <ArrowRight className="h-4 w-4" />}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

function uniqueActions(actions: ({ label: string; href: string; primary?: boolean } | null)[]) {
  const seen = new Set<string>();
  return actions.filter((action): action is { label: string; href: string; primary?: boolean } => {
    if (!action || seen.has(action.href)) return false;
    seen.add(action.href);
    return true;
  });
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

type FoodSwap = {
  reduce: string;
  try: string;
};

type ReportGuidance = {
  whyItMatters: string[];
  nutritionGuidance: string;
  foodSwaps: FoodSwap[];
  exerciseIdeas: string[];
  reduce: string[];
  challenge: string[];
  cautions: string[];
};

function buildOutput({ taskType, topic, tone, language, isConnected }: { taskType: TaskType; topic: TopicKey; tone: Tone; language: Language; isConnected: boolean }): AgentOutput {
  const topicInfo = topics.find((item) => item.value === topic) ?? topics[0];
  const baseTopic = normalizeTopic(topic);
  const disease = diseases.find((item) => item.slug === baseTopic);
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
    const moduleName = baseTopic === "blood-pressure" ? "Hypertension" : baseTopic === "blood-sugar" ? "Type 2 Diabetes" : "BMI and healthy lifestyle";
    const visualKind = topic;
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
      related: baseTopic === "bmi" ? relatedButtons(language, ["type-2-diabetes", "hypertension", "classifier-link"]) : relatedButtons(language, [hrefToTopic(href), "classifier-link"]),
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
      related: relatedButtons(language, [baseTopic, "classifier-link"]),
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
    related: relatedButtons(language, [baseTopic, "classifier-link"]),
    visualKind: topic
  };
}

function getReportGuidance(topic: TopicKey, language: Language): ReportGuidance {
  const base = normalizeTopic(topic);
  const genericSwaps = language === "id"
    ? [
        { reduce: "Minuman manis terlalu sering", try: "Air putih lebih sering" },
        { reduce: "Snack ultra-proses", try: "Buah, sayur, telur, tahu, atau tempe" }
      ]
    : [
        { reduce: "Frequent sugary drinks", try: "Water more often" },
        { reduce: "Ultra-processed snacks", try: "Fruit, vegetables, eggs, tofu, or tempeh" }
      ];
  const genericMovement = language === "id"
    ? ["Jalan santai 10-20 menit", "Peregangan ringan", "Chair sit-to-stand", "Marching in place"]
    : ["10-20 minute easy walk", "Light stretching", "Chair sit-to-stand", "Marching in place"];
  const genericChallenge = language === "id"
    ? ["Ganti satu minuman manis dengan air putih.", "Tambah satu porsi sayur.", "Jalan santai 10 menit.", "Pilih opsi rebus/kukus sekali.", "Coba 2 set chair sit-to-stand.", "Tambahkan protein sederhana saat sarapan.", "Review kebiasaan yang paling mudah diulang."]
    : ["Replace one sugary drink with water.", "Add one serving of vegetables.", "Take a 10-minute walk.", "Choose one boiled or steamed option.", "Try 2 sets of chair sit-to-stand.", "Add simple protein to breakfast.", "Review the easiest habit to repeat."];

  if (base === "bmi") {
    const obesity = topic === "bmi-obesity";
    return {
      whyItMatters: language === "id"
        ? [
            obesity ? "Hasil BMI ini berada dalam rentang edukasi obesitas. BMI adalah alat skrining, bukan diagnosis." : "Hasil BMI ini dipakai sebagai sinyal edukasi tentang berat badan dan kebiasaan, bukan label medis.",
            "BMI tidak mengukur lemak tubuh secara langsung dan tidak mempertimbangkan massa otot, kehamilan, komposisi tubuh, usia, jenis kelamin, atau konteks medis individu.",
            "Ini bisa menjadi alasan untuk belajar tentang makan seimbang, gerak ringan, tidur, tekanan darah, gula darah, dan kesehatan metabolik."
          ]
        : [
            obesity ? "This BMI result is in the obesity education range. BMI is a screening tool, not a diagnosis." : "This BMI result is an education signal about weight and habits, not a medical label.",
            "BMI does not measure body fat directly and does not account for muscle mass, pregnancy, body composition, age, sex, or individual medical context.",
            "This can be a reason to learn about healthier eating, movement, sleep, blood pressure, blood sugar, and metabolic health."
          ],
      nutritionGuidance: language === "id"
        ? "Bangun piring seimbang: protein + sayur + karbohidrat terkontrol. Coba makanan rebus/kukus lebih sering, tambah telur rebus, ikan, ayam, tahu, tempe, sayur, dan serat."
        : "Build balanced plates: protein + vegetables + controlled carbs. Try boiled or steamed foods more often, plus eggs, fish, chicken, tofu, tempeh, vegetables, and fiber-rich foods.",
      foodSwaps: language === "id"
        ? [
            { reduce: "Gorengan terlalu sering", try: "Makanan kukus/rebus lebih sering" },
            { reduce: "Makanan bertepung terlalu sering", try: "Piring seimbang dengan protein dan sayur" },
            { reduce: "Minuman manis", try: "Air putih lebih sering" },
            { reduce: "Snack ultra-proses", try: "Telur rebus, tahu, tempe, buah, atau sayur" }
          ]
        : [
            { reduce: "Frequent fried foods", try: "Steamed or boiled foods more often" },
            { reduce: "Frequent flour-heavy foods", try: "Balanced plate with protein and vegetables" },
            { reduce: "Sugary drinks", try: "Water more often" },
            { reduce: "Ultra-processed snacks", try: "Boiled eggs, tofu, tempeh, fruit, or vegetables" }
          ],
      exerciseIdeas: language === "id"
        ? ["Jalan 10-20 menit", "Bodyweight squat pelan", "Wall push-up", "Chair sit-to-stand", "Step-up di tangga", "Stretching ringan", "Beginner plank", "Marching in place"]
        : ["10-20 minute walk", "Slow bodyweight squat", "Wall push-up", "Chair sit-to-stand", "Step-up on stairs", "Light stretching", "Beginner plank", "Marching in place"],
      reduce: language === "id" ? ["Gorengan sering", "Minuman manis", "Snack ultra-proses", "Porsi karbo berlebih", "Duduk terlalu lama"] : ["Frequent fried foods", "Sugary drinks", "Ultra-processed snacks", "Oversized carb portions", "Long sitting"],
      challenge: genericChallenge,
      cautions: language === "id"
        ? ["Mulai perlahan. Berhenti jika muncul nyeri dada, sesak berat, pusing, pingsan, atau gejala mengkhawatirkan. Konsultasikan ke tenaga kesehatan jika ragu."]
        : ["Start slowly. Stop if chest pain, severe shortness of breath, dizziness, fainting, or concerning symptoms occur. Consult a healthcare professional if unsure."]
    };
  }

  if (base === "blood-pressure" || base === "hypertension") {
    return {
      whyItMatters: language === "id"
        ? ["Rentang tekanan darah perlu dipahami bersama teknik ukur, waktu ukur, istirahat sebelum ukur, dan pengukuran berulang.", "Hipertensi sering tidak terasa, jadi literasi tentang garam, aktivitas, dan red flags membantu mencegah salah paham.", "Catatan pembacaan sebaiknya tetap privat di catatan pribadi dan dibahas dengan tenaga kesehatan bila mengkhawatirkan."]
        : ["Blood pressure ranges should be understood with technique, timing, resting before measurement, and repeated checks.", "Hypertension can be silent, so literacy about salt, movement, and red flags helps prevent misunderstanding.", "Reading notes should stay private in your own notes and be discussed with a healthcare professional if concerning."],
      nutritionGuidance: language === "id" ? "Pelajari pola makan yang lebih rendah garam: kurangi makanan sangat asin dan instan, tambah sayur/buah, dan pilih air putih lebih sering." : "Learn lower-salt eating patterns: reduce very salty and instant foods, add vegetables/fruits, and choose water more often.",
      foodSwaps: language === "id"
        ? [{ reduce: "Makanan sangat asin", try: "Masakan rumahan dengan bumbu lebih ringan" }, { reduce: "Makanan instan/ultra-proses", try: "Protein sederhana + sayur" }, { reduce: "Minuman manis", try: "Air putih" }]
        : [{ reduce: "Very salty foods", try: "Home meals with lighter seasoning" }, { reduce: "Instant or ultra-processed foods", try: "Simple protein + vegetables" }, { reduce: "Sugary drinks", try: "Water" }],
      exerciseIdeas: language === "id" ? ["Jalan santai", "Bersepeda ringan", "Stretching", "Latihan kekuatan sederhana", "Pernapasan tenang sebelum ukur"] : ["Walking", "Light cycling", "Stretching", "Simple strength training", "Calm breathing before checking"],
      reduce: language === "id" ? ["Garam berlebih", "Makanan instan", "Duduk lama", "Merokok", "Alkohol berlebih"] : ["Excess salt", "Instant foods", "Long sitting", "Smoking", "Excess alcohol"],
      challenge: language === "id"
        ? ["Kurangi satu makanan asin hari ini.", "Tambah satu porsi buah/sayur.", "Jalan 10 menit.", "Minum air putih mengganti minuman manis.", "Coba stretching 5 menit.", "Jika mengukur tensi, istirahat dulu dan catat privat.", "Buka modul Hypertension."]
        : ["Reduce one salty food today.", "Add one fruit/vegetable serving.", "Walk for 10 minutes.", "Choose water instead of a sweet drink.", "Try 5 minutes of stretching.", "If checking BP, rest first and keep notes private.", "Open the Hypertension module."],
      cautions: language === "id" ? ["Cari bantuan segera jika ada nyeri dada, sakit kepala berat, kelemahan/kebas, sesak napas, bingung, atau gangguan penglihatan."] : ["Seek prompt help for chest pain, severe headache, weakness/numbness, shortness of breath, confusion, or vision changes."]
    };
  }

  if (base === "blood-sugar" || base === "type-2-diabetes") {
    return {
      whyItMatters: language === "id"
        ? ["Hasil gula darah perlu jenis pemeriksaan yang jelas dan sering membutuhkan konfirmasi, jadi satu angka bukan diagnosis.", "Belajar tentang karbohidrat, protein, serat, aktivitas setelah makan, dan tanda bahaya membantu membaca hasil dengan lebih aman.", "Modul Diabetes Tipe 2 memberi konteks metabolisme dan kebiasaan tanpa menyimpan data medis."]
        : ["Blood sugar results need a clear test type and often need confirmation, so one number is not a diagnosis.", "Learning about carbs, protein, fiber, movement after meals, and red flags helps you read results more safely.", "The Type 2 Diabetes module gives metabolism and habit context without storing medical data."],
      nutritionGuidance: language === "id" ? "Coba kurangi minuman manis dan snack manis terlalu sering. Seimbangkan karbohidrat dengan protein, serat, sayur, dan makanan minim proses." : "Try reducing frequent sugary drinks and sweet snacks. Balance carbs with protein, fiber, vegetables, and minimally processed foods.",
      foodSwaps: language === "id"
        ? [{ reduce: "Minuman manis", try: "Air putih atau minuman tanpa gula" }, { reduce: "Snack manis terlalu sering", try: "Buah utuh, telur, tahu, atau tempe" }, { reduce: "Karbo saja", try: "Karbo + protein + sayur" }]
        : [{ reduce: "Sugary drinks", try: "Water or unsweetened drinks" }, { reduce: "Frequent sweet snacks", try: "Whole fruit, eggs, tofu, or tempeh" }, { reduce: "Carbs alone", try: "Carbs + protein + vegetables" }],
      exerciseIdeas: language === "id" ? ["Jalan ringan setelah makan bila sesuai", "Low-impact home movement", "Chair sit-to-stand", "Bodyweight exercise ringan", "Stretching"] : ["Easy walk after meals if appropriate", "Low-impact home movement", "Chair sit-to-stand", "Light bodyweight exercise", "Stretching"],
      reduce: language === "id" ? ["Minuman manis", "Snack manis sering", "Porsi karbo besar", "Makanan ultra-proses"] : ["Sugary drinks", "Frequent sweet snacks", "Large carb portions", "Ultra-processed foods"],
      challenge: genericChallenge,
      cautions: language === "id" ? ["Cari bantuan jika ada bingung, muntah, sangat lemas, dehidrasi berat, pingsan, luka memburuk, atau gejala sangat mengkhawatirkan."] : ["Seek help for confusion, vomiting, extreme weakness, severe dehydration, fainting, worsening wounds, or very concerning symptoms."]
    };
  }

  if (base === "common-cold") {
    return {
      whyItMatters: language === "id"
        ? ["Pilek biasa umumnya infeksi virus ringan saluran napas atas dan sering membaik dalam 5-10 hari.", "Antibiotik tidak rutin digunakan karena penyebabnya biasanya virus.", "Literasi membantu membedakan perawatan umum di rumah dan tanda bahaya."]
        : ["Common cold is usually a mild viral upper-respiratory infection and often improves in 5-10 days.", "Antibiotics are not routinely used because the cause is usually viral.", "Literacy helps separate general home care from red flags."],
      nutritionGuidance: language === "id" ? "Fokus pada cairan, makanan bergizi, dan istirahat. Pilih makanan yang mudah diterima tubuh." : "Focus on fluids, nourishing foods, and rest. Choose foods your body tolerates well.",
      foodSwaps: language === "id" ? [{ reduce: "Begadang saat sakit", try: "Istirahat cukup" }, { reduce: "Minum kurang", try: "Cairan lebih sering" }] : [{ reduce: "Staying up while sick", try: "Enough rest" }, { reduce: "Too little fluid", try: "Fluids more often" }],
      exerciseIdeas: language === "id" ? ["Istirahat", "Jalan sangat ringan jika tubuh nyaman", "Peregangan lembut"] : ["Rest", "Very easy walking if comfortable", "Gentle stretching"],
      reduce: language === "id" ? ["Memaksakan aktivitas berat", "Berbagi alat makan saat sakit", "Mengabaikan handwashing"] : ["Forcing heavy activity", "Sharing utensils while sick", "Skipping handwashing"],
      challenge: language === "id" ? ["Minum air cukup.", "Tidur lebih awal.", "Cuci tangan lebih sering.", "Gunakan masker saat sakit bila perlu.", "Baca red flags.", "Rapikan area belajar/istirahat.", "Mulai modul Common Cold."] : ["Drink enough water.", "Sleep earlier.", "Wash hands more often.", "Use a mask when sick if needed.", "Read red flags.", "Tidy your rest/study area.", "Start the Common Cold module."],
      cautions: language === "id" ? ["Konsultasikan bila sesak napas, nyeri dada, demam tinggi/menetap, gejala memburuk, durasi lama, atau termasuk kelompok risiko tinggi."] : ["Consult if shortness of breath, chest pain, high/persistent fever, worsening symptoms, long duration, or high-risk group applies."]
    };
  }

  if (base === "gerd") {
    return {
      whyItMatters: language === "id" ? ["GERD terjadi ketika asam lambung naik ke esofagus.", "Pemicu sering terkait pola makan, porsi, posisi setelah makan, kafein, merokok, dan makanan pedas/berlemak.", "Tidak semua nyeri dada adalah GERD, jadi red flags harus jelas."] : ["GERD happens when stomach acid flows back into the esophagus.", "Triggers often relate to meals, portion size, lying down after eating, caffeine, smoking, and spicy/fatty foods.", "Not every chest discomfort is GERD, so red flags must stay clear."],
      nutritionGuidance: language === "id" ? "Coba porsi lebih kecil, kenali pemicu, dan hindari langsung berbaring setelah makan." : "Try smaller meals, identify triggers, and avoid lying down right after eating.",
      foodSwaps: language === "id" ? [{ reduce: "Porsi besar malam hari", try: "Porsi lebih kecil" }, { reduce: "Langsung rebahan setelah makan", try: "Duduk/berdiri dulu" }, { reduce: "Pemicu pedas/berlemak bila cocok", try: "Metode masak lebih ringan" }] : [{ reduce: "Large late meals", try: "Smaller portions" }, { reduce: "Lying down after meals", try: "Sit/stand first" }, { reduce: "Spicy/fatty triggers if relevant", try: "Lighter cooking methods" }],
      exerciseIdeas: language === "id" ? ["Jalan ringan setelah makan", "Stretching lembut", "Pernapasan tenang", "Hindari latihan berat tepat setelah makan"] : ["Easy walk after meals", "Gentle stretching", "Calm breathing", "Avoid heavy exercise right after meals"],
      reduce: language === "id" ? ["Porsi besar", "Rebahan setelah makan", "Kafein bila memicu", "Merokok", "Makanan pedas/berlemak bila memicu"] : ["Large meals", "Lying down after eating", "Caffeine if triggering", "Smoking", "Spicy/fatty foods if triggering"],
      challenge: language === "id" ? ["Catat satu pemicu makanan secara privat.", "Coba porsi lebih kecil.", "Jangan rebahan langsung setelah makan.", "Jalan ringan 10 menit.", "Pilih masakan lebih ringan sekali.", "Baca red flags GERD.", "Mulai modul GERD."] : ["Privately note one food trigger.", "Try a smaller portion.", "Avoid lying down right after eating.", "Walk lightly for 10 minutes.", "Choose one lighter-cooked meal.", "Read GERD red flags.", "Start the GERD module."],
      cautions: language === "id" ? ["Cari bantuan bila sulit menelan, muntah darah, BAB hitam, turun berat badan tanpa sebab, atau nyeri dada yang bisa terkait jantung."] : ["Seek help for trouble swallowing, vomiting blood, black stool, unexplained weight loss, or chest pain that could be heart-related."]
    };
  }

  if (base === "dengue-fever") {
    return {
      whyItMatters: language === "id" ? ["Dengue adalah infeksi virus yang ditularkan nyamuk Aedes.", "Pencegahan lingkungan dan pengenalan warning signs sangat penting karena kondisi bisa berubah cepat.", "Alo Agent tidak memberi rekomendasi obat; untuk kekhawatiran klinis, konsultasikan tenaga kesehatan."] : ["Dengue is a mosquito-borne viral infection transmitted by Aedes mosquitoes.", "Environmental prevention and warning-sign literacy matter because the condition can change quickly.", "Alo Agent does not give medicine recommendations; consult a healthcare professional for clinical concerns."],
      nutritionGuidance: language === "id" ? "Fokus edukasi pada cairan, pemantauan umum, dan segera mencari bantuan bila ada warning signs." : "Education focus: fluids, general monitoring, and prompt help when warning signs appear.",
      foodSwaps: language === "id" ? [{ reduce: "Membiarkan genangan air", try: "Buang/tutup genangan" }, { reduce: "Gigitan nyamuk", try: "Repellent dan perlindungan rumah" }] : [{ reduce: "Standing water", try: "Remove or cover water containers" }, { reduce: "Mosquito bites", try: "Repellent and home protection" }],
      exerciseIdeas: language === "id" ? ["Istirahat saat demam", "Aktivitas ringan hanya jika pulih", "Fokus pencegahan nyamuk di rumah"] : ["Rest during fever", "Light activity only when recovered", "Focus on mosquito prevention at home"],
      reduce: language === "id" ? ["Genangan air", "Mengabaikan warning signs", "Menunda bantuan saat gejala berat"] : ["Standing water", "Ignoring warning signs", "Delaying help when symptoms are severe"],
      challenge: language === "id" ? ["Cek satu area genangan.", "Tutup wadah air.", "Pelajari warning signs.", "Gunakan perlindungan gigitan nyamuk.", "Ajak rumah cek lingkungan.", "Baca modul Dengue.", "Ulangi checklist pencegahan."] : ["Check one standing-water area.", "Cover water containers.", "Learn warning signs.", "Use bite prevention.", "Invite household prevention check.", "Read the Dengue module.", "Repeat the prevention checklist."],
      cautions: language === "id" ? ["Nyeri perut berat, muntah terus, perdarahan, lemas ekstrem, sulit bernapas, atau kulit dingin/lembap membutuhkan bantuan medis segera."] : ["Severe abdominal pain, persistent vomiting, bleeding, extreme weakness, difficulty breathing, or cold/clammy skin require urgent medical care."]
    };
  }

  return {
    whyItMatters: language === "id" ? ["Alo Agent mengubah topik menjadi task belajar yang mudah ditindaklanjuti.", "Tujuannya literasi kesehatan, bukan keputusan medis."] : ["Alo Agent turns the topic into an actionable learning task.", "The goal is health literacy, not medical decision-making."],
    nutritionGuidance: language === "id" ? "Gunakan panduan ini sebagai edukasi kebiasaan umum yang aman dan tidak personal." : "Use this as safe, general habit education, not personalized advice.",
    foodSwaps: genericSwaps,
    exerciseIdeas: genericMovement,
    reduce: language === "id" ? ["Kebiasaan ekstrem", "Membaca satu angka tanpa konteks"] : ["Extreme habits", "Reading one number without context"],
    challenge: genericChallenge,
    cautions: language === "id" ? ["Konsultasikan tenaga kesehatan bila ada gejala berat, menetap, atau mengkhawatirkan."] : ["Consult a healthcare professional when symptoms are severe, persistent, or concerning."]
  };
}

function getTopicCopy(topic: TopicKey, language: Language) {
  const base = normalizeTopic(topic);
  const map: Record<BaseTopicKey, { why: Record<Language, string>; misconception: Record<Language, string>; chips: Record<Language, string[]>; cautions: Record<Language, string[]> }> = {
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
    why: map[base].why[language],
    misconception: map[base].misconception[language],
    chips: map[base].chips[language],
    cautions: map[base].cautions[language]
  };
}

function normalizeTopic(topic: TopicKey): BaseTopicKey {
  if (topic.startsWith("blood-pressure")) return "blood-pressure";
  if (topic.startsWith("blood-sugar")) return "blood-sugar";
  if (topic.startsWith("bmi")) return "bmi";
  return topic as BaseTopicKey;
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
