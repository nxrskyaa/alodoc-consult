"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, CheckCircle2, Play, ShieldCheck, Sparkles } from "lucide-react";
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
      <section className="alodoc-surface grid gap-8 overflow-hidden rounded-[2.5rem] border border-cocoa/10 p-5 shadow-soft sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.82fr)] lg:items-center">
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
        <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment shadow-soft">
          <AnimatedAloAgentOrb active={runState === "running"} />
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
            <AgentVisual compact className="h-28 min-h-0 w-28 shrink-0 shadow-none" />
            <p className="text-sm font-bold leading-6 text-cocoaSoft">{runState === "running" ? (language === "id" ? "Pipeline sedang berjalan. Output akan muncul setelah Judge Agent selesai." : "The pipeline is running. Output appears after the Judge Agent finishes.") : idle}</p>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="mt-6 grid gap-4">
          <p className="rounded-[1.6rem] bg-white p-5 text-sm font-semibold leading-6 text-cocoaSoft shadow-lift">{output.summary}</p>
          <div className="grid gap-2">
            {output.points.map((point) => (
              <div key={point} className="flex gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-cocoaSoft shadow-lift">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-oliveDeep" />
                {point}
              </div>
            ))}
          </div>
          <div className="rounded-[1.6rem] bg-mint p-4 text-sm font-black leading-6 text-oliveDeep">{output.remember}</div>
          <div className="rounded-[1.6rem] bg-orange/10 p-4 text-sm font-bold leading-6 text-cocoaSoft">{output.safety}</div>
          <div className="flex flex-col gap-3 rounded-[1.6rem] bg-white p-4 shadow-lift sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold leading-6 text-cocoaSoft">{output.nextStep}</p>
            <Link href={output.href} className="focus-ring inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-black text-cream transition hover:-translate-y-0.5 hover:bg-cocoa/90">
              {output.action} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}

type AgentOutput = {
  heading: string;
  summary: string;
  points: string[];
  remember: string;
  safety: string;
  nextStep: string;
  href: string;
  action: string;
};

