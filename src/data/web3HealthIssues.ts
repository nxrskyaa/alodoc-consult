import type { Language } from "@/data/diseases";

export type Web3IssueTone = "lime" | "blue" | "orange" | "purple" | "pink";

export type Web3IssueSection = {
  label: Record<Language, string>;
  title: Record<Language, string>;
  body: Record<Language, string>;
  bullets: Record<Language, string[]>;
};

export type Web3Issue = {
  id: number;
  slug: string;
  tone: Web3IssueTone;
  category: Record<Language, string>;
  title: Record<Language, string>;
  shortDescription: Record<Language, string>;
  intro: Record<Language, string>;
  readingTime: number;
  practicalTag: Record<Language, string>;
  sections: Web3IssueSection[];
  keyMessage: Record<Language, string>;
};

export const web3CategoryLabel: Record<Language, string> = {
  en: "Web3 Health Issues",
  id: "Isu Kesehatan di Web3"
};

export const web3LifestyleBadge: Record<Language, string> = {
  en: "Web3 lifestyle",
  id: "Gaya hidup Web3"
};

export const web3Overview: {
  title: Record<Language, string>;
  intro: Record<Language, string>;
  roots: Record<Language, string[]>;
  closing: Record<Language, string>;
} = {
  title: {
    en: "Four root issues, one connected picture",
    id: "Empat akar masalah, satu gambaran yang saling terhubung"
  },
  intro: {
    en: "The four biggest root health issues in Web3 communities are:",
    id: "Empat akar masalah kesehatan terbesar di komunitas Web3 adalah:"
  },
  roots: {
    en: ["Sleep deprivation", "Physical inactivity", "Chronic stress", "Excessive screen exposure"],
    id: ["Kurang tidur", "Kurang gerak", "Stres kronis", "Paparan layar berlebihan"]
  },
  closing: {
    en: "These factors are connected and may increase the risk of chronic health problems such as hypertension, diabetes, obesity, mental health issues, and reduced quality of life. For Web3 communities, staying healthy does not mean leaving technology. It means building habits that help the body function well in a world that runs 24 hours a day.",
    id: "Empat faktor ini saling berkaitan dan dapat meningkatkan risiko berbagai penyakit kronis seperti hipertensi, diabetes, obesitas, gangguan kesehatan mental, hingga penurunan kualitas hidup. Bagi komunitas Web3, menjaga kesehatan bukan berarti meninggalkan teknologi, tetapi membangun kebiasaan yang memungkinkan tubuh tetap berfungsi optimal di dunia yang berjalan 24 jam sehari."
  }
};

