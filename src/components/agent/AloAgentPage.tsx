"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, MessageCircle, Play, ShieldCheck } from "lucide-react";
import {
  agentScenarioCategories,
  agentScenarios,
  type AgentLanguage,
  type AgentScenario,
  type AgentScenarioCategory,
  type AgentVisualType
} from "@/data/agentScenarios";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | AgentScenarioCategory;
type ReportVisualKind = "tutor" | "meaning" | "food" | "lifestyle" | "safety" | "path";

const reportSections = [
  { key: "simpleExplanation", label: { id: "Penjelasan sederhana", en: "Simple explanation" }, visual: "tutor" },
  { key: "learningMeaning", label: { id: "Apa artinya untuk pembelajaran", en: "What this means for learning" }, visual: "meaning" },
  { key: "foodGuidance", label: { id: "Edukasi makanan sehat", en: "Healthy food guidance" }, visual: "food" },
  { key: "lifestyleGuidance", label: { id: "Edukasi lifestyle sehat", en: "Healthy lifestyle guidance" }, visual: "lifestyle" },
  { key: "safetyReminder", label: { id: "Pengingat keamanan", en: "Safety reminder" }, visual: "safety" },
  { key: "recommendedPath", label: { id: "Rekomendasi modul belajar", en: "Recommended learning path" }, visual: "path" }
] as const;

const guidanceCards = [
  {
    title: "Food guidance",
    idTitle: "Panduan makanan",
    body: "Balanced meals, sugar awareness, salt awareness, hydration, portions, label reading, and sustainable food habits.",
    idBody: "Makanan seimbang, kesadaran gula, kesadaran garam, hidrasi, porsi, membaca label, dan kebiasaan makan berkelanjutan.",
    visual: "food" as AgentVisualType
  },
  {
    title: "Lifestyle guidance",
    idTitle: "Panduan lifestyle",
    body: "Walking, sleep, hydration, stress awareness, hygiene, mosquito prevention, smoking awareness, and routine check-ups.",
    idBody: "Jalan kaki, tidur, hidrasi, kesadaran stres, kebersihan, pencegahan nyamuk, kesadaran rokok, dan check-up berkala.",
    visual: "lifestyle" as AgentVisualType
  }
];

const revealContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const revealItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.36, ease: "easeOut" } }
};

export function AloAgentPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedScenarioId, setSelectedScenarioId] = useState(agentScenarios[0].id);
  const [askedScenario, setAskedScenario] = useState<AgentScenario | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const [selectedOutputLanguage, setSelectedOutputLanguage] = useState<AgentLanguage>("id");
  const timerRef = useRef<number | null>(null);

  const selectedScenario = useMemo(
    () => agentScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? agentScenarios[0],
    [selectedScenarioId]
  );

  const filteredScenarios = useMemo(
    () => (activeCategory === "all" ? agentScenarios : agentScenarios.filter((scenario) => scenario.category === activeCategory)),
    [activeCategory]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  function askAloAgent(scenario = selectedScenario) {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    setSelectedScenarioId(scenario.id);
    setAskedScenario(scenario);
    setIsAsking(true);
    timerRef.current = window.setTimeout(() => {
      setIsAsking(false);
    }, 950);
  }

  function chooseCategory(category: CategoryFilter) {
    setActiveCategory(category);
    const next = category === "all" ? agentScenarios[0] : agentScenarios.find((scenario) => scenario.category === category) ?? agentScenarios[0];
    setSelectedScenarioId(next.id);
  }

  return (
    <div className="mx-auto w-full max-w-7xl overflow-x-hidden px-4 pb-28 [overflow-wrap:anywhere] sm:px-6 lg:px-8 [&_*]:max-w-full">
      <div className="grid min-w-0 gap-14 sm:gap-16 lg:gap-20">
        <AgentHero />
        <AskAloAgentSection
          activeCategory={activeCategory}
          filteredScenarios={filteredScenarios}
          selectedScenario={selectedScenario}
          askedScenario={askedScenario}
          isAsking={isAsking}
          selectedOutputLanguage={selectedOutputLanguage}
          onCategoryChange={chooseCategory}
          onSelectScenario={setSelectedScenarioId}
          onAsk={askAloAgent}
          onLanguageChange={setSelectedOutputLanguage}
        />
        <FoodLifestyleSection />
        <SafetySection />
      </div>
    </div>
  );
}

