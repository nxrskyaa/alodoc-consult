"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpen, BrainCircuit, CheckCircle2, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { AgentVisual } from "@/components/visuals/AgentVisual";
import { ClassifierVisual } from "@/components/visuals/ClassifierVisual";
import { DiseaseVisual } from "@/components/visuals/DiseaseVisual";
import { ScaleWorkflowVisual } from "@/components/visuals/ScaleWorkflowVisual";
import { diseases, type Language } from "@/data/diseases";
import { cn } from "@/lib/utils";

type AgentMode = "module" | "classifier" | "quiz" | "next";

const copy = {
  id: {
    eyebrow: "Simulasi offchain",
    title: "Alo Agent",
    subtitle: "Panduan edukasi kesehatan yang terinspirasi SCALE.",
    description:
      "Alo Agent membantumu memahami modul penyakit, hasil classifier, dan kesalahan quiz melalui penjelasan edukatif yang aman. Alo Agent bukan dokter dan tidak memberikan diagnosis.",
    language: "Bahasa",
    try: "Coba Alo Agent",
    select: "Pilih mode",
    response: "Simulasi respons agent",
    safetyTitle: "Edukasi saja, bukan diagnosis",
    safety:
      "Alo Agent hanya untuk edukasi umum. Alo Agent tidak memberikan diagnosis, keputusan pengobatan, atau saran medis darurat. Jika gejala berat, menetap, atau mengkhawatirkan, segera konsultasikan dengan tenaga kesehatan profesional.",
    workflowTitle: "Workflow edukasi terinspirasi SCALE",
    workflowText:
      "Alo Agent adalah layer Alodoc yang terinspirasi dari SCALE. Bukan untuk trading atau spekulasi, tetapi untuk workflow edukasi kesehatan: menjelaskan, menguji pemahaman, menilai hasil belajar, lalu membuka proof of learning.",
    currentMvp: "MVP saat ini: simulasi offchain dengan alur edukasi yang sudah disiapkan.",
    future:
      "Versi Rialo/SCALE nanti: pengguna membuat learning task, Tutor Agent menjelaskan, Quiz Agent menguji, dan Judge Agent memvalidasi sebelum badge atau proof terbuka.",
    notStored: "Tidak ada API, backend, kontrak, database, atau penyimpanan data medis."
  },
  en: {
    eyebrow: "Offchain simulation",
    title: "Alo Agent",
    subtitle: "Your SCALE-inspired health education guide.",
    description:
      "Alo Agent helps users understand disease modules, classifier results, and quiz mistakes through safe educational explanations. It is not a doctor and does not provide diagnosis.",
    language: "Language",
    try: "Try Alo Agent",
    select: "Choose mode",
    response: "Simulated agent response",
    safetyTitle: "Education only, not diagnosis",
    safety:
      "Alo Agent is for educational purposes only. It does not provide diagnosis, treatment decisions, or emergency medical advice. If symptoms are severe, persistent, or concerning, consult a qualified healthcare professional.",
    workflowTitle: "SCALE-inspired learning workflow",
    workflowText:
      "Alo Agent is the SCALE-inspired layer of Alodoc. Instead of using agents for trading or speculation, Alodoc uses agents for public-good health education workflows: explain, quiz, judge, and unlock proof of learning.",
    currentMvp: "Current MVP: simulated offchain with predefined educational flows.",
    future:
      "Future Rialo/SCALE version: a user can create a learning task, a Tutor Agent explains the topic, a Quiz Agent tests understanding, and a Judge Agent validates completion before a learning badge or proof is unlocked.",
    notStored: "No API, backend, contract, database, or medical-data storage."
  }
};

const modes = [
  {
    id: "module" as const,
    icon: BookOpen,
    title: { id: "Jelaskan Modul", en: "Explain Module" },
    text: { id: "Ringkas modul penyakit dengan aman.", en: "Summarize a disease module safely." }
  },
  {
    id: "classifier" as const,
    icon: BrainCircuit,
    title: { id: "Jelaskan Hasil Classifier", en: "Explain Classifier Result" },
    text: { id: "Gunakan contoh hasil, bukan data medis pribadi.", en: "Use sample results, not private medical data." }
  },
  {
    id: "quiz" as const,
    icon: GraduationCap,
    title: { id: "Pelatih Quiz", en: "Quiz Coach" },
    text: { id: "Pahami alasan di balik jawaban.", en: "Understand the why behind answers." }
  },
  {
    id: "next" as const,
    icon: Sparkles,
    title: { id: "Rekomendasi Belajar Berikutnya", en: "Next Learning Recommendation" },
    text: { id: "Ikuti jalur belajar umum.", en: "Follow a general learning path." }
  }
];

