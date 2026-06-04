import type { ClassifierLanguage, ValidationResult } from "@/lib/health-classifier";

export type BmiCategoryKey = "underweight" | "normal" | "overweight" | "obesity";
export type BmiTone = "blue" | "green" | "orange" | "red";

export type BmiResult = {
  value: number;
  categoryKey: BmiCategoryKey;
  category: Record<ClassifierLanguage, string>;
  tone: BmiTone;
  message: Record<ClassifierLanguage, string>;
  related: {
    label: Record<ClassifierLanguage, string>;
    href: string;
  }[];
};

export const bmiDisclaimer = {
  en: "BMI is a simple screening tool based on height and weight. It does not measure body fat directly and does not account for muscle mass, pregnancy, body composition, age, sex, or individual medical context. Use this result for education only.",
  id: "BMI adalah alat skrining sederhana berdasarkan tinggi dan berat badan. BMI tidak mengukur lemak tubuh secara langsung dan tidak mempertimbangkan massa otot, kehamilan, komposisi tubuh, usia, jenis kelamin, atau konteks medis individu. Gunakan hasil ini hanya untuk edukasi."
};

const relatedLifestyle = [
  {
    label: { id: "Pencegahan Diabetes Tipe 2", en: "Type 2 Diabetes prevention" },
    href: "/disease/type-2-diabetes"
  },
  {
    label: { id: "Pencegahan Hipertensi", en: "Hypertension prevention" },
    href: "/disease/hypertension"
  }
];

const relatedMetabolic = [
  {
    label: { id: "Diabetes Tipe 2", en: "Type 2 Diabetes" },
    href: "/disease/type-2-diabetes"
  },
  {
    label: { id: "Hipertensi", en: "Hypertension" },
    href: "/disease/hypertension"
  }
];

export function validateBmi(weight: string, height: string): ValidationResult {
  if (!weight || !height) {
    return {
      valid: false,
      message: { id: "Isi berat badan dan tinggi badan.", en: "Enter both weight and height." }
    };
  }

  const weightValue = Number(weight);
  const heightValue = Number(height);

  if (!Number.isFinite(weightValue) || !Number.isFinite(heightValue)) {
    return {
      valid: false,
      message: { id: "Gunakan angka saja.", en: "Use numbers only." }
    };
  }

  if (weightValue < 20 || weightValue > 300) {
    return {
      valid: false,
      message: { id: "Berat badan harus 20-300 kg.", en: "Weight must be between 20 and 300 kg." }
    };
  }

  if (heightValue < 80 || heightValue > 250) {
    return {
      valid: false,
      message: { id: "Tinggi badan harus 80-250 cm.", en: "Height must be between 80 and 250 cm." }
    };
  }

  return { valid: true };
}

export function classifyBmi(weightKg: number, heightCm: number): BmiResult {
  const heightMeters = heightCm / 100;
  const value = Math.round((weightKg / (heightMeters * heightMeters)) * 10) / 10;

  if (value < 18.5) {
    return {
      value,
      categoryKey: "underweight",
      category: { en: "Underweight range", id: "Berat badan kurang" },
      tone: "blue",
      message: {
        en: "Your BMI is below the usual adult range. BMI is only a screening tool, not a diagnosis. Consider learning about balanced nutrition and consult a healthcare professional if you are concerned.",
        id: "BMI kamu berada di bawah rentang umum orang dewasa. BMI hanya alat skrining, bukan diagnosis. Pelajari nutrisi seimbang dan konsultasikan ke tenaga kesehatan jika kamu khawatir."
      },
      related: relatedLifestyle
    };
  }

  if (value < 25) {
    return {
      value,
      categoryKey: "normal",
      category: { en: "Normal range", id: "Rentang normal" },
      tone: "green",
      message: {
        en: "Your BMI is within the usual adult normal range. BMI does not capture everything, so keep learning about balanced habits, movement, sleep, and prevention.",
        id: "BMI kamu berada dalam rentang normal umum orang dewasa. BMI tidak menggambarkan semuanya, jadi tetap pelajari kebiasaan seimbang, aktivitas fisik, tidur, dan pencegahan."
      },
      related: relatedLifestyle
    };
  }

  if (value < 30) {
    return {
      value,
      categoryKey: "overweight",
      category: { en: "Overweight range", id: "Berat badan berlebih" },
      tone: "orange",
      message: {
        en: "Your BMI is in the overweight range. This is not a diagnosis, but it can be a useful starting point to learn about metabolism, blood pressure, blood sugar, and lifestyle habits.",
        id: "BMI kamu berada dalam rentang berat badan berlebih. Ini bukan diagnosis, tapi bisa jadi awal untuk belajar tentang metabolisme, tekanan darah, gula darah, dan kebiasaan hidup."
      },
      related: relatedMetabolic
    };
  }

  return {
    value,
    categoryKey: "obesity",
    category: { en: "Obesity range", id: "Obesitas" },
    tone: "red",
    message: {
      en: "Your BMI is in the obesity range. This is not a diagnosis. BMI has limitations, but this result can be a reason to learn more and consider discussing it with a healthcare professional.",
      id: "BMI kamu berada dalam rentang obesitas. Ini bukan diagnosis. BMI punya keterbatasan, tapi hasil ini bisa jadi alasan untuk belajar lebih lanjut dan mempertimbangkan konsultasi dengan tenaga kesehatan."
    },
    related: relatedMetabolic
  };
}