function buildOutput({ taskType, topic, tone, language, isConnected }: { taskType: TaskType; topic: TopicKey; tone: Tone; language: Language; isConnected: boolean }): AgentOutput {
  const topicInfo = topics.find((item) => item.value === topic) ?? topics[0];
  const disease = diseases.find((item) => item.slug === topic);
  const href = topicInfo.href;
  const action = language === "id" ? "Mulai belajar" : "Start learning";
  const tonePrefix = {
    simple: { id: "Versi sederhana:", en: "Simple version:" },
    summary: { id: "Ringkasan singkat:", en: "Short summary:" },
    memory: { id: "Trik ingat:", en: "Memory trick:" },
    steps: { id: "Langkah demi langkah:", en: "Step-by-step:" }
  }[tone][language];
  const safety = language === "id" ? "This is education only, not diagnosis." : "This is education only, not diagnosis.";

  if (taskType === "classifier") {
    const moduleName = topic === "blood-pressure" ? "Hypertension" : topic === "blood-sugar" ? "Type 2 Diabetes" : "BMI and healthy lifestyle";
    return {
      heading: language === "id" ? `Penjelasan contoh ${topicInfo.label.id}` : `Sample ${topicInfo.label.en} explanation`,
      summary: `${tonePrefix} ${language === "id" ? "Rentang ini hanya contoh edukatif. Hasil classifier perlu konteks, pengukuran yang benar, dan diskusi profesional bila mengkhawatirkan." : "This range is an educational example only. Classifier results need context, correct measurement, and professional discussion when concerning."}`,
      points: language === "id"
        ? ["Bukan diagnosis dan bukan rekomendasi pengobatan.", `Modul terkait: ${moduleName}.`, "Cari bantuan profesional jika hasil disertai gejala berat, menetap, atau mengkhawatirkan."]
        : ["Not a diagnosis and not a treatment recommendation.", `Related learning module: ${moduleName}.`, "Consult a professional if the result is paired with severe, persistent, or concerning symptoms."],
      remember: tone === "memory" ? (language === "id" ? "Angka + konteks + konfirmasi, bukan angka saja." : "Number plus context plus confirmation, not the number alone.") : (language === "id" ? "Gunakan hasil sebagai pintu belajar, bukan kesimpulan medis." : "Use the result as a learning doorway, not a medical conclusion."),
      safety,
      nextStep: language === "id" ? "Pelajari modul terkait untuk memahami pencegahan dan tanda bahaya." : "Learn the related module to understand prevention and red flags.",
      href,
      action
    };
  }

  if (taskType === "quiz") {
    return {
      heading: language === "id" ? `Pelatih quiz: ${topicInfo.label.id}` : `Quiz coach: ${topicInfo.label.en}`,
      summary: `${tonePrefix} ${language === "id" ? "Alo Agent mengubah kesalahan quiz menjadi konsep kecil yang mudah diingat." : "Alo Agent turns a quiz miss into one small concept that is easier to remember."}`,
      points: language === "id"
        ? ["Cari kata kunci pada pertanyaan, bukan menebak dari rasa familiar.", "Hubungkan jawaban dengan bagian modul yang menjelaskan penyebab, pencegahan, atau red flags.", "Ulangi quiz setelah membaca ringkasan singkat."]
        : ["Look for the question keyword instead of guessing from familiarity.", "Connect the answer to the module section about causes, prevention, or red flags.", "Retake the quiz after reading the short explanation."],
      remember: tone === "memory" ? (language === "id" ? "Satu quiz salah = satu kalimat belajar baru." : "One missed quiz equals one new learning sentence.") : (language === "id" ? "Quiz menguji pemahaman, bukan diagnosis." : "The quiz tests understanding, not diagnosis."),
      safety,
      nextStep: language === "id" ? "Mulai modul terkait, lalu ulangi quiz." : "Start the related module, then retake the quiz.",
      href: disease ? `/disease/${disease.slug}/quiz` : href,
      action: language === "id" ? "Buka quiz" : "Open quiz"
    };
  }

  if (taskType === "next") {
    const next = diseases.find((item) => item.slug === learningPath[0]) ?? diseases[0];
    return {
      heading: language === "id" ? "Rekomendasi belajar berikutnya" : "Next learning recommendation",
      summary: `${tonePrefix} ${language === "id" ? "Mulai dari modul ringan, lalu lanjut ke literasi infeksi, tekanan darah, metabolisme, dan pencernaan." : "Start with a lighter module, then move through infection, blood pressure, metabolism, and digestive literacy."}`,
      points: learningPath.map((slug, index) => {
        const item = diseases.find((diseaseItem) => diseaseItem.slug === slug) ?? diseases[0];
        return `${index + 1}. ${item.title[language]}`;
      }),
      remember: isConnected ? copy[language].connected : copy[language].disconnected,
      safety,
      nextStep: language === "id" ? "Mulai dari modul pertama, lalu bangun Passport setelah quiz." : "Start with the first module, then build your Passport after quizzes.",
      href: `/disease/${next.slug}`,
      action
    };
  }

  const redFlag = disease?.sections.find((section) => /red|bahaya/i.test(`${section.title.en} ${section.title.id}`));
  return {
    heading: language === "id" ? `Tutor Agent: ${topicInfo.label.id}` : `Tutor Agent: ${topicInfo.label.en}`,
    summary: `${tonePrefix} ${disease?.shortDescription[language] ?? (language === "id" ? "Topik ini dipakai sebagai contoh edukasi umum." : "This topic is used as a general education example.")}`,
    points: [
      disease?.sections[0]?.body[language] ?? (language === "id" ? "Pahami definisi topik dengan bahasa sederhana." : "Understand the topic definition in simple language."),
      disease?.sections[1]?.body[language] ?? (language === "id" ? "Kenali penyebab, pemicu, atau konteks umum." : "Recognize causes, triggers, or general context."),
      redFlag?.body[language] ?? (language === "id" ? "Ingat tanda bahaya dan cari bantuan bila mengkhawatirkan." : "Remember red flags and seek help if concerning.")
    ],
    remember: tone === "memory" ? (language === "id" ? "Definisi, penyebab, tanda bahaya, lalu langkah belajar berikutnya." : "Definition, causes, red flags, then the next learning step.") : (language === "id" ? "Fokus pada literasi kesehatan, bukan diagnosis mandiri." : "Focus on health literacy, not self-diagnosis."),
    safety,
    nextStep: language === "id" ? "Buka modul lengkap dan lanjutkan ke quiz." : "Open the full module and continue to the quiz.",
    href,
    action
  };
}