function AgentHero() {
  return (
    <section className="grid min-w-0 grid-cols-1 items-center gap-8 rounded-[2.5rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12 lg:p-10">
      <motion.div variants={revealContainer} initial="hidden" animate="show" className="min-w-0">
        <motion.p variants={revealItem} className="text-sm font-black uppercase tracking-[0.18em] text-oliveDeep">
          Alo Agent
        </motion.p>
        <motion.h1 variants={revealItem} className="mt-4 max-w-3xl text-4xl font-black leading-[1.04] text-cocoa sm:text-5xl lg:text-6xl">
          Ask a bilingual health education assistant.
        </motion.h1>
        <motion.p variants={revealItem} className="mt-5 max-w-2xl text-lg font-extrabold leading-8 text-cocoa sm:text-xl">
          Choose from many preset health learning requests and generate a safe report in Indonesia or English.
        </motion.p>
        <motion.p variants={revealItem} className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-cocoaSoft sm:text-base">
          Alo Agent is simulated and frontend-only. It helps explain blood pressure, blood sugar, BMI, food habits, lifestyle habits, common cold, and dengue awareness without diagnosis or data storage.
        </motion.p>
        <motion.div variants={revealItem} className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#ask-agent" className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-alertClay/90 active:scale-[0.98]">
            Start Asking Alo <ArrowRight className="h-4 w-4" />
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
      <div className="relative z-10 mx-auto grid h-full min-h-[398px] max-w-[520px] place-items-center sm:min-h-[456px]">
        <motion.div animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }} className="w-full rounded-[2rem] border border-cocoa/10 bg-white p-4 shadow-soft sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase text-oliveDeep">Simulated chat</p>
              <h2 className="mt-1 text-2xl font-black text-cocoa">Alo Agent answer</h2>
            </div>
            <span className="rounded-full bg-orange/15 px-3 py-2 text-xs font-black text-alertClay">Education only</span>
          </div>
          <div className="mt-4 rounded-[1.5rem] bg-cream p-4">
            <p className="max-w-[82%] rounded-[1.2rem] bg-white px-4 py-3 text-sm font-bold leading-6 text-cocoa shadow-lift">
              My fasting blood sugar example is 132 mg/dL. What should I learn?
            </p>
            <div className="mt-4 ml-auto max-w-[88%] rounded-[1.2rem] bg-mint px-4 py-3 shadow-lift">
              <div className="flex items-center gap-3">
                <MiniAssistantFace />
                <div className="min-w-0">
                  <p className="text-sm font-black text-cocoa">Alo is preparing your bilingual answer</p>
                  <div className="mt-2 flex gap-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.span key={dot} className="h-2 w-2 rounded-full bg-orange" animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: dot * 0.15 }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 rounded-full bg-cream p-1 text-xs font-black text-cocoaSoft">
            <span className="rounded-full bg-orange px-3 py-2 text-center text-white shadow-lift">Indonesia</span>
            <span className="px-3 py-2 text-center">English</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <HeroMiniCard title="25 preset questions" visual="tutor" />
            <HeroMiniCard title="Food guidance" visual="food" />
            <HeroMiniCard title="Lifestyle tips" visual="lifestyle" />
            <HeroMiniCard title="Safety reminder" visual="safety" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AskAloAgentSection({
  activeCategory,
  filteredScenarios,
  selectedScenario,
  askedScenario,
  isAsking,
  selectedOutputLanguage,
  onCategoryChange,
  onSelectScenario,
  onAsk,
  onLanguageChange
}: {
  activeCategory: CategoryFilter;
  filteredScenarios: AgentScenario[];
  selectedScenario: AgentScenario;
  askedScenario: AgentScenario | null;
  isAsking: boolean;
  selectedOutputLanguage: AgentLanguage;
  onCategoryChange: (category: CategoryFilter) => void;
  onSelectScenario: (id: string) => void;
  onAsk: (scenario?: AgentScenario) => void;
  onLanguageChange: (language: AgentLanguage) => void;
}) {
  return (
    <section id="ask-agent" className="scroll-mt-28">
      <SectionHeader
        eyebrow="Ask Alo Agent"
        title="Pick a preset health question and generate a bilingual answer."
        body="Alo Agent uses local templates only. It feels like a chat assistant, but it does not call an API, store medical data, or diagnose users."
      />

      <CategoryFilters activeCategory={activeCategory} onCategoryChange={onCategoryChange} />

      <div className="mt-6 grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="min-w-0 rounded-[2rem] border border-cocoa/10 bg-white p-4 shadow-soft sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase text-oliveDeep">Preset scenarios</p>
              <h3 className="mt-1 text-2xl font-black text-cocoa">{filteredScenarios.length} questions</h3>
            </div>
            <p className="text-xs font-bold text-cocoaSoft">Select one, then ask Alo.</p>
          </div>
          <motion.div variants={revealContainer} initial="hidden" animate="show" className="mt-5 grid max-h-[760px] gap-3 overflow-y-auto pr-1">
            {filteredScenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                selected={scenario.id === selectedScenario.id}
                language={selectedOutputLanguage}
                onSelect={() => onSelectScenario(scenario.id)}
                onAsk={() => onAsk(scenario)}
              />
            ))}
          </motion.div>
        </div>

        <ChatAnswerPanel
          selectedScenario={selectedScenario}
          askedScenario={askedScenario}
          isAsking={isAsking}
          language={selectedOutputLanguage}
          onAsk={() => onAsk(selectedScenario)}
          onLanguageChange={onLanguageChange}
        />
      </div>
    </section>
  );
}

