export type Language = "id" | "en";

export type QuizOption = {
  label: Record<Language, string>;
  isCorrect: boolean;
};

export type QuizQuestion = {
  question: Record<Language, string>;
  options: QuizOption[];
  explanation: Record<Language, string>;
};

export type DiseaseSection = {
  title: Record<Language, string>;
  body: Record<Language, string>;
  bullets: Record<Language, string[]>;
};

export type Disease = {
  id: number;
  slug: string;
  title: Record<Language, string>;
  category: Record<Language, string>;
  difficulty: "Easy" | "Moderate";
  estimatedMinutes: number;
  badgeName: Record<Language, string>;
  shortDescription: Record<Language, string>;
  sections: DiseaseSection[];
  quiz: QuizQuestion[];
};

export const languages: Record<Language, string> = {
  id: "Indonesia",
  en: "English"
};

export const safetyDisclaimer: Record<Language, string> = {
  en: "Alodoc is for educational purposes only. It does not provide diagnosis, treatment decisions, or emergency medical advice. If symptoms are severe, persistent, or concerning, consult a qualified healthcare professional.",
  id: "Alodoc hanya untuk edukasi umum. Alodoc tidak memberikan diagnosis, keputusan pengobatan, atau saran medis darurat. Jika gejala berat, menetap, atau mengkhawatirkan, segera konsultasikan dengan tenaga kesehatan profesional."
};

