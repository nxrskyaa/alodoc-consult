"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
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
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-6"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-mint text-oliveDeep shadow-lift">
          <Droplets className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-cocoa">{language === "id" ? "Cek Gula Darah" : "Check Blood Sugar"}</h2>
          <p className="mt-1 text-sm font-medium leading-6 text-cocoaSoft">
            {language === "id" ? "Pilih jenis pengukuran lalu masukkan nilai gula darah." : "Choose the measurement type, then enter your glucose value."}
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-extrabold text-cocoa">
          {language === "id" ? "Jenis Pemeriksaan" : "Test Type"}
          <select value={testType} onChange={(event) => setTestType(event.target.value as BloodSugarTestType)} className="focus-ring min-h-[58px] rounded-2xl border border-cocoa/10 bg-white px-4 py-3 text-base font-bold text-cocoa shadow-lift transition focus:border-olive">
            {(Object.keys(testLabels) as BloodSugarTestType[]).map((key) => <option key={key} value={key}>{testLabels[key][language]}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-extrabold text-cocoa">
          {language === "id" ? "Nilai gula darah" : "Blood sugar value"}
          <div className="classifier-input flex min-h-[66px] items-center rounded-2xl bg-white px-4 py-3 transition">
            <input inputMode="decimal" type="text" placeholder="0" value={value} onChange={(event) => setValue(event.target.value.replace(/[^\d.]/g, ""))} className="min-w-0 flex-1 bg-transparent text-2xl font-extrabold text-cocoa outline-none placeholder:text-cocoa/20" />
            <span className="rounded-full bg-mint px-3 py-1.5 text-xs font-extrabold text-oliveDeep">{unit}</span>
          </div>
          <span className="text-xs font-semibold text-cocoaSoft">{language === "id" ? "Gunakan angka dari hasil yang sudah Anda miliki." : "Use a value from a result you already have."}</span>
        </label>
      </div>
      {error && <p className="mt-4 rounded-2xl bg-orange/10 px-4 py-3 text-sm font-bold text-orange">{error}</p>}
      <p className="mt-4 text-xs font-bold leading-5 text-cocoaSoft">{language === "id" ? "Nilai dihitung lokal di browser dan tidak disimpan." : "This value is calculated locally in your browser and is not stored."}</p>
      <button className="focus-ring mt-5 inline-flex min-h-[54px] w-full items-center justify-center rounded-full bg-orange px-5 py-3 text-sm font-extrabold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-[#dc7432] active:scale-[0.98]">
        {language === "id" ? "Check Gula Darah" : "Check Blood Sugar"}
      </button>
      <div className="mt-5">
        <ClassifierAloGuide language={language} text={language === "id" ? "Pilih jenis tes karena GDP, GDS, dan HbA1c punya interpretasi berbeda." : "Choose the test type because fasting, random, and HbA1c values are interpreted differently."} />
      </div>
    </motion.form>
  );
}
