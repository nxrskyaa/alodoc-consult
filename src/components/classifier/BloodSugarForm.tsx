"use client";

import { FormEvent, useState } from "react";
import { Droplets } from "lucide-react";
import { ClassifierAloGuide } from "@/components/classifier/ClassifierAloGuide";
import type { BloodSugarTestType, ClassifierLanguage, ClassifierResult } from "@/lib/health-classifier";
import { classifyBloodSugar, validateBloodSugar } from "@/lib/health-classifier";

const testLabels: Record<BloodSugarTestType, Record<ClassifierLanguage, string>> = {
  fasting_glucose: { id: "GDP / Gula Darah Puasa", en: "GDP / Fasting Blood Glucose" },
  random_glucose: { id: "GDS / Gula Darah Sewaktu", en: "GDS / Random Blood Glucose" },
  hba1c: { id: "HbA1c", en: "HbA1c" }
};

export function BloodSugarForm({ language, onResult }: { language: ClassifierLanguage; onResult: (result: ClassifierResult) => void }) {
  const [testType, setTestType] = useState<BloodSugarTestType>("fasting_glucose");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const unit = testType === "hba1c" ? "%" : "mg/dL";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateBloodSugar(testType, value);
    if (!validation.valid) {
      setError(validation.message[language]);
      return;
    }
    setError("");
    onResult(classifyBloodSugar(testType, Number(value)));
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-6">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-oliveDeep">
          <Droplets className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-cocoa">{language === "id" ? "Gula Darah" : "Blood Sugar"}</h2>
          <p className="text-sm font-semibold text-cocoaSoft">{language === "id" ? "Pilih jenis tes dulu." : "Choose the test type first."}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
        <label className="grid gap-2 text-sm font-black text-cocoa">
          {language === "id" ? "Jenis Pemeriksaan" : "Test Type"}
          <select value={testType} onChange={(event) => setTestType(event.target.value as BloodSugarTestType)} className="focus-ring rounded-2xl border border-cocoa/10 bg-white px-4 py-3 text-base font-bold text-cocoa shadow-lift">
            {(Object.keys(testLabels) as BloodSugarTestType[]).map((key) => <option key={key} value={key}>{testLabels[key][language]}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-black text-cocoa">
          {language === "id" ? "Nilai" : "Value"}
          <div className="flex items-center rounded-2xl border border-cocoa/10 bg-white px-4 py-3 shadow-lift">
            <input inputMode="decimal" value={value} onChange={(event) => setValue(event.target.value.replace(/[^\d.]/g, ""))} className="min-w-0 flex-1 bg-transparent text-lg font-black text-cocoa outline-none" />
            <span className="text-sm font-bold text-cocoaSoft">{unit}</span>
          </div>
        </label>
      </div>
      {error && <p className="mt-4 rounded-2xl bg-orange/10 px-4 py-3 text-sm font-bold text-orange">{error}</p>}
      <p className="mt-4 text-xs font-bold leading-5 text-cocoaSoft">{language === "id" ? "Nilai dihitung lokal di browser dan tidak disimpan." : "This value is calculated locally in your browser and is not stored."}</p>
      <button className="focus-ring mt-5 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:bg-[#dc7432]">
        {language === "id" ? "Cek Kategori" : "Check Category"}
      </button>
      <div className="mt-5">
        <ClassifierAloGuide language={language} text={language === "id" ? "Pilih jenis tes karena GDP, GDS, dan HbA1c punya interpretasi berbeda." : "Choose the test type because fasting, random, and HbA1c values are interpreted differently."} />
      </div>
    </form>
  );
}
