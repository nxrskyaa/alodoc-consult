export type ClassifierLanguage = "id" | "en";
export type ClassifierType = "blood_pressure" | "blood_sugar";
export type BloodSugarTestType = "fasting_glucose" | "random_glucose" | "hba1c";
export type RiskLevel = "low" | "attention" | "moderate" | "high" | "very_high" | "context";
export type ResultVariant = "normal" | "attention" | "moderate" | "high" | "crisis" | "inconclusive";

export type ClassifierResult = {
  type: ClassifierType;
  categoryKey: string;
  label: Record<ClassifierLanguage, string>;
  risk: Record<ClassifierLanguage, string>;
  riskLevel: RiskLevel;
  variant: ResultVariant;
  meaning: Record<ClassifierLanguage, string>;
  conclusion: Record<ClassifierLanguage, string>;
  do: Record<ClassifierLanguage, string[]>;
  dont: Record<ClassifierLanguage, string[]>;
  recommendation: Record<ClassifierLanguage, string>;
  redFlags: Record<ClassifierLanguage, string[]>;
  related: {
    primaryLabel: Record<ClassifierLanguage, string>;
    primaryHref: string;
    quizHref: string;
  };
};

export type ValidationResult = { valid: true } | { valid: false; message: Record<ClassifierLanguage, string> };

export const classifierDisclaimer = {
  en: "Alodoc is for educational purposes only. It does not provide diagnosis, treatment decisions, or emergency medical advice. If symptoms are severe, persistent, or concerning, consult a qualified healthcare professional.",
  id: "Alodoc hanya untuk edukasi umum. Alodoc tidak memberikan diagnosis, keputusan pengobatan, atau saran medis darurat. Jika gejala berat, menetap, atau mengkhawatirkan, segera konsultasikan dengan tenaga kesehatan profesional."
};

export const classifierPrivacyCopy = {
  en: "Your numbers are processed only in your browser. Alodoc does not store them onchain, in your passport, or in any database.",
  id: "Angka Anda diproses hanya di browser. Alodoc tidak menyimpannya onchain, di passport, atau di database apa pun."
};

const bpRedFlags = {
  id: ["Nyeri dada", "Sesak napas", "Sakit kepala berat", "Kelemahan atau baal pada satu sisi tubuh", "Gangguan bicara", "Gangguan penglihatan", "Kebingungan"],
  en: ["Chest pain", "Shortness of breath", "Severe headache", "Weakness or numbness on one side", "Speech difficulty", "Vision changes", "Confusion"]
};

const sugarRedFlags = {
  id: ["Sangat lemas", "Muntah terus-menerus", "Bingung", "Dehidrasi berat", "Sesak napas", "Luka atau infeksi yang memburuk", "Penurunan kesadaran"],
  en: ["Extreme weakness", "Persistent vomiting", "Confusion", "Severe dehydration", "Shortness of breath", "Worsening wounds or infection", "Decreased consciousness"]
};

const bpRelated = {
  primaryLabel: { id: "Pelajari Modul Hipertensi", en: "Learn Hypertension Module" },
  primaryHref: "/disease/hypertension",
  quizHref: "/disease/hypertension/quiz"
};

const sugarRelated = {
  primaryLabel: { id: "Pelajari Modul Diabetes Tipe 2", en: "Learn Type 2 Diabetes Module" },
  primaryHref: "/disease/type-2-diabetes",
  quizHref: "/disease/type-2-diabetes/quiz"
};

