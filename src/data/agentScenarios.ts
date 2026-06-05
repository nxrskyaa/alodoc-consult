export type AgentLanguage = "id" | "en";

export type AgentScenarioCategory = "blood-pressure" | "blood-sugar" | "bmi" | "food" | "lifestyle" | "common-cold" | "dengue";

export type AgentScenarioLevel =
  | "low"
  | "normal"
  | "elevated"
  | "high"
  | "crisis"
  | "underweight"
  | "overweight"
  | "obesity"
  | "general";

export type AgentVisualType = "pressure" | "sugar" | "bmi" | "food" | "lifestyle" | "cold" | "dengue";

export type LocalizedText = Record<AgentLanguage, string>;

export type AgentScenario = {
  id: string;
  category: AgentScenarioCategory;
  level?: AgentScenarioLevel;
  title: LocalizedText;
  userQuestion: LocalizedText;
  sampleContext: LocalizedText;
  agentAnswer: {
    title: LocalizedText;
    opening: LocalizedText;
    simpleExplanation: LocalizedText;
    learningMeaning: LocalizedText;
    foodGuidance: LocalizedText;
    lifestyleGuidance: LocalizedText;
    safetyReminder: LocalizedText;
    recommendedPath: LocalizedText;
  };
  modules: Array<{
    label: string;
    href: string;
  }>;
  visualType: AgentVisualType;
};

export const agentScenarioCategories: Array<{
  id: "all" | AgentScenarioCategory;
  label: string;
}> = [
  { id: "all", label: "All" },
  { id: "blood-pressure", label: "Tensi" },
  { id: "blood-sugar", label: "Gula Darah" },
  { id: "bmi", label: "BMI" },
  { id: "food", label: "Makanan Sehat" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "common-cold", label: "Common Cold" },
  { id: "dengue", label: "Dengue" }
];

const moduleLinks = {
  hypertension: [{ label: "Start Hypertension Module", href: "/disease/hypertension" }],
  diabetes: [{ label: "Start Type 2 Diabetes Module", href: "/disease/type-2-diabetes" }],
  cold: [{ label: "Start Common Cold Module", href: "/disease/common-cold" }],
  dengue: [{ label: "Start Dengue Module", href: "/disease/dengue-fever" }],
  library: [{ label: "Explore Library", href: "/library" }],
  classifier: [{ label: "Try Classifier", href: "/classifier" }],
  diabetesHypertension: [
    { label: "Start Type 2 Diabetes", href: "/disease/type-2-diabetes" },
    { label: "Start Hypertension", href: "/disease/hypertension" }
  ],
  coldDengue: [
    { label: "Start Common Cold", href: "/disease/common-cold" },
    { label: "Start Dengue", href: "/disease/dengue-fever" }
  ]
};