function CategoryFilters({ activeCategory, onCategoryChange }: { activeCategory: CategoryFilter; onCategoryChange: (category: CategoryFilter) => void }) {
  return (
    <div className="mt-7 flex flex-wrap gap-2 pb-2">
      {agentScenarioCategories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "focus-ring shrink-0 rounded-full px-4 py-2 text-xs font-black transition",
            activeCategory === category.id ? "bg-orange text-white shadow-lift" : "bg-white text-cocoaSoft shadow-lift hover:bg-mint hover:text-oliveDeep"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

function ScenarioCard({
  scenario,
  selected,
  language,
  onSelect,
  onAsk
}: {
  scenario: AgentScenario;
  selected: boolean;
  language: AgentLanguage;
  onSelect: () => void;
  onAsk: () => void;
}) {
  return (
    <motion.article
      variants={revealItem}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onSelect}
      className={cn(
        "grid min-w-0 cursor-pointer gap-3 rounded-[1.5rem] border p-3 transition sm:grid-cols-[3.5rem_minmax(0,1fr)]",
        selected ? "border-orange bg-orange/10 shadow-lift" : "border-cocoa/10 bg-cream hover:border-olive/30"
      )}
    >
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-lift">
        <ContextVisual kind={scenario.visualType} compact />
      </div>
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-mint px-3 py-1 text-[10px] font-black uppercase text-oliveDeep">{categoryLabel(scenario.category)}</span>
          <span className={cn("rounded-full px-3 py-1 text-[10px] font-black uppercase", scenario.level === "crisis" ? "bg-alertClay/15 text-alertClay" : "bg-white text-cocoaSoft")}>
            {scenario.level ?? "general"}
          </span>
        </div>
        <h4 className="text-base font-black text-cocoa">{scenario.title[language]}</h4>
        <p className="mt-1 text-xs font-bold leading-5 text-cocoaSoft">{scenario.sampleContext[language]}</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-cocoa">{scenario.userQuestion[language]}</p>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onAsk();
          }}
          className="focus-ring mt-3 inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full bg-cocoa px-4 py-2 text-xs font-black text-white transition hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Ask Alo Agent <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.article>
  );
}

