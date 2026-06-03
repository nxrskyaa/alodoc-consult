"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { BloodPressureForm } from "@/components/classifier/BloodPressureForm";
import { BloodSugarForm } from "@/components/classifier/BloodSugarForm";
import { ClassifierAloGuide } from "@/components/classifier/ClassifierAloGuide";
import { ClassifierDisclaimer } from "@/components/classifier/ClassifierDisclaimer";
import { ClassifierResultCard } from "@/components/classifier/ClassifierResultCard";
import { ClassifierTypeSelector } from "@/components/classifier/ClassifierTypeSelector";
import { PrivacyClassifierNotice } from "@/components/classifier/PrivacyClassifierNotice";
import { AnimatedBloodPressureHero } from "@/components/classifier/visuals/AnimatedBloodPressureHero";
import { AnimatedBloodSugarHero } from "@/components/classifier/visuals/AnimatedBloodSugarHero";
import { FloatingHealthShapes } from "@/components/classifier/visuals/FloatingHealthShapes";
import type { ClassifierLanguage, ClassifierResult, ClassifierType } from "@/lib/health-classifier";
import { cn } from "@/lib/utils";

const labels = {
  id: {
    eyebrow: "Alat Edukasi Kesehatan",
    title: "Alodoc Classifier",
    subtitle: "Cek gula darah dan tekanan darah secara edukatif. Bukan diagnosis medis.",
    bp: "Tekanan darah",
    sugar: "Gula darah",
    choose: "Pilih pemeriksaan",
    privacy: "Local only",
    reference: "Referensi edukasi",
    referenceText: "Kategori disusun untuk edukasi umum dari rujukan kesehatan publik dan harus dikonfirmasi bersama tenaga kesehatan."
  },
  en: {
    eyebrow: "Health Education Tool",
    title: "Alodoc Classifier",
    subtitle: "Check blood sugar and blood pressure for education. Not a medical diagnosis.",
    bp: "Blood pressure",
    sugar: "Blood sugar",
    choose: "Choose checker",
    privacy: "Local only",
    reference: "Educational references",
    referenceText: "Categories are organized for general education from public health references and should be confirmed with healthcare professionals."
  }
};

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
    <div className="relative isolate mx-auto grid w-full max-w-7xl gap-7 overflow-hidden">
      <FloatingHealthShapes />
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="alodoc-surface relative overflow-hidden rounded-[2.2rem] border border-cocoa/10 p-5 shadow-soft sm:p-7 lg:p-8"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-mint px-4 py-2 text-xs font-semibold uppercase text-oliveDeep">{copy.eyebrow}</span>
            <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase text-cocoaSoft">{copy.privacy}</span>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-normal text-cocoa sm:text-5xl lg:text-6xl">{copy.title}</h1>
              <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-cocoaSoft sm:text-lg sm:leading-8">{copy.subtitle}</p>
            </div>
            <div className="flex rounded-full bg-white p-1 shadow-lift">
              {(["id", "en"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={cn(
                    "focus-ring min-h-[44px] rounded-full px-5 py-2 text-sm font-extrabold transition",
                    language === item ? "bg-cocoa text-cream shadow-lift" : "text-cocoaSoft hover:bg-mint"
                  )}
                >
                  {item === "id" ? "Indonesia" : "English"}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 max-w-3xl">
            <ClassifierAloGuide
              language={language}
              text={
                language === "id"
                  ? "Alo Guide: angka yang Anda masukkan diproses lokal di browser, tidak disimpan, dan tidak dikirim ke blockchain."
                  : "Alo Guide: values are processed locally in your browser, not stored, and not sent to the blockchain."
              }
            />
          </div>
        </div>
      </motion.section>
      <PrivacyClassifierNotice language={language} />

      <section className="grid gap-5">
        <div id="classifier-form" className="grid scroll-mt-28 gap-5">
          <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-5">
            <p className="px-1 text-sm font-black uppercase text-oliveDeep">{copy.choose}</p>
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
              className="grid gap-5 lg:grid-cols-[minmax(260px,0.72fr)_minmax(0,1.28fr)] lg:items-stretch"
            >
              <div className="hidden overflow-hidden rounded-[2rem] border border-cocoa/10 bg-white p-3 shadow-lift md:block">
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
    </div>
  );
}