const classifierSamples = [
  {
    id: "high_bp",
    visual: "blood_pressure" as const,
    label: { id: "Rentang tekanan darah tinggi", en: "High blood pressure range" },
    title: { id: "Hasil ini perlu dipahami dengan hati-hati", en: "This result needs careful context" },
    points: {
      id: ["Ini bukan diagnosis dan perlu konfirmasi pengukuran berulang.", "Pelajari modul Hipertensi untuk memahami faktor risiko dan pencegahan.", "Segera cari bantuan jika ada nyeri dada, sesak, kelemahan satu sisi, atau kebingungan."],
      en: ["This is not a diagnosis and should be confirmed with repeated measurements.", "Learn the Hypertension module to understand risk factors and prevention.", "Seek help promptly for chest pain, shortness of breath, one-sided weakness, or confusion."]
    },
    href: "/disease/hypertension"
  },
  {
    id: "elevated_sugar",
    visual: "blood_sugar" as const,
    label: { id: "Rentang gula darah meningkat", en: "Elevated blood sugar range" },
    title: { id: "Gula darah perlu konteks jenis tes", en: "Blood sugar needs test context" },
    points: {
      id: ["Ini bukan diagnosis diabetes.", "GDP, GDS, dan HbA1c punya interpretasi berbeda.", "Pelajari modul Diabetes Tipe 2 dan diskusikan hasil yang mengkhawatirkan dengan tenaga kesehatan."],
      en: ["This is not a diabetes diagnosis.", "Fasting, random glucose, and HbA1c are interpreted differently.", "Learn Type 2 Diabetes and discuss concerning results with a healthcare professional."]
    },
    href: "/disease/type-2-diabetes"
  },
  {
    id: "bmi_overweight",
    visual: "bmi" as const,
    label: { id: "BMI berat badan berlebih", en: "BMI overweight range" },
    title: { id: "BMI adalah alat skrining sederhana", en: "BMI is a simple screening tool" },
    points: {
      id: ["BMI tidak mengukur komposisi tubuh secara langsung.", "Gunakan sebagai pintu belajar metabolisme, gula darah, dan tekanan darah.", "Pelajari Diabetes Tipe 2 dan Hipertensi sebagai modul terkait gaya hidup sehat."],
      en: ["BMI does not directly measure body composition.", "Use it as a learning doorway into metabolism, blood sugar, and blood pressure.", "Learn Type 2 Diabetes and Hypertension as related healthy lifestyle modules."]
    },
    href: "/disease/type-2-diabetes"
  },
  {
    id: "bmi_normal",
    visual: "bmi" as const,
    label: { id: "BMI rentang normal", en: "BMI normal range" },
    title: { id: "Tetap pelajari kebiasaan seimbang", en: "Keep learning balanced habits" },
    points: {
      id: ["BMI normal tidak menggambarkan semua aspek kesehatan.", "Tetap pelajari aktivitas fisik, tidur, pencegahan, dan nutrisi seimbang.", "Modul Hipertensi dan Diabetes Tipe 2 membantu memahami pencegahan jangka panjang."],
      en: ["A normal BMI does not describe every aspect of health.", "Keep learning movement, sleep, prevention, and balanced nutrition.", "Hypertension and Type 2 Diabetes modules help with long-term prevention literacy."]
    },
    href: "/disease/hypertension"
  },
  {
    id: "low_sugar",
    visual: "blood_sugar" as const,
    label: { id: "Rentang gula darah rendah", en: "Low blood sugar range" },
    title: { id: "Nilai rendah perlu perhatian konteks", en: "Low values need context" },
    points: {
      id: ["Ini bukan diagnosis dan perlu dilihat bersama kondisi klinis.", "Jika disertai bingung, sangat lemas, pingsan, atau gejala berat, cari bantuan medis.", "Pelajari dasar gula darah di modul Diabetes Tipe 2."],
      en: ["This is not a diagnosis and needs clinical context.", "If paired with confusion, extreme weakness, fainting, or severe symptoms, seek medical help.", "Learn blood sugar basics in the Type 2 Diabetes module."]
    },
    href: "/disease/type-2-diabetes"
  }
];

