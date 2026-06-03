"use client";

import { FormEvent, useState } from "react";
import { Activity } from "lucide-react";
import { ClassifierAloGuide } from "@/components/classifier/ClassifierAloGuide";
import type { ClassifierLanguage, ClassifierResult } from "@/lib/health-classifier";
import { classifyBloodPressure, validateBloodPressure } from "@/lib/health-classifier";

export function BloodPressureForm({ language, onResult }: { language: ClassifierLanguage; onResult: (result: ClassifierResult) => void }) {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateBloodPressure(systolic, diastolic);
    if (!validation.valid) {
      setError(validation.message[language]);
      return;
    }
    setError("");
    onResult(classifyBloodPressure(Number(systolic), Number(diastolic)));
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-6">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-oliveDeep">
          <Activity className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-cocoa">{language === "id" ? "Tekanan Darah" : "Blood Pressure"}</h2>
          <p className="text-sm font-semibold text-cocoaSoft">{language === "id" ? "Contoh: 120 / 80 mmHg" : "Example: 120 / 80 mmHg"}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <NumberInput label={language === "id" ? "Sistolik" : "Systolic"} value={systolic} onChange={setSystolic} suffix="mmHg" />
        <NumberInput label={language === "id" ? "Diastolik" : "Diastolic"} value={diastolic} onChange={setDiastolic} suffix="mmHg" />
      </div>
      {error && <p className="mt-4 rounded-2xl bg-orange/10 px-4 py-3 text-sm font-bold text-orange">{error}</p>}
      <p className="mt-4 text-xs font-bold leading-5 text-cocoaSoft">{language === "id" ? "Nilai dihitung lokal di browser dan tidak disimpan." : "This value is calculated locally in your browser and is not stored."}</p>
      <button className="focus-ring mt-5 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:bg-[#dc7432]">
        {language === "id" ? "Cek Kategori" : "Check Category"}
      </button>
      <div className="mt-5">
        <ClassifierAloGuide language={language} />
      </div>
    </form>
  );
}

function NumberInput({ label, value, onChange, suffix }: { label: string; value: string; onChange: (value: string) => void; suffix: string }) {
  return (
    <label className="grid gap-2 text-sm font-black text-cocoa">
      {label}
      <div className="flex items-center rounded-2xl border border-cocoa/10 bg-white px-4 py-3 shadow-lift">
        <input
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value.replace(/[^\d.]/g, ""))}
          className="min-w-0 flex-1 bg-transparent text-lg font-black text-cocoa outline-none"
        />
        <span className="text-sm font-bold text-cocoaSoft">{suffix}</span>
      </div>
    </label>
  );
}