export const web3Issues: Web3Issue[] = [
  {
    id: 1,
    slug: "sleep-deprivation",
    tone: "lime",
    category: { en: "Web3 lifestyle", id: "Gaya hidup Web3" },
    title: { en: "Sleep Deprivation", id: "Kurang Tidur" },
    shortDescription: { en: "Why 24/7 markets quietly erode your sleep, and how to protect it.", id: "Mengapa market 24/7 diam-diam mengikis tidurmu, dan cara melindunginya." },
    intro: { en: "Sleep Deprivation is a common health issue in Web3 communities because work runs long, crosses time zones, and never fully stops. Sleeping only 4 to 5 hours can reduce thinking performance to a level similar to mild intoxication.", id: "Kurang Tidur adalah isu kesehatan yang umum di komunitas Web3 karena ritme kerja panjang, lintas zona waktu, dan nyaris tanpa henti. Tidur hanya 4 sampai 5 jam dapat menurunkan performa berpikir hingga setara dengan kondisi sedikit mabuk." },
    readingTime: 6,
    practicalTag: { en: "Sleep, recovery", id: "Tidur, pemulihan" },
    sections: [
      {
        label: { en: "Why in Web3", id: "Mengapa terjadi di Web3" },
        title: { en: "Web3 does not follow office hours", id: "Web3 tidak mengikuti jam kantor" },
        body: { en: "Markets run 24/7, global communities are active across time zones, and important events often happen late at night for Indonesian users.", id: "Market berjalan 24/7, komunitas global aktif lintas zona waktu, dan momen penting sering terjadi larut malam bagi pengguna di Indonesia." },
        bullets: { en: ["Staying up late to monitor the market.", "Waking up early for token listings.", "Replying to Discord or Telegram at night.", "Sacrificing sleep to chase opportunities."], id: ["Begadang untuk memantau market.", "Bangun pagi demi listing token.", "Membalas Discord atau Telegram tengah malam.", "Mengorbankan tidur demi mengejar peluang."] }
      },
      {
        label: { en: "Short-term effects", id: "Efek jangka pendek" },
        title: { en: "What you feel within a day", id: "Yang terasa dalam sehari" },
        body: { en: "Short sleep quickly affects focus and mood, even if you do not notice it right away.", id: "Tidur singkat cepat memengaruhi fokus dan suasana hati, meski sering tidak langsung terasa." },
        bullets: { en: ["Hard to focus and easily forgetful.", "Slower reaction time.", "More irritable.", "Lower productivity."], id: ["Sulit fokus dan mudah lupa.", "Waktu reaksi melambat.", "Lebih mudah tersinggung.", "Produktivitas menurun."] }
      },
      {
        label: { en: "Long-term effects", id: "Efek jangka panjang" },
        title: { en: "Why chronic short sleep matters", id: "Mengapa kurang tidur menahun berbahaya" },
        body: { en: "When short sleep becomes a habit, the risk shifts from daily discomfort to long-term health problems.", id: "Saat kurang tidur menjadi kebiasaan, risikonya bergeser dari sekadar tidak nyaman menjadi masalah kesehatan jangka panjang." },
        bullets: { en: ["Higher risk of hypertension and type 2 diabetes.", "Easier weight gain.", "Weaker immune system.", "Higher risk of depression and anxiety."], id: ["Risiko hipertensi dan diabetes tipe 2 meningkat.", "Lebih mudah naik berat badan.", "Daya tahan tubuh melemah.", "Risiko depresi dan kecemasan meningkat."] }
      },
      {
        label: { en: "Practical solutions", id: "Solusi praktis" },
        title: { en: "Protect your sleep on purpose", id: "Lindungi tidur secara sadar" },
        body: { en: "Treat sleep as part of performance, not the opposite of it.", id: "Perlakukan tidur sebagai bagian dari performa, bukan lawannya." },
        bullets: { en: ["Prioritize 7 to 9 hours of sleep.", "Keep a consistent schedule.", "Turn off notifications during sleep.", "Do not treat sleep loss as productivity culture."], id: ["Utamakan tidur 7 sampai 9 jam.", "Jaga jadwal tidur yang konsisten.", "Matikan notifikasi saat tidur.", "Jangan jadikan begadang sebagai budaya produktivitas."] }
      }
    ],
    keyMessage: { en: "Staying up all night is not a productivity badge. Your body still needs sleep for the brain, hormones, and immune system to work properly.", id: "Begadang bukan badge produktivitas. Tubuh tetap butuh tidur agar otak, hormon, dan daya tahan tubuh bekerja dengan baik." }
  },
  {
    id: 2,
    slug: "digital-eye-strain",
    tone: "blue",
    category: { en: "Web3 lifestyle", id: "Gaya hidup Web3" },
    title: { en: "Digital Eye Strain", id: "Mata Lelah" },
    shortDescription: { en: "Long screen time without breaks tires the eyes more than the screen itself.", id: "Menatap layar lama tanpa jeda lebih melelahkan mata daripada layarnya sendiri." },
    intro: { en: "Digital Eye Strain is common in Web3 because users spend long hours moving between charts, chats, docs, and dashboards with very little rest for the eyes.", id: "Mata Lelah umum di Web3 karena pengguna menghabiskan banyak jam berpindah antara chart, chat, docs, dan dashboard dengan sangat sedikit jeda untuk mata." },
    readingTime: 6,
    practicalTag: { en: "Screen, eye care", id: "Layar, kesehatan mata" },
    sections: [
      {
        label: { en: "Why it happens", id: "Mengapa terjadi" },
        title: { en: "Long mixed screen sessions", id: "Sesi layar campuran yang panjang" },
        body: { en: "Web3 users spend long hours coding, reading proposals, joining Discord, watching charts, and switching between apps.", id: "Pengguna Web3 menghabiskan banyak jam untuk coding, membaca proposal, ikut Discord, memantau chart, dan berpindah antar aplikasi." },
        bullets: { en: ["Switching between X, docs, and dashboards.", "Reading proposals for hours.", "Watching charts with little rest.", "Constant context switching."], id: ["Berpindah antara X, docs, dan dashboard.", "Membaca proposal berjam-jam.", "Memantau chart nyaris tanpa jeda.", "Terus berganti konteks."] }
      },
      {
        label: { en: "Symptoms", id: "Gejala" },
        title: { en: "Signs your eyes are tired", id: "Tanda mata sudah lelah" },
        body: { en: "Eye strain usually builds slowly through the day rather than appearing suddenly.", id: "Mata lelah biasanya menumpuk perlahan sepanjang hari, bukan muncul tiba-tiba." },
        bullets: { en: ["Dry or sore eyes.", "Temporary blurred vision.", "Headache.", "Heavy, tired eyes."], id: ["Mata kering atau perih.", "Penglihatan buram sementara.", "Sakit kepala.", "Mata terasa berat dan lelah."] }
      },
      {
        label: { en: "Simple explanation", id: "Penjelasan sederhana" },
        title: { en: "Less blinking, drier eyes", id: "Lebih jarang berkedip, mata makin kering" },
        body: { en: "When people stare at screens, they blink less often. This makes the tear film evaporate faster and the eyes feel dry or irritated.", id: "Saat menatap layar, orang lebih jarang berkedip. Lapisan air mata menguap lebih cepat sehingga mata terasa kering atau perih." },
        bullets: { en: ["Blinking spreads moisture across the eye.", "Focus and brightness add to fatigue.", "Rest lets the eyes recover."], id: ["Berkedip menyebarkan kelembapan ke seluruh mata.", "Fokus dan kecerahan menambah kelelahan.", "Istirahat membantu mata pulih."] }
      },
      {
        label: { en: "Practical solutions", id: "Solusi praktis" },
        title: { en: "Give your eyes regular breaks", id: "Beri mata jeda secara rutin" },
        body: { en: "The main problem is usually not screen radiation, but long screen exposure without rest.", id: "Masalah utamanya biasanya bukan radiasi layar, tetapi durasi menatap layar tanpa jeda." },
        bullets: { en: ["Follow the 20-20-20 rule.", "Blink more often on purpose.", "Improve room lighting.", "Avoid long uninterrupted sessions."], id: ["Terapkan aturan 20-20-20.", "Sengaja lebih sering berkedip.", "Perbaiki pencahayaan ruangan.", "Hindari sesi panjang tanpa jeda."] }
      }
    ],
    keyMessage: { en: "The issue is not only the screen itself, but long exposure without breaks.", id: "Masalah utamanya bukan sekadar layar, tapi durasi menatap layar tanpa jeda." }
  },
  {
    id: 3,
    slug: "neck-back-pain",
    tone: "orange",
    category: { en: "Web3 lifestyle", id: "Gaya hidup Web3" },
    title: { en: "Neck and Back Pain", id: "Nyeri Leher dan Punggung" },
    shortDescription: { en: "Hours of looking down at a laptop add up in your neck and back.", id: "Berjam-jam menunduk ke laptop menumpuk beban di leher dan punggung." },
    intro: { en: "Neck and Back Pain is common in Web3 because many people work from a sofa, bed, or laptop-only setup. Looking down for hours increases load on the neck and back. The human body evolved to move, not to sit all day.", id: "Nyeri Leher dan Punggung umum di Web3 karena banyak orang bekerja dari sofa, kasur, atau hanya dengan laptop. Menunduk berjam-jam menambah beban pada leher dan punggung. Tubuh manusia dirancang untuk bergerak, bukan duduk seharian." },
    readingTime: 6,
    practicalTag: { en: "Posture, movement", id: "Postur, gerak" },
    sections: [
      {
        label: { en: "Why it happens", id: "Mengapa terjadi" },
        title: { en: "Working from anywhere, but not ergonomically", id: "Bekerja dari mana saja, tapi tidak ergonomis" },
        body: { en: "Many people work from a sofa, bed, small desk, or laptop-only setup, so the head tilts down for hours.", id: "Banyak orang bekerja dari sofa, kasur, meja kecil, atau hanya laptop, sehingga kepala menunduk berjam-jam." },
        bullets: { en: ["Laptop screens sit below eye level.", "Soft surfaces give no back support.", "Long sessions without standing up."], id: ["Layar laptop berada di bawah garis mata.", "Permukaan empuk tidak menopang punggung.", "Sesi panjang tanpa berdiri."] }
      },
      {
        label: { en: "Symptoms", id: "Gejala" },
        title: { en: "What you may notice", id: "Yang mungkin terasa" },
        body: { en: "Tension tends to collect in the neck, shoulders, and lower back.", id: "Ketegangan cenderung menumpuk di leher, bahu, dan punggung bawah." },
        bullets: { en: ["Stiff neck.", "Tense shoulders.", "Lower back pain.", "Tension headache."], id: ["Leher kaku.", "Bahu tegang.", "Nyeri punggung bawah.", "Sakit kepala karena tegang."] }
      },
      {
        label: { en: "Long-term impact", id: "Dampak jangka panjang" },
        title: { en: "Why posture habits matter", id: "Mengapa kebiasaan postur penting" },
        body: { en: "Repeated strain can turn occasional aches into lasting discomfort.", id: "Tekanan yang berulang dapat mengubah pegal sesekali menjadi keluhan menetap." },
        bullets: { en: ["Posture problems.", "Chronic pain.", "Lower productivity."], id: ["Masalah postur.", "Nyeri kronis.", "Produktivitas menurun."] }
      },
      {
        label: { en: "Practical solutions", id: "Solusi praktis" },
        title: { en: "Move and support your spine", id: "Bergerak dan topang tulang belakang" },
        body: { en: "Small adjustments to your setup and routine reduce most of the daily load.", id: "Penyesuaian kecil pada setup dan rutinitas mengurangi sebagian besar beban harian." },
        bullets: { en: ["Stand up every 30 to 60 minutes.", "Use a chair with back support.", "Keep the monitor at eye level.", "Stretch regularly and avoid working from bed for long sessions."], id: ["Berdiri setiap 30 sampai 60 menit.", "Gunakan kursi dengan sandaran.", "Letakkan monitor sejajar mata.", "Lakukan peregangan rutin dan hindari kerja lama dari kasur."] }
      }
    ],
    keyMessage: { en: "The human body is built to move, not to sit in front of a laptop all day.", id: "Tubuh manusia dirancang untuk bergerak, bukan duduk menatap laptop sepanjang hari." }
  },
  {
    id: 4,
    slug: "stress-anxiety",
    tone: "purple",
    category: { en: "Web3 lifestyle", id: "Gaya hidup Web3" },
    title: { en: "Stress and Anxiety", id: "Stres dan Kecemasan" },
    shortDescription: { en: "Volatile markets and constant news keep the body in alert mode.", id: "Market yang bergejolak dan arus berita membuat tubuh terus waspada." },
    intro: { en: "Stress and Anxiety are common in Web3 because of constant uncertainty: volatile prices, high competition, fear of missing out, and a nonstop flow of news. Not every red candle needs an emotional response.", id: "Stres dan Kecemasan umum di Web3 karena ketidakpastian yang terus-menerus: harga bergejolak, persaingan tinggi, takut ketinggalan, dan arus berita tanpa henti. Tidak semua candle merah membutuhkan respons emosional." },
    readingTime: 6,
    practicalTag: { en: "Mind, calm", id: "Pikiran, ketenangan" },
    sections: [
      {
        label: { en: "Why it happens", id: "Mengapa terjadi" },
        title: { en: "Uncertainty all around", id: "Ketidakpastian di mana-mana" },
        body: { en: "Web3 is full of uncertainty: volatile prices, competition, project pressure, community pressure, and constant news flow.", id: "Web3 penuh ketidakpastian: harga bergejolak, persaingan, tekanan proyek, tekanan komunitas, dan arus berita yang tak berhenti." },
        bullets: { en: ["Fear of missing opportunities.", "Pressure from communities and projects.", "News that never stops."], id: ["Takut melewatkan peluang.", "Tekanan dari komunitas dan proyek.", "Berita yang tidak pernah berhenti."] }
      },
      {
        label: { en: "Symptoms", id: "Gejala" },
        title: { en: "Signs of ongoing stress", id: "Tanda stres berkelanjutan" },
        body: { en: "Stress shows up in both body and mind.", id: "Stres muncul pada tubuh maupun pikiran." },
        bullets: { en: ["Trouble sleeping.", "Palpitations.", "Hard to focus.", "Easily panicked or irritable."], id: ["Sulit tidur.", "Jantung berdebar.", "Sulit fokus.", "Mudah panik atau tersinggung."] }
      },
      {
        label: { en: "Simple explanation", id: "Penjelasan sederhana" },
        title: { en: "What stress does inside", id: "Apa yang terjadi di dalam tubuh" },
        body: { en: "The body releases stress hormones such as cortisol and adrenaline. If stress continues for a long time, it can affect both physical and mental health.", id: "Tubuh melepaskan hormon stres seperti kortisol dan adrenalin. Jika stres berlangsung lama, kondisi fisik dan mental dapat terpengaruh." },
        bullets: { en: ["Short bursts of stress are normal.", "Long-term stress wears the body down.", "Recovery time matters."], id: ["Stres sesaat itu normal.", "Stres jangka panjang menguras tubuh.", "Waktu pemulihan itu penting."] }
      },
      {
        label: { en: "Practical solutions", id: "Solusi praktis" },
        title: { en: "Lower the daily pressure", id: "Turunkan tekanan harian" },
        body: { en: "You do not have to react to every market movement.", id: "Kamu tidak harus bereaksi pada setiap pergerakan market." },
        bullets: { en: ["Limit market-watching time.", "Exercise regularly and practice relaxation.", "Keep activities outside Web3.", "Avoid reacting emotionally to every move."], id: ["Batasi waktu memantau market.", "Olahraga teratur dan latihan relaksasi.", "Pertahankan aktivitas di luar Web3.", "Hindari reaksi emosional pada tiap pergerakan."] }
      }
    ],
    keyMessage: { en: "Not every red candle deserves an emotional reaction.", id: "Tidak semua candle merah membutuhkan respons emosional." }
  },
  {
    id: 5,
    slug: "burnout",
    tone: "pink",
    category: { en: "Web3 lifestyle", id: "Gaya hidup Web3" },
    title: { en: "Burnout", id: "Burnout" },
    shortDescription: { en: "When work and life blur 24/7, energy and motivation quietly drain.", id: "Saat kerja dan hidup berbaur 24/7, energi dan motivasi diam-diam terkuras." },
    intro: { en: "Burnout in Web3 grows when the boundary between work and personal life becomes blurry. Discord, Telegram, global communities, and market updates can stay active 24/7, so the body and mind never fully rest.", id: "Burnout di Web3 tumbuh saat batas antara kerja dan hidup pribadi menjadi kabur. Discord, Telegram, komunitas global, dan update market bisa aktif 24/7, sehingga tubuh dan pikiran tidak pernah benar-benar istirahat." },
    readingTime: 6,
    practicalTag: { en: "Recovery, boundaries", id: "Pemulihan, batasan" },
    sections: [
      {
        label: { en: "Stress vs burnout", id: "Stres vs burnout" },
        title: { en: "Knowing the difference", id: "Mengenali perbedaannya" },
        body: { en: "Stress says: I can still work, but I feel pressured. Burnout says: I no longer have the energy to care.", id: "Stres berkata: aku masih bisa bekerja, tapi merasa tertekan. Burnout berkata: aku sudah tidak punya energi untuk peduli." },
        bullets: { en: ["Stress is pressure with energy left.", "Burnout is exhaustion plus emotional numbness.", "Burnout builds up slowly over time."], id: ["Stres adalah tekanan dengan sisa energi.", "Burnout adalah kelelahan plus mati rasa emosional.", "Burnout menumpuk perlahan seiring waktu."] }
      },
      {
        label: { en: "Signs", id: "Tanda" },
        title: { en: "What burnout looks like", id: "Seperti apa burnout terlihat" },
        body: { en: "Burnout affects motivation, mood, and output at the same time.", id: "Burnout memengaruhi motivasi, suasana hati, dan hasil kerja sekaligus." },
        bullets: { en: ["Exhausted and unmotivated.", "Cynical toward work.", "Lower productivity.", "Emotional numbness."], id: ["Lelah dan tidak termotivasi.", "Sinis terhadap pekerjaan.", "Produktivitas menurun.", "Mati rasa emosional."] }
      },
      {
        label: { en: "Why in Web3", id: "Mengapa di Web3" },
        title: { en: "No clear off switch", id: "Tidak ada tombol mati yang jelas" },
        body: { en: "The boundary between work and personal life often disappears when communities and markets never close.", id: "Batas antara kerja dan hidup pribadi sering hilang saat komunitas dan market tidak pernah tutup." },
        bullets: { en: ["Always-on chats and updates.", "Global time zones blur rest.", "Recovery time gets skipped."], id: ["Chat dan update yang selalu menyala.", "Zona waktu global mengaburkan istirahat.", "Waktu pemulihan sering terlewat."] }
      },
      {
        label: { en: "Practical solutions", id: "Solusi praktis" },
        title: { en: "Protect recovery on purpose", id: "Lindungi pemulihan secara sengaja" },
        body: { en: "Burnout is not weakness. It is a signal that the body and mind need recovery.", id: "Burnout bukan tanda lemah. Itu sinyal bahwa tubuh dan pikiran butuh pemulihan." },
        bullets: { en: ["Set working hours and take time off.", "Delegate tasks and schedule days off.", "Create notification boundaries.", "Protect recovery time."], id: ["Tetapkan jam kerja dan ambil jeda.", "Delegasikan tugas dan jadwalkan hari libur.", "Buat batasan notifikasi.", "Lindungi waktu pemulihan."] }
      }
    ],
    keyMessage: { en: "Burnout is not weakness. It is a signal that your body and mind need recovery.", id: "Burnout bukan tanda lemah. Itu sinyal bahwa tubuh dan pikiran butuh pemulihan." }
  },
  {
    id: 6,
    slug: "physical-inactivity",
    tone: "lime",
    category: { en: "Web3 lifestyle", id: "Gaya hidup Web3" },
    title: { en: "Physical Inactivity", id: "Kurang Aktivitas Fisik" },
    shortDescription: { en: "Sitting too long affects health even if you exercise sometimes.", id: "Duduk terlalu lama memengaruhi kesehatan meski kadang berolahraga." },
    intro: { en: "Physical Inactivity matters in Web3 because work is mostly seated. Sitting too long is linked to heart disease, diabetes, obesity, and early death, even in people who exercise regularly. Your body does not know whether you are trading, coding, or scrolling. It only knows that you have been sitting too long.", id: "Kurang Aktivitas Fisik penting di Web3 karena pekerjaan sebagian besar dilakukan sambil duduk. Duduk terlalu lama berkaitan dengan penyakit jantung, diabetes, obesitas, dan kematian dini, bahkan pada orang yang rutin berolahraga. Tubuh tidak tahu kamu sedang trading, coding, atau scrolling. Tubuh hanya tahu kamu duduk terlalu lama." },
    readingTime: 6,
    practicalTag: { en: "Movement, energy", id: "Gerak, energi" },
    sections: [
      {
        label: { en: "Why it matters", id: "Mengapa penting" },
        title: { en: "Sitting is its own risk", id: "Duduk adalah risiko tersendiri" },
        body: { en: "Long sitting is linked to heart disease, diabetes, obesity, and early death, even in people who exercise regularly.", id: "Duduk lama berkaitan dengan penyakit jantung, diabetes, obesitas, dan kematian dini, bahkan pada orang yang rutin berolahraga." },
        bullets: { en: ["Exercise alone may not undo long sitting.", "Frequent movement breaks help.", "Daily activity adds up."], id: ["Olahraga saja mungkin belum cukup menebus duduk lama.", "Jeda gerak yang sering membantu.", "Aktivitas harian saling menumpuk."] }
      },
      {
        label: { en: "Early effects", id: "Efek awal" },
        title: { en: "What the body feels first", id: "Yang pertama dirasakan tubuh" },
        body: { en: "The earliest signs are usually low energy and a stiff body.", id: "Tanda paling awal biasanya energi rendah dan tubuh kaku." },
        bullets: { en: ["Easy fatigue.", "Weight gain.", "Lower fitness.", "Stiff body."], id: ["Mudah lelah.", "Berat badan naik.", "Kebugaran menurun.", "Tubuh kaku."] }
      },
      {
        label: { en: "Practical solutions", id: "Solusi praktis" },
        title: { en: "Add movement to your day", id: "Tambahkan gerak ke harimu" },
        body: { en: "You do not need a gym to break up long sitting.", id: "Kamu tidak butuh gym untuk memecah duduk yang lama." },
        bullets: { en: ["Aim for at least 150 minutes of activity per week.", "Walk during online meetings and take the stairs.", "Use a standing desk if possible.", "Stretch between work blocks and add light strength work when appropriate."], id: ["Targetkan minimal 150 menit aktivitas per minggu.", "Berjalan saat meeting online dan gunakan tangga.", "Pakai standing desk jika memungkinkan.", "Lakukan peregangan antar sesi dan tambahkan latihan kekuatan ringan bila sesuai."] }
      }
    ],
    keyMessage: { en: "Your body does not know whether you are trading, coding, or scrolling. It only knows you have been sitting too long.", id: "Tubuh tidak tahu kamu sedang trading, coding, atau scrolling. Tubuh hanya tahu kamu duduk terlalu lama." }
  },
  {
    id: 7,
    slug: "excessive-caffeine",
    tone: "orange",
    category: { en: "Web3 lifestyle", id: "Gaya hidup Web3" },
    title: { en: "Excessive Caffeine Intake", id: "Konsumsi Kafein Berlebihan" },
    shortDescription: { en: "Coffee can delay sleepiness, but it cannot replace real sleep.", id: "Kopi bisa menunda kantuk, tapi tidak menggantikan tidur sungguhan." },
    intro: { en: "Excessive Caffeine Intake is common in Web3 because tech culture often normalizes one more coffee and grinding all night. Caffeine can delay sleepiness, but it does not remove the body's need for sleep.", id: "Konsumsi Kafein Berlebihan umum di Web3 karena budaya teknologi sering menormalkan satu kopi lagi dan begadang demi kerja. Kafein bisa menunda rasa kantuk, tapi tidak menghapus kebutuhan tubuh untuk tidur." },
    readingTime: 6,
    practicalTag: { en: "Caffeine, balance", id: "Kafein, keseimbangan" },
    sections: [
      {
        label: { en: "Why it happens", id: "Mengapa terjadi" },
        title: { en: "Hustle culture and coffee", id: "Budaya kerja keras dan kopi" },
        body: { en: "Tech and Web3 culture often normalizes one more coffee, grinding all night, and treating sleep as optional.", id: "Budaya teknologi dan Web3 sering menormalkan satu kopi lagi, begadang semalaman, dan menganggap tidur sebagai pilihan." },
        bullets: { en: ["One more coffee to push through.", "All-night grinding sessions.", "Sleep treated as a weakness."], id: ["Satu kopi lagi untuk bertahan.", "Sesi begadang semalaman.", "Tidur dianggap kelemahan."] }
      },
      {
        label: { en: "Possible effects", id: "Kemungkinan efek" },
        title: { en: "When caffeine adds up", id: "Saat kafein menumpuk" },
        body: { en: "Too much caffeine can affect the heart, mood, sleep, and stomach.", id: "Kafein berlebihan dapat memengaruhi jantung, suasana hati, tidur, dan lambung." },
        bullets: { en: ["Palpitations and tremor.", "Trouble sleeping.", "Increased anxiety.", "Reflux or stomach acid symptoms."], id: ["Jantung berdebar dan gemetar.", "Sulit tidur.", "Kecemasan meningkat.", "Gejala refluks atau asam lambung."] }
      },
      {
        label: { en: "Practical solutions", id: "Solusi praktis" },
        title: { en: "Keep caffeine in check", id: "Jaga kafein tetap terkendali" },
        body: { en: "Do not use coffee as a replacement for sleep.", id: "Jangan gunakan kopi sebagai pengganti tidur." },
        bullets: { en: ["Limit caffeine intake and drink enough water.", "Avoid caffeine late in the day.", "Do not replace sleep with coffee.", "Observe how your body responds."], id: ["Batasi asupan kafein dan cukupi air putih.", "Hindari kafein di sore atau malam hari.", "Jangan ganti tidur dengan kopi.", "Amati bagaimana tubuhmu merespons."] }
      }
    ],
    keyMessage: { en: "Caffeine can delay sleepiness, but it does not replace your body's need for sleep.", id: "Kafein bisa menunda rasa kantuk, tapi tidak menggantikan kebutuhan tubuh untuk tidur." }
  },
  {
    id: 8,
    slug: "irregular-eating",
    tone: "pink",
    category: { en: "Web3 lifestyle", id: "Gaya hidup Web3" },
    title: { en: "Irregular Eating Pattern", id: "Pola Makan Tidak Teratur" },
    shortDescription: { en: "Skipping meals for deadlines leaves the brain on unstable energy.", id: "Melewatkan makan demi deadline membuat otak bekerja dengan energi tak stabil." },
    intro: { en: "Irregular Eating Pattern happens in Web3 because deadlines, launches, market crashes, and late-night work can make eating feel like the lowest priority. Your brain needs stable energy to keep performing well.", id: "Pola Makan Tidak Teratur terjadi di Web3 karena deadline, peluncuran, market jatuh, dan kerja larut malam membuat makan terasa seperti prioritas paling rendah. Otak butuh energi yang stabil agar tetap berperforma baik." },
    readingTime: 6,
    practicalTag: { en: "Nutrition, rhythm", id: "Nutrisi, ritme" },
    sections: [
      {
        label: { en: "Why it happens", id: "Mengapa terjadi" },
        title: { en: "Work first, food later", id: "Kerja dulu, makan belakangan" },
        body: { en: "Deadlines, launches, market crashes, meetings, and late-night work can push eating to the bottom of the list.", id: "Deadline, peluncuran, market jatuh, meeting, dan kerja larut malam dapat menggeser makan ke urutan paling bawah." },
        bullets: { en: ["Meals skipped during busy launches.", "Coffee instead of real food.", "Eating at random hours."], id: ["Makan terlewat saat peluncuran sibuk.", "Kopi menggantikan makanan asli.", "Makan di jam yang tidak menentu."] }
      },
      {
        label: { en: "Possible effects", id: "Kemungkinan efek" },
        title: { en: "What irregular eating does", id: "Dampak makan tidak teratur" },
        body: { en: "Unstable eating can affect weight, digestion, focus, and long-term health.", id: "Pola makan tidak stabil dapat memengaruhi berat badan, pencernaan, fokus, dan kesehatan jangka panjang." },
        bullets: { en: ["Weight gain and digestive issues.", "Lower concentration.", "Increased metabolic disease risk.", "Unstable energy levels."], id: ["Berat badan naik dan gangguan pencernaan.", "Konsentrasi menurun.", "Risiko penyakit metabolik meningkat.", "Energi naik turun tidak stabil."] }
      },
      {
        label: { en: "Practical solutions", id: "Solusi praktis" },
        title: { en: "Build a simple food rhythm", id: "Bangun ritme makan sederhana" },
        body: { en: "Consistent nutrition keeps the brain performing well.", id: "Nutrisi yang konsisten menjaga otak tetap berperforma baik." },
        bullets: { en: ["Schedule meal times.", "Increase protein and fiber.", "Reduce ultra-processed foods and prepare healthy snacks.", "Keep water nearby and avoid replacing meals with coffee only."], id: ["Jadwalkan waktu makan.", "Tambah protein dan serat.", "Kurangi makanan ultra-olahan dan siapkan camilan sehat.", "Sediakan air minum dan jangan ganti makan hanya dengan kopi."] }
      }
    ],
    keyMessage: { en: "Your brain needs stable energy. Irregular eating can reduce focus and performance.", id: "Otak butuh energi yang stabil. Pola makan yang terlalu berantakan bisa membuat fokus dan performa ikut turun." }
  },
  {
    id: 9,
    slug: "social-isolation",
    tone: "blue",
    category: { en: "Web3 lifestyle", id: "Gaya hidup Web3" },
    title: { en: "Social Isolation", id: "Isolasi Sosial" },
    shortDescription: { en: "Thousands of online connections can still feel lonely offline.", id: "Ribuan koneksi online tetap bisa terasa sepi di dunia nyata." },
    intro: { en: "Social Isolation can happen in Web3 even when a person interacts with thousands of accounts and joins many online spaces. A strong internet connection does not always mean a strong social connection.", id: "Isolasi Sosial bisa terjadi di Web3 meski seseorang berinteraksi dengan ribuan akun dan ikut banyak ruang online. Koneksi internet yang kuat tidak selalu berarti koneksi sosial yang kuat." },
    readingTime: 6,
    practicalTag: { en: "Connection, support", id: "Koneksi, dukungan" },
    sections: [
      {
        label: { en: "Why it happens", id: "Mengapa terjadi" },
        title: { en: "Online presence, offline distance", id: "Hadir online, jauh secara nyata" },
        body: { en: "A person can be active in many servers and online spaces yet still feel lonely.", id: "Seseorang bisa aktif di banyak server dan ruang online namun tetap merasa kesepian." },
        bullets: { en: ["Many online contacts, few offline ones.", "Most talk is transactional.", "Less face-to-face time."], id: ["Banyak kontak online, sedikit yang offline.", "Sebagian besar obrolan bersifat transaksional.", "Waktu tatap muka berkurang."] }
      },
      {
        label: { en: "Health impact", id: "Dampak kesehatan" },
        title: { en: "Why connection matters", id: "Mengapa koneksi penting" },
        body: { en: "Weak social support can affect mental health and quality of life over time.", id: "Dukungan sosial yang lemah dapat memengaruhi kesehatan mental dan kualitas hidup seiring waktu." },
        bullets: { en: ["Increased risk of depression.", "Increased anxiety.", "Lower quality of life.", "Weaker emotional support."], id: ["Risiko depresi meningkat.", "Kecemasan meningkat.", "Kualitas hidup menurun.", "Dukungan emosional melemah."] }
      },
      {
        label: { en: "Practical solutions", id: "Solusi praktis" },
        title: { en: "Invest in real connection", id: "Investasikan koneksi nyata" },
        body: { en: "Do not rely only on online interaction for connection.", id: "Jangan hanya mengandalkan interaksi online untuk koneksi." },
        bullets: { en: ["Maintain family relationships.", "Meet friends in person.", "Join offline activities.", "Schedule non-screen social time."], id: ["Jaga hubungan keluarga.", "Temui teman secara langsung.", "Ikut aktivitas offline.", "Jadwalkan waktu sosial tanpa layar."] }
      }
    ],
    keyMessage: { en: "A strong internet connection does not always mean a strong social connection.", id: "Koneksi internet yang kuat tidak selalu berarti koneksi sosial yang kuat." }
  },
  {
    id: 10,
    slug: "doomscrolling",
    tone: "purple",
    category: { en: "Web3 lifestyle", id: "Gaya hidup Web3" },
    title: { en: "Doomscrolling and Information Overload", id: "Doomscrolling dan Information Overload" },
    shortDescription: { en: "Endless feeds flood the brain with input but no time to process.", id: "Feed tanpa henti membanjiri otak dengan input tanpa waktu memproses." },
    intro: { en: "Doomscrolling and Information Overload happen in Web3 because a single hour can mean jumping between X, Discord, Telegram, news, forums, docs, and dashboards. The brain needs time to process information, not only receive it.", id: "Doomscrolling dan Information Overload terjadi di Web3 karena dalam satu jam saja seseorang bisa melompat antara X, Discord, Telegram, berita, forum, docs, dan dashboard. Otak butuh waktu untuk memproses informasi, bukan hanya menerimanya." },
    readingTime: 6,
    practicalTag: { en: "Focus, attention", id: "Fokus, perhatian" },
    sections: [
      {
        label: { en: "Why it happens", id: "Mengapa terjadi" },
        title: { en: "Too many open tabs", id: "Terlalu banyak tab terbuka" },
        body: { en: "In one hour a Web3 user may open X, Discord, Telegram, market trackers, crypto news, forums, project docs, and dashboards.", id: "Dalam satu jam pengguna Web3 bisa membuka X, Discord, Telegram, pelacak market, berita kripto, forum, docs proyek, dan dashboard." },
        bullets: { en: ["Constant app switching.", "Endless feeds with no clear stop.", "A feeling of always being behind."], id: ["Berpindah aplikasi terus-menerus.", "Feed tanpa henti tanpa titik berhenti.", "Perasaan selalu tertinggal."] }
      },
      {
        label: { en: "Effects", id: "Efek" },
        title: { en: "What overload does", id: "Dampak kelebihan informasi" },
        body: { en: "Too much input without rest can tire the mind and disturb sleep.", id: "Terlalu banyak input tanpa jeda dapat melelahkan pikiran dan mengganggu tidur." },
        bullets: { en: ["Hard to focus and mental fatigue.", "Increased anxiety.", "Sleep problems.", "A constant sense of urgency."], id: ["Sulit fokus dan lelah mental.", "Kecemasan meningkat.", "Masalah tidur.", "Rasa terburu-buru yang terus-menerus."] }
      },
      {
        label: { en: "Practical solutions", id: "Solusi praktis" },
        title: { en: "Give the brain room to process", id: "Beri otak ruang untuk memproses" },
        body: { en: "The brain needs time to process information, not only receive it.", id: "Otak butuh waktu untuk memproses informasi, bukan hanya menerimanya." },
        bullets: { en: ["Schedule specific news-reading time.", "Turn off unnecessary notifications.", "Use screen-free time.", "Choose a few reliable information sources."], id: ["Jadwalkan waktu khusus membaca berita.", "Matikan notifikasi yang tidak perlu.", "Gunakan waktu tanpa layar.", "Pilih beberapa sumber informasi yang tepercaya."] }
      }
    ],
    keyMessage: { en: "The brain needs time to process information, not only receive it nonstop.", id: "Otak butuh waktu untuk memproses informasi, bukan hanya menerima informasi tanpa henti." }
  }
];

export function getWeb3IssueBySlug(slug: string) {
  return web3Issues.find((issue) => issue.slug === slug);
}

export function getWeb3IssueIndex(slug: string) {
  return web3Issues.findIndex((issue) => issue.slug === slug);
}