const bpResults: Record<string, Omit<ClassifierResult, "type" | "categoryKey" | "redFlags" | "related">> = {
  normal: {
    label: { id: "Normal", en: "Normal" },
    risk: { id: "Rendah", en: "Low" },
    riskLevel: "low",
    variant: "normal",
    meaning: {
      id: "Tekanan darah berada dalam batas ideal sehingga risiko penyakit kardiovaskular akibat hipertensi relatif rendah.",
      en: "This reading is within an ideal range, so the risk related to high blood pressure is generally lower."
    },
    conclusion: {
      id: "Angka ini berada dalam rentang normal. Diagnosis tetap memerlukan evaluasi profesional bila ada kekhawatiran.",
      en: "This reading falls within a normal range. Professional evaluation is still needed if you are concerned."
    },
    do: {
      id: ["Pertahankan pola makan seimbang", "Konsumsi buah dan sayur setiap hari", "Aktivitas fisik minimal 150 menit per minggu", "Pertahankan berat badan ideal", "Lakukan pemeriksaan tekanan darah secara berkala"],
      en: ["Maintain a balanced diet", "Eat fruits and vegetables regularly", "Aim for regular physical activity", "Maintain a healthy weight", "Check blood pressure periodically"]
    },
    dont: {
      id: ["Konsumsi garam berlebihan", "Merokok", "Kurang aktivitas fisik", "Begadang terus-menerus"],
      en: ["Excessive salt intake", "Smoking", "Physical inactivity", "Constant lack of sleep"]
    },
    recommendation: {
      id: "Pertahankan gaya hidup sehat yang sudah dijalani dan lakukan pemeriksaan tekanan darah setidaknya satu kali setiap tahun.",
      en: "Keep maintaining healthy habits and check blood pressure periodically."
    }
  },
  elevated: {
    label: { id: "Pra-Hipertensi / Elevated", en: "Elevated Blood Pressure" },
    risk: { id: "Perlu Perhatian", en: "Needs Attention" },
    riskLevel: "attention",
    variant: "attention",
    meaning: {
      id: "Tekanan darah mulai meningkat namun belum masuk kategori hipertensi. Perubahan gaya hidup dapat membantu menurunkan risiko di masa depan.",
      en: "This reading is starting to rise but is not in a hypertension range. Lifestyle changes can help reduce future risk."
    },
    conclusion: {
      id: "Angka ini berada dalam rentang elevated. Diagnosis membutuhkan pengukuran berulang dan evaluasi tenaga kesehatan.",
      en: "This reading falls within an elevated range. Diagnosis requires repeated measurements and evaluation by a healthcare professional."
    },
    do: {
      id: ["Kurangi garam secara bertahap", "Perbanyak sayur, buah, dan serat", "Aktivitas fisik rutin", "Tidur cukup", "Pantau tekanan darah berkala"],
      en: ["Gradually reduce salt intake", "Eat more vegetables, fruits, and fiber", "Stay physically active", "Get enough sleep", "Monitor blood pressure periodically"]
    },
    dont: {
      id: ["Mengabaikan tren kenaikan", "Makanan tinggi garam setiap hari", "Merokok", "Duduk terlalu lama"],
      en: ["Ignoring an upward trend", "Daily high-salt eating", "Smoking", "Sitting for long periods"]
    },
    recommendation: {
      id: "Mulai kebiasaan sehat lebih awal dan diskusikan hasil berulang dengan tenaga kesehatan bila angka tetap meningkat.",
      en: "Start healthy habits early and discuss repeated elevated readings with a healthcare professional."
    }
  },
  hypertension_stage_1: {
    label: { id: "Hipertensi Tahap 1", en: "Hypertension Stage 1 Range" },
    risk: { id: "Sedang", en: "Moderate" },
    riskLevel: "moderate",
    variant: "moderate",
    meaning: {
      id: "Tekanan darah berada pada rentang yang dapat meningkatkan risiko jantung dan pembuluh darah bila menetap.",
      en: "This reading is in a range that may increase heart and blood vessel risk if it persists."
    },
    conclusion: {
      id: "Angka ini berada dalam rentang Hipertensi Tahap 1. Ini bukan diagnosis; perlu pengukuran berulang dan evaluasi profesional.",
      en: "This reading falls within a Stage 1 hypertension range. This is not a diagnosis; repeated measurements and professional evaluation are needed."
    },
    do: {
      id: ["Konsultasikan hasil berulang", "Terapkan pola makan rendah garam", "Aktivitas fisik sesuai kondisi", "Kelola stres", "Pantau tekanan darah secara teratur"],
      en: ["Discuss repeated readings", "Follow a lower-salt eating pattern", "Be active as appropriate", "Manage stress", "Monitor blood pressure regularly"]
    },
    dont: {
      id: ["Menunda perubahan gaya hidup", "Merokok", "Konsumsi alkohol berlebihan", "Mengandalkan satu kali pengukuran saja"],
      en: ["Delaying lifestyle changes", "Smoking", "Excess alcohol", "Relying on one measurement only"]
    },
    recommendation: {
      id: "Evaluasi tenaga kesehatan dapat membantu menilai faktor risiko dan kebutuhan penanganan.",
      en: "A healthcare professional can help assess risk factors and care needs."
    }
  },
  hypertension_stage_2: {
    label: { id: "Hipertensi Tahap 2", en: "Hypertension Stage 2 Range" },
    risk: { id: "Tinggi", en: "High" },
    riskLevel: "high",
    variant: "high",
    meaning: {
      id: "Tekanan darah cukup tinggi dan dapat meningkatkan risiko kerusakan organ seperti jantung, otak, ginjal, dan pembuluh darah.",
      en: "This reading is high and may increase the risk of organ damage involving the heart, brain, kidneys, and blood vessels."
    },
    conclusion: {
      id: "Angka ini berada dalam rentang Hipertensi Tahap 2. Diagnosis dan rencana penanganan perlu evaluasi tenaga kesehatan.",
      en: "This reading falls within a Stage 2 hypertension range. Diagnosis and care planning require healthcare professional evaluation."
    },
    do: {
      id: ["Konsultasi ke dokter", "Pantau tekanan darah secara rutin", "Terapkan pola makan rendah garam", "Tetap aktif secara fisik sesuai kondisi kesehatan", "Minum obat sesuai anjuran dokter bila diresepkan"],
      en: ["Consult a healthcare professional", "Monitor blood pressure regularly", "Follow a lower-salt eating pattern", "Stay physically active as appropriate", "Take prescribed medication as directed"]
    },
    dont: {
      id: ["Menunda pemeriksaan medis", "Menghentikan obat tanpa konsultasi", "Merokok", "Konsumsi garam berlebihan"],
      en: ["Delaying medical evaluation", "Stopping medication without consultation", "Smoking", "Excessive salt intake"]
    },
    recommendation: {
      id: "Disarankan melakukan evaluasi medis untuk menentukan penyebab, faktor risiko, dan rencana penanganan yang tepat.",
      en: "Medical evaluation is recommended to assess causes, risk factors, and an appropriate care plan."
    }
  },
  hypertensive_crisis: {
    label: { id: "Krisis Hipertensi", en: "Hypertensive Crisis Range" },
    risk: { id: "Sangat Tinggi", en: "Very High" },
    riskLevel: "very_high",
    variant: "crisis",
    meaning: {
      id: "Tekanan darah sangat tinggi dan berpotensi menyebabkan komplikasi serius dalam waktu singkat.",
      en: "This reading is very high and may be associated with serious short-term complications."
    },
    conclusion: {
      id: "Angka ini berada dalam rentang krisis hipertensi. Ini dapat memerlukan evaluasi medis segera, terutama bila ada gejala.",
      en: "This reading falls within a hypertensive crisis range. This may require urgent medical evaluation, especially if symptoms are present."
    },
    do: {
      id: ["Segera mencari pertolongan medis", "Datang ke IGD atau fasilitas kesehatan terdekat", "Tetap tenang dan ikuti instruksi tenaga medis"],
      en: ["Seek medical help immediately", "Go to the nearest emergency or healthcare facility", "Stay calm and follow medical instructions"]
    },
    dont: {
      id: ["Menunda pemeriksaan", "Mengobati sendiri tanpa arahan tenaga kesehatan", "Mengabaikan gejala yang muncul"],
      en: ["Delaying evaluation", "Self-treating without medical direction", "Ignoring symptoms"]
    },
    recommendation: {
      id: "Jika disertai nyeri dada, sesak napas, sakit kepala berat, kelemahan anggota tubuh, gangguan bicara, atau gangguan penglihatan, segera cari bantuan medis darurat.",
      en: "If accompanied by chest pain, shortness of breath, severe headache, weakness, speech problems, or vision changes, seek emergency medical help immediately."
    }
  }
};

