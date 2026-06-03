"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import { AloGuideBubble } from "@/components/AloGuideBubble";
import { AnimatedDiseaseVisual } from "@/components/AnimatedDiseaseVisual";
import { AlodocLogo } from "@/components/branding/AlodocLogo";
import { diseases, getDiseaseBySlug, type Language } from "@/data/diseases";
import { cn } from "@/lib/utils";

type TopicKey = "respiratory" | "fever" | "pressure" | "sugar" | "digestion";

type Signal = {
  id: string;
  label: Record<Language, string>;
};

type Topic = {
  key: TopicKey;
  title: Record<Language, string>;
  text: Record<Language, string>;
  slug: string;
  signals: Signal[];
};

const classifierDisclaimer = {
  en: "Alodoc Classifier is for education only. It does not diagnose, treat, or provide medical advice. If symptoms are severe, persistent, or concerning, consult a qualified healthcare professional.",
  id: "Alodoc Classifier hanya untuk edukasi. Fitur ini tidak memberikan diagnosis, pengobatan, atau saran medis. Jika gejala berat, menetap, atau mengkhawatirkan, segera konsultasikan dengan tenaga kesehatan profesional."
};

const topics: Topic[] = [
  {
    key: "respiratory",
    title: { en: "Respiratory", id: "Pernapasan" },
    text: { en: "Runny nose, cough, sore throat, or sneezing.", id: "Pilek, batuk, tenggorokan tidak nyaman, atau bersin." },
    slug: "common-cold",
    signals: [
      { id: "runny-nose", label: { en: "Runny nose", id: "Pilek" } },
      { id: "cough", label: { en: "Cough", id: "Batuk" } },
      { id: "sore-throat", label: { en: "Sore throat", id: "Tenggorokan tidak nyaman" } },
      { id: "sneezing", label: { en: "Sneezing", id: "Bersin" } }
    ]
  },
  {
    key: "fever",
    title: { en: "Fever & infection awareness", id: "Demam & infeksi" },
    text: { en: "Fever, body aches, rash awareness, or mosquito bite risk.", id: "Demam, nyeri badan, kesadaran ruam, atau risiko gigitan nyamuk." },
    slug: "dengue-fever",
    signals: [
      { id: "high-fever", label: { en: "High fever", id: "Demam tinggi" } },
      { id: "body-aches", label: { en: "Body aches", id: "Nyeri badan" } },
      { id: "rash", label: { en: "Rash awareness", id: "Ruam" } },
      { id: "mosquito", label: { en: "Mosquito bite risk", id: "Risiko gigitan nyamuk" } }
    ]
  },
  {
    key: "pressure",
    title: { en: "Blood pressure & heart health", id: "Tekanan darah & jantung" },
    text: { en: "Silent risk, salt, lifestyle, or routine checks.", id: "Risiko tanpa gejala, garam, gaya hidup, atau cek rutin." },
    slug: "hypertension",
    signals: [
      { id: "silent-risk", label: { en: "Learning about silent risk", id: "Belajar risiko tanpa gejala" } },
      { id: "salt", label: { en: "Salt and lifestyle", id: "Garam dan gaya hidup" } },
      { id: "routine-check", label: { en: "Routine blood pressure check", id: "Cek tekanan darah berkala" } }
    ]
  },
  {
    key: "sugar",
    title: { en: "Blood sugar & metabolism", id: "Gula darah & metabolisme" },
    text: { en: "Thirst awareness, urination awareness, family risk, or lifestyle learning.", id: "Kesadaran sering haus, sering BAK, riwayat keluarga, atau pola hidup." },
    slug: "type-2-diabetes",
    signals: [
      { id: "thirst", label: { en: "Frequent thirst awareness", id: "Sering haus" } },
      { id: "urination", label: { en: "Frequent urination awareness", id: "Sering BAK" } },
      { id: "family-risk", label: { en: "Family risk", id: "Riwayat keluarga" } },
      { id: "lifestyle", label: { en: "Lifestyle learning", id: "Pola hidup" } }
    ]
  },
  {
    key: "digestion",
    title: { en: "Digestion", id: "Pencernaan" },
    text: { en: "Heartburn, sour taste, meal triggers, or diarrhea awareness.", id: "Rasa panas dada, rasa asam, dipicu makanan, atau diare." },
    slug: "gerd",
    signals: [
      { id: "heartburn", label: { en: "Heartburn", id: "Rasa panas dada" } },
      { id: "sour", label: { en: "Sour taste", id: "Rasa asam" } },
      { id: "meal-trigger", label: { en: "Meal trigger", id: "Dipicu makanan" } },
      { id: "diarrhea", label: { en: "Diarrhea awareness", id: "Diare" } }
    ]
  }
];

function getWhy(topic: Topic, language: Language) {
  const disease = getDiseaseBySlug(topic.slug);
  if (!disease) return "";
  const topicTitle = topic.title[language].toLowerCase();
  return language === "id"
    ? `Topik ${topicTitle} paling dekat dengan modul ${disease.title.id}. Mulai di sini untuk memahami konteksnya lebih baik.`
    : `${topic.title.en} is closest to the ${disease.title.en} module. Start here to understand the topic better.`;
}