export const agentScenarios: AgentScenario[] = [
  {
    id: "bp-normal-118-76",
    category: "blood-pressure",
    level: "normal",
    title: { id: "Tensi normal", en: "Normal blood pressure" },
    userQuestion: {
      id: "Contoh tensi saya 118/76. Apa artinya untuk pembelajaran?",
      en: "My blood pressure example is 118/76. What does this mean for learning?"
    },
    sampleContext: { id: "118/76 mmHg", en: "118/76 mmHg" },
    visualType: "pressure",
    modules: moduleLinks.hypertension,
    agentAnswer: {
      title: { id: "Panduan Belajar Tensi Normal", en: "Normal Blood Pressure Learning Guide" },
      opening: {
        id: "Alo Agent akan menjelaskan contoh ini sebagai edukasi umum, bukan diagnosis.",
        en: "Alo Agent will explain this example as general education, not diagnosis."
      },
      simpleExplanation: {
        id: "118/76 mmHg berada dalam rentang tekanan darah dewasa yang umum dianggap baik untuk edukasi. Ini adalah titik awal untuk belajar pencegahan hipertensi dan menjaga kebiasaan sehat.",
        en: "118/76 mmHg is within a usual adult blood pressure range for education. It is a good starting point to learn prevention and healthy habit maintenance."
      },
      learningMeaning: {
        id: "Kamu bisa belajar arti sistolik dan diastolik, kenapa tekanan darah tetap perlu dipantau, dan bagaimana kebiasaan harian membantu menjaga tekanan darah.",
        en: "You can learn what systolic and diastolic numbers mean, why monitoring still matters, and how daily habits support blood pressure health."
      },
      foodGuidance: {
        id: "Fokus makanan: piring seimbang, sayur dan buah, kesadaran garam, cukup air, dan membatasi makanan ultra-proses terlalu sering.",
        en: "Food focus: balanced plates, vegetables and fruits, salt awareness, enough water, and limiting ultra-processed foods too often."
      },
      lifestyleGuidance: {
        id: "Fokus lifestyle: jalan kaki rutin, tidur cukup, manajemen stres, tidak merokok, dan cek tekanan darah secara berkala.",
        en: "Lifestyle focus: regular walking, enough sleep, stress management, avoiding smoking, and routine blood pressure checks."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Konsultasikan ke tenaga kesehatan jika ada angka atau gejala yang mengkhawatirkan.",
        en: "This is education only, not diagnosis or medical advice. Consult a professional if readings or symptoms are concerning."
      },
      recommendedPath: {
        id: "Rekomendasi modul: Hipertensi untuk belajar pencegahan.",
        en: "Recommended module: Hypertension for prevention learning."
      }
    }
  },
  {
    id: "bp-elevated-128-78",
    category: "blood-pressure",
    level: "elevated",
    title: { id: "Tensi sedikit meningkat", en: "Elevated blood pressure" },
    userQuestion: {
      id: "Contoh tensi saya 128/78. Apa yang perlu saya pahami sejak awal?",
      en: "My blood pressure example is 128/78. What should I understand early?"
    },
    sampleContext: { id: "128/78 mmHg", en: "128/78 mmHg" },
    visualType: "pressure",
    modules: moduleLinks.hypertension,
    agentAnswer: {
      title: { id: "Panduan Tensi Sedikit Meningkat", en: "Elevated Blood Pressure Learning Guide" },
      opening: { id: "Alo Agent membaca angka ini sebagai sinyal belajar awal.", en: "Alo Agent reads this as an early learning signal." },
      simpleExplanation: {
        id: "128/78 mmHg menunjukkan sistolik yang sedikit meningkat untuk edukasi. Ini bukan diagnosis, tetapi berguna untuk mulai memahami kebiasaan yang memengaruhi tekanan darah.",
        en: "128/78 mmHg shows a slightly elevated systolic value for education. It is not a diagnosis, but it is useful for learning habits that affect blood pressure."
      },
      learningMeaning: {
        id: "Pelajari kenapa satu angka belum cukup, bagaimana pengukuran berulang dilakukan, dan mengapa pencegahan lebih mudah dimulai sejak awal.",
        en: "Learn why one number is not enough, how repeated measurement works, and why prevention is easier when started early."
      },
      foodGuidance: {
        id: "Pelajari kesadaran garam, makanan olahan, label nutrisi, serta cara membangun makanan seimbang tanpa aturan ekstrem.",
        en: "Learn salt awareness, processed foods, nutrition labels, and how to build balanced meals without extreme rules."
      },
      lifestyleGuidance: {
        id: "Kebiasaan yang relevan: bergerak rutin, tidur cukup, manajemen stres, hidrasi, dan memantau tekanan darah di waktu yang konsisten.",
        en: "Relevant habits: regular movement, enough sleep, stress management, hydration, and checking blood pressure at consistent times."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Jika angka berulang tinggi atau disertai gejala, konsultasikan dengan tenaga kesehatan.",
        en: "This is education only, not diagnosis or medical advice. If readings stay high or symptoms appear, consult a professional."
      },
      recommendedPath: { id: "Rekomendasi modul: Hipertensi.", en: "Recommended module: Hypertension." }
    }
  },
  {
    id: "bp-high-145-92",
    category: "blood-pressure",
    level: "high",
    title: { id: "Tensi tinggi", en: "High blood pressure" },
    userQuestion: {
      id: "Contoh tensi saya 145/92. Apa yang perlu saya pahami dan kebiasaan apa yang perlu saya pelajari?",
      en: "My blood pressure example is 145/92. What should I understand and what habits should I learn?"
    },
    sampleContext: { id: "145/92 mmHg", en: "145/92 mmHg" },
    visualType: "pressure",
    modules: moduleLinks.hypertension,
    agentAnswer: {
      title: { id: "Panduan Belajar Tensi Tinggi", en: "High Blood Pressure Learning Guide" },
      opening: { id: "Alo Agent akan membuat panduan belajar yang aman dan praktis.", en: "Alo Agent will create a safe and practical learning guide." },
      simpleExplanation: {
        id: "145/92 mmHg adalah contoh rentang tekanan darah tinggi untuk edukasi. Satu kali pengukuran belum cukup untuk diagnosis, tetapi perlu dipahami melalui pengukuran berulang dan konteks kesehatan.",
        en: "145/92 mmHg is a high blood pressure range example for education. One reading is not enough for diagnosis, but it should be understood through repeated measurements and health context."
      },
      learningMeaning: {
        id: "Pelajari arti sistolik/diastolik, kenapa hipertensi sering tidak bergejala, dan mengapa kebiasaan harian berperan dalam jangka panjang.",
        en: "Learn systolic/diastolic meaning, why hypertension can be silent, and why daily habits matter over time."
      },
      foodGuidance: {
        id: "Topik makanan: mengurangi garam berlebihan, membaca label nutrisi, memahami makanan olahan, menambah buah/sayur, dan membangun piring seimbang.",
        en: "Food topics: reducing excessive salt, reading nutrition labels, understanding processed foods, adding fruits/vegetables, and building balanced plates."
      },
      lifestyleGuidance: {
        id: "Topik lifestyle: jalan kaki, tidur, stres, kesadaran rokok, membatasi alkohol, dan pemantauan tekanan darah secara berkala.",
        en: "Lifestyle topics: walking, sleep, stress, smoking awareness, limiting alcohol, and routine blood pressure monitoring."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Waspadai nyeri dada, sesak napas, lemah satu sisi, kebingungan, sakit kepala berat, atau perubahan penglihatan.",
        en: "This is education only, not diagnosis or medical advice. Watch for chest pain, shortness of breath, one-sided weakness, confusion, severe headache, or vision changes."
      },
      recommendedPath: { id: "Rekomendasi modul: Hipertensi.", en: "Recommended module: Hypertension." }
    }
  },
  {
    id: "bp-crisis-182-121",
    category: "blood-pressure",
    level: "crisis",
    title: { id: "Tensi sangat tinggi", en: "Very high blood pressure" },
    userQuestion: {
      id: "Contoh tensi saya 182/121. Apa yang perlu saya pelajari dan tanda bahaya apa yang penting?",
      en: "My blood pressure example is 182/121. What should I learn and what warning signs matter?"
    },
    sampleContext: { id: "182/121 mmHg", en: "182/121 mmHg" },
    visualType: "pressure",
    modules: moduleLinks.hypertension,
    agentAnswer: {
      title: { id: "Panduan Keamanan Tensi Sangat Tinggi", en: "Very High Blood Pressure Safety Guide" },
      opening: { id: "Alo Agent akan menempatkan keamanan sebagai prioritas.", en: "Alo Agent will put safety first." },
      simpleExplanation: {
        id: "182/121 mmHg adalah contoh rentang sangat tinggi untuk edukasi. Ini bukan diagnosis, tetapi angka seperti ini perlu dipahami sebagai sinyal keamanan yang serius.",
        en: "182/121 mmHg is a very high example range for education. This is not a diagnosis, but a number like this should be understood as a serious safety signal."
      },
      learningMeaning: {
        id: "Pelajari kenapa tekanan darah sangat tinggi perlu konfirmasi profesional, kenapa gejala penting, dan kenapa keputusan medis tidak boleh dibuat dari aplikasi edukasi.",
        en: "Learn why very high blood pressure needs professional confirmation, why symptoms matter, and why medical decisions should not be made from an education app."
      },
      foodGuidance: {
        id: "Makanan tetap bagian dari edukasi jangka panjang: garam, makanan olahan, label nutrisi, buah/sayur, dan pola makan seimbang.",
        en: "Food remains part of long-term education: salt, processed foods, nutrition labels, fruits/vegetables, and balanced eating patterns."
      },
      lifestyleGuidance: {
        id: "Lifestyle jangka panjang mencakup aktivitas fisik, tidur, stres, rokok, alkohol, dan pemantauan, tetapi kondisi sangat tinggi perlu perhatian keamanan lebih dulu.",
        en: "Long-term lifestyle topics include activity, sleep, stress, smoking, alcohol, and monitoring, but very high readings need safety attention first."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Jika ada nyeri dada, sesak napas, kelemahan, kebingungan, sakit kepala berat, atau perubahan penglihatan, segera cari pertolongan medis.",
        en: "This is education only, not diagnosis or medical advice. If there is chest pain, shortness of breath, weakness, confusion, severe headache, or vision change, seek urgent medical care."
      },
      recommendedPath: { id: "Rekomendasi modul: Hipertensi setelah keamanan dipastikan.", en: "Recommended module: Hypertension after safety is addressed." }
    }
  },
  {
    id: "sugar-normal-fasting-92",
    category: "blood-sugar",
    level: "normal",
    title: { id: "Gula darah puasa normal", en: "Normal fasting blood sugar" },
    userQuestion: {
      id: "Contoh gula darah puasa saya 92 mg/dL. Apa yang perlu saya pelajari agar tetap sehat?",
      en: "My fasting blood sugar example is 92 mg/dL. What should I learn to keep it healthy?"
    },
    sampleContext: { id: "Puasa 92 mg/dL", en: "Fasting 92 mg/dL" },
    visualType: "sugar",
    modules: moduleLinks.diabetes,
    agentAnswer: {
      title: { id: "Panduan Gula Darah Puasa Normal", en: "Normal Fasting Blood Sugar Guide" },
      opening: { id: "Alo Agent akan fokus pada pencegahan dan kebiasaan sehat.", en: "Alo Agent will focus on prevention and healthy habits." },
      simpleExplanation: {
        id: "Gula darah puasa 92 mg/dL berada dalam rentang umum yang sehat untuk edukasi. Tetap penting belajar pencegahan dan faktor yang memengaruhi gula darah.",
        en: "Fasting blood sugar 92 mg/dL is within a usual healthy range for education. It is still useful to learn prevention and factors that affect blood sugar."
      },
      learningMeaning: {
        id: "Pelajari cara kerja gula darah, peran insulin, dan kenapa pola makan, tidur, aktivitas fisik, serta check-up berkala tetap penting.",
        en: "Learn how blood sugar works, insulin's role, and why food habits, sleep, activity, and routine check-ups still matter."
      },
      foodGuidance: {
        id: "Fokus makanan: karbohidrat seimbang, serat, air putih, buah/sayur, dan mengurangi minuman manis terlalu sering.",
        en: "Food focus: balanced carbohydrates, fiber, water, fruits/vegetables, and reducing frequent sugary drinks."
      },
      lifestyleGuidance: {
        id: "Fokus lifestyle: bergerak rutin, tidur konsisten, hidrasi, manajemen stres, dan pemantauan berkala sesuai kebutuhan.",
        en: "Lifestyle focus: regular movement, consistent sleep, hydration, stress management, and routine monitoring as needed."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Konsultasikan jika ada angka atau gejala yang mengkhawatirkan.",
        en: "This is education only, not diagnosis or medical advice. Consult a professional if readings or symptoms are concerning."
      },
      recommendedPath: { id: "Rekomendasi modul: Diabetes Tipe 2 untuk pencegahan.", en: "Recommended module: Type 2 Diabetes for prevention." }
    }
  },
  {
    id: "sugar-elevated-fasting-112",
    category: "blood-sugar",
    level: "elevated",
    title: { id: "Gula darah puasa meningkat", en: "Elevated fasting blood sugar" },
    userQuestion: {
      id: "Contoh gula darah puasa saya 112 mg/dL. Apa artinya untuk pembelajaran?",
      en: "My fasting blood sugar example is 112 mg/dL. What does this mean for learning?"
    },
    sampleContext: { id: "Puasa 112 mg/dL", en: "Fasting 112 mg/dL" },
    visualType: "sugar",
    modules: moduleLinks.diabetes,
    agentAnswer: {
      title: { id: "Panduan Gula Darah Puasa Meningkat", en: "Elevated Fasting Blood Sugar Guide" },
      opening: { id: "Alo Agent akan menjelaskan ini sebagai literasi awal.", en: "Alo Agent will explain this as early literacy." },
      simpleExplanation: {
        id: "Puasa 112 mg/dL dapat dipakai untuk belajar tentang rentang yang meningkat. Istilah seperti pradiabetes adalah topik literasi, bukan diagnosis dari satu angka.",
        en: "Fasting 112 mg/dL can be used to learn about an elevated range. Terms like prediabetes are literacy topics, not diagnosis from one number."
      },
      learningMeaning: {
        id: "Pelajari mengapa konfirmasi pemeriksaan penting, bagaimana makanan memengaruhi gula darah, dan kenapa kebiasaan harian berpengaruh.",
        en: "Learn why test confirmation matters, how food affects blood sugar, and why daily habits influence it."
      },
      foodGuidance: {
        id: "Fokus makanan: karbohidrat olahan, minuman manis, porsi, serat, dan konsistensi pola makan.",
        en: "Food focus: refined carbs, sugary drinks, portions, fiber, and consistent meal habits."
      },
      lifestyleGuidance: {
        id: "Fokus lifestyle: jalan kaki, tidur, stres, edukasi berat badan, hidrasi, dan check-up berkala.",
        en: "Lifestyle focus: walking, sleep, stress, weight education, hydration, and routine check-ups."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Diskusikan hasil berulang dengan tenaga kesehatan.",
        en: "This is education only, not diagnosis or medical advice. Discuss repeated results with a healthcare professional."
      },
      recommendedPath: { id: "Rekomendasi modul: Diabetes Tipe 2.", en: "Recommended module: Type 2 Diabetes." }
    }
  },
  {
    id: "sugar-high-fasting-132",
    category: "blood-sugar",
    level: "high",
    title: { id: "Gula darah puasa tinggi", en: "High fasting blood sugar" },
    userQuestion: {
      id: "Contoh gula darah puasa saya 132 mg/dL. Apa yang perlu saya pelajari dari angka ini?",
      en: "My fasting blood sugar example is 132 mg/dL. What should I learn from this?"
    },
    sampleContext: { id: "Puasa 132 mg/dL", en: "Fasting 132 mg/dL" },
    visualType: "sugar",
    modules: moduleLinks.diabetes,
    agentAnswer: {
      title: { id: "Panduan Gula Darah Puasa Tinggi", en: "High Fasting Blood Sugar Guide" },
      opening: { id: "Alo Agent akan membantu memahami angka ini dengan aman.", en: "Alo Agent will help explain this safely." },
      simpleExplanation: {
        id: "Puasa 132 mg/dL adalah contoh angka tinggi untuk edukasi. Ini bukan diagnosis dan perlu dikonfirmasi dengan pemeriksaan medis yang tepat.",
        en: "Fasting 132 mg/dL is a high example value for education. It is not a diagnosis and should be confirmed with proper medical testing."
      },
      learningMeaning: {
        id: "Pelajari arti gula darah puasa, kenapa konfirmasi penting, dan bagaimana diabetes tipe 2 berhubungan dengan kebiasaan jangka panjang.",
        en: "Learn what fasting glucose means, why confirmation matters, and how type 2 diabetes relates to long-term habits."
      },
      foodGuidance: {
        id: "Fokus makanan: kesadaran gula, minuman manis, serat, porsi, makanan minim proses, dan pola makan konsisten.",
        en: "Food focus: sugar awareness, sugary drinks, fiber, portions, minimally processed foods, and consistent eating patterns."
      },
      lifestyleGuidance: {
        id: "Fokus lifestyle: aktivitas fisik, hidrasi, tidur, manajemen stres, dan check-up berkala.",
        en: "Lifestyle focus: physical activity, hydration, sleep, stress management, and routine check-ups."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Jika angka sangat tinggi atau ada gejala mengkhawatirkan, konsultasikan dengan tenaga kesehatan.",
        en: "This is education only, not diagnosis or medical advice. If readings are very high or symptoms are concerning, consult a professional."
      },
      recommendedPath: { id: "Rekomendasi modul: Diabetes Tipe 2.", en: "Recommended module: Type 2 Diabetes." }
    }
  },
  {
    id: "sugar-random-high-215",
    category: "blood-sugar",
    level: "high",
    title: { id: "Gula darah sewaktu tinggi", en: "Random high blood sugar" },
    userQuestion: {
      id: "Contoh gula darah sewaktu saya 215 mg/dL. Apa yang perlu saya pahami?",
      en: "My random blood sugar example is 215 mg/dL. What should I understand?"
    },
    sampleContext: { id: "Sewaktu 215 mg/dL", en: "Random 215 mg/dL" },
    visualType: "sugar",
    modules: moduleLinks.diabetes,
    agentAnswer: {
      title: { id: "Panduan Gula Darah Sewaktu Tinggi", en: "Random High Blood Sugar Guide" },
      opening: { id: "Alo Agent akan memisahkan edukasi dari diagnosis.", en: "Alo Agent will separate education from diagnosis." },
      simpleExplanation: {
        id: "Gula darah sewaktu 215 mg/dL adalah contoh angka tinggi untuk edukasi. Nilai sewaktu perlu dipahami bersama konteks waktu makan, gejala, dan konfirmasi medis.",
        en: "Random blood sugar 215 mg/dL is a high example value for education. Random values should be understood with meal timing, symptoms, and medical confirmation."
      },
      learningMeaning: {
        id: "Pelajari perbedaan gula darah puasa dan sewaktu, kenapa gejala penting, dan kenapa pemeriksaan lanjutan dibutuhkan.",
        en: "Learn the difference between fasting and random blood sugar, why symptoms matter, and why follow-up testing is needed."
      },
      foodGuidance: {
        id: "Fokus makanan: minuman manis, karbohidrat olahan, porsi, serat, dan pola makan yang konsisten.",
        en: "Food focus: sugary drinks, refined carbohydrates, portions, fiber, and consistent eating patterns."
      },
      lifestyleGuidance: {
        id: "Fokus lifestyle: check-up berkala, aktivitas fisik sesuai kemampuan, hidrasi, tidur, dan manajemen stres.",
        en: "Lifestyle focus: routine check-ups, activity within ability, hydration, sleep, and stress management."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Perhatikan haus berlebihan, sering kencing, lemas, muntah, atau kebingungan.",
        en: "This is education only, not diagnosis or medical advice. Watch for excessive thirst, frequent urination, weakness, vomiting, or confusion."
      },
      recommendedPath: { id: "Rekomendasi modul: Diabetes Tipe 2.", en: "Recommended module: Type 2 Diabetes." }
    }
  },
  {
    id: "sugar-low-65",
    category: "blood-sugar",
    level: "low",
    title: { id: "Gula darah rendah", en: "Low blood sugar" },
    userQuestion: {
      id: "Contoh gula darah saya 65 mg/dL. Apa yang perlu saya pelajari tentang gula darah rendah?",
      en: "My blood sugar example is 65 mg/dL. What should I learn about low blood sugar?"
    },
    sampleContext: { id: "65 mg/dL", en: "65 mg/dL" },
    visualType: "sugar",
    modules: moduleLinks.diabetes,
    agentAnswer: {
      title: { id: "Panduan Gula Darah Rendah", en: "Low Blood Sugar Learning Guide" },
      opening: { id: "Alo Agent akan menjelaskan tanda dan batas aman edukasi.", en: "Alo Agent will explain signs and safe education boundaries." },
      simpleExplanation: {
        id: "65 mg/dL adalah contoh rentang rendah untuk edukasi. Gula darah rendah dapat berhubungan dengan gejala dan perlu dipahami dengan konteks individu.",
        en: "65 mg/dL is a low range example for education. Low blood sugar can be related to symptoms and should be understood with individual context."
      },
      learningMeaning: {
        id: "Pelajari tanda seperti gemetar, berkeringat, lemas, bingung, dan kenapa pola makan serta obat tertentu perlu dibahas dengan profesional.",
        en: "Learn signs such as shakiness, sweating, weakness, confusion, and why meal patterns or certain medicines should be discussed with a professional."
      },
      foodGuidance: {
        id: "Edukasi umum makanan mencakup tidak melewatkan makan terlalu sering, memahami pola makan teratur, dan mengenali hubungan makanan dengan energi.",
        en: "General food education includes not skipping meals too often, understanding regular eating patterns, and recognizing how food relates to energy."
      },
      lifestyleGuidance: {
        id: "Fokus lifestyle: pemantauan sesuai kebutuhan, tidur, aktivitas yang aman, dan membawa catatan gejala secara pribadi untuk konsultasi.",
        en: "Lifestyle focus: monitoring as needed, sleep, safe activity, and keeping private symptom notes for consultation."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Jika bingung, pingsan, sangat lemas, atau gejala berat, cari bantuan medis.",
        en: "This is education only, not diagnosis or medical advice. If confusion, fainting, extreme weakness, or severe symptoms occur, seek medical help."
      },
      recommendedPath: { id: "Rekomendasi modul: Diabetes Tipe 2 dan konsultasi profesional bila khawatir.", en: "Recommended module: Type 2 Diabetes and professional consultation if concerned." }
    }
  },
  {
    id: "bmi-underweight-17-8",
    category: "bmi",
    level: "underweight",
    title: { id: "BMI berat badan kurang", en: "Underweight BMI" },
    userQuestion: { id: "Contoh BMI saya 17.8. Apa yang perlu saya pahami?", en: "My BMI example is 17.8. What should I understand?" },
    sampleContext: { id: "BMI 17.8", en: "BMI 17.8" },
    visualType: "bmi",
    modules: moduleLinks.library,
    agentAnswer: {
      title: { id: "Panduan BMI Berat Badan Kurang", en: "Underweight BMI Learning Guide" },
      opening: { id: "Alo Agent akan menjelaskan BMI sebagai alat skrining sederhana.", en: "Alo Agent will explain BMI as a simple screening tool." },
      simpleExplanation: {
        id: "BMI 17.8 berada dalam rentang berat badan kurang untuk edukasi dewasa. BMI tidak mengukur komposisi tubuh secara langsung.",
        en: "BMI 17.8 is in the underweight range for adult education. BMI does not directly measure body composition."
      },
      learningMeaning: {
        id: "Pelajari keterbatasan BMI, pentingnya konteks individu, dan kenapa kekhawatiran berat badan sebaiknya dibahas dengan tenaga profesional.",
        en: "Learn BMI limitations, why individual context matters, and why weight concerns should be discussed with a professional."
      },
      foodGuidance: {
        id: "Topik makanan: makan seimbang, protein, makanan padat gizi, cukup air, dan pola makan berkelanjutan tanpa ekstrem.",
        en: "Food topics: balanced meals, protein, nutrient-dense foods, enough water, and sustainable eating without extremes."
      },
      lifestyleGuidance: {
        id: "Topik lifestyle: tidur, aktivitas yang mendukung kekuatan tubuh, check-up berkala, dan kesadaran energi harian.",
        en: "Lifestyle topics: sleep, strength-friendly movement, routine check-ups, and daily energy awareness."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Konsultasikan jika khawatir atau ada gejala yang mengganggu.",
        en: "This is education only, not diagnosis or medical advice. Consult a professional if concerned or symptoms are troubling."
      },
      recommendedPath: { id: "Rekomendasi: Healthy Food dan Library.", en: "Recommended: Healthy Food and Library." }
    }
  },
  {
    id: "bmi-normal-22-4",
    category: "bmi",
    level: "normal",
    title: { id: "BMI normal", en: "Normal BMI" },
    userQuestion: { id: "Contoh BMI saya 22.4. Apa yang tetap perlu saya pelajari?", en: "My BMI example is 22.4. What should I keep learning?" },
    sampleContext: { id: "BMI 22.4", en: "BMI 22.4" },
    visualType: "bmi",
    modules: [...moduleLinks.library, ...moduleLinks.classifier],
    agentAnswer: {
      title: { id: "Panduan BMI Normal", en: "Normal BMI Learning Guide" },
      opening: { id: "Alo Agent akan fokus pada kebiasaan menjaga kesehatan.", en: "Alo Agent will focus on maintaining healthy habits." },
      simpleExplanation: {
        id: "BMI 22.4 berada dalam rentang normal untuk edukasi dewasa. BMI tetap hanya satu indikator dan tidak menggambarkan seluruh kesehatan.",
        en: "BMI 22.4 is within the normal range for adult education. BMI is still only one indicator and does not describe all health."
      },
      learningMeaning: {
        id: "Pelajari bagaimana BMI, tekanan darah, gula darah, makanan, dan aktivitas saling berhubungan.",
        en: "Learn how BMI, blood pressure, blood sugar, food, and activity can be connected."
      },
      foodGuidance: {
        id: "Fokus makanan: piring seimbang, hidrasi, serat, protein, dan kebiasaan makan yang konsisten.",
        en: "Food focus: balanced plates, hydration, fiber, protein, and consistent eating habits."
      },
      lifestyleGuidance: {
        id: "Fokus lifestyle: jalan kaki, tidur, stres, kebersihan, pencegahan, dan check-up berkala.",
        en: "Lifestyle focus: walking, sleep, stress, hygiene, prevention, and routine check-ups."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis.",
        en: "This is education only, not diagnosis or medical advice."
      },
      recommendedPath: { id: "Rekomendasi: Lifestyle, Library, dan Classifier.", en: "Recommended: Lifestyle, Library, and Classifier." }
    }
  },
  {
    id: "bmi-overweight-27-4",
    category: "bmi",
    level: "overweight",
    title: { id: "BMI berat badan berlebih", en: "Overweight BMI" },
    userQuestion: {
      id: "Contoh BMI saya 27.4. Apa artinya untuk belajar tentang kesehatan?",
      en: "My BMI example is 27.4. What does this mean for learning about health?"
    },
    sampleContext: { id: "BMI 27.4", en: "BMI 27.4" },
    visualType: "bmi",
    modules: moduleLinks.diabetesHypertension,
    agentAnswer: {
      title: { id: "Panduan BMI Berat Badan Berlebih", en: "Overweight BMI Learning Guide" },
      opening: { id: "Alo Agent akan menjelaskan BMI dengan batasan yang jelas.", en: "Alo Agent will explain BMI with clear limitations." },
      simpleExplanation: {
        id: "BMI 27.4 berada dalam rentang berat badan berlebih untuk edukasi dewasa. BMI hanya alat skrining dan tidak mengukur lemak tubuh langsung.",
        en: "BMI 27.4 is in the overweight range for adult education. BMI is only a screening tool and does not directly measure body fat."
      },
      learningMeaning: {
        id: "Ini bisa menjadi titik awal belajar hubungan antara berat badan, tekanan darah, gula darah, tidur, gerak, dan kebiasaan makan.",
        en: "This can be a starting point to learn connections between weight, blood pressure, blood sugar, sleep, movement, and food habits."
      },
      foodGuidance: {
        id: "Fokus makanan: kesadaran porsi, protein, serat, mengurangi minuman manis, membatasi makanan ultra-proses, dan kebiasaan berkelanjutan.",
        en: "Food focus: portion awareness, protein, fiber, reducing sugary drinks, limiting ultra-processed foods, and sustainable habits."
      },
      lifestyleGuidance: {
        id: "Fokus lifestyle: jalan kaki, aktivitas fisik bertahap, tidur konsisten, manajemen stres, dan check-up berkala.",
        en: "Lifestyle focus: walking, gradual physical activity, consistent sleep, stress management, and routine check-ups."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. BMI perlu dipahami dengan konteks individu.",
        en: "This is education only, not diagnosis or medical advice. BMI should be understood with individual context."
      },
      recommendedPath: { id: "Rekomendasi modul: Diabetes Tipe 2 dan Hipertensi.", en: "Recommended modules: Type 2 Diabetes and Hypertension." }
    }
  },
  {
    id: "bmi-obesity-32-1",
    category: "bmi",
    level: "obesity",
    title: { id: "BMI obesitas", en: "Obesity BMI" },
    userQuestion: { id: "Contoh BMI saya 32.1. Apa yang perlu saya pelajari dengan aman?", en: "My BMI example is 32.1. What should I learn safely?" },
    sampleContext: { id: "BMI 32.1", en: "BMI 32.1" },
    visualType: "bmi",
    modules: moduleLinks.diabetesHypertension,
    agentAnswer: {
      title: { id: "Panduan BMI Obesitas", en: "Obesity BMI Learning Guide" },
      opening: { id: "Alo Agent memakai bahasa edukatif dan tidak menghakimi.", en: "Alo Agent uses educational and non-judgmental wording." },
      simpleExplanation: {
        id: "BMI 32.1 berada dalam rentang obesitas untuk edukasi dewasa. Ini bukan diagnosis dan BMI memiliki keterbatasan.",
        en: "BMI 32.1 is in the obesity range for adult education. This is not a diagnosis and BMI has limitations."
      },
      learningMeaning: {
        id: "Pelajari bagaimana berat badan, tekanan darah, gula darah, tidur, stres, dan kebiasaan makan dapat saling memengaruhi.",
        en: "Learn how weight, blood pressure, blood sugar, sleep, stress, and food habits can influence each other."
      },
      foodGuidance: {
        id: "Fokus makanan: kebiasaan berkelanjutan, piring seimbang, protein/serat, mengurangi minuman manis, dan membatasi makanan ultra-proses tanpa diet ekstrem.",
        en: "Food focus: sustainable habits, balanced plates, protein/fiber, reducing sugary drinks, and limiting ultra-processed foods without extreme dieting."
      },
      lifestyleGuidance: {
        id: "Fokus lifestyle: gerak bertahap, jalan kaki ringan, tidur, manajemen stres, dan check-up berkala.",
        en: "Lifestyle focus: gradual movement, light walking, sleep, stress management, and routine check-ups."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis, rencana diet personal, atau saran medis. Konsultasikan jika khawatir.",
        en: "This is education only, not diagnosis, a personal diet plan, or medical advice. Consult a professional if concerned."
      },
      recommendedPath: { id: "Rekomendasi modul: Diabetes Tipe 2 dan Hipertensi.", en: "Recommended modules: Type 2 Diabetes and Hypertension." }
    }
  },
  {
    id: "food-balanced-meal",
    category: "food",
    level: "general",
    title: { id: "Pola makan seimbang", en: "Balanced meal habits" },
    userQuestion: {
      id: "Bagaimana cara mulai belajar pola makan sehat tanpa diet ekstrem?",
      en: "How can I start learning healthier daily food habits without extreme dieting?"
    },
    sampleContext: { id: "Belajar makanan harian", en: "Daily food learning" },
    visualType: "food",
    modules: moduleLinks.diabetesHypertension,
    agentAnswer: {
      title: { id: "Panduan Pola Makan Seimbang", en: "Balanced Meal Learning Guide" },
      opening: { id: "Alo Agent akan fokus pada kebiasaan yang realistis.", en: "Alo Agent will focus on realistic habits." },
      simpleExplanation: {
        id: "Makan sehat bukan berarti aturan ekstrem. Fokusnya adalah memahami piring seimbang, variasi makanan, dan konsistensi.",
        en: "Healthy eating does not mean extreme rules. The focus is balanced plates, food variety, and consistency."
      },
      learningMeaning: {
        id: "Pelajari hubungan makanan dengan energi, tekanan darah, gula darah, BMI, dan pencegahan penyakit umum.",
        en: "Learn how food connects with energy, blood pressure, blood sugar, BMI, and common disease prevention."
      },
      foodGuidance: {
        id: "Mulai dari buah/sayur, protein, serat, air putih, karbohidrat secukupnya, dan mengurangi makanan ultra-proses terlalu sering.",
        en: "Start with fruits/vegetables, protein, fiber, water, appropriate carbohydrates, and reducing ultra-processed foods too often."
      },
      lifestyleGuidance: {
        id: "Kebiasaan makan lebih kuat saat digabung dengan tidur cukup, aktivitas fisik, hidrasi, dan manajemen stres.",
        en: "Food habits work better with enough sleep, physical activity, hydration, and stress management."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Ini juga bukan rencana diet personal.",
        en: "This is education only, not diagnosis or medical advice. It is also not a personal diet plan."
      },
      recommendedPath: { id: "Rekomendasi modul: Diabetes Tipe 2 dan Hipertensi.", en: "Recommended modules: Type 2 Diabetes and Hypertension." }
    }
  },
  {
    id: "food-sugar-awareness",
    category: "food",
    level: "general",
    title: { id: "Kesadaran gula", en: "Sugar awareness" },
    userQuestion: {
      id: "Saya ingin memahami kesadaran gula dan minuman manis.",
      en: "I want to understand sugar awareness and sugary drinks."
    },
    sampleContext: { id: "Minuman manis dan gula", en: "Sugary drinks and sugar" },
    visualType: "food",
    modules: moduleLinks.diabetes,
    agentAnswer: {
      title: { id: "Panduan Kesadaran Gula", en: "Sugar Awareness Guide" },
      opening: { id: "Alo Agent akan menjelaskan tanpa menakut-nakuti.", en: "Alo Agent will explain without fear-based wording." },
      simpleExplanation: {
        id: "Kesadaran gula berarti memahami sumber gula, terutama minuman manis dan karbohidrat olahan, serta dampaknya pada energi dan gula darah.",
        en: "Sugar awareness means understanding sugar sources, especially sugary drinks and refined carbohydrates, and how they relate to energy and blood sugar."
      },
      learningMeaning: {
        id: "Pelajari kenapa minuman manis mudah menambah asupan gula dan kenapa serat/protein membantu pola makan lebih seimbang.",
        en: "Learn why sugary drinks can easily add sugar intake and why fiber/protein support a more balanced eating pattern."
      },
      foodGuidance: {
        id: "Coba pahami label, frekuensi minuman manis, pilihan air putih, makanan berserat, dan porsi karbohidrat.",
        en: "Learn labels, sugary drink frequency, water choices, fiber-rich foods, and carbohydrate portions."
      },
      lifestyleGuidance: {
        id: "Gabungkan dengan aktivitas fisik, tidur konsisten, hidrasi, dan check-up berkala jika diperlukan.",
        en: "Combine this with physical activity, consistent sleep, hydration, and routine check-ups when needed."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis.",
        en: "This is education only, not diagnosis or medical advice."
      },
      recommendedPath: { id: "Rekomendasi modul: Diabetes Tipe 2.", en: "Recommended module: Type 2 Diabetes." }
    }
  },
  {
    id: "food-salt-awareness",
    category: "food",
    level: "general",
    title: { id: "Kesadaran garam", en: "Salt awareness" },
    userQuestion: {
      id: "Saya ingin belajar kenapa kesadaran garam penting untuk tekanan darah.",
      en: "I want to learn why salt awareness matters for blood pressure."
    },
    sampleContext: { id: "Garam dan makanan olahan", en: "Salt and processed foods" },
    visualType: "food",
    modules: moduleLinks.hypertension,
    agentAnswer: {
      title: { id: "Panduan Kesadaran Garam", en: "Salt Awareness Guide" },
      opening: { id: "Alo Agent menghubungkan makanan dengan literasi tekanan darah.", en: "Alo Agent connects food with blood pressure literacy." },
      simpleExplanation: {
        id: "Kesadaran garam berarti memahami bahwa asupan garam berlebihan dan makanan olahan dapat berhubungan dengan tekanan darah pada sebagian orang.",
        en: "Salt awareness means understanding that excessive salt intake and processed foods can relate to blood pressure for some people."
      },
      learningMeaning: {
        id: "Pelajari label nutrisi, makanan tinggi garam, dan cara membangun pola makan seimbang tanpa membuat aturan ekstrem.",
        en: "Learn nutrition labels, high-salt foods, and how to build balanced eating patterns without extreme rules."
      },
      foodGuidance: {
        id: "Fokus pada membaca label, membatasi makanan ultra-proses terlalu sering, menambah buah/sayur, dan memilih makanan rumah lebih sering bila memungkinkan.",
        en: "Focus on reading labels, limiting ultra-processed foods too often, adding fruits/vegetables, and choosing home-prepared meals more often when possible."
      },
      lifestyleGuidance: {
        id: "Gabungkan dengan jalan kaki, tidur cukup, manajemen stres, dan pemantauan tekanan darah berkala.",
        en: "Combine this with walking, enough sleep, stress management, and routine blood pressure monitoring."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis.",
        en: "This is education only, not diagnosis or medical advice."
      },
      recommendedPath: { id: "Rekomendasi modul: Hipertensi.", en: "Recommended module: Hypertension." }
    }
  },
  {
    id: "food-hydration",
    category: "food",
    level: "general",
    title: { id: "Hidrasi harian", en: "Daily hydration" },
    userQuestion: {
      id: "Saya ingin belajar kenapa hidrasi penting untuk kesehatan harian.",
      en: "I want to learn why hydration matters in daily health."
    },
    sampleContext: { id: "Air putih dan hidrasi", en: "Water and hydration" },
    visualType: "food",
    modules: moduleLinks.coldDengue,
    agentAnswer: {
      title: { id: "Panduan Hidrasi", en: "Hydration Learning Guide" },
      opening: { id: "Alo Agent akan menjelaskan hidrasi dengan klaim yang aman.", en: "Alo Agent will explain hydration with safe claims." },
      simpleExplanation: {
        id: "Hidrasi membantu fungsi tubuh sehari-hari dan menjadi topik penting saat sakit, cuaca panas, atau risiko dehidrasi.",
        en: "Hydration supports daily body function and becomes important during illness, hot weather, or dehydration risk."
      },
      learningMeaning: {
        id: "Pelajari hubungan hidrasi dengan energi, pemulihan saat common cold, dan kewaspadaan pada dengue tanpa menggantikan arahan medis.",
        en: "Learn how hydration relates to energy, common cold recovery, and dengue awareness without replacing medical guidance."
      },
      foodGuidance: {
        id: "Fokus pada air putih, makanan bergizi, menjaga asupan saat sakit bila memungkinkan, dan mengenali tanda dehidrasi.",
        en: "Focus on water, nourishing foods, maintaining intake during illness when possible, and recognizing dehydration signs."
      },
      lifestyleGuidance: {
        id: "Gabungkan dengan tidur, istirahat, kebersihan, dan pencegahan sesuai konteks seperti nyamuk untuk dengue.",
        en: "Combine this with sleep, rest, hygiene, and context-specific prevention such as mosquito prevention for dengue."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Gejala berat atau tanda bahaya perlu perhatian profesional.",
        en: "This is education only, not diagnosis or medical advice. Severe symptoms or warning signs need professional care."
      },
      recommendedPath: { id: "Rekomendasi modul: Common Cold dan Dengue Fever.", en: "Recommended modules: Common Cold and Dengue Fever." }
    }
  },
  {
    id: "lifestyle-foundation",
    category: "lifestyle",
    level: "general",
    title: { id: "Fondasi kebiasaan harian", en: "Daily habit foundation" },
    userQuestion: {
      id: "Kebiasaan harian apa yang perlu saya pelajari untuk mendukung kesehatan jangka panjang?",
      en: "What daily habits should I learn to support better long-term health?"
    },
    sampleContext: { id: "Jalan kaki, tidur, hidrasi, stres", en: "Walking, sleep, hydration, stress" },
    visualType: "lifestyle",
    modules: [...moduleLinks.library, ...moduleLinks.classifier],
    agentAnswer: {
      title: { id: "Panduan Fondasi Lifestyle", en: "Daily Habit Foundation Guide" },
      opening: { id: "Alo Agent akan membuat peta kebiasaan sehat yang praktis.", en: "Alo Agent will map practical healthy habits." },
      simpleExplanation: {
        id: "Kebiasaan harian kecil dapat mendukung kesehatan jangka panjang. Fokusnya bukan sempurna, tetapi konsisten dan bisa dipahami.",
        en: "Small daily habits can support long-term health. The goal is not perfection, but consistency and understanding."
      },
      learningMeaning: {
        id: "Pelajari hubungan jalan kaki, tidur, hidrasi, stres, kebersihan, dan check-up dengan topik kesehatan umum.",
        en: "Learn how walking, sleep, hydration, stress, hygiene, and check-ups relate to common health topics."
      },
      foodGuidance: {
        id: "Makanan mendukung lifestyle melalui piring seimbang, air putih, serat, protein, dan kesadaran gula/garam.",
        en: "Food supports lifestyle through balanced plates, water, fiber, protein, and sugar/salt awareness."
      },
      lifestyleGuidance: {
        id: "Mulai dari jalan kaki, rutinitas tidur, hidrasi, manajemen stres, cuci tangan, pencegahan nyamuk, dan check-up berkala.",
        en: "Start with walking, sleep routine, hydration, stress management, hand hygiene, mosquito prevention, and routine check-ups."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis.",
        en: "This is education only, not diagnosis or medical advice."
      },
      recommendedPath: { id: "Rekomendasi: Library dan Classifier.", en: "Recommended: Library and Classifier." }
    }
  },
  {
    id: "lifestyle-sleep-stress",
    category: "lifestyle",
    level: "general",
    title: { id: "Tidur dan stres", en: "Sleep and stress" },
    userQuestion: {
      id: "Saya ingin belajar bagaimana tidur dan stres terhubung dengan kesehatan.",
      en: "I want to learn how sleep and stress connect with health."
    },
    sampleContext: { id: "Tidur, stres, tekanan darah, gula darah", en: "Sleep, stress, blood pressure, blood sugar" },
    visualType: "lifestyle",
    modules: [...moduleLinks.hypertension, ...moduleLinks.diabetes, ...moduleLinks.cold],
    agentAnswer: {
      title: { id: "Panduan Tidur dan Stres", en: "Sleep and Stress Learning Guide" },
      opening: { id: "Alo Agent akan menjelaskan hubungan kebiasaan dengan kesehatan umum.", en: "Alo Agent will explain how habits relate to general health." },
      simpleExplanation: {
        id: "Tidur dan stres dapat memengaruhi energi, tekanan darah, gula darah, dan daya tahan tubuh. Hubungannya kompleks dan perlu dipahami sebagai edukasi.",
        en: "Sleep and stress can influence energy, blood pressure, blood sugar, and immune health. The relationship is complex and should be understood educationally."
      },
      learningMeaning: {
        id: "Pelajari kenapa tidur konsisten dan manajemen stres menjadi bagian dari pencegahan, bukan pengganti layanan medis.",
        en: "Learn why consistent sleep and stress management are part of prevention, not replacements for medical care."
      },
      foodGuidance: {
        id: "Makanan seimbang, hidrasi, dan membatasi minuman manis/kafein terlalu dekat waktu tidur dapat menjadi topik belajar.",
        en: "Balanced meals, hydration, and limiting sugary drinks/caffeine too close to bedtime can be learning topics."
      },
      lifestyleGuidance: {
        id: "Topik: rutinitas tidur, jeda layar, relaksasi ringan, jalan kaki, dan mengenali pemicu stres.",
        en: "Topics: sleep routine, screen breaks, light relaxation, walking, and recognizing stress triggers."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Jika stres atau tidur sangat mengganggu, cari bantuan profesional.",
        en: "This is education only, not diagnosis or medical advice. If stress or sleep problems are severe, seek professional help."
      },
      recommendedPath: { id: "Rekomendasi modul: Hipertensi, Diabetes Tipe 2, dan Common Cold.", en: "Recommended modules: Hypertension, Type 2 Diabetes, and Common Cold." }
    }
  },
  {
    id: "lifestyle-walking-movement",
    category: "lifestyle",
    level: "general",
    title: { id: "Jalan kaki dan gerak", en: "Walking and movement" },
    userQuestion: { id: "Saya ingin belajar kenapa jalan kaki dan aktivitas fisik penting.", en: "I want to learn why walking and movement matter." },
    sampleContext: { id: "Jalan kaki, tekanan darah, gula darah, BMI", en: "Walking, blood pressure, blood sugar, BMI" },
    visualType: "lifestyle",
    modules: moduleLinks.diabetesHypertension,
    agentAnswer: {
      title: { id: "Panduan Jalan Kaki dan Aktivitas", en: "Walking and Movement Guide" },
      opening: { id: "Alo Agent akan menjelaskan gerak sebagai edukasi kebiasaan.", en: "Alo Agent will explain movement as habit education." },
      simpleExplanation: {
        id: "Jalan kaki dan aktivitas fisik dapat menjadi kebiasaan sederhana yang berhubungan dengan tekanan darah, gula darah, BMI, energi, dan kesehatan umum.",
        en: "Walking and physical activity can be simple habits related to blood pressure, blood sugar, BMI, energy, and general health."
      },
      learningMeaning: {
        id: "Pelajari bahwa gerak tidak harus ekstrem. Kebiasaan bertahap lebih mudah dipertahankan.",
        en: "Learn that movement does not need to be extreme. Gradual habits are easier to sustain."
      },
      foodGuidance: {
        id: "Dukung gerak dengan hidrasi, makanan seimbang, protein, serat, dan pola makan konsisten.",
        en: "Support movement with hydration, balanced meals, protein, fiber, and consistent eating patterns."
      },
      lifestyleGuidance: {
        id: "Topik: jalan kaki 10-20 menit, peregangan ringan, aktivitas bertahap, tidur, dan pemulihan.",
        en: "Topics: 10-20 minute walks, light stretching, gradual activity, sleep, and recovery."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Mulai perlahan dan hentikan jika ada gejala mengkhawatirkan.",
        en: "This is education only, not diagnosis or medical advice. Start slowly and stop if concerning symptoms occur."
      },
      recommendedPath: { id: "Rekomendasi modul: Hipertensi dan Diabetes Tipe 2.", en: "Recommended modules: Hypertension and Type 2 Diabetes." }
    }
  },
  {
    id: "lifestyle-hygiene-prevention",
    category: "lifestyle",
    level: "general",
    title: { id: "Kebersihan dan pencegahan", en: "Hygiene and prevention" },
    userQuestion: {
      id: "Saya ingin belajar kebiasaan pencegahan sederhana untuk infeksi.",
      en: "I want to learn simple prevention habits for infections."
    },
    sampleContext: { id: "Cuci tangan, masker, pencegahan nyamuk", en: "Hand hygiene, masks, mosquito prevention" },
    visualType: "lifestyle",
    modules: moduleLinks.coldDengue,
    agentAnswer: {
      title: { id: "Panduan Kebersihan dan Pencegahan", en: "Hygiene and Prevention Guide" },
      opening: { id: "Alo Agent akan menghubungkan kebiasaan kecil dengan pencegahan.", en: "Alo Agent will connect small habits with prevention." },
      simpleExplanation: {
        id: "Kebiasaan pencegahan seperti cuci tangan, memakai masker saat sakit, dan mengurangi genangan air dapat membantu literasi infeksi umum.",
        en: "Prevention habits like handwashing, wearing a mask when sick, and reducing standing water can support infection literacy."
      },
      learningMeaning: {
        id: "Pelajari perbedaan pencegahan common cold dan dengue, serta tanda bahaya yang perlu diperhatikan.",
        en: "Learn the difference between common cold and dengue prevention, plus warning signs to watch."
      },
      foodGuidance: {
        id: "Dukung pencegahan dengan hidrasi, makanan bergizi, dan menjaga asupan saat sakit bila memungkinkan.",
        en: "Support prevention with hydration, nourishing foods, and maintaining intake during illness when possible."
      },
      lifestyleGuidance: {
        id: "Topik: cuci tangan, masker saat sakit, hindari kontak dekat saat bergejala, repellent, pakaian pelindung, dan kontrol genangan air.",
        en: "Topics: handwashing, masks when sick, avoiding close contact while symptomatic, repellents, protective clothing, and standing water control."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Tanda bahaya memerlukan perhatian profesional.",
        en: "This is education only, not diagnosis or medical advice. Warning signs need professional attention."
      },
      recommendedPath: { id: "Rekomendasi modul: Common Cold dan Dengue Fever.", en: "Recommended modules: Common Cold and Dengue Fever." }
    }
  },
  {
    id: "cold-basics",
    category: "common-cold",
    level: "general",
    title: { id: "Dasar common cold", en: "Common cold basics" },
    userQuestion: {
      id: "Saya ingin memahami common cold, batuk ringan, pilek, dan tanda bahaya yang perlu diperhatikan.",
      en: "I want to understand common cold, mild cough, runny nose, and what warning signs matter."
    },
    sampleContext: { id: "Batuk ringan, pilek, sakit tenggorokan", en: "Mild cough, runny nose, sore throat" },
    visualType: "cold",
    modules: moduleLinks.cold,
    agentAnswer: {
      title: { id: "Panduan Dasar Common Cold", en: "Common Cold Basics Guide" },
      opening: { id: "Alo Agent akan menjelaskan dengan aman dan sederhana.", en: "Alo Agent will explain this safely and simply." },
      simpleExplanation: {
        id: "Common cold biasanya infeksi virus ringan pada saluran napas atas. Gejala dapat berupa pilek, bersin, hidung tersumbat, sakit tenggorokan, dan batuk ringan.",
        en: "Common cold is usually a mild viral infection of the upper respiratory tract. Symptoms can include runny nose, sneezing, congestion, sore throat, and mild cough."
      },
      learningMeaning: {
        id: "Pelajari cara penularan, kenapa istirahat dan kebersihan penting, serta tanda bahaya yang tidak boleh diabaikan.",
        en: "Learn how it spreads, why rest and hygiene matter, and which warning signs should not be ignored."
      },
      foodGuidance: {
        id: "Topik makanan: hidrasi, makanan bergizi, minuman hangat bila nyaman, dan menghindari dehidrasi.",
        en: "Food topics: hydration, nourishing meals, warm fluids if comfortable, and avoiding dehydration."
      },
      lifestyleGuidance: {
        id: "Topik lifestyle: istirahat, tidur, cuci tangan, masker saat sakit, dan menghindari kontak dekat saat bergejala.",
        en: "Lifestyle topics: rest, sleep, hand hygiene, wearing a mask when sick, and avoiding close contact while symptomatic."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Waspadai sesak napas, nyeri dada, demam tinggi, gejala memburuk, atau kelompok risiko tinggi.",
        en: "This is education only, not diagnosis or medical advice. Watch for shortness of breath, chest pain, high fever, worsening symptoms, or high-risk groups."
      },
      recommendedPath: { id: "Rekomendasi modul: Common Cold.", en: "Recommended module: Common Cold." }
    }
  },
  {
    id: "cold-antibiotic-myth",
    category: "common-cold",
    level: "general",
    title: { id: "Mitos antibiotik", en: "Antibiotic myth" },
    userQuestion: { id: "Apakah common cold selalu butuh antibiotik?", en: "Do common colds always need antibiotics?" },
    sampleContext: { id: "Antibiotik dan common cold", en: "Antibiotics and common cold" },
    visualType: "cold",
    modules: moduleLinks.cold,
    agentAnswer: {
      title: { id: "Panduan Mitos Antibiotik Common Cold", en: "Common Cold Antibiotic Myth Guide" },
      opening: { id: "Alo Agent akan membedakan edukasi umum dan keputusan medis.", en: "Alo Agent will separate general education from medical decisions." },
      simpleExplanation: {
        id: "Common cold biasanya disebabkan oleh virus, sehingga antibiotik tidak rutin digunakan. Keputusan obat tetap harus mengikuti arahan tenaga kesehatan.",
        en: "Common cold is usually caused by viruses, so antibiotics are not routinely used. Medicine decisions should follow healthcare professional guidance."
      },
      learningMeaning: {
        id: "Pelajari perbedaan virus dan bakteri, kenapa antibiotik tidak otomatis diperlukan, dan kapan konsultasi perlu dilakukan.",
        en: "Learn the difference between viruses and bacteria, why antibiotics are not automatically needed, and when consultation matters."
      },
      foodGuidance: {
        id: "Dukung pemulihan umum dengan hidrasi, makanan bergizi, dan menghindari dehidrasi.",
        en: "Support general recovery with hydration, nourishing meals, and avoiding dehydration."
      },
      lifestyleGuidance: {
        id: "Fokus pada istirahat, tidur, cuci tangan, masker saat sakit, dan menjaga jarak saat bergejala.",
        en: "Focus on rest, sleep, hand hygiene, wearing a mask when sick, and distancing while symptomatic."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Konsultasikan jika gejala berat, menetap, atau memburuk.",
        en: "This is education only, not diagnosis or medical advice. Consult a professional if symptoms are severe, persistent, or worsening."
      },
      recommendedPath: { id: "Rekomendasi modul: Common Cold.", en: "Recommended module: Common Cold." }
    }
  },
  {
    id: "dengue-warning-signs",
    category: "dengue",
    level: "crisis",
    title: { id: "Tanda bahaya dengue", en: "Dengue warning signs" },
    userQuestion: {
      id: "Saya ingin belajar tanda bahaya demam berdarah dan pencegahannya dengan cara sederhana.",
      en: "I want to learn dengue warning signs and prevention in a simple way."
    },
    sampleContext: { id: "Demam dan paparan nyamuk", en: "Fever and mosquito exposure" },
    visualType: "dengue",
    modules: moduleLinks.dengue,
    agentAnswer: {
      title: { id: "Panduan Tanda Bahaya Dengue", en: "Dengue Warning Signs Guide" },
      opening: { id: "Alo Agent akan menonjolkan tanda bahaya dan pencegahan.", en: "Alo Agent will highlight warning signs and prevention." },
      simpleExplanation: {
        id: "Dengue adalah infeksi virus yang ditularkan nyamuk. Tanda bahaya termasuk nyeri perut berat, muntah terus-menerus, perdarahan, lemas berat, sulit bernapas, atau kulit dingin/lembap.",
        en: "Dengue is a mosquito-borne viral infection. Warning signs include severe abdominal pain, persistent vomiting, bleeding, extreme weakness, breathing difficulty, or cold/clammy skin."
      },
      learningMeaning: {
        id: "Pelajari perbedaan edukasi dengue umum, tanda bahaya, pencegahan, dan kapan perlu mencari pertolongan segera.",
        en: "Learn the difference between general dengue awareness, warning signs, prevention, and when urgent care may be needed."
      },
      foodGuidance: {
        id: "Topik makanan: hidrasi, menjaga asupan bila memungkinkan, dan memahami kenapa arahan medis penting saat tanda bahaya muncul.",
        en: "Food topics: hydration, maintaining intake when possible, and understanding why medical guidance matters when warning signs appear."
      },
      lifestyleGuidance: {
        id: "Pencegahan: hilangkan genangan air, hindari gigitan nyamuk, gunakan repellent, pakaian pelindung, dan dukung kontrol nyamuk lingkungan.",
        en: "Prevention: remove standing water, avoid mosquito bites, use repellents, wear protective clothing, and support community mosquito control."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Tanda bahaya dengue membutuhkan perhatian medis segera.",
        en: "This is education only, not diagnosis or medical advice. Dengue warning signs need urgent medical attention."
      },
      recommendedPath: { id: "Rekomendasi modul: Dengue Fever.", en: "Recommended module: Dengue Fever." }
    }
  },
  {
    id: "dengue-mosquito-prevention",
    category: "dengue",
    level: "general",
    title: { id: "Pencegahan nyamuk", en: "Mosquito prevention" },
    userQuestion: {
      id: "Bagaimana saya bisa belajar kebiasaan pencegahan demam berdarah di rumah?",
      en: "How can I learn dengue prevention habits at home?"
    },
    sampleContext: { id: "Genangan air, repellent, pakaian pelindung", en: "Standing water, repellents, protective clothing" },
    visualType: "dengue",
    modules: moduleLinks.dengue,
    agentAnswer: {
      title: { id: "Panduan Pencegahan Dengue di Rumah", en: "Home Dengue Prevention Guide" },
      opening: { id: "Alo Agent akan fokus pada kebiasaan pencegahan.", en: "Alo Agent will focus on prevention habits." },
      simpleExplanation: {
        id: "Pencegahan dengue berhubungan dengan mengurangi tempat berkembang biak nyamuk dan menghindari gigitan nyamuk.",
        en: "Dengue prevention is related to reducing mosquito breeding sites and avoiding mosquito bites."
      },
      learningMeaning: {
        id: "Pelajari kenapa genangan air penting, bagaimana perlindungan pribadi membantu, dan kenapa pencegahan komunitas juga diperlukan.",
        en: "Learn why standing water matters, how personal protection helps, and why community prevention is also needed."
      },
      foodGuidance: {
        id: "Topik makanan saat sakit tetap umum: hidrasi dan menjaga asupan bila memungkinkan, sambil mengikuti arahan profesional jika ada tanda bahaya.",
        en: "Food topics during illness remain general: hydration and maintaining intake when possible while following professional guidance if warning signs appear."
      },
      lifestyleGuidance: {
        id: "Kebiasaan: buang genangan air, tutup wadah air, gunakan repellent, pakaian pelindung, dan dukung kontrol lingkungan.",
        en: "Habits: remove standing water, cover water containers, use repellents, wear protective clothing, and support environmental control."
      },
      safetyReminder: {
        id: "Ini hanya edukasi, bukan diagnosis atau saran medis. Jika tanda bahaya muncul, cari pertolongan medis.",
        en: "This is education only, not diagnosis or medical advice. If warning signs appear, seek medical care."
      },
      recommendedPath: { id: "Rekomendasi modul: Dengue Fever.", en: "Recommended module: Dengue Fever." }
    }
  }
];