const sugarResults: Record<string, Omit<ClassifierResult, "type" | "categoryKey" | "redFlags" | "related">> = {
  glucose_normal: {
    label: { id: "Normal", en: "Normal" },
    risk: { id: "Rendah", en: "Low" },
    riskLevel: "low",
    variant: "normal",
    meaning: {
      id: "Kadar gula darah masih dalam rentang sehat dan risiko komplikasi akibat diabetes relatif rendah.",
      en: "This result is within a healthy range and diabetes-related complication risk is generally lower."
    },
    conclusion: {
      id: "Rentang ini berada dalam kategori normal secara edukatif. Evaluasi profesional tetap diperlukan bila ada kekhawatiran.",
      en: "This result falls within an educational normal range. Professional evaluation is still needed if you are concerned."
    },
    do: {
      id: ["Konsumsi makanan bergizi seimbang", "Pertahankan berat badan ideal", "Aktivitas fisik rutin", "Minum air putih yang cukup", "Pemeriksaan gula darah berkala"],
      en: ["Eat a balanced diet", "Maintain a healthy weight", "Stay physically active", "Drink enough water", "Check blood sugar periodically if at risk"]
    },
    dont: {
      id: ["Konsumsi minuman manis berlebihan", "Kurang aktivitas fisik", "Merokok", "Pola makan tinggi gula secara rutin"],
      en: ["Excess sugary drinks", "Physical inactivity", "Smoking", "Frequent high-sugar eating patterns"]
    },
    recommendation: {
      id: "Pertahankan gaya hidup sehat dan lakukan skrining diabetes secara berkala terutama jika memiliki riwayat keluarga diabetes.",
      en: "Maintain healthy habits and consider periodic screening, especially if you have risk factors."
    }
  },
  prediabetes: {
    label: { id: "Prediabetes", en: "Prediabetes Range" },
    risk: { id: "Perlu Perhatian", en: "Needs Attention" },
    riskLevel: "attention",
    variant: "attention",
    meaning: {
      id: "Tubuh mulai mengalami gangguan pengaturan gula darah. Kondisi ini masih dapat diperbaiki dengan perubahan gaya hidup.",
      en: "This range suggests early blood sugar regulation problems. Lifestyle changes can help lower future risk."
    },
    conclusion: {
      id: "Rentang ini dapat mengarah ke prediabetes. Diagnosis membutuhkan pemeriksaan konfirmasi dan evaluasi tenaga kesehatan.",
      en: "This result falls within a range associated with prediabetes. Diagnosis requires confirmatory testing and professional evaluation."
    },
    do: {
      id: ["Kurangi makanan dan minuman manis", "Tingkatkan aktivitas fisik minimal 150 menit per minggu", "Turunkan berat badan bila berlebih", "Perbanyak konsumsi sayur dan serat", "Tidur cukup"],
      en: ["Reduce sugary foods and drinks", "Increase physical activity", "Lose weight if overweight", "Eat more vegetables and fiber", "Get enough sleep"]
    },
    dont: {
      id: ["Minuman bersoda", "Teh atau kopi dengan gula berlebihan", "Makanan ultra-proses", "Gaya hidup sedentari"],
      en: ["Soda and sugary drinks", "Tea or coffee with excessive sugar", "Ultra-processed foods", "Sedentary lifestyle"]
    },
    recommendation: {
      id: "Perubahan gaya hidup dapat menurunkan risiko berkembang menjadi diabetes tipe 2 secara signifikan. Lakukan pemeriksaan ulang sesuai anjuran tenaga kesehatan.",
      en: "Lifestyle changes can reduce the risk of developing type 2 diabetes. Repeat testing should follow healthcare professional guidance."
    }
  },
  diabetes_range: {
    label: { id: "Rentang Diabetes", en: "Diabetes Range" },
    risk: { id: "Tinggi", en: "High" },
    riskLevel: "high",
    variant: "high",
    meaning: {
      id: "Kadar gula darah berada dalam rentang yang dapat mengarah ke diabetes dan memerlukan konfirmasi serta pengelolaan jangka panjang oleh tenaga kesehatan.",
      en: "This result falls within a range associated with diabetes and needs confirmation and long-term management guidance from a healthcare professional."
    },
    conclusion: {
      id: "Rentang ini dapat mengarah ke diabetes. Ini bukan diagnosis; perlu pemeriksaan konfirmasi dan evaluasi profesional.",
      en: "This result falls within a range associated with diabetes. This is not a diagnosis; confirmatory testing and professional evaluation are needed."
    },
    do: {
      id: ["Kontrol ke tenaga kesehatan", "Ikuti pemeriksaan lanjutan yang dianjurkan", "Pantau gula darah secara berkala", "Terapkan pola makan sehat", "Aktivitas fisik rutin sesuai kemampuan"],
      en: ["Consult a healthcare professional", "Follow recommended confirmatory testing", "Monitor blood sugar as advised", "Follow a healthy eating pattern", "Stay physically active as appropriate"]
    },
    dont: {
      id: ["Mengabaikan hasil pemeriksaan", "Konsumsi gula berlebihan", "Merokok", "Menunda kontrol kesehatan"],
      en: ["Ignoring test results", "Excess sugar intake", "Smoking", "Delaying medical follow-up"]
    },
    recommendation: {
      id: "Pengelolaan gula darah yang baik dapat membantu mencegah komplikasi pada mata, ginjal, saraf, jantung, dan pembuluh darah.",
      en: "Good blood sugar management can help reduce risks involving the eyes, kidneys, nerves, heart, and blood vessels."
    }
  },
  high_diabetes_range: {
    label: { id: "Gula Darah Tinggi / Perlu Evaluasi Kontrol", en: "High Diabetes-Range Reading / Needs Evaluation" },
    risk: { id: "Sangat Tinggi", en: "Very High" },
    riskLevel: "very_high",
    variant: "crisis",
    meaning: {
      id: "Kadar gula darah berada pada rentang tinggi dan perlu evaluasi medis untuk menilai kontrol gula darah serta risiko komplikasi.",
      en: "This result is in a high range and needs medical evaluation to assess blood sugar control and complication risk."
    },
    conclusion: {
      id: "Rentang ini tinggi dan perlu evaluasi medis. Jangan menggunakan hasil ini sebagai diagnosis mandiri.",
      en: "This result is in a high range and needs medical evaluation. Do not use this result as a self-diagnosis."
    },
    do: {
      id: ["Segera evaluasi dengan tenaga kesehatan", "Periksa HbA1c secara berkala bila dianjurkan", "Pantau gula darah sesuai arahan", "Terapkan pola makan sesuai anjuran", "Periksa mata, ginjal, dan kaki bila berisiko"],
      en: ["Seek medical evaluation", "Check HbA1c periodically if advised", "Monitor glucose as directed", "Follow nutrition guidance", "Consider eye, kidney, and foot checks if at risk"]
    },
    dont: {
      id: ["Melewatkan obat bila sudah diresepkan", "Pola makan tinggi gula", "Mengabaikan gejala", "Menunda pemeriksaan kesehatan"],
      en: ["Missing prescribed medication", "High-sugar eating patterns", "Ignoring symptoms", "Delaying care"]
    },
    recommendation: {
      id: "Diperlukan evaluasi menyeluruh untuk mengoptimalkan pengendalian gula darah dan menurunkan risiko komplikasi.",
      en: "A complete evaluation can help optimize blood sugar control and reduce complication risk."
    }
  },
  random_inconclusive: {
    label: { id: "GDS Membutuhkan Konteks", en: "Random Glucose Needs Context" },
    risk: { id: "Perlu Konteks", en: "Needs Context" },
    riskLevel: "context",
    variant: "inconclusive",
    meaning: {
      id: "GDS dipengaruhi waktu makan, jenis makanan, aktivitas, dan stres. Nilai ini saja tidak cukup untuk menyimpulkan normal atau prediabetes.",
      en: "Random glucose is affected by meal timing, food type, activity, and stress. This value alone is not enough to classify normal or prediabetes."
    },
    conclusion: {
      id: "GDS saja membutuhkan konteks. Gunakan pemeriksaan GDP atau HbA1c untuk klasifikasi yang lebih jelas.",
      en: "Random glucose alone needs context. Use fasting glucose or HbA1c for clearer classification."
    },
    do: {
      id: ["Catat waktu makan terakhir secara pribadi, tidak di app", "Pertimbangkan pemeriksaan GDP atau HbA1c", "Konsultasikan hasil dengan tenaga kesehatan bila khawatir"],
      en: ["Privately note timing of last meal, not in the app", "Consider fasting glucose or HbA1c testing", "Consult a professional if concerned"]
    },
    dont: {
      id: ["Langsung menyimpulkan normal dari GDS saja", "Mengabaikan gejala yang mengganggu", "Melakukan pengobatan sendiri tanpa arahan"],
      en: ["Concluding normal from random glucose alone", "Ignoring concerning symptoms", "Self-treating without medical guidance"]
    },
    recommendation: {
      id: "Untuk klasifikasi yang lebih jelas, gunakan pemeriksaan GDP atau HbA1c dan konsultasikan hasilnya dengan tenaga kesehatan.",
      en: "For clearer classification, use fasting glucose or HbA1c and discuss results with a healthcare professional."
    }
  },
  high_random_glucose: {
    label: { id: "GDS Tinggi / Perlu Evaluasi Medis", en: "High Random Glucose / Needs Medical Evaluation" },
    risk: { id: "Tinggi", en: "High" },
    riskLevel: "high",
    variant: "high",
    meaning: {
      id: "GDS yang tinggi dapat menjadi tanda gula darah bermasalah, terutama bila disertai gejala klasik seperti sering haus, sering kencing, mudah lelah, atau berat badan turun. Pemeriksaan lanjutan diperlukan.",
      en: "A high random glucose reading can indicate a blood sugar problem, especially if accompanied by classic symptoms such as increased thirst, frequent urination, fatigue, or unexplained weight loss. Follow-up testing is needed."
    },
    conclusion: {
      id: "Rentang GDS ini tinggi dan perlu dikonfirmasi dengan pemeriksaan lanjutan.",
      en: "This random glucose range is high and needs follow-up testing for confirmation."
    },
    do: {
      id: ["Pertimbangkan evaluasi medis", "Lakukan pemeriksaan lanjutan sesuai anjuran", "Perhatikan gejala seperti sering haus, sering kencing, lemas, atau berat badan turun"],
      en: ["Consider medical evaluation", "Follow recommended confirmatory testing", "Watch for symptoms such as increased thirst, frequent urination, weakness, or weight loss"]
    },
    dont: {
      id: ["Mengabaikan nilai tinggi", "Menunda pemeriksaan bila ada gejala", "Mengobati sendiri tanpa arahan tenaga kesehatan"],
      en: ["Ignoring a high reading", "Delaying evaluation if symptoms are present", "Self-treating without professional guidance"]
    },
    recommendation: {
      id: "GDS tinggi perlu dikonfirmasi dengan pemeriksaan lanjutan dan evaluasi tenaga kesehatan, terutama bila disertai gejala.",
      en: "A high random glucose reading needs follow-up testing and medical evaluation, especially if symptoms are present."
    }
  }
};

