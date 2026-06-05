"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Play, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Language = "id" | "en";
type ContextId = "blood-pressure" | "blood-sugar" | "bmi" | "common-cold" | "dengue" | "healthy-food" | "lifestyle";
type VisualKind = "pressure" | "sugar" | "bmi" | "cold" | "dengue" | "food" | "lifestyle";

type LocalizedText = Record<Language, string>;

type ModuleLink = {
  label: string;
  href: string;
};

type AgentReport = {
  id: ContextId;
  visual: VisualKind;
  title: LocalizedText;
  sample: LocalizedText;
  explanation: LocalizedText;
  learningMeaning: LocalizedText;
  foodGuidance: LocalizedText;
  lifestyleGuidance: LocalizedText;
  safetyReminder: LocalizedText;
  recommendedPath: LocalizedText;
  modules: ModuleLink[];
};

const agentReports: AgentReport[] = [
  {
    id: "blood-pressure",
    visual: "pressure",
    title: {
      id: "Panduan Belajar Tekanan Darah",
      en: "Blood Pressure Learning Guide"
    },
    sample: {
      id: "145/92 mmHg",
      en: "145/92 mmHg"
    },
    explanation: {
      id: "145/92 mmHg adalah contoh angka tekanan darah yang tinggi untuk edukasi. Satu kali pengukuran belum cukup untuk diagnosis, tetapi angka ini bisa menjadi sinyal belajar tentang hipertensi, pengukuran berulang, dan faktor gaya hidup.",
      en: "145/92 mmHg is an elevated example reading used for education. One reading is not enough for diagnosis, but it can be a useful signal to learn about hypertension, repeated measurements, and lifestyle factors."
    },
    learningMeaning: {
      id: "Kamu bisa belajar arti angka tekanan darah, kenapa pengukuran berulang penting, dan kebiasaan apa saja yang dapat memengaruhi tekanan darah dalam jangka panjang.",
      en: "You should learn what blood pressure numbers mean, why repeated measurement matters, and which habits can influence blood pressure over time."
    },
    foodGuidance: {
      id: "Topik makanan yang relevan termasuk mengurangi konsumsi garam berlebihan, memahami makanan olahan, membaca label nutrisi, memperbanyak buah dan sayur, serta membangun pola makan seimbang.",
      en: "Useful food topics include reducing excessive salt intake, understanding processed foods, reading nutrition labels, choosing more fruits and vegetables, and building balanced meals."
    },
    lifestyleGuidance: {
      id: "Topik lifestyle yang relevan termasuk jalan kaki atau aktivitas fisik rutin, kualitas tidur, manajemen stres, menghindari rokok, membatasi alkohol, dan pemantauan tekanan darah secara berkala.",
      en: "Relevant lifestyle topics include regular walking or physical activity, sleep quality, stress management, avoiding smoking, limiting alcohol, and routine blood pressure monitoring."
    },
    safetyReminder: {
      id: "Ini bukan diagnosis atau saran pengobatan. Jika angka tekanan darah sangat tinggi, berulang, atau disertai gejala seperti nyeri dada, sesak napas, lemah satu sisi, kebingungan, atau sakit kepala berat, konsultasikan dengan tenaga kesehatan profesional.",
      en: "This is not a diagnosis or treatment advice. If readings are very high, repeated, or accompanied by symptoms such as chest pain, shortness of breath, weakness, confusion, or severe headache, consult a qualified healthcare professional."
    },
    recommendedPath: {
      id: "Rekomendasi modul: Hipertensi.",
      en: "Recommended module: Hypertension."
    },
    modules: [{ label: "Start Hypertension Module", href: "/disease/hypertension" }]
  },
  {
    id: "blood-sugar",
    visual: "sugar",
    title: {
      id: "Panduan Belajar Gula Darah",
      en: "Blood Sugar Learning Guide"
    },
    sample: {
      id: "Gula darah puasa 132 mg/dL",
      en: "Fasting blood sugar 132 mg/dL"
    },
    explanation: {
      id: "Gula darah puasa 132 mg/dL adalah contoh angka yang meningkat untuk edukasi. Ini bukan diagnosis dan perlu dikonfirmasi dengan pemeriksaan medis yang tepat.",
      en: "132 mg/dL fasting blood sugar is an elevated example value used for education. It is not a diagnosis and should be confirmed with proper medical testing."
    },
    learningMeaning: {
      id: "Kamu bisa belajar cara kerja gula darah, arti gula darah puasa, dan kenapa pola makan, tidur, aktivitas fisik, dan kebiasaan harian bisa berpengaruh.",
      en: "You should learn how blood sugar works, what fasting glucose means, and why lifestyle, food habits, sleep, and activity can matter."
    },
    foodGuidance: {
      id: "Topik makanan yang relevan termasuk mengurangi minuman manis, memahami karbohidrat olahan, menambah makanan tinggi serat, mengatur porsi, dan membangun kebiasaan makan yang konsisten.",
      en: "Useful food topics include reducing sugary drinks, understanding refined carbohydrates, adding fiber-rich foods, balancing portions, and building consistent meal habits."
    },
    lifestyleGuidance: {
      id: "Topik lifestyle yang relevan termasuk aktivitas fisik rutin, tidur yang konsisten, hidrasi, edukasi manajemen berat badan, kesadaran stres, dan check-up berkala.",
      en: "Relevant lifestyle topics include regular physical activity, sleep consistency, hydration, weight management education, stress awareness, and routine check-ups."
    },
    safetyReminder: {
      id: "Ini hanya edukasi. Jika gula darah sangat tinggi, sangat rendah, atau disertai gejala yang mengkhawatirkan, konsultasikan dengan tenaga kesehatan profesional.",
      en: "This is educational only. If blood sugar is very high, very low, or accompanied by concerning symptoms, consult a qualified healthcare professional."
    },
    recommendedPath: {
      id: "Rekomendasi modul: Diabetes Tipe 2.",
      en: "Recommended module: Type 2 Diabetes."
    },
    modules: [{ label: "Start Type 2 Diabetes Module", href: "/disease/type-2-diabetes" }]
  },
  {
    id: "bmi",
    visual: "bmi",
    title: {
      id: "Panduan Belajar BMI",
      en: "BMI Learning Guide"
    },
    sample: {
      id: "BMI 27.4",
      en: "BMI 27.4"
    },
    explanation: {
      id: "BMI 27.4 berada dalam rentang berat badan berlebih untuk edukasi orang dewasa. BMI hanya alat skrining dan tidak mengukur lemak tubuh secara langsung atau mempertimbangkan massa otot, kehamilan, usia, jenis kelamin, atau konteks medis individu.",
      en: "BMI 27.4 is in the overweight range for adult education. BMI is only a screening tool and does not directly measure body fat or account for muscle mass, pregnancy, age, sex, or individual medical context."
    },
    learningMeaning: {
      id: "Kamu bisa memakai ini sebagai titik awal untuk belajar tentang pola makan berkelanjutan, aktivitas fisik, tidur, dan hubungan antara berat badan, tekanan darah, serta gula darah.",
      en: "You can use this as a starting point to learn about sustainable eating patterns, movement, sleep, and how weight, blood pressure, and blood sugar can be connected."
    },
    foodGuidance: {
      id: "Topik makanan yang relevan termasuk makanan seimbang, kesadaran porsi, protein dan serat, mengurangi minuman manis, membatasi makanan ultra-proses, dan membangun kebiasaan yang berkelanjutan tanpa diet ekstrem.",
      en: "Useful food topics include balanced meals, portion awareness, protein and fiber, reducing sugary drinks, limiting ultra-processed foods, and building sustainable habits instead of extreme dieting."
    },
    lifestyleGuidance: {
      id: "Topik lifestyle yang relevan termasuk jalan kaki, aktivitas fisik yang mendukung kekuatan tubuh, tidur konsisten, manajemen stres, dan check-up berkala.",
      en: "Relevant lifestyle topics include walking, strength-friendly movement, sleep consistency, stress management, and routine check-ups."
    },
    safetyReminder: {
      id: "Ini bukan diagnosis. BMI punya keterbatasan dan perlu dipahami dengan konteks individu.",
      en: "This is not a diagnosis. BMI has limitations and should be interpreted with individual context."
    },
    recommendedPath: {
      id: "Rekomendasi modul: Diabetes Tipe 2 dan Hipertensi.",
      en: "Recommended modules: Type 2 Diabetes and Hypertension."
    },
    modules: [
      { label: "Start Type 2 Diabetes", href: "/disease/type-2-diabetes" },
      { label: "Start Hypertension", href: "/disease/hypertension" }
    ]
  },
  {
    id: "common-cold",
    visual: "cold",
    title: {
      id: "Panduan Belajar Common Cold",
      en: "Common Cold Learning Guide"
    },
    sample: {
      id: "Runny nose, mild cough, sore throat learning context",
      en: "Runny nose, mild cough, sore throat learning context"
    },
    explanation: {
      id: "Common cold biasanya merupakan infeksi virus ringan pada saluran napas atas. Kondisi ini sering membaik sendiri. Antibiotik tidak rutin digunakan karena common cold biasanya disebabkan oleh virus.",
      en: "Common cold is usually a mild viral infection of the upper respiratory tract. It often improves on its own. Antibiotics are not routinely used because common cold is usually caused by viruses."
    },
    learningMeaning: {
      id: "Kamu bisa belajar bagaimana common cold menular, kenapa istirahat dan kebersihan penting, serta tanda bahaya apa yang tidak boleh diabaikan.",
      en: "You should learn how common cold spreads, why rest and hygiene matter, and which warning signs should not be ignored."
    },
    foodGuidance: {
      id: "Topik makanan yang relevan termasuk menjaga hidrasi, makan makanan bergizi, minuman hangat jika nyaman, dan menghindari dehidrasi saat sakit.",
      en: "Useful food topics include staying hydrated, eating nourishing meals, warm fluids if comfortable, and avoiding dehydration while sick."
    },
    lifestyleGuidance: {
      id: "Topik lifestyle yang relevan termasuk istirahat, tidur cukup, cuci tangan, memakai masker saat sakit, menghindari kontak dekat saat bergejala, dan memperhatikan tanda bahaya.",
      en: "Relevant lifestyle topics include rest, sleep, hand hygiene, wearing a mask when sick, avoiding close contact while symptomatic, and watching for red flags."
    },
    safetyReminder: {
      id: "Jika gejala berat, menetap, memburuk, atau disertai sesak napas, nyeri dada, demam tinggi, atau kondisi risiko tinggi, konsultasikan dengan tenaga kesehatan profesional.",
      en: "If symptoms are severe, persistent, worsening, or include shortness of breath, chest pain, high fever, or high-risk conditions, consult a qualified healthcare professional."
    },
    recommendedPath: {
      id: "Rekomendasi modul: Common Cold.",
      en: "Recommended module: Common Cold."
    },
    modules: [{ label: "Start Common Cold Module", href: "/disease/common-cold" }]
  },
  {
    id: "dengue",
    visual: "dengue",
    title: {
      id: "Panduan Kesadaran Demam Berdarah",
      en: "Dengue Awareness Guide"
    },
    sample: {
      id: "Fever and mosquito exposure awareness",
      en: "Fever and mosquito exposure awareness"
    },
    explanation: {
      id: "Dengue adalah infeksi virus yang ditularkan oleh nyamuk. Tanda bahaya penting termasuk nyeri perut berat, muntah terus-menerus, perdarahan, lemas berat, sulit bernapas, atau kulit dingin dan lembap.",
      en: "Dengue is a mosquito-borne viral infection. Important warning signs include severe abdominal pain, persistent vomiting, bleeding, extreme weakness, breathing difficulty, or cold clammy skin."
    },
    learningMeaning: {
      id: "Kamu bisa belajar perbedaan antara edukasi dengue umum, tanda bahaya, pencegahan, dan kapan perlu mencari pertolongan medis segera.",
      en: "You should learn the difference between general dengue awareness, warning signs, prevention, and when urgent care may be needed."
    },
    foodGuidance: {
      id: "Topik makanan yang relevan termasuk kesadaran hidrasi, menjaga asupan makanan bila memungkinkan, dan memahami kenapa arahan medis penting jika tanda bahaya muncul.",
      en: "Useful food topics include hydration awareness, maintaining food intake when possible, and understanding why medical guidance matters when warning signs appear."
    },
    lifestyleGuidance: {
      id: "Topik pencegahan yang relevan termasuk menghilangkan genangan air, menghindari gigitan nyamuk, menggunakan repellent, memakai pakaian pelindung, dan mendukung kontrol nyamuk di lingkungan.",
      en: "Relevant prevention topics include removing standing water, avoiding mosquito bites, using repellents, wearing protective clothing, and supporting community mosquito control."
    },
    safetyReminder: {
      id: "Tanda bahaya dengue membutuhkan perhatian medis segera. Aplikasi ini hanya edukasi dan tidak menggantikan layanan profesional.",
      en: "Dengue warning signs need urgent medical attention. This app is education only and does not replace professional care."
    },
    recommendedPath: {
      id: "Rekomendasi modul: Dengue Fever.",
      en: "Recommended module: Dengue Fever."
    },
    modules: [{ label: "Start Dengue Module", href: "/disease/dengue-fever" }]
  },
  {
    id: "healthy-food",
    visual: "food",
    title: {
      id: "Panduan Belajar Makanan Sehat",
      en: "Healthy Food Learning Guide"
    },
    sample: {
      id: "Aku ingin belajar kebiasaan makan harian yang lebih baik",
      en: "I want to learn better daily food habits"
    },
    explanation: {
      id: "Edukasi makanan sehat adalah tentang memahami pola makan harian, bukan mengikuti aturan ekstrem. Alo Agent membantu user belajar makanan seimbang, kesadaran gula, kesadaran garam, hidrasi, dan kebiasaan berkelanjutan.",
      en: "Healthy food education is about understanding daily eating patterns, not following extreme rules. Alo Agent helps users learn balanced meals, sugar awareness, salt awareness, hydration, and sustainable habits."
    },
    learningMeaning: {
      id: "Kamu bisa belajar bagaimana pilihan makanan terhubung dengan tekanan darah, gula darah, BMI, energi, dan pencegahan.",
      en: "You can learn how food choices connect with blood pressure, blood sugar, BMI, energy, and prevention."
    },
    foodGuidance: {
      id: "Fokus topik meliputi piring makan seimbang, buah dan sayur, protein, serat, air putih, membatasi minuman manis, memahami garam, dan mengurangi makanan ultra-proses.",
      en: "Focus topics include balanced plates, fruits and vegetables, protein, fiber, water, limiting sugary drinks, understanding salt, and reducing ultra-processed foods."
    },
    lifestyleGuidance: {
      id: "Kebiasaan makan akan lebih kuat jika digabungkan dengan tidur cukup, aktivitas fisik, hidrasi, manajemen stres, dan kesadaran check-up.",
      en: "Food habits work better when combined with sleep, physical activity, hydration, stress management, and routine health awareness."
    },
    safetyReminder: {
      id: "Ini edukasi umum, bukan rencana diet personal. Orang dengan kondisi medis tertentu sebaiknya berkonsultasi dengan tenaga profesional.",
      en: "This is general education, not a personal diet plan. People with medical conditions should consult qualified professionals."
    },
    recommendedPath: {
      id: "Rekomendasi modul: Diabetes Tipe 2 dan Hipertensi.",
      en: "Recommended modules: Type 2 Diabetes and Hypertension."
    },
    modules: [
      { label: "Start Type 2 Diabetes", href: "/disease/type-2-diabetes" },
      { label: "Start Hypertension", href: "/disease/hypertension" }
    ]
  },
  {
    id: "lifestyle",
    visual: "lifestyle",
    title: {
      id: "Panduan Belajar Lifestyle Sehat",
      en: "Healthy Lifestyle Learning Guide"
    },
    sample: {
      id: "Aku ingin membangun kebiasaan tidur, jalan kaki, hidrasi, kebersihan, dan pencegahan yang lebih baik",
      en: "I want to build better sleep, walking, hydration, hygiene, and prevention habits"
    },
    explanation: {
      id: "Edukasi lifestyle membantu user memahami bagaimana kebiasaan harian memengaruhi kesehatan jangka panjang. Alo Agent fokus pada kebiasaan praktis seperti jalan kaki, tidur, hidrasi, kebersihan, kesadaran stres, dan pencegahan.",
      en: "Lifestyle education helps users understand how daily habits influence long-term health. Alo Agent focuses on practical habits like walking, sleep, hydration, hygiene, stress awareness, and prevention."
    },
    learningMeaning: {
      id: "Kamu bisa belajar bagaimana perilaku kecil sehari-hari terhubung dengan hipertensi, risiko diabetes, pencegahan common cold, pencegahan dengue, dan kesehatan umum.",
      en: "You can learn how small daily behaviors connect with common health topics such as hypertension, diabetes risk, common cold prevention, dengue prevention, and general wellness."
    },
    foodGuidance: {
      id: "Edukasi makanan dapat mendukung lifestyle lewat makanan seimbang, hidrasi, mengurangi minuman manis, dan kesadaran garam.",
      en: "Food education can support lifestyle habits through balanced meals, hydration, reducing sugary drinks, and salt awareness."
    },
    lifestyleGuidance: {
      id: "Fokus topik meliputi jalan kaki, rutinitas tidur, hidrasi, manajemen stres, cuci tangan, pencegahan nyamuk, kesadaran rokok, dan check-up berkala.",
      en: "Focus topics include walking, sleep routine, hydration, stress management, hand hygiene, mosquito prevention, smoking awareness, and routine check-ups."
    },
    safetyReminder: {
      id: "Ini hanya edukasi umum, bukan rencana medis personal.",
      en: "This is general education only, not a personal medical plan."
    },
    recommendedPath: {
      id: "Rekomendasi: Library dan Classifier.",
      en: "Recommended: Library and Classifier."
    },
    modules: [
      { label: "Explore Library", href: "/library" },
      { label: "Try Classifier", href: "/classifier" }
    ]
  }
];

