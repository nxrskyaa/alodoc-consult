"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowRight, Droplets, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { BloodPressureForm } from "@/components/classifier/BloodPressureForm";
import { BloodSugarForm } from "@/components/classifier/BloodSugarForm";
import { ClassifierAloGuide } from "@/components/classifier/ClassifierAloGuide";
import { ClassifierDisclaimer } from "@/components/classifier/ClassifierDisclaimer";
import { ClassifierResultCard } from "@/components/classifier/ClassifierResultCard";
import { ClassifierTypeSelector } from "@/components/classifier/ClassifierTypeSelector";
import { PrivacyClassifierNotice } from "@/components/classifier/PrivacyClassifierNotice";
import { AnimatedBloodPressureHero } from "@/components/classifier/visuals/AnimatedBloodPressureHero";
import { AnimatedBloodSugarHero } from "@/components/classifier/visuals/AnimatedBloodSugarHero";
import { ClassifierHeroCombo } from "@/components/classifier/visuals/ClassifierHeroCombo";
import { FloatingHealthShapes } from "@/components/classifier/visuals/FloatingHealthShapes";
import { SectionMiniVisual } from "@/components/classifier/visuals/SectionMiniVisual";
import type { ClassifierLanguage, ClassifierResult, ClassifierType } from "@/lib/health-classifier";
import { cn } from "@/lib/utils";

const labels = {
  id: {
    eyebrow: "Health Classifier",
    title: "Klasifikasi Edukasi Kesehatan",
    subtitle: "Pahami kategori tekanan darah dan gula darah secara lokal di browser. Bukan diagnosis, bukan rekam medis, dan tidak masuk blockchain.",
    bp: "Tekanan darah",
    sugar: "Gula darah",
    learn: "Apa yang dipelajari",
    choose: "Pilih classifier",
    privacy: "Local only",
    reference: "Referensi edukasi",
    referenceText: "Kategori disusun untuk edukasi umum dari rujukan kesehatan publik dan harus dikonfirmasi bersama tenaga kesehatan."
  },
  en: {
    eyebrow: "Health Classifier",
    title: "Health Education Classifier",
    subtitle: "Understand blood pressure and blood sugar categories locally in your browser. No diagnosis, no medical record, and no blockchain write.",
    bp: "Blood pressure",
    sugar: "Blood sugar",
    learn: "What you will learn",
    choose: "Choose classifier",
    privacy: "Local only",
    reference: "Educational references",
    referenceText: "Categories are organized for general education from public health references and should be confirmed with healthcare professionals."
  }
};

const learnCards = [
  {
    visual: "learn_number" as const,
    title: { id: "Masukkan angka", en: "Enter a number" },
    text: { id: "Isi tekanan darah atau nilai gula darah dari hasil yang sudah Anda miliki.", en: "Enter a blood pressure or glucose value you already have." }
  },
  {
    visual: "understand_category" as const,
    title: { id: "Pahami kategori", en: "Understand category" },
    text: { id: "Lihat arti kategori, tingkat risiko umum, dan batas interpretasinya.", en: "See the category meaning, general risk level, and interpretation limits." }
  },
  {
    visual: "related_learning" as const,
    title: { id: "Lanjut belajar", en: "Keep learning" },
    text: { id: "Buka modul Hipertensi atau Diabetes Tipe 2 untuk belajar dengan kartu dan quiz.", en: "Open Hypertension or Type 2 Diabetes modules for cards and quizzes." }
  }
];

function bloodPressureVisualState(result: ClassifierResult | null): "normal" | "attention" | "moderate" | "high" | "crisis" {
  if (!result) return "normal";
  if (result.variant === "crisis") return "crisis";
  if (result.variant === "high") return "high";
  if (result.variant === "moderate") return "moderate";
  if (result.variant === "attention") return "attention";
  return "normal";
}

function bloodSugarVisualState(result: ClassifierResult | null): "normal" | "attention" | "high" | "inconclusive" {
  if (!result) return "normal";
  if (result.variant === "inconclusive") return "inconclusive";
  if (result.variant === "crisis" || result.variant === "high") return "high";
  if (result.variant === "attention") return "attention";
  return "normal";
}