const quizTopics = [
  {
    id: "cold_antibiotics",
    label: { id: "Mengapa antibiotik tidak rutin untuk pilek", en: "Why antibiotics are not routinely used for common cold" },
    title: { id: "Pilek biasa umumnya disebabkan virus", en: "Common colds are usually viral" },
    points: {
      id: ["Antibiotik bekerja untuk bakteri, bukan virus.", "Trik ingat: pilek biasa = virus dulu, antibiotik bukan jawaban rutin.", "Takeaway: fokus pada istirahat, cairan, dan tanda bahaya."],
      en: ["Antibiotics target bacteria, not viruses.", "Memory trick: common cold equals viral first, antibiotics are not routine.", "Takeaway: focus on rest, fluids, comfort, and red flags."]
    }
  },
  {
    id: "silent_bp",
    label: { id: "Mengapa hipertensi bisa senyap", en: "Why hypertension can be silent" },
    title: { id: "Tekanan darah tinggi sering tidak terasa", en: "High blood pressure often has no symptoms" },
    points: {
      id: ["Seseorang bisa merasa biasa saja meski tekanan darah meningkat.", "Trik ingat: tensi perlu diukur, bukan ditebak dari rasa.", "Takeaway: pemeriksaan berulang lebih bermakna daripada satu angka."],
      en: ["A person can feel fine even when blood pressure is elevated.", "Memory trick: blood pressure is measured, not guessed by feeling.", "Takeaway: repeated checks matter more than one number."]
    }
  },
  {
    id: "sugar_confirm",
    label: { id: "Mengapa gula darah perlu konfirmasi", en: "Why blood sugar needs confirmation" },
    title: { id: "Jenis tes mengubah interpretasi", en: "Test type changes interpretation" },
    points: {
      id: ["Gula darah puasa, sewaktu, dan HbA1c tidak sama.", "Trik ingat: angka + jenis tes + konteks.", "Takeaway: gunakan hasil sebagai bahan edukasi dan diskusi profesional."],
      en: ["Fasting glucose, random glucose, and HbA1c are not the same.", "Memory trick: number plus test type plus context.", "Takeaway: use results for education and professional discussion."]
    }
  },
  {
    id: "dengue_warning",
    label: { id: "Mengapa tanda bahaya dengue penting", en: "Why dengue warning signs matter" },
    title: { id: "Dengue dapat berubah cepat", en: "Dengue can change quickly" },
    points: {
      id: ["Nyeri perut berat, muntah terus, perdarahan, atau lemas ekstrem perlu perhatian segera.", "Trik ingat: dengue bukan hanya demam, pantau tanda bahaya.", "Takeaway: red flags perlu bantuan medis."],
      en: ["Severe abdominal pain, persistent vomiting, bleeding, or extreme weakness need prompt attention.", "Memory trick: dengue is not only fever, watch warning signs.", "Takeaway: red flags need medical care."]
    }
  },
  {
    id: "gerd_red_flags",
    label: { id: "Mengapa red flags GERD penting", en: "Why GERD red flags matter" },
    title: { id: "Tidak semua nyeri dada adalah GERD", en: "Not every chest discomfort is GERD" },
    points: {
      id: ["Nyeri dada bisa berkaitan dengan jantung.", "Trik ingat: sulit menelan, muntah darah, BAB hitam, turun berat badan = jangan abaikan.", "Takeaway: gejala berat atau menetap perlu tenaga kesehatan."],
      en: ["Chest discomfort can be heart-related.", "Memory trick: trouble swallowing, vomiting blood, black stool, weight loss equals do not ignore.", "Takeaway: severe or persistent symptoms need professional care."]
    }
  }
];

const learningPath = ["common-cold", "dengue-fever", "hypertension", "type-2-diabetes", "gerd"];