const reportSections = [
  { key: "explanation", label: { id: "Penjelasan sederhana", en: "Simple explanation" }, visual: "tutor" },
  { key: "learningMeaning", label: { id: "Apa artinya untuk pembelajaran", en: "What this means for learning" }, visual: "meaning" },
  { key: "foodGuidance", label: { id: "Edukasi makanan sehat", en: "Healthy food guidance" }, visual: "food" },
  { key: "lifestyleGuidance", label: { id: "Edukasi lifestyle sehat", en: "Healthy lifestyle guidance" }, visual: "lifestyle" },
  { key: "safetyReminder", label: { id: "Pengingat keamanan", en: "Safety reminder" }, visual: "safety" },
  { key: "recommendedPath", label: { id: "Rekomendasi modul belajar", en: "Recommended learning path" }, visual: "path" }
] as const;

const pipelineSteps = [
  { title: "Signal", body: "receives learning context." },
  { title: "Task", body: "creates a safe education objective." },
  { title: "Tutor", body: "explains the topic simply." },
  { title: "Food", body: "adds healthy food education." },
  { title: "Lifestyle", body: "adds daily habit context." },
  { title: "Judge", body: "checks safety boundaries." },
  { title: "Proof", body: "links to modules, quiz, and badge." }
];

const comparisonCards = [
  {
    title: "Library",
    body: "Read structured disease modules.",
    visual: "tutor" as const
  },
  {
    title: "Classifier",
    body: "Check blood pressure, blood sugar, and BMI for educational guidance.",
    visual: "meaning" as const
  },
  {
    title: "Alo Agent",
    body: "Generate a structured bilingual health learning guide with explanation, food guidance, lifestyle guidance, safety reminder, and next learning step.",
    visual: "path" as const
  }
];