function withBp(key: keyof typeof bpResults): ClassifierResult {
  return { type: "blood_pressure", categoryKey: key, redFlags: bpRedFlags, related: bpRelated, ...bpResults[key] };
}

function withSugar(key: keyof typeof sugarResults): ClassifierResult {
  return { type: "blood_sugar", categoryKey: key, redFlags: sugarRedFlags, related: sugarRelated, ...sugarResults[key] };
}

export function validateBloodPressure(systolic: string, diastolic: string): ValidationResult {
  const sys = Number(systolic);
  const dia = Number(diastolic);
  if (!systolic || !diastolic) return { valid: false, message: { id: "Isi tekanan sistolik dan diastolik.", en: "Enter both systolic and diastolic values." } };
  if (!Number.isFinite(sys) || !Number.isFinite(dia)) return { valid: false, message: { id: "Gunakan angka saja.", en: "Use numbers only." } };
  if (sys < 70 || sys > 260) return { valid: false, message: { id: "Sistolik terlihat di luar rentang wajar 70-260 mmHg.", en: "Systolic looks outside the reasonable 70-260 mmHg range." } };
  if (dia < 40 || dia > 160) return { valid: false, message: { id: "Diastolik terlihat di luar rentang wajar 40-160 mmHg.", en: "Diastolic looks outside the reasonable 40-160 mmHg range." } };
  return { valid: true };
}