export function HealthClassifierPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [selectedTopic, setSelectedTopic] = useState<TopicKey>("respiratory");
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);

  const topic = topics.find((item) => item.key === selectedTopic) ?? topics[0];
  const recommended = useMemo(() => getDiseaseBySlug(topic.slug) ?? diseases[0], [topic.slug]);

  function selectTopic(key: TopicKey) {
    setSelectedTopic(key);
    setSelectedSignals([]);
  }

  function toggleSignal(id: string) {
    setSelectedSignals((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <div className="grid gap-8">
      <section className="alodoc-surface grid gap-8 rounded-[2.4rem] border border-cocoa/10 p-5 shadow-soft sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <AlodocLogo variant="symbol" size="sm" />
            <span className="rounded-full bg-mint px-4 py-2 text-xs font-bold uppercase text-oliveDeep">Alodoc Classifier</span>
            <div className="flex rounded-full bg-white p-1 shadow-lift">
              {(["en", "id"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={cn("focus-ring rounded-full px-4 py-2 text-xs font-bold", language === item ? "bg-cocoa text-cream" : "text-cocoaSoft")}
                >
                  {item === "en" ? "EN" : "ID"}
                </button>
              ))}
            </div>
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-cocoa sm:text-6xl">
            {language === "id" ? "Temukan topik kesehatan yang sebaiknya dipelajari dulu." : "Find which health topic to learn first."}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-cocoaSoft sm:text-lg">
            {language === "id"
              ? "Jawab beberapa prompt sederhana dan Alodoc akan menyarankan modul edukasi. Ini bukan diagnosis, hanya membantu memilih topik belajar."
              : "Answer a few simple prompts and Alodoc will suggest an education module. This is not a diagnosis. It only helps you choose a learning topic."}
          </p>
          <div className="mt-6">
            <AloGuideBubble text={language === "id" ? classifierDisclaimer.id : classifierDisclaimer.en} />
          </div>
        </div>
        <div className="rounded-[2rem] border border-cocoa/10 bg-white p-4 shadow-lift">
          <AnimatedDiseaseVisual slug={recommended.slug} compact className="min-h-[220px] rounded-[1.5rem]" />
          <div className="mt-4 rounded-[1.5rem] bg-cream p-4">
            <p className="text-xs font-bold uppercase text-oliveDeep">{language === "id" ? "Router edukasi lokal" : "Local education router"}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">
              {language === "id"
                ? "Tidak menyimpan data medis, tidak memanggil kontrak, dan tidak menulis ke passport."
                : "No medical data storage, no contract call, and no passport write."}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6">
          <p className="text-sm font-bold uppercase text-oliveDeep">{language === "id" ? "1. Pilih area topik" : "1. Choose topic area"}</p>
          <div className="mt-5 grid gap-3">
            {topics.map((item) => (
              <motion.button
                key={item.key}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => selectTopic(item.key)}
                className={cn(
                  "focus-ring rounded-[1.6rem] border p-4 text-left transition",
                  selectedTopic === item.key ? "border-olive bg-mint/80 shadow-lift" : "border-cocoa/10 bg-white hover:border-olive/50"
                )}
              >
                <h2 className="text-lg font-extrabold text-cocoa">{item.title[language]}</h2>
                <p className="mt-2 text-sm leading-6 text-cocoaSoft">{item.text[language]}</p>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6">
            <p className="text-sm font-bold uppercase text-oliveDeep">{language === "id" ? "2. Pilih sinyal belajar umum" : "2. Choose general learning signals"}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {topic.signals.map((signal) => {
                const active = selectedSignals.includes(signal.id);
                return (
                  <button
                    key={signal.id}
                    type="button"
                    onClick={() => toggleSignal(signal.id)}
                    className={cn(
                      "focus-ring flex min-h-[56px] items-center gap-3 rounded-[1.4rem] border px-4 py-3 text-left text-sm font-bold transition",
                      active ? "border-olive bg-mint text-cocoa" : "border-cocoa/10 bg-white text-cocoaSoft hover:border-olive/50"
                    )}
                  >
                    <span className={cn("grid h-6 w-6 place-items-center rounded-full border", active ? "border-oliveDeep bg-oliveDeep text-white" : "border-cocoa/20")}>
                      {active && <CheckCircle2 className="h-4 w-4" />}
                    </span>
                    {signal.label[language]}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedTopic}-${language}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6"
            >
              <p className="text-sm font-bold uppercase text-oliveDeep">{language === "id" ? "3. Modul yang disarankan" : "3. Recommended learning module"}</p>
              <div className="mt-5 grid gap-5 md:grid-cols-[180px_1fr] md:items-center">
                <AnimatedDiseaseVisual slug={recommended.slug} compact className="min-h-[150px] rounded-[1.5rem]" />
                <div>
                  <h2 className="text-3xl font-extrabold text-cocoa">{recommended.title[language]}</h2>
                  <p className="mt-3 text-sm leading-6 text-cocoaSoft">{getWhy(topic, language)}</p>
                  <p className="mt-3 rounded-2xl bg-orange/10 px-4 py-3 text-sm font-semibold leading-6 text-cocoa">
                    {language === "id" ? "Ini bukan diagnosis. Jika ada tanda bahaya, segera konsultasikan dengan tenaga kesehatan profesional." : "This is not a diagnosis. If red flags are present, consult a qualified healthcare professional."}
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link href={`/disease/${recommended.slug}`} className="focus-ring inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-bold text-cream shadow-lift">
                      {language === "id" ? "Mulai Belajar" : "Start Learning"} <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link href={`/disease/${recommended.slug}/quiz`} className="focus-ring inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-cocoa shadow-lift">
                      {language === "id" ? "Quiz setelah belajar" : "Quiz after learning"}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="rounded-[2rem] border border-orange/20 bg-orange/10 p-5 shadow-lift sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <ShieldAlert className="h-6 w-6 shrink-0 text-orange" />
          <p className="text-sm font-semibold leading-6 text-cocoa">{classifierDisclaimer[language]}</p>
        </div>
      </section>
    </div>
  );
}