const safetyCards = ["No diagnosis", "No personal diet plan", "No medical records", "Learning guidance only"];

const contextById = Object.fromEntries(agentReports.map((report) => [report.id, report])) as Record<ContextId, AgentReport>;

const revealContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } }
};

const revealItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export function AloAgentPage() {
  const [selectedContext, setSelectedContext] = useState<ContextId>("blood-pressure");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<AgentReport | null>(null);
  const [selectedOutputLanguage, setSelectedOutputLanguage] = useState<Language>("id");
  const timerRef = useRef<number | null>(null);

  const selectedReport = contextById[selectedContext];

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  function generateGuide() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    setIsGenerating(true);
    setGeneratedReport(null);
    timerRef.current = window.setTimeout(() => {
      setGeneratedReport(contextById[selectedContext]);
      setIsGenerating(false);
    }, 950);
  }

  function selectContext(id: ContextId) {
    setSelectedContext(id);
    setGeneratedReport(null);
    setIsGenerating(false);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl overflow-x-hidden px-4 pb-28 sm:px-6 lg:px-8">
      <div className="grid gap-14 sm:gap-16 lg:gap-20">
        <AgentHero />
        <AssistantPanel
          selectedContext={selectedContext}
          selectedReport={selectedReport}
          generatedReport={generatedReport}
          isGenerating={isGenerating}
          selectedOutputLanguage={selectedOutputLanguage}
          onSelectContext={selectContext}
          onGenerate={generateGuide}
          onLanguageChange={setSelectedOutputLanguage}
        />
        <FoodLifestyleSection />
        <SupportingPipeline />
        <ComparisonSection />
        <SafetySection />
      </div>
    </div>
  );
}