export const diseases: Disease[] = [
  {
    id: 1,
    slug: "common-cold",
    title: { en: "Common Cold", id: "Pilek Biasa" },
    category: { en: "Respiratory literacy", id: "Literasi pernapasan" },
    difficulty: "Easy",
    estimatedMinutes: 4,
    badgeName: { en: "Cold Care Basics", id: "Dasar Perawatan Pilek" },
    shortDescription: {
      en: "Learn why most colds are viral, how they spread, and when warning signs need care.",
      id: "Pelajari mengapa pilek umumnya viral, cara penularan, dan tanda bahaya yang perlu diperhatikan."
    },
    sections: [
      {
        title: { en: "What it is", id: "Apa itu pilek biasa" },
        body: {
          en: "A common cold is usually a mild viral infection of the upper respiratory tract.",
          id: "Pilek biasa umumnya infeksi virus ringan pada saluran napas bagian atas."
        },
        bullets: {
          en: ["Mostly caused by rhinovirus and other respiratory viruses.", "Usually improves in 5 to 10 days."],
          id: ["Sering disebabkan rhinovirus dan virus pernapasan lain.", "Biasanya membaik dalam 5 sampai 10 hari."]
        }
      },
      {
        title: { en: "How it spreads", id: "Cara penularan" },
        body: {
          en: "Cold viruses move through droplets, hands, and contaminated surfaces.",
          id: "Virus pilek dapat menyebar melalui droplet, tangan, dan permukaan yang terkontaminasi."
        },
        bullets: {
          en: ["Wash hands often.", "Avoid touching eyes, nose, and mouth after contact with shared surfaces."],
          id: ["Cuci tangan secara rutin.", "Hindari menyentuh mata, hidung, dan mulut setelah kontak dengan permukaan bersama."]
        }
      },
      {
        title: { en: "What helps", id: "Yang dapat membantu" },
        body: {
          en: "Rest, fluids, nourishing food, and symptom relief may help comfort while the body recovers.",
          id: "Istirahat, cairan, makanan bergizi, dan pereda gejala dapat membantu kenyamanan saat tubuh pulih."
        },
        bullets: {
          en: ["Antibiotics are not routinely used because the illness is usually viral.", "Ask a professional when symptoms are worrying."],
          id: ["Antibiotik tidak rutin digunakan karena umumnya disebabkan virus.", "Konsultasikan jika gejala mengkhawatirkan."]
        }
      },
      {
        title: { en: "Red flags", id: "Tanda bahaya" },
        body: {
          en: "Some signs should be checked promptly, especially in high-risk groups.",
          id: "Beberapa tanda perlu diperiksa segera, terutama pada kelompok berisiko."
        },
        bullets: {
          en: ["Shortness of breath, chest pain, high fever, worsening symptoms, long duration.", "Infants, older adults, pregnant people, and people with chronic illness need extra caution."],
          id: ["Sesak napas, nyeri dada, demam tinggi, gejala memburuk, atau berlangsung lama.", "Bayi, lansia, ibu hamil, dan orang dengan penyakit kronis perlu lebih berhati-hati."]
        }
      }
    ],
    quiz: [
      {
        question: { en: "Most common colds are caused by bacteria.", id: "Sebagian besar pilek biasa disebabkan bakteri." },
        options: [
          { label: { en: "Myth", id: "Mitos" }, isCorrect: true },
          { label: { en: "Fact", id: "Fakta" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: {
          en: "Common colds are usually viral, so antibiotics are not routinely used.",
          id: "Pilek biasa umumnya viral, sehingga antibiotik tidak rutin digunakan."
        }
      },
      {
        question: { en: "Cold viruses can spread through hands and contaminated surfaces.", id: "Virus pilek dapat menyebar melalui tangan dan permukaan terkontaminasi." },
        options: [
          { label: { en: "Fact", id: "Fakta" }, isCorrect: true },
          { label: { en: "Myth", id: "Mitos" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: {
          en: "Droplets, hands, and surfaces are common routes of spread.",
          id: "Droplet, tangan, dan permukaan adalah jalur penularan yang umum."
        }
      },
      {
        question: { en: "Shortness of breath or chest pain during an illness should be ignored.", id: "Sesak napas atau nyeri dada saat sakit sebaiknya diabaikan." },
        options: [
          { label: { en: "Myth", id: "Mitos" }, isCorrect: true },
          { label: { en: "Fact", id: "Fakta" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: {
          en: "These are red flags that should be assessed by a qualified professional.",
          id: "Ini tanda bahaya yang perlu dinilai oleh tenaga kesehatan profesional."
        }
      }
    ]
  },
  {
    id: 2,
    slug: "hypertension",
    title: { en: "Hypertension", id: "Hipertensi" },
    category: { en: "Heart health", id: "Kesehatan jantung" },
    difficulty: "Moderate",
    estimatedMinutes: 5,
    badgeName: { en: "Pressure Smart", id: "Cerdas Tekanan Darah" },
    shortDescription: {
      en: "Understand silent high blood pressure, risk factors, repeated measurement, and urgent warning signs.",
      id: "Pahami tekanan darah tinggi yang sering tanpa gejala, faktor risiko, pengukuran berulang, dan tanda bahaya."
    },
    sections: [
      {
        title: { en: "Core idea", id: "Gagasan utama" },
        body: {
          en: "Hypertension means blood pressure stays chronically elevated.",
          id: "Hipertensi berarti tekanan darah meningkat secara kronis."
        },
        bullets: {
          en: ["It is often silent.", "Diagnosis is based on repeated blood pressure measurement by a health professional."],
          id: ["Sering kali tanpa gejala.", "Diagnosis didasarkan pada pengukuran tekanan darah berulang oleh tenaga kesehatan."]
        }
      },
      {
        title: { en: "Risk factors", id: "Faktor risiko" },
        body: {
          en: "Risk can rise with age, family history, high salt intake, obesity, stress, low activity, smoking, and alcohol.",
          id: "Risiko dapat meningkat karena usia, riwayat keluarga, asupan garam tinggi, obesitas, stres, kurang aktivitas, merokok, dan alkohol."
        },
        bullets: {
          en: ["Lifestyle habits can influence risk.", "Family history can matter even when someone feels well."],
          id: ["Kebiasaan hidup dapat memengaruhi risiko.", "Riwayat keluarga tetap penting meski seseorang merasa sehat."]
        }
      },
      {
        title: { en: "Management basics", id: "Dasar pengelolaan" },
        body: {
          en: "Common foundations include low-salt eating, physical activity, weight management, stopping smoking, and clinician-directed medication if needed.",
          id: "Dasarnya meliputi makan rendah garam, aktivitas fisik, pengelolaan berat badan, berhenti merokok, dan obat sesuai arahan klinisi bila diperlukan."
        },
        bullets: {
          en: ["Treatment choices should be guided by a clinician.", "Do not start or stop medication based only on app content."],
          id: ["Pilihan pengobatan perlu diarahkan klinisi.", "Jangan mulai atau menghentikan obat hanya berdasarkan konten aplikasi."]
        }
      },
      {
        title: { en: "Red flags", id: "Tanda bahaya" },
        body: {
          en: "Chest pain, severe headache, weakness or numbness, shortness of breath, confusion, or vision changes need urgent care.",
          id: "Nyeri dada, sakit kepala berat, lemah atau baal, sesak napas, kebingungan, atau perubahan penglihatan memerlukan pertolongan segera."
        },
        bullets: {
          en: ["Seek urgent help when severe symptoms appear.", "High numbers plus severe symptoms should not be managed alone."],
          id: ["Cari pertolongan segera jika muncul gejala berat.", "Angka tinggi disertai gejala berat tidak boleh ditangani sendiri."]
        }
      }
    ],
    quiz: [
      {
        question: { en: "Hypertension can be silent.", id: "Hipertensi bisa tanpa gejala." },
        options: [
          { label: { en: "Fact", id: "Fakta" }, isCorrect: true },
          { label: { en: "Myth", id: "Mitos" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: { en: "Many people feel normal even when blood pressure is high.", id: "Banyak orang merasa normal meski tekanan darah tinggi." }
      },
      {
        question: { en: "A single casual measurement is always enough to diagnose hypertension.", id: "Satu pengukuran santai selalu cukup untuk mendiagnosis hipertensi." },
        options: [
          { label: { en: "Myth", id: "Mitos" }, isCorrect: true },
          { label: { en: "Fact", id: "Fakta" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: { en: "Diagnosis is based on repeated measurement by a health professional.", id: "Diagnosis didasarkan pada pengukuran berulang oleh tenaga kesehatan." }
      },
      {
        question: { en: "Chest pain with possible high blood pressure is a red flag.", id: "Nyeri dada dengan kemungkinan tekanan darah tinggi adalah tanda bahaya." },
        options: [
          { label: { en: "Fact", id: "Fakta" }, isCorrect: true },
          { label: { en: "Myth", id: "Mitos" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: { en: "Chest pain can signal an emergency and should be checked urgently.", id: "Nyeri dada dapat menandakan kondisi darurat dan perlu segera diperiksa." }
      }
    ]
  },
  {
    id: 3,
    slug: "type-2-diabetes",
    title: { en: "Type 2 Diabetes", id: "Diabetes Tipe 2" },
    category: { en: "Metabolic health", id: "Kesehatan metabolik" },
    difficulty: "Moderate",
    estimatedMinutes: 5,
    badgeName: { en: "Glucose Guide", id: "Panduan Glukosa" },
    shortDescription: {
      en: "Learn insulin resistance basics, common symptoms, everyday management foundations, and urgent red flags.",
      id: "Pelajari dasar resistensi insulin, gejala umum, dasar pengelolaan harian, dan tanda bahaya."
    },
    sections: [
      {
        title: { en: "What it means", id: "Artinya" },
        body: {
          en: "Type 2 diabetes is a chronic metabolic condition involving insulin resistance and impaired insulin function.",
          id: "Diabetes tipe 2 adalah kondisi metabolik kronis yang melibatkan resistensi insulin dan gangguan fungsi insulin."
        },
        bullets: {
          en: ["It affects how the body handles glucose.", "Professional testing is needed for diagnosis."],
          id: ["Kondisi ini memengaruhi cara tubuh mengelola glukosa.", "Pemeriksaan profesional diperlukan untuk diagnosis."]
        }
      },
      {
        title: { en: "Risk and symptoms", id: "Risiko dan gejala" },
        body: {
          en: "Risk factors include central obesity, low activity, family history, age, hypertension, and dyslipidemia.",
          id: "Faktor risiko meliputi obesitas sentral, kurang aktivitas, riwayat keluarga, usia, hipertensi, dan dislipidemia."
        },
        bullets: {
          en: ["Symptoms may include frequent urination, thirst, hunger, fatigue, blurred vision, and slow wound healing.", "Some people have few symptoms early on."],
          id: ["Gejala dapat berupa sering buang air kecil, haus, lapar, lelah, penglihatan kabur, dan luka sulit sembuh.", "Sebagian orang hanya memiliki sedikit gejala di awal."]
        }
      },
      {
        title: { en: "Management basics", id: "Dasar pengelolaan" },
        body: {
          en: "Healthy diet, physical activity, weight management, and clinician-directed medication if needed are common foundations.",
          id: "Pola makan sehat, aktivitas fisik, pengelolaan berat badan, dan obat sesuai arahan klinisi bila diperlukan adalah dasar umum."
        },
        bullets: {
          en: ["Plans should be individualized by qualified professionals.", "This module does not replace medical care."],
          id: ["Rencana perlu disesuaikan oleh tenaga profesional.", "Modul ini tidak menggantikan layanan medis."]
        }
      },
      {
        title: { en: "Red flags", id: "Tanda bahaya" },
        body: {
          en: "Severe dehydration, confusion, vomiting, extreme weakness, infected wounds, or sudden vision problems need urgent care.",
          id: "Dehidrasi berat, kebingungan, muntah, sangat lemah, luka terinfeksi, atau gangguan penglihatan mendadak perlu pertolongan segera."
        },
        bullets: {
          en: ["Do not wait when symptoms are severe.", "Seek professional help for infected wounds."],
          id: ["Jangan menunggu jika gejala berat.", "Cari bantuan profesional untuk luka yang terinfeksi."]
        }
      }
    ],
    quiz: [
      {
        question: { en: "Type 2 diabetes involves insulin resistance or impaired insulin function.", id: "Diabetes tipe 2 melibatkan resistensi insulin atau gangguan fungsi insulin." },
        options: [
          { label: { en: "Fact", id: "Fakta" }, isCorrect: true },
          { label: { en: "Myth", id: "Mitos" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: { en: "That is the core metabolic pattern.", id: "Itu pola metabolik utamanya." }
      },
      {
        question: { en: "Slow wound healing can be a possible symptom.", id: "Luka sulit sembuh dapat menjadi salah satu gejala." },
        options: [
          { label: { en: "Fact", id: "Fakta" }, isCorrect: true },
          { label: { en: "Myth", id: "Mitos" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: { en: "Slow wound healing is one symptom that may appear.", id: "Luka sulit sembuh adalah salah satu gejala yang dapat muncul." }
      },
      {
        question: { en: "Severe dehydration and confusion are minor symptoms to watch at home only.", id: "Dehidrasi berat dan kebingungan adalah gejala ringan yang cukup dipantau di rumah." },
        options: [
          { label: { en: "Myth", id: "Mitos" }, isCorrect: true },
          { label: { en: "Fact", id: "Fakta" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: { en: "They are urgent red flags.", id: "Itu tanda bahaya yang perlu pertolongan segera." }
      }
    ]
  },
  {
    id: 4,
    slug: "gerd",
    title: { en: "GERD", id: "GERD" },
    category: { en: "Digestive health", id: "Kesehatan pencernaan" },
    difficulty: "Easy",
    estimatedMinutes: 4,
    badgeName: { en: "Reflux Reader", id: "Paham Refluks" },
    shortDescription: {
      en: "Learn reflux basics, triggers, symptom patterns, practical habits, and important red flags.",
      id: "Pelajari dasar refluks, pemicu, pola gejala, kebiasaan praktis, dan tanda bahaya penting."
    },
    sections: [
      {
        title: { en: "What happens", id: "Apa yang terjadi" },
        body: {
          en: "GERD happens when stomach acid flows back into the esophagus.",
          id: "GERD terjadi ketika asam lambung mengalir kembali ke kerongkongan."
        },
        bullets: {
          en: ["It may cause heartburn or a sour taste.", "Symptoms can be meal-related."],
          id: ["Dapat menyebabkan rasa panas di dada atau rasa asam.", "Gejala dapat berkaitan dengan makan."]
        }
      },
      {
        title: { en: "Common triggers", id: "Pemicu umum" },
        body: {
          en: "Large meals, lying down after eating, spicy or fatty foods, caffeine, smoking, and obesity can contribute.",
          id: "Makan besar, berbaring setelah makan, makanan pedas atau berlemak, kafein, merokok, dan obesitas dapat berperan."
        },
        bullets: {
          en: ["Triggers differ by person.", "Awareness helps people discuss patterns with professionals."],
          id: ["Pemicu berbeda pada tiap orang.", "Kesadaran pola membantu diskusi dengan profesional."]
        }
      },
      {
        title: { en: "Helpful habits", id: "Kebiasaan yang membantu" },
        body: {
          en: "Smaller meals, avoiding lying down after eating, trigger awareness, weight management if relevant, and clinician-directed medication if needed may help.",
          id: "Porsi lebih kecil, tidak langsung berbaring setelah makan, mengenali pemicu, pengelolaan berat badan jika relevan, dan obat sesuai arahan klinisi bila perlu dapat membantu."
        },
        bullets: {
          en: ["Medication choices should be discussed with a clinician.", "Persistent symptoms deserve evaluation."],
          id: ["Pilihan obat perlu dibahas dengan klinisi.", "Gejala menetap perlu evaluasi."]
        }
      },
      {
        title: { en: "Red flags", id: "Tanda bahaya" },
        body: {
          en: "Chest pain that may be heart-related, difficulty swallowing, vomiting blood, black stool, unintentional weight loss, or persistent symptoms need care.",
          id: "Nyeri dada yang mungkin terkait jantung, sulit menelan, muntah darah, BAB hitam, berat badan turun tanpa sengaja, atau gejala menetap perlu diperiksa."
        },
        bullets: {
          en: ["Chest pain should not be assumed to be GERD.", "Bleeding signs need urgent attention."],
          id: ["Nyeri dada jangan langsung dianggap GERD.", "Tanda perdarahan perlu perhatian segera."]
        }
      }
    ],
    quiz: [
      {
        question: { en: "GERD involves stomach acid flowing back into the esophagus.", id: "GERD melibatkan asam lambung yang mengalir kembali ke kerongkongan." },
        options: [
          { label: { en: "Fact", id: "Fakta" }, isCorrect: true },
          { label: { en: "Myth", id: "Mitos" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: { en: "That backflow is the core reflux idea.", id: "Aliran balik itu adalah gagasan utama refluks." }
      },
      {
        question: { en: "Chest pain should always be treated as simple reflux.", id: "Nyeri dada selalu boleh dianggap refluks biasa." },
        options: [
          { label: { en: "Myth", id: "Mitos" }, isCorrect: true },
          { label: { en: "Fact", id: "Fakta" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: { en: "Chest pain can be heart-related and should be taken seriously.", id: "Nyeri dada dapat terkait jantung dan perlu dianggap serius." }
      },
      {
        question: { en: "Avoiding lying down right after eating may help some people.", id: "Tidak langsung berbaring setelah makan dapat membantu sebagian orang." },
        options: [
          { label: { en: "Fact", id: "Fakta" }, isCorrect: true },
          { label: { en: "Myth", id: "Mitos" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: { en: "This is a common reflux-friendly habit.", id: "Ini kebiasaan yang umum membantu pada refluks." }
      }
    ]
  },
  {
    id: 5,
    slug: "dengue-fever",
    title: { en: "Dengue Fever", id: "Demam Berdarah Dengue" },
    category: { en: "Infectious disease", id: "Penyakit infeksi" },
    difficulty: "Moderate",
    estimatedMinutes: 5,
    badgeName: { en: "Dengue Aware", id: "Waspada Dengue" },
    shortDescription: {
      en: "Understand dengue transmission, symptoms, warning signs, prevention, and when urgent care matters.",
      id: "Pahami penularan dengue, gejala, tanda peringatan, pencegahan, dan kapan perlu pertolongan segera."
    },
    sections: [
      {
        title: { en: "What it is", id: "Apa itu dengue" },
        body: {
          en: "Dengue fever is a mosquito-borne viral infection transmitted by Aedes mosquitoes.",
          id: "Demam berdarah dengue adalah infeksi virus yang ditularkan oleh nyamuk Aedes."
        },
        bullets: {
          en: ["It is not spread by casual conversation.", "Mosquito prevention is a community effort."],
          id: ["Tidak menyebar melalui percakapan biasa.", "Pencegahan nyamuk adalah usaha bersama."]
        }
      },
      {
        title: { en: "Symptoms", id: "Gejala" },
        body: {
          en: "Symptoms can include high fever, headache, body aches, joint or muscle pain, rash, and nausea.",
          id: "Gejala dapat berupa demam tinggi, sakit kepala, nyeri badan, nyeri sendi atau otot, ruam, dan mual."
        },
        bullets: {
          en: ["Symptoms can change over days.", "Do not rely on this app to judge severity."],
          id: ["Gejala dapat berubah dari hari ke hari.", "Jangan mengandalkan aplikasi ini untuk menilai tingkat keparahan."]
        }
      },
      {
        title: { en: "Warning signs", id: "Tanda peringatan" },
        body: {
          en: "Severe abdominal pain, persistent vomiting, bleeding, extreme weakness, difficulty breathing, or cold clammy skin require urgent medical care.",
          id: "Nyeri perut berat, muntah terus-menerus, perdarahan, sangat lemah, sulit bernapas, atau kulit dingin lembap memerlukan pertolongan medis segera."
        },
        bullets: {
          en: ["Urgent red flags should not be monitored at home only.", "Medicine guidance should come from a health professional."],
          id: ["Tanda bahaya tidak cukup dipantau di rumah saja.", "Arahan obat perlu berasal dari tenaga kesehatan."]
        }
      },
      {
        title: { en: "Prevention", id: "Pencegahan" },
        body: {
          en: "Avoid mosquito bites, remove standing water, use repellents, and support community prevention.",
          id: "Hindari gigitan nyamuk, hilangkan genangan air, gunakan repelen, dan dukung pencegahan bersama."
        },
        bullets: {
          en: ["Remove places where mosquitoes breed.", "Protective clothing and repellents can reduce bites."],
          id: ["Hilangkan tempat nyamuk berkembang biak.", "Pakaian pelindung dan repelen dapat mengurangi gigitan."]
        }
      }
    ],
    quiz: [
      {
        question: { en: "Dengue is transmitted by Aedes mosquitoes.", id: "Dengue ditularkan oleh nyamuk Aedes." },
        options: [
          { label: { en: "Fact", id: "Fakta" }, isCorrect: true },
          { label: { en: "Myth", id: "Mitos" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: { en: "Aedes mosquitoes transmit dengue virus.", id: "Nyamuk Aedes menularkan virus dengue." }
      },
      {
        question: { en: "Severe abdominal pain and persistent vomiting are warning signs.", id: "Nyeri perut berat dan muntah terus-menerus adalah tanda peringatan." },
        options: [
          { label: { en: "Fact", id: "Fakta" }, isCorrect: true },
          { label: { en: "Myth", id: "Mitos" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: { en: "These warning signs require urgent medical care.", id: "Tanda ini memerlukan pertolongan medis segera." }
      },
      {
        question: { en: "Removing standing water can help prevention.", id: "Menghilangkan genangan air dapat membantu pencegahan." },
        options: [
          { label: { en: "Fact", id: "Fakta" }, isCorrect: true },
          { label: { en: "Myth", id: "Mitos" }, isCorrect: false },
          { label: { en: "Needs Context", id: "Perlu Konteks" }, isCorrect: false }
        ],
        explanation: { en: "Standing water can become mosquito breeding sites.", id: "Genangan air dapat menjadi tempat nyamuk berkembang biak." }
      }
    ]
  }
];

export function getDiseaseBySlug(slug: string) {
  return diseases.find((disease) => disease.slug === slug);
}

export function getDiseaseById(id: number) {
  return diseases.find((disease) => disease.id === id);
}