export function AloAgentPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [mode, setMode] = useState<AgentMode>("module");
  const [moduleSlug, setModuleSlug] = useState(diseases[0].slug);
  const [classifierId, setClassifierId] = useState(classifierSamples[0].id);
  const [quizId, setQuizId] = useState(quizTopics[0].id);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    setThinking(true);
    const timer = window.setTimeout(() => setThinking(false), 420);
    return () => window.clearTimeout(timer);
  }, [language, mode, moduleSlug, classifierId, quizId]);

  const selectedDisease = diseases.find((disease) => disease.slug === moduleSlug) ?? diseases[0];
  const selectedClassifier = classifierSamples.find((sample) => sample.id === classifierId) ?? classifierSamples[0];
  const selectedQuiz = quizTopics.find((topic) => topic.id === quizId) ?? quizTopics[0];
  const response = useMemo(() => buildResponse(mode, language, selectedDisease, selectedClassifier, selectedQuiz), [mode, language, selectedDisease, selectedClassifier, selectedQuiz]);
  const t = copy[language];

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 overflow-x-hidden">
      <section className="alodoc-surface grid gap-8 overflow-hidden rounded-[2.5rem] border border-cocoa/10 p-5 shadow-soft sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.82fr)] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <span className="inline-flex rounded-full bg-mint px-4 py-2 text-xs font-black uppercase text-oliveDeep">{t.eyebrow}</span>
          <h1 className="mt-5 text-4xl font-black leading-tight text-cocoa sm:text-5xl lg:text-6xl">{t.title}</h1>
          <p className="mt-4 text-xl font-extrabold leading-8 text-cocoa">{t.subtitle}</p>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-cocoaSoft">{t.description}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#agent-workbench" className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-alertClay/90 active:scale-[0.98]">
              {t.try} <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/library" className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-cocoa shadow-lift transition hover:-translate-y-0.5 hover:bg-mint/60 active:scale-[0.98]">
              <BookOpen className="h-4 w-4" /> Library
            </Link>
          </div>
          <div className="mt-6 flex w-full max-w-full rounded-full bg-white p-1 shadow-lift sm:w-fit">
            {(["id", "en"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLanguage(item)}
                className={cn("focus-ring min-h-[42px] flex-1 rounded-full px-4 py-2 text-sm font-black transition sm:flex-none", language === item ? "bg-cocoa text-cream" : "text-cocoaSoft hover:bg-mint")}
              >
                {item === "id" ? "Indonesia" : "English"}
              </button>
            ))}
          </div>
        </motion.div>
        <AgentVisual className="min-h-[320px]" />
      </section>

      <section id="agent-workbench" className="grid scroll-mt-28 gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid min-w-0 gap-5">
          <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-5">
            <p className="px-1 text-sm font-black uppercase text-oliveDeep">{t.select}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {modes.map((item) => {
                const Icon = item.icon;
                const active = mode === item.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMode(item.id)}
                    className={cn("focus-ring min-w-0 rounded-[1.5rem] border bg-white p-4 text-left shadow-lift transition", active ? "border-orange ring-4 ring-orange/15" : "border-cocoa/10 hover:border-olive/40 hover:bg-mint/25")}
                  >
                    <div className={cn("grid h-11 w-11 place-items-center rounded-2xl", active ? "bg-orange text-white" : "bg-mint text-oliveDeep")}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-black text-cocoa">{item.title[language]}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">{item.text[language]}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>
          <ControlPanel
            language={language}
            mode={mode}
            moduleSlug={moduleSlug}
            setModuleSlug={setModuleSlug}
            classifierId={classifierId}
            setClassifierId={setClassifierId}
            quizId={quizId}
            setQuizId={setQuizId}
          />
        </div>

        <div className="grid min-w-0 gap-5">
          <VisualForMode mode={mode} diseaseSlug={selectedDisease.slug} classifierType={selectedClassifier.visual} />
          <AgentResponseCard language={language} title={t.response} thinking={thinking} response={response} />
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch">
        <ScaleWorkflowVisual className="min-h-[420px]" />
        <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-8">
          <p className="text-sm font-black uppercase text-oliveDeep">SCALE</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-cocoa sm:text-4xl">{t.workflowTitle}</h2>
          <p className="mt-4 text-base font-semibold leading-7 text-cocoaSoft">{t.workflowText}</p>
          <div className="mt-6 grid gap-3">
            {[t.currentMvp, t.future, t.notStored].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-white p-4 text-sm font-bold leading-6 text-cocoaSoft shadow-lift">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-oliveDeep" />
                {item}
              </div>
            ))}
          </div>
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