function AgentHero() {
  return (
    <section className="grid min-w-0 grid-cols-1 items-center gap-8 rounded-[2.5rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 lg:p-10">
      <motion.div variants={revealContainer} initial="hidden" animate="show" className="min-w-0">
        <motion.p variants={revealItem} className="text-sm font-black uppercase tracking-[0.18em] text-oliveDeep">
          Alo Agent
        </motion.p>
        <motion.h1 variants={revealItem} className="mt-4 max-w-3xl text-4xl font-black leading-[1.04] text-cocoa sm:text-5xl lg:text-6xl">
          Your bilingual health learning assistant.
        </motion.h1>
        <motion.p variants={revealItem} className="mt-5 max-w-2xl text-lg font-extrabold leading-8 text-cocoa sm:text-xl">
          Alo Agent helps you understand blood pressure, blood sugar, BMI, healthy food, lifestyle habits, and common health topics through safe education in Indonesia and English.
        </motion.p>
        <motion.p variants={revealItem} className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-cocoaSoft sm:text-base">
          Choose a context, generate a learning guide, switch between Indonesian and English results, and continue to the right Alodoc module. Alo Agent is for education only, not diagnosis or medical advice.
        </motion.p>
        <motion.div variants={revealItem} className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#ask-agent" className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-alertClay/90 active:scale-[0.98]">
            Start with Alo Agent <ArrowRight className="h-4 w-4" />
          </a>
          <Link href="/classifier" className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-cocoa shadow-lift transition hover:-translate-y-0.5 hover:bg-mint active:scale-[0.98]">
            Try Classifier
          </Link>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.12, duration: 0.5 }} className="min-w-0">
        <AssistantHeroVisual />
      </motion.div>
    </section>
  );
}