function ChatAnswerPanel({
  selectedScenario,
  askedScenario,
  isAsking,
  language,
  onAsk,
  onLanguageChange
}: {
  selectedScenario: AgentScenario;
  askedScenario: AgentScenario | null;
  isAsking: boolean;
  language: AgentLanguage;
  onAsk: () => void;
  onLanguageChange: (language: AgentLanguage) => void;
}) {
  const scenario = askedScenario ?? selectedScenario;
  const showAnswer = Boolean(askedScenario) && !isAsking;

  return (
    <div className="min-w-0 rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase text-oliveDeep">Simulated chat answer</p>
          <h3 className="mt-1 text-2xl font-black text-cocoa">Alo Agent response</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">Switch Indonesia / English without asking again.</p>
        </div>
        <LanguageToggle value={language} onChange={onLanguageChange} />
      </div>

      <div className="mt-5 grid gap-4">
        <motion.div key={scenario.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="ml-auto max-w-[92%] rounded-[1.4rem] rounded-br-md bg-white p-4 shadow-lift">
          <p className="text-xs font-black uppercase text-cocoaSoft">You</p>
          <p className="mt-2 text-sm font-bold leading-6 text-cocoa">{scenario.userQuestion[language]}</p>
        </motion.div>

        {!askedScenario && (
          <div className="rounded-[1.5rem] border border-dashed border-olive/30 bg-white p-5">
            <div className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
              <div className="grid h-20 w-20 place-items-center rounded-[1.4rem] bg-cream">
                <ContextVisual kind={scenario.visualType} />
              </div>
              <div className="min-w-0">
                <p className="text-base font-black text-cocoa">Ready to answer.</p>
                <p className="mt-2 text-sm font-semibold leading-7 text-cocoaSoft">
                  Pick any preset question and Alo Agent will generate a richer education report than the Classifier result.
                </p>
                <button type="button" onClick={onAsk} className="focus-ring mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 active:scale-[0.98]">
                  <Play className="h-4 w-4" /> Ask Alo Agent
                </button>
              </div>
            </div>
          </div>
        )}

        {isAsking && <TypingState />}

        {showAnswer && <AgentAnswerReport scenario={scenario} language={language} />}
      </div>
    </div>
  );
}

function TypingState() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-[94%] rounded-[1.4rem] rounded-bl-md bg-mint p-4 shadow-lift">
      <div className="flex items-center gap-3">
        <MiniAssistantFace thinking />
        <div className="min-w-0">
          <p className="text-sm font-black text-cocoa">Alo Agent is preparing your bilingual answer...</p>
          <div className="mt-2 flex gap-1">
            {[0, 1, 2].map((dot) => (
              <motion.span key={dot} className="h-2.5 w-2.5 rounded-full bg-orange" animate={{ opacity: [0.35, 1, 0.35], y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: dot * 0.15 }} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AgentAnswerReport({ scenario, language }: { scenario: AgentScenario; language: AgentLanguage }) {
  const answer = scenario.agentAnswer;

  return (
    <motion.div key={`${scenario.id}-${language}`} variants={revealContainer} initial="hidden" animate="show" className="max-w-full rounded-[1.8rem] bg-white p-4 shadow-soft sm:p-5">
      <motion.div variants={revealItem} className="grid gap-4 md:grid-cols-[0.72fr_1fr] md:items-center">
        <div className={cn("min-h-[220px] overflow-hidden rounded-[1.5rem] p-4", scenario.level === "crisis" ? "bg-alertClay/10" : "bg-cream")}>
          <ContextVisual kind={scenario.visualType} large />
        </div>
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-mint px-3 py-1 text-xs font-black uppercase text-oliveDeep">{categoryLabel(scenario.category)}</span>
            <span className={cn("rounded-full px-3 py-1 text-xs font-black uppercase", scenario.level === "crisis" ? "bg-alertClay/15 text-alertClay" : "bg-orange/15 text-alertClay")}>{scenario.level ?? "general"}</span>
          </div>
          <h3 className="text-3xl font-black leading-tight text-cocoa">{answer.title[language]}</h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-cocoaSoft">{answer.opening[language]}</p>
          <p className="mt-3 rounded-2xl bg-parchment px-4 py-3 text-sm font-black text-cocoa">{scenario.sampleContext[language]}</p>
        </div>
      </motion.div>

      <div className="mt-5 grid gap-3">
        {reportSections.map((section) => (
          <motion.article key={section.key} variants={revealItem} className={cn("grid min-w-0 gap-3 rounded-[1.5rem] border border-cocoa/10 bg-cream p-4 sm:grid-cols-[3rem_minmax(0,1fr)]", section.key === "foodGuidance" || section.key === "lifestyleGuidance" ? "border-orange/25 bg-orange/5" : "", section.key === "safetyReminder" && scenario.level === "crisis" ? "border-alertClay/30 bg-alertClay/10" : "")}>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white">
              <ReportSectionVisual kind={section.visual} compact />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase text-oliveDeep">{section.label[language]}</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-cocoaSoft">{answer[section.key][language]}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div variants={revealItem} className="mt-4 rounded-[1.5rem] border border-cocoa/10 bg-mint/60 p-4">
        <p className="text-xs font-black uppercase text-oliveDeep">{language === "id" ? "Batas aman Alo Agent" : "Alo Agent safety boundary"}</p>
        <p className="mt-2 text-sm font-semibold leading-7 text-cocoaSoft">
          {language === "id" ? "Ini hanya edukasi, bukan diagnosis atau saran medis." : "This is education only, not diagnosis or medical advice."}
        </p>
      </motion.div>

      <motion.div variants={revealItem} className="mt-4 rounded-[1.5rem] bg-cocoa p-4">
        <p className="text-sm font-black text-white">{language === "id" ? "Lanjutkan pembelajaran" : "Continue learning"}</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {scenario.modules.map((module) => (
            <Link key={`${module.href}-${module.label}`} href={module.href} className="focus-ring inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 active:scale-[0.98]">
              {module.label} <ArrowRight className="h-4 w-4" />
            </Link>
          ))}
          <Link href="/passport" className="focus-ring inline-flex min-h-[46px] items-center justify-center rounded-full bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 active:scale-[0.98]">
            View Passport
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FoodLifestyleSection() {
  return (
    <section>
      <SectionHeader
        eyebrow="Food and lifestyle stay prominent"
        title="Alo Agent answers are richer than Classifier results."
        body="Each answer separates practical food education and lifestyle education, so users get more than a number category."
      />
      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        {guidanceCards.map((card) => (
          <motion.article key={card.title} whileHover={{ y: -4 }} className="min-w-0 rounded-[2.2rem] border border-cocoa/10 bg-white p-5 shadow-soft sm:p-6">
            <div className="min-h-[280px] overflow-hidden rounded-[1.8rem] bg-parchment p-4">
              <ContextVisual kind={card.visual} large />
            </div>
            <h3 className="mt-5 text-3xl font-black text-cocoa">{card.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-7 text-cocoaSoft">{card.body}</p>
            <p className="mt-3 text-sm font-semibold leading-7 text-cocoaSoft">{card.idBody}</p>
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
          <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">Simulated answers. No medical data.</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-white/78">
            Alo Agent is for education only. It does not provide diagnosis, treatment decisions, personal diet plans, or emergency medical advice.
          </p>
          <p className="mt-3 text-sm font-semibold leading-7 text-white/78">
            Alo Agent hanya untuk edukasi. Fitur ini tidak memberikan diagnosis, keputusan pengobatan, rencana diet personal, atau saran medis darurat.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {["No diagnosis", "No personal diet plan", "No medical records", "Learning guidance only"].map((card, index) => (
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
    <div className="w-full max-w-4xl min-w-0">
      <p className="text-sm font-black uppercase tracking-[0.14em] text-oliveDeep">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black leading-tight text-cocoa sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-cocoaSoft sm:text-base">{body}</p>
    </div>
  );
}

function LanguageToggle({ value, onChange }: { value: AgentLanguage; onChange: (language: AgentLanguage) => void }) {
  return (
    <div className="grid min-w-[190px] grid-cols-2 rounded-full bg-white p-1 text-xs font-black shadow-lift">
      {(["id", "en"] as AgentLanguage[]).map((language) => (
        <button
          key={language}
          type="button"
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

function categoryLabel(category: AgentScenarioCategory) {
  const labels: Record<AgentScenarioCategory, string> = {
    "blood-pressure": "Tensi",
    "blood-sugar": "Gula Darah",
    bmi: "BMI",
    food: "Makanan",
    lifestyle: "Lifestyle",
    "common-cold": "Common Cold",
    dengue: "Dengue"
  };
  return labels[category];
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

function ContextVisual({ kind, compact = false, large = false }: { kind: AgentVisualType; compact?: boolean; large?: boolean }) {
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

function GeneralHealthVisual({ kind }: { kind: AgentVisualType }) {
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
        </motion.g>
      ))}
    </motion.svg>
  );
}