function ControlPanel({
  language,
  mode,
  moduleSlug,
  setModuleSlug,
  classifierId,
  setClassifierId,
  quizId,
  setQuizId
}: {
  language: Language;
  mode: AgentMode;
  moduleSlug: string;
  setModuleSlug: (value: string) => void;
  classifierId: string;
  setClassifierId: (value: string) => void;
  quizId: string;
  setQuizId: (value: string) => void;
}) {
  if (mode === "module") {
    return (
      <SelectCard label={language === "id" ? "Pilih modul penyakit" : "Select disease module"} value={moduleSlug} onChange={setModuleSlug}>
        {diseases.map((disease) => (
          <option key={disease.slug} value={disease.slug}>
            {disease.title[language]}
          </option>
        ))}
      </SelectCard>
    );
  }

  if (mode === "classifier") {
    return (
      <SelectCard label={language === "id" ? "Pilih contoh hasil classifier" : "Select sample classifier result"} value={classifierId} onChange={setClassifierId}>
        {classifierSamples.map((sample) => (
          <option key={sample.id} value={sample.id}>
            {sample.label[language]}
          </option>
        ))}
      </SelectCard>
    );
  }

  if (mode === "quiz") {
    return (
      <SelectCard label={language === "id" ? "Pilih topik pelatih quiz" : "Select quiz coach topic"} value={quizId} onChange={setQuizId}>
        {quizTopics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.label[language]}
          </option>
        ))}
      </SelectCard>
    );
  }

  return (
    <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft">
      <p className="text-sm font-black uppercase text-oliveDeep">{language === "id" ? "Jalur belajar umum" : "Generic learning path"}</p>
      <div className="mt-4 grid gap-2">
        {learningPath.map((slug, index) => {
          const disease = diseases.find((item) => item.slug === slug) ?? diseases[0];
          return (
            <Link key={slug} href={`/disease/${slug}`} className="focus-ring flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-black text-cocoa shadow-lift transition hover:-translate-y-0.5 hover:bg-mint/50">
              <span>{index + 1}. {disease.title[language]}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SelectCard({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
  return (
    <label className="grid gap-3 rounded-[2rem] border border-cocoa/10 bg-parchment p-5 text-sm font-black text-cocoa shadow-soft">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="focus-ring min-h-[58px] w-full min-w-0 rounded-2xl border border-cocoa/10 bg-white px-4 py-3 text-base font-bold text-cocoa shadow-lift transition focus:border-olive">
        {children}
      </select>
    </label>
  );
}

function VisualForMode({ mode, diseaseSlug, classifierType }: { mode: AgentMode; diseaseSlug: string; classifierType: "blood_pressure" | "blood_sugar" | "bmi" }) {
  if (mode === "module") return <DiseaseVisual slug={diseaseSlug} className="min-h-[300px]" />;
  if (mode === "classifier") return <ClassifierVisual type={classifierType} className="min-h-[300px]" />;
  if (mode === "quiz") return <AgentVisual compact className="min-h-[260px]" />;
  return <ScaleWorkflowVisual className="min-h-[320px]" />;
}

function AgentResponseCard({
  language,
  title,
  thinking,
  response
}: {
  language: Language;
  title: string;
  thinking: boolean;
  response: {
    heading: string;
    summary: string;
    points: string[];
    remember: string;
    nextStep: string;
    href?: string;
  };
}) {
  return (
    <motion.article layout className="min-w-0 overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mint text-oliveDeep shadow-lift">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-black uppercase text-oliveDeep">{title}</p>
          <h2 className="truncate text-2xl font-black text-cocoa">{response.heading}</h2>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {thinking ? (
          <motion.div key="thinking" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-6 rounded-[1.6rem] bg-white p-5 shadow-lift">
            <div className="flex items-center gap-2 text-sm font-black text-cocoaSoft">
              {language === "id" ? "Alo Agent sedang menyusun penjelasan" : "Alo Agent is preparing an explanation"}
              {[0, 1, 2].map((dot) => (
                <motion.span key={dot} className="h-2 w-2 rounded-full bg-orange" animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.12 }} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key={response.heading} initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mt-6 grid gap-4">
            <p className="rounded-[1.6rem] bg-white p-5 text-sm font-semibold leading-6 text-cocoaSoft shadow-lift">{response.summary}</p>
            <div className="grid gap-2">
              {response.points.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-bold leading-6 text-cocoaSoft shadow-lift">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-oliveDeep" />
                  {point}
                </div>
              ))}
            </div>
            <div className="rounded-[1.6rem] bg-mint p-4 text-sm font-black leading-6 text-oliveDeep">{response.remember}</div>
            <div className="flex flex-col gap-3 rounded-[1.6rem] bg-white p-4 shadow-lift sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-bold leading-6 text-cocoaSoft">{response.nextStep}</p>
              {response.href && (
                <Link href={response.href} className="focus-ring inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-black text-cream transition hover:-translate-y-0.5 hover:bg-cocoa/90">
                  {language === "id" ? "Mulai belajar" : "Start learning"} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function buildResponse(
  mode: AgentMode,
  language: Language,
  disease: (typeof diseases)[number],
  classifier: (typeof classifierSamples)[number],
  quiz: (typeof quizTopics)[number]
) {
  if (mode === "module") {
    const redFlag = disease.sections.find((section) => /red|bahaya/i.test(`${section.title.en} ${section.title.id}`));
    return {
      heading: disease.title[language],
      summary: disease.shortDescription[language],
      points: [
        disease.sections[0]?.body[language] ?? disease.shortDescription[language],
        disease.sections[1]?.body[language] ?? disease.sections[0]?.bullets[language][0] ?? disease.shortDescription[language],
        redFlag?.body[language] ?? (language === "id" ? "Perhatikan tanda bahaya dan cari bantuan jika mengkhawatirkan." : "Watch red flags and seek help if concerning.")
      ],
      remember: language === "id" ? "Yang perlu diingat: pahami konsep, bukan menghafal diagnosis." : "What to remember: understand the concept, do not memorize a diagnosis.",
      nextStep: language === "id" ? "Lanjutkan ke modul dan quiz untuk membangun proof of learning." : "Continue to the module and quiz to build proof of learning.",
      href: `/disease/${disease.slug}`
    };
  }

  if (mode === "classifier") {
    return {
      heading: classifier.label[language],
      summary: classifier.title[language],
      points: classifier.points[language],
      remember: language === "id" ? "Ini bukan diagnosis. Alo Agent hanya menjelaskan contoh hasil secara edukatif." : "This is not a diagnosis. Alo Agent only explains sample results for education.",
      nextStep: language === "id" ? "Pelajari modul terkait untuk memahami konteks dan pencegahan." : "Learn the related module to understand context and prevention.",
      href: classifier.href
    };
  }

  if (mode === "quiz") {
    return {
      heading: quiz.label[language],
      summary: quiz.title[language],
      points: quiz.points[language],
      remember: language === "id" ? "Trik belajar: ubah jawaban salah menjadi satu kalimat sederhana yang bisa kamu ulang." : "Study trick: turn a missed answer into one simple sentence you can repeat.",
      nextStep: language === "id" ? "Coba modul dan quiz terkait setelah membaca penjelasan." : "Try the related module and quiz after reading the explanation.",
      href: "/library"
    };
  }

  return {
    heading: language === "id" ? "Jalur belajar berikutnya" : "Next learning path",
    summary: language === "id" ? "Karena Alo Agent V1 tidak membaca wallet atau menyimpan data medis, rekomendasi ini memakai jalur belajar umum." : "Because Alo Agent V1 does not read wallets or store medical data, this recommendation uses a generic learning path.",
    points: learningPath.map((slug) => {
      const item = diseases.find((diseaseItem) => diseaseItem.slug === slug) ?? diseases[0];
      return item.title[language];
    }),
    remember: language === "id" ? "Mulai dari topik ringan, lalu lanjut ke topik metabolik dan pencernaan." : "Start with lighter topics, then move into metabolic and digestive literacy.",
    nextStep: language === "id" ? "Buka library untuk memilih quest pertama." : "Open the library to choose your first quest.",
    href: "/library"
  };
}