function AssistantHeroVisual() {
  return (
    <div className="relative min-h-[430px] w-full max-w-full overflow-hidden rounded-[2.3rem] border border-cocoa/10 bg-cream p-4 shadow-soft sm:min-h-[500px] sm:p-6">
      <motion.div aria-hidden className="pointer-events-none absolute left-8 top-12 h-24 w-24 rounded-full bg-mint/60 blur-3xl" animate={{ opacity: [0.45, 0.82, 0.45], scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} />
      <motion.div aria-hidden className="pointer-events-none absolute bottom-16 right-10 h-28 w-28 rounded-full bg-orange/18 blur-3xl" animate={{ opacity: [0.35, 0.72, 0.35], scale: [1.04, 1, 1.04] }} transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }} />

      <div className="relative z-10 mx-auto grid h-full min-h-[398px] max-w-[510px] place-items-center sm:min-h-[456px]">
        <motion.div animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }} className="w-full rounded-[2rem] border border-cocoa/10 bg-white p-4 shadow-soft sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase text-oliveDeep">Assistant report</p>
              <h2 className="mt-1 text-2xl font-black text-cocoa">Alo learning guide</h2>
            </div>
            <span className="rounded-full bg-orange/15 px-3 py-2 text-xs font-black text-alertClay">Education only</span>
          </div>

          <div className="mt-4 grid grid-cols-2 rounded-full bg-cream p-1 text-xs font-black text-cocoaSoft">
            <span className="rounded-full bg-orange px-3 py-2 text-center text-white shadow-lift">Indonesia</span>
            <span className="px-3 py-2 text-center">English</span>
          </div>

          <div className="mt-4 rounded-[1.5rem] bg-mint/80 p-4">
            <div className="flex items-center gap-3">
              <MiniAssistantFace />
              <div className="min-w-0">
                <p className="text-sm font-black text-cocoa">Alo is preparing your guide</p>
                <div className="mt-2 flex gap-1">
                  {[0, 1, 2].map((dot) => (
                    <motion.span key={dot} className="h-2 w-2 rounded-full bg-orange" animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: dot * 0.15 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <HeroMiniCard title="Food guidance" visual="food" />
            <HeroMiniCard title="Lifestyle tips" visual="lifestyle" />
            <HeroMiniCard title="Safety reminder" visual="safety" />
            <HeroMiniCard title="Recommended module" visual="path" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function HeroMiniCard({ title, visual }: { title: string; visual: ReportVisualKind }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-3 rounded-2xl bg-cream px-3 py-3">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white">
        <ReportSectionVisual kind={visual} compact />
      </div>
      <p className="truncate text-sm font-black text-cocoa">{title}</p>
    </motion.div>
  );
}

function AssistantPanel({
  selectedContext,
  selectedReport,
  generatedReport,
  isGenerating,
  selectedOutputLanguage,
  onSelectContext,
  onGenerate,
  onLanguageChange
}: {
  selectedContext: ContextId;
  selectedReport: AgentReport;
  generatedReport: AgentReport | null;
  isGenerating: boolean;
  selectedOutputLanguage: Language;
  onSelectContext: (id: ContextId) => void;
  onGenerate: () => void;
  onLanguageChange: (language: Language) => void;
}) {
  return (
    <section id="ask-agent" className="scroll-mt-28">
      <SectionHeader
        eyebrow="Ask Alo Agent"
        title="Generate a bilingual education guide."
        body="Choose a health learning context and Alo Agent will create a bilingual education guide with explanation, food guidance, lifestyle guidance, safety reminders, and next learning steps."
      />

      <div className="mt-7 grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.35fr_0.8fr] lg:items-start">
        <ContextSelector selectedContext={selectedContext} onSelectContext={onSelectContext} onGenerate={onGenerate} isGenerating={isGenerating} />
        <AssistantReport report={generatedReport} previewReport={selectedReport} isGenerating={isGenerating} language={selectedOutputLanguage} onLanguageChange={onLanguageChange} />
        <NextStepsPanel report={generatedReport ?? selectedReport} language={selectedOutputLanguage} generated={Boolean(generatedReport)} />
      </div>
    </section>
  );
}

function ContextSelector({
  selectedContext,
  onSelectContext,
  onGenerate,
  isGenerating
}: {
  selectedContext: ContextId;
  onSelectContext: (id: ContextId) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}) {
  return (
    <motion.div variants={revealContainer} initial="hidden" animate="show" className="min-w-0 rounded-[2rem] border border-cocoa/10 bg-white p-4 shadow-soft sm:p-5">
      <p className="text-xs font-black uppercase text-oliveDeep">Choose context</p>
      <h3 className="mt-1 text-2xl font-black text-cocoa">Health learning topic</h3>
      <div className="mt-5 grid gap-3">
        {agentReports.map((report) => {
          const active = report.id === selectedContext;
          return (
            <motion.button
              key={report.id}
              type="button"
              variants={revealItem}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelectContext(report.id)}
              className={cn(
                "focus-ring grid w-full min-w-0 grid-cols-[2.7rem_minmax(0,1fr)] items-center gap-3 rounded-2xl border p-3 text-left transition",
                active ? "border-orange bg-orange/10 shadow-lift" : "border-cocoa/10 bg-cream hover:border-olive/30"
              )}
            >
              <div className={cn("grid h-11 w-11 place-items-center rounded-2xl", active ? "bg-orange/20" : "bg-white")}>
                <ContextVisual kind={report.visual} compact />
              </div>
              <span className="min-w-0">
                <span className="block text-sm font-black text-cocoa">{report.title.en.replace(" Learning Guide", " Education").replace(" Guide", "")}</span>
                <span className="mt-1 block text-xs font-bold leading-5 text-cocoaSoft">{report.sample.en}</span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onGenerate}
        disabled={isGenerating}
        className="focus-ring mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 active:scale-[0.98]"
      >
        {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
        Generate Alo Agent Guide
      </button>
    </motion.div>
  );
}

function AssistantReport({
  report,
  previewReport,
  isGenerating,
  language,
  onLanguageChange
}: {
  report: AgentReport | null;
  previewReport: AgentReport;
  isGenerating: boolean;
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  const current = report ?? previewReport;
  const hasReport = Boolean(report);

  return (
    <div className="min-w-0 rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase text-oliveDeep">Alo Agent report</p>
          <h3 className="mt-1 text-2xl font-black text-cocoa">{hasReport ? current.title[language] : "Your guide will appear here"}</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">
            {hasReport ? current.sample[language] : "Select a context, generate a guide, then switch the report between Indonesia and English."}
          </p>
        </div>
        <LanguageToggle value={language} onChange={onLanguageChange} disabled={!hasReport && !isGenerating} />
      </div>

      {isGenerating && <GeneratingState />}

      {!isGenerating && !hasReport && (
        <div className="mt-5 overflow-hidden rounded-[1.7rem] border border-dashed border-olive/30 bg-white p-5">
          <div className="grid gap-5 sm:grid-cols-[0.7fr_1fr] sm:items-center">
            <div className="min-h-[180px] rounded-[1.4rem] bg-cream p-4">
              <ContextVisual kind={current.visual} large />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black text-cocoa">Ready when you are.</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-cocoaSoft">
                Alo Agent does not ask for private medical data. It uses sample learning contexts to create safe educational guidance only.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Explanation", "Food", "Lifestyle", "Safety", "Modules"].map((chip) => (
                  <span key={chip} className="rounded-full bg-mint px-3 py-2 text-xs font-black text-oliveDeep">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!isGenerating && hasReport && (
        <motion.div key={`${current.id}-${language}`} variants={revealContainer} initial="hidden" animate="show" className="mt-5 grid gap-3">
          {reportSections.map((section) => (
            <motion.article key={section.key} variants={revealItem} className={cn("grid min-w-0 gap-3 rounded-[1.5rem] border border-cocoa/10 bg-white p-4 shadow-lift sm:grid-cols-[3rem_minmax(0,1fr)]", section.key === "foodGuidance" || section.key === "lifestyleGuidance" ? "border-orange/25 bg-orange/5" : "")}>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cream">
                <ReportSectionVisual kind={section.visual} compact />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black uppercase text-oliveDeep">{section.label[language]}</p>
                <p className="mt-2 text-sm font-semibold leading-7 text-cocoaSoft">{current[section.key][language]}</p>
              </div>
            </motion.article>
          ))}
          <motion.div variants={revealItem} className="flex flex-col gap-2 rounded-[1.5rem] bg-cocoa p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <p className="text-sm font-black text-white">{language === "id" ? "Lanjutkan pembelajaran" : "Continue learning"}</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {current.modules.map((module) => (
                <Link key={module.href} href={module.href} className="focus-ring inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 active:scale-[0.98]">
                  {module.label} <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function GeneratingState() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-5 rounded-[1.7rem] bg-white p-5 shadow-lift">
      <div className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
        <MiniAssistantFace thinking />
        <div className="min-w-0">
          <p className="text-base font-black text-cocoa">Alo Agent is preparing your bilingual learning guide...</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">Building explanation, food guidance, lifestyle guidance, safety reminder, and next learning steps.</p>
          <div className="mt-4 grid gap-2">
            {["Understanding context", "Writing bilingual guide", "Checking education-only safety"].map((label, index) => (
              <motion.div key={label} className="h-2 rounded-full bg-cream" initial={{ opacity: 0.55 }} animate={{ opacity: [0.55, 1, 0.55] }} transition={{ repeat: Infinity, duration: 1.4, delay: index * 0.18 }}>
                <motion.div className="h-full rounded-full bg-orange" initial={{ width: "18%" }} animate={{ width: ["22%", "78%", "38%"] }} transition={{ repeat: Infinity, duration: 1.7, delay: index * 0.15 }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function LanguageToggle({ value, onChange, disabled }: { value: Language; onChange: (language: Language) => void; disabled?: boolean }) {
  return (
    <div className={cn("grid min-w-[190px] grid-cols-2 rounded-full bg-white p-1 text-xs font-black shadow-lift", disabled ? "opacity-60" : "")}>
      {(["id", "en"] as Language[]).map((language) => (
        <button
          key={language}
          type="button"
          disabled={disabled}
          onClick={() => onChange(language)}
          className={cn(
            "focus-ring min-h-[40px] rounded-full px-3 transition",
            value === language ? "bg-orange text-white shadow-lift" : "text-cocoaSoft hover:bg-mint hover:text-oliveDeep"
          )}
        >
          {language === "id" ? "Indonesia" : "English"}
        </button>
      ))}
    </div>
  );
}

function NextStepsPanel({ report, language, generated }: { report: AgentReport; language: Language; generated: boolean }) {
  return (
    <div className="min-w-0 rounded-[2rem] border border-cocoa/10 bg-white p-4 shadow-soft sm:p-5">
      <p className="text-xs font-black uppercase text-oliveDeep">Next steps</p>
      <h3 className="mt-1 text-2xl font-black text-cocoa">Keep learning</h3>
      <div className="mt-5 min-h-[170px] overflow-hidden rounded-[1.5rem] bg-parchment p-3">
        <ContextVisual kind={report.visual} large />
      </div>
      <div className="mt-5 rounded-[1.5rem] bg-cream p-4">
        <p className="text-xs font-black uppercase text-oliveDeep">{generated ? "Recommended path" : "Selected context"}</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">{generated ? report.recommendedPath[language] : report.sample[language]}</p>
      </div>
      <div className="mt-4 grid gap-2">
        {report.modules.map((module) => (
          <Link key={module.href} href={module.href} className="focus-ring inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 active:scale-[0.98]">
            {module.label}
          </Link>
        ))}
      </div>
      <Link href="/passport" className="focus-ring mt-2 inline-flex min-h-[46px] w-full items-center justify-center rounded-full bg-mint px-5 py-3 text-sm font-black text-oliveDeep transition hover:-translate-y-0.5 active:scale-[0.98]">
        View Passport
      </Link>
    </div>
  );
}

function FoodLifestyleSection() {
  return (
    <section>
      <SectionHeader
        eyebrow="Food and lifestyle guidance, not just explanations."
        title="Daily habits become part of the learning guide."
        body="Alo Agent helps users connect health education with daily habits they can actually understand."
      />

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }} className="min-w-0 rounded-[2.2rem] border border-cocoa/10 bg-white p-5 shadow-soft sm:p-6">
          <div className="min-h-[280px] overflow-hidden rounded-[1.8rem] bg-parchment p-4">
            <HealthyFoodVisual />
          </div>
          <h3 className="mt-5 text-3xl font-black text-cocoa">Healthy Food Guidance</h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-cocoaSoft">
            Food guidance helps users learn about balanced meals, sugar awareness, salt awareness, hydration, portions, label reading, and sustainable eating habits.
          </p>
          <p className="mt-3 text-sm font-semibold leading-7 text-cocoaSoft">
            Panduan makanan membantu user belajar tentang makanan seimbang, kesadaran gula, kesadaran garam, hidrasi, porsi, membaca label, dan kebiasaan makan berkelanjutan.
          </p>
        </motion.article>

        <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} whileHover={{ y: -4 }} className="min-w-0 rounded-[2.2rem] border border-cocoa/10 bg-white p-5 shadow-soft sm:p-6">
          <div className="min-h-[280px] overflow-hidden rounded-[1.8rem] bg-parchment p-4">
            <LifestyleOrbitVisual />
          </div>
          <h3 className="mt-5 text-3xl font-black text-cocoa">Healthy Lifestyle Guidance</h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-cocoaSoft">
            Lifestyle guidance helps users learn about walking, sleep, hydration, stress awareness, hand hygiene, mosquito prevention, smoking awareness, and routine check-ups.
          </p>
          <p className="mt-3 text-sm font-semibold leading-7 text-cocoaSoft">
            Panduan lifestyle membantu user belajar tentang jalan kaki, tidur, hidrasi, kesadaran stres, cuci tangan, pencegahan nyamuk, kesadaran rokok, dan check-up berkala.
          </p>
        </motion.article>
      </div>
    </section>
  );
}

function SupportingPipeline() {
  return (
    <section>
      <SectionHeader
        eyebrow="How Alo Agent structures the guide"
        title="A small safety structure behind the assistant."
        body="The pipeline is not the product. It is the guardrail that keeps the generated guide clear, practical, bilingual, and education-only."
      />

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
        {pipelineSteps.map((step, index) => (
          <motion.article key={step.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} whileHover={{ y: -3 }} className="min-w-0 rounded-[1.4rem] border border-cocoa/10 bg-white p-4 shadow-lift">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-mint text-xs font-black text-oliveDeep">{index + 1}</span>
            <h3 className="mt-4 text-lg font-black text-cocoa">{step.title}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">{step.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section>
      <SectionHeader
        eyebrow="How Alo Agent is different"
        title="Alo Agent is the guide generator, not another library."
        body="Library, Classifier, and Passport each have a role. Alo Agent turns context into bilingual learning guidance."
      />

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {comparisonCards.map((card, index) => (
          <motion.article key={card.title} whileHover={{ y: -4 }} className={cn("min-w-0 rounded-[2rem] border border-cocoa/10 bg-white p-5 shadow-soft", index === 2 ? "bg-cocoa text-white" : "")}>
            <div className={cn("mb-4 grid h-16 w-16 place-items-center rounded-2xl", index === 2 ? "bg-orange/25" : "bg-mint")}>
              <ReportSectionVisual kind={card.visual} compact />
            </div>
            <h3 className={cn("text-2xl font-black", index === 2 ? "text-white" : "text-cocoa")}>{card.title}</h3>
            <p className={cn("mt-3 text-sm font-semibold leading-7", index === 2 ? "text-white/78" : "text-cocoaSoft")}>{card.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function SafetySection() {
  return (
    <section className="rounded-[2.3rem] border border-cocoa/10 bg-cocoa p-5 text-white shadow-soft sm:p-7">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-orange/20">
            <ShieldCheck className="h-8 w-8 text-orange" />
          </div>
          <p className="text-sm font-black uppercase text-mint">Safe by design</p>
          <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">Education first. No medical data.</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-white/78">
            Alo Agent is for education only. It does not provide diagnosis, treatment decisions, personal diet plans, or emergency medical advice.
          </p>
          <p className="mt-3 text-sm font-semibold leading-7 text-white/78">
            Alo Agent hanya untuk edukasi. Fitur ini tidak memberikan diagnosis, keputusan pengobatan, rencana diet personal, atau saran medis darurat.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {safetyCards.map((card, index) => (
            <motion.div key={card} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.32 }} className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
              <CheckCircle2 className="h-5 w-5 text-orange" />
              <p className="mt-3 text-lg font-black text-white">{card}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="max-w-4xl">
      <p className="text-sm font-black uppercase tracking-[0.14em] text-oliveDeep">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black leading-tight text-cocoa sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-cocoaSoft sm:text-base">{body}</p>
    </div>
  );
}

type ReportVisualKind = "tutor" | "meaning" | "food" | "lifestyle" | "safety" | "path";

function ReportSectionVisual({ kind, compact = false }: { kind: ReportVisualKind; compact?: boolean }) {
  const size = compact ? "h-8 w-8" : "h-20 w-20";
  return (
    <svg viewBox="0 0 120 120" className={cn(size, "overflow-visible")} aria-hidden="true">
      {kind === "tutor" && (
        <g>
          <path d="M26 42 C43 35 52 39 60 50 C68 39 77 35 94 42 L94 88 C77 82 68 86 60 96 C52 86 43 82 26 88Z" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.18" strokeWidth="4" />
          <rect x="38" y="55" width="17" height="6" rx="3" fill="#90A090" />
          <rect x="66" y="55" width="17" height="6" rx="3" fill="#C9A668" />
        </g>
      )}
      {kind === "meaning" && (
        <g>
          <circle cx="60" cy="60" r="34" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.16" strokeWidth="4" />
          <path d="M33 63 C45 48 52 76 62 61 C73 45 79 75 91 58" fill="none" stroke="#708473" strokeWidth="7" strokeLinecap="round" />
          <circle cx="91" cy="58" r="6" fill="#C9A668" />
        </g>
      )}
      {kind === "food" && (
        <g>
          <circle cx="60" cy="61" r="34" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.16" strokeWidth="4" />
          <path d="M60 27 A34 34 0 0 1 92 72 L60 61Z" fill="#90A090" />
          <path d="M60 61 L92 72 A34 34 0 0 1 44 91Z" fill="#C9A668" />
          <path d="M60 27 A34 34 0 0 0 44 91 L60 61Z" fill="#F0D9A2" />
          <circle cx="33" cy="38" r="6" fill="#90A090" />
        </g>
      )}
      {kind === "lifestyle" && (
        <g>
          <circle cx="60" cy="60" r="34" fill="none" stroke="#708473" strokeWidth="4" strokeDasharray="7 8" />
          <rect x="44" y="44" width="32" height="32" rx="12" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.16" strokeWidth="4" />
          <circle cx="60" cy="22" r="6" fill="#90A090" />
          <circle cx="92" cy="60" r="6" fill="#C9A668" />
          <circle cx="60" cy="98" r="6" fill="#90A090" />
          <circle cx="28" cy="60" r="6" fill="#C9A668" />
        </g>
      )}
      {kind === "safety" && (
        <g>
          <path d="M60 22 L91 35 V58 C91 79 78 95 60 105 C42 95 29 79 29 58 V35Z" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.16" strokeWidth="4" />
          <path d="M44 61 L56 73 L78 47" fill="none" stroke="#708473" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {kind === "path" && (
        <g>
          <rect x="27" y="38" width="54" height="48" rx="15" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.16" strokeWidth="4" />
          <circle cx="80" cy="78" r="22" fill="#C9A668" />
          <path d="M70 78 L77 85 L91 68" fill="none" stroke="#FFF8EA" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="40" y="52" width="24" height="6" rx="3" fill="#90A090" />
        </g>
      )}
    </svg>
  );
}

function MiniAssistantFace({ thinking = false }: { thinking?: boolean }) {
  return (
    <motion.div animate={thinking ? { y: [0, -4, 0], scale: [1, 1.03, 1] } : { y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }} className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white shadow-lift">
      <svg viewBox="0 0 80 80" className="h-12 w-12" aria-hidden="true">
        <path d="M40 14 C49 21 58 32 58 44 C58 57 50 66 40 66 C30 66 22 57 22 44 C22 32 31 21 40 14Z" fill="#90A090" />
        <rect x="25" y="36" width="8" height="24" rx="4" fill="#202020" transform="rotate(-35 29 48)" />
        <rect x="47" y="36" width="8" height="24" rx="4" fill="#202020" transform="rotate(35 51 48)" />
        <circle cx="40" cy="57" r="5" fill="#C9A668" />
      </svg>
    </motion.div>
  );
}

function ContextVisual({ kind, compact = false, large = false }: { kind: VisualKind; compact?: boolean; large?: boolean }) {
  if (large) {
    return (
      <div className="grid h-full min-h-[170px] w-full place-items-center">
        {kind === "food" ? <HealthyFoodVisual compact /> : kind === "lifestyle" ? <LifestyleOrbitVisual compact /> : <GeneralHealthVisual kind={kind} />}
      </div>
    );
  }

  if (kind === "food" || kind === "lifestyle") {
    return <ReportSectionVisual kind={kind} compact={compact} />;
  }

  return (
    <svg viewBox="0 0 120 120" className={compact ? "h-8 w-8" : "h-20 w-20"} aria-hidden="true">
      {kind === "pressure" && (
        <g>
          <circle cx="60" cy="60" r="34" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.16" strokeWidth="4" />
          <path d="M30 65 C42 42 50 82 62 61 C75 39 82 78 94 55" fill="none" stroke="#708473" strokeWidth="7" strokeLinecap="round" />
          <path d="M48 84 C55 75 65 75 72 84" fill="none" stroke="#C9A668" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
      {kind === "sugar" && (
        <g>
          <rect x="34" y="35" width="52" height="56" rx="18" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.16" strokeWidth="4" />
          <circle cx="44" cy="44" r="6" fill="#90A090" />
          <circle cx="82" cy="42" r="6" fill="#C9A668" />
          <rect x="48" y="62" width="26" height="8" rx="4" fill="#90A090" />
          <rect x="48" y="76" width="34" height="8" rx="4" fill="#C9A668" />
        </g>
      )}
      {kind === "bmi" && (
        <g>
          <circle cx="60" cy="62" r="34" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.16" strokeWidth="4" />
          <path d="M41 62 A19 19 0 0 1 79 62" fill="none" stroke="#90A090" strokeWidth="7" strokeLinecap="round" />
          <path d="M60 62 L72 50" stroke="#C9A668" strokeWidth="6" strokeLinecap="round" />
          <rect x="35" y="84" width="50" height="10" rx="5" fill="#202020" opacity="0.82" />
        </g>
      )}
      {kind === "cold" && (
        <g>
          <circle cx="50" cy="58" r="21" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.16" strokeWidth="4" />
          <motion.circle cx="83" cy="42" r="8" fill="#90A090" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.2 }} />
          <motion.circle cx="91" cy="64" r="6" fill="#C9A668" animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2.4 }} />
          <path d="M28 82 C44 69 60 69 76 82" fill="none" stroke="#708473" strokeWidth="7" strokeLinecap="round" />
        </g>
      )}
      {kind === "dengue" && (
        <g>
          <path d="M60 24 L91 38 V59 C91 79 78 95 60 105 C42 95 29 79 29 59 V38Z" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.16" strokeWidth="4" />
          <motion.path d="M44 66 C53 50 69 50 78 66" fill="none" stroke="#708473" strokeWidth="7" strokeLinecap="round" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.2 }} />
          <circle cx="45" cy="43" r="6" fill="#C9A668" />
          <path d="M84 36 C75 46 75 55 84 66 C93 55 93 46 84 36Z" fill="#90A090" />
        </g>
      )}
    </svg>
  );
}

function GeneralHealthVisual({ kind }: { kind: VisualKind }) {
  return (
    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }} className="grid h-full w-full place-items-center">
      <ContextVisual kind={kind} />
    </motion.div>
  );
}

function HealthyFoodVisual({ compact = false }: { compact?: boolean }) {
  return (
    <motion.svg viewBox="0 0 300 240" className="h-full min-h-[210px] w-full" aria-label="Animated balanced plate visual">
      <motion.circle cx="142" cy="120" r="66" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.14" strokeWidth="4" animate={{ scale: [1, 1.015, 1] }} transition={{ repeat: Infinity, duration: 3.4 }} style={{ transformOrigin: "142px 120px" }} />
      <path d="M142 54 A66 66 0 0 1 205 139 L142 120Z" fill="#90A090" />
      <path d="M142 120 L205 139 A66 66 0 0 1 111 178Z" fill="#C9A668" />
      <path d="M142 54 A66 66 0 0 0 111 178 L142 120Z" fill="#F0D9A2" />
      <motion.circle cx="94" cy="79" r="12" fill="#90A090" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.6 }} />
      <motion.rect x="206" y="58" width="24" height="24" rx="7" fill="#FFF" stroke="#C9A668" strokeWidth="4" animate={{ rotate: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
      <motion.path d="M231 176 C216 157 216 144 231 126 C246 144 246 157 231 176Z" fill="#90A090" animate={{ scale: [1, 1.07, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} style={{ transformOrigin: "231px 151px" }} />
      <rect x="42" y="174" width="46" height="16" rx="8" fill="#202020" opacity="0.76" />
      {!compact && (
        <motion.g animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 3.6 }}>
          <rect x="196" y="152" width="68" height="48" rx="16" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.12" />
          <rect x="211" y="166" width="34" height="6" rx="3" fill="#90A090" />
          <rect x="211" y="181" width="42" height="6" rx="3" fill="#C9A668" />
        </motion.g>
      )}
    </motion.svg>
  );
}

function LifestyleOrbitVisual({ compact = false }: { compact?: boolean }) {
  const points = [
    [150, 43],
    [213, 76],
    [213, 154],
    [150, 189],
    [87, 154],
    [87, 76]
  ];

  return (
    <motion.svg viewBox="0 0 300 240" className="h-full min-h-[210px] w-full" aria-label="Animated healthy lifestyle orbit visual">
      <motion.circle cx="150" cy="118" r="75" fill="none" stroke="#708473" strokeWidth="3" strokeDasharray="8 10" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 22, ease: "linear" }} style={{ transformOrigin: "150px 118px" }} />
      <rect x="111" y="79" width="78" height="78" rx="28" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.14" strokeWidth="4" />
      <path d="M129 123 C141 108 159 108 171 123" fill="none" stroke="#202020" strokeWidth="7" strokeLinecap="round" />
      <circle cx="134" cy="105" r="5" fill="#202020" />
      <circle cx="166" cy="105" r="5" fill="#202020" />
      {points.map(([cx, cy], index) => (
        <motion.g key={`${cx}-${cy}`} animate={{ scale: [1, 1.14, 1], y: [0, index % 2 ? 5 : -5, 0] }} transition={{ repeat: Infinity, duration: 3, delay: index * 0.12 }} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={compact ? 11 : 14} fill={index % 2 ? "#C9A668" : "#90A090"} />
          {!compact && index === 0 && <path d="M143 43 C149 31 157 31 163 43" fill="none" stroke="#FFF8EA" strokeWidth="4" strokeLinecap="round" />}
          {!compact && index === 1 && <path d="M207 76 H219" stroke="#FFF8EA" strokeWidth="4" strokeLinecap="round" />}
          {!compact && index === 2 && <path d="M213 146 V162" stroke="#FFF8EA" strokeWidth="4" strokeLinecap="round" />}
          {!compact && index === 3 && <path d="M143 189 H157" stroke="#FFF8EA" strokeWidth="4" strokeLinecap="round" />}
          {!compact && index === 4 && <path d="M82 154 H92" stroke="#FFF8EA" strokeWidth="4" strokeLinecap="round" />}
          {!compact && index === 5 && <path d="M87 68 V84" stroke="#FFF8EA" strokeWidth="4" strokeLinecap="round" />}
        </motion.g>
      ))}
    </motion.svg>
  );
}
