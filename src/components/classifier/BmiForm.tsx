"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import { ClassifierAloGuide } from "@/components/classifier/ClassifierAloGuide";
import { bmiDisclaimer, classifyBmi, validateBmi, type BmiResult } from "@/lib/bmi-classifier";
import type { ClassifierLanguage } from "@/lib/health-classifier";

export function BmiForm({ language, onResult }: { language: ClassifierLanguage; onResult: (result: BmiResult) => void }) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateBmi(weight, height);
    if (!validation.valid) {
      setError(validation.message[language]);
      return;
    }

    setError("");
    onResult(classifyBmi(Number(weight), Number(height)));
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full min-w-0 overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mint text-oliveDeep shadow-lift">
          <Scale className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h2 className="text-2xl font-extrabold text-cocoa">{language === "id" ? "Cek BMI" : "BMI Checker"}</h2>
          <p className="mt-1 text-sm font-medium leading-6 text-cocoaSoft">
            {language === "id" ? "Masukkan berat badan dan tinggi badan untuk edukasi BMI dewasa." : "Enter weight and height for adult BMI education."}
          </p>
        </div>
      </div>

      <div className="mt-6 grid min-w-0 gap-4 sm:grid-cols-2">
        <NumberInput label={language === "id" ? "Berat badan" : "Weight"} helper={language === "id" ? "Rentang 20-300 kg" : "Range 20-300 kg"} value={weight} onChange={setWeight} suffix="kg" />
        <NumberInput label={language === "id" ? "Tinggi badan" : "Height"} helper={language === "id" ? "Rentang 80-250 cm" : "Range 80-250 cm"} value={height} onChange={setHeight} suffix="cm" />
      </div>

      {error && <p className="mt-4 rounded-2xl bg-orange/10 px-4 py-3 text-sm font-bold text-orange">{error}</p>}
      <p className="mt-4 text-xs font-bold leading-5 text-cocoaSoft">{language === "id" ? "Nilai BMI dihitung lokal di browser dan tidak disimpan." : "BMI is calculated locally in your browser and is not stored."}</p>
      <button className="focus-ring mt-5 inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-extrabold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-[#dc7432] active:scale-[0.98]">
        {language === "id" ? "Check BMI" : "Calculate BMI"}
      </button>
      <div className="mt-5">
        <ClassifierAloGuide
          language={language}
          text={
            language === "id"
              ? "Alo Guide: BMI hanya alat skrining sederhana. Hasil ini untuk edukasi, bukan diagnosis."
              : "Alo Guide: BMI is only a simple screening tool. This result is for education, not diagnosis."
          }
        />
      </div>
      <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-xs font-semibold leading-5 text-cocoaSoft">{bmiDisclaimer[language]}</p>
    </motion.form>
  );
}

function NumberInput({ label, helper, value, onChange, suffix }: { label: string; helper: string; value: string; onChange: (value: string) => void; suffix: string }) {
  return (
    <label className="grid gap-2 text-sm font-extrabold text-cocoa">
      <span>{label}</span>
      <div className="classifier-input flex min-h-[66px] min-w-0 items-center rounded-2xl bg-white px-4 py-3 transition">
        <input
          inputMode="decimal"
          type="text"
          placeholder="0"
          value={value}
          onChange={(event) => onChange(event.target.value.replace(/[^\d.]/g, ""))}
          className="min-w-0 flex-1 bg-transparent text-2xl font-extrabold text-cocoa outline-none placeholder:text-cocoa/20"
        />
        <span className="rounded-full bg-mint px-3 py-1.5 text-xs font-extrabold text-oliveDeep">{suffix}</span>
      </div>
      <span className="text-xs font-semibold text-cocoaSoft">{helper}</span>
    </label>
  );
}