export function HealthClassifierPage() {
  const [language, setLanguage] = useState<ClassifierLanguage>("id");
  const [selectedType, setSelectedType] = useState<ClassifierType>("blood_pressure");
  const [result, setResult] = useState<ClassifierResult | null>(null);
  const copy = labels[language];

  function selectType(type: ClassifierType) {
    setSelectedType(type);
    setResult(null);
  }

  return (
    <div className="relative isolate grid gap-8 overflow-hidden">
      <FloatingHealthShapes />
      <section className="relative grid gap-8 rounded-[2.4rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-mint px-4 py-2 text-xs font-black uppercase text-oliveDeep">{copy.eyebrow}</span>
            <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase text-cocoaSoft">{copy.privacy}</span>
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-cocoa sm:text-5xl lg:text-6xl">{copy.title}</h1>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-cocoaSoft sm:text-lg sm:leading-8">{copy.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-2 rounded-full bg-white p-1 shadow-lift sm:w-fit">
            {(["id", "en"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLanguage(item)}
                className={cn(
                  "focus-ring min-h-[44px] rounded-full px-5 py-2 text-sm font-black transition",
                  language === item ? "bg-orange text-white shadow-lift" : "text-cocoaSoft hover:bg-mint"
                )}
              >
                {item === "id" ? "Indonesia" : "English"}
              </button>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link href="#classifier-form" className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift">
              {language === "id" ? "Mulai klasifikasi" : "Start classifying"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/library" className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-cocoa shadow-lift">
              {language === "id" ? "Buka modul belajar" : "Explore learning modules"}
            </Link>
          </div>
          <div className="mt-6">
            <ClassifierAloGuide
              language={language}
              text={
                language === "id"
                  ? "Alo Guide: angka yang Anda masukkan tidak disimpan dan tidak dikirim ke blockchain."
                  : "Alo Guide: values you enter are not stored and are not sent to the blockchain."
              }
            />
          </div>
        </div>
        <div className="min-w-0">
          <ClassifierHeroCombo />
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6">
          <p className="text-sm font-black uppercase text-oliveDeep">{copy.learn}</p>
          <div className="mt-5 grid gap-4">
            {learnCards.map((card, index) => (
              <motion.article
                key={card.visual}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="flex flex-col gap-4 rounded-[1.8rem] bg-white p-4 shadow-lift sm:flex-row sm:items-center"
              >
                <SectionMiniVisual type={card.visual} />
                <div>
                  <h2 className="text-xl font-black text-cocoa">{card.title[language]}</h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">{card.text[language]}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
        <div id="classifier-form" className="grid scroll-mt-28 gap-5">
          <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6">
            <p className="text-sm font-black uppercase text-oliveDeep">{copy.choose}</p>
            <div className="mt-5">
              <ClassifierTypeSelector selected={selectedType} onSelect={selectType} language={language} />
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedType}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-start"
            >
              <div className="rounded-[2rem] border border-cocoa/10 bg-white p-3 shadow-lift">
                {selectedType === "blood_pressure" ? (
                  <AnimatedBloodPressureHero size="md" intensity={result ? "active" : "calm"} resultState={bloodPressureVisualState(result)} />
                ) : (
                  <AnimatedBloodSugarHero size="md" intensity={result ? "active" : "calm"} resultState={bloodSugarVisualState(result)} />
                )}
              </div>
              {selectedType === "blood_pressure" ? <BloodPressureForm language={language} onResult={setResult} /> : <BloodSugarForm language={language} onResult={setResult} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <PrivacyClassifierNotice language={language} />

      <AnimatePresence>
        {result && <ClassifierResultCard key={`${result.type}-${result.categoryKey}-${language}`} result={result} language={language} onReset={() => setResult(null)} />}
      </AnimatePresence>

      <section className="grid gap-5 rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="grid h-16 w-16 place-items-center rounded-[1.5rem] bg-mint text-oliveDeep shadow-lift">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-cocoa">{copy.reference}</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">{copy.referenceText}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-black text-cocoaSoft">
            <span className="rounded-full bg-white px-4 py-2">WHO hypertension education</span>
            <span className="rounded-full bg-white px-4 py-2">AHA blood pressure categories</span>
            <span className="rounded-full bg-white px-4 py-2">ADA diabetes standards</span>
            <span className="rounded-full bg-white px-4 py-2">CDC diabetes testing education</span>
          </div>
        </div>
      </section>

      <ClassifierDisclaimer language={language} />

      <div className="grid gap-3 rounded-[2rem] border border-cocoa/10 bg-white p-4 shadow-lift sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-mint text-oliveDeep">
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-sm font-black text-cocoa">{copy.bp}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-orange/15 text-orange">
            <Droplets className="h-5 w-5" />
          </div>
          <span className="text-sm font-black text-cocoa">{copy.sugar}</span>
        </div>
      </div>
    </div>
  );
}