// Educational-only local classifier. It never persists readings and never diagnoses.
export function classifyBloodPressure(systolic: number, diastolic: number): ClassifierResult {
  if (systolic > 180 || diastolic > 120) return withBp("hypertensive_crisis");
  if (systolic >= 140 || diastolic >= 90) return withBp("hypertension_stage_2");
  if (systolic >= 130 || diastolic >= 80) return withBp("hypertension_stage_1");
  if (systolic >= 120 && systolic <= 129 && diastolic < 80) return withBp("elevated");
  return withBp("normal");
}

export function validateBloodSugar(testType: BloodSugarTestType, value: string): ValidationResult {
  const numeric = Number(value);
  if (!value) return { valid: false, message: { id: "Isi nilai pemeriksaan.", en: "Enter the test value." } };
  if (!Number.isFinite(numeric)) return { valid: false, message: { id: "Gunakan angka saja.", en: "Use numbers only." } };
  if (testType === "hba1c") {
    if (numeric < 3 || numeric > 20) return { valid: false, message: { id: "HbA1c terlihat di luar rentang wajar 3-20%.", en: "HbA1c looks outside the reasonable 3-20% range." } };
  } else if (numeric < 40 || numeric > 600) {
    return { valid: false, message: { id: "Gula darah terlihat di luar rentang wajar 40-600 mg/dL.", en: "Glucose looks outside the reasonable 40-600 mg/dL range." } };
  }
  return { valid: true };
}

// Random glucose is limited: below 200 mg/dL is not enough to classify normal or prediabetes.
export function classifyBloodSugar(testType: BloodSugarTestType, value: number): ClassifierResult {
  if (testType === "hba1c") {
    if (value < 5.7) return withSugar("glucose_normal");
    if (value < 6.5) return withSugar("prediabetes");
    if (value < 8) return withSugar("diabetes_range");
    return withSugar("high_diabetes_range");
  }
  if (testType === "fasting_glucose") {
    if (value <= 99) return withSugar("glucose_normal");
    if (value <= 125) return withSugar("prediabetes");
    if (value < 200) return withSugar("diabetes_range");
    return withSugar("high_diabetes_range");
  }
  if (value >= 200) return withSugar("high_random_glucose");
  return withSugar("random_inconclusive");
}
