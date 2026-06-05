"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Play, ShieldCheck } from "lucide-react";
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
      <div className="grid min-w-0 gap-10 sm:gap-12 lg:gap-14">
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
    <section className="grid min-w-0 grid-cols-1 items-center gap-6 rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.72fr)] lg:gap-8">
      <motion.div variants={revealContainer} initial="hidden" animate="show" className="min-w-0">
        <motion.p variants={revealItem} className="text-xs font-black uppercase tracking-[0.18em] text-oliveDeep">
          Alo Agent
        </motion.p>
        <motion.h1 variants={revealItem} className="mt-3 max-w-3xl text-3xl font-black leading-[1.05] text-cocoa sm:text-5xl lg:text-6xl">
          Ask a bilingual health education assistant.
        </motion.h1>
        <motion.p variants={revealItem} className="mt-4 max-w-2xl text-base font-extrabold leading-7 text-cocoa sm:text-lg">
          Choose from many preset health learning requests and generate a safe report in Indonesia or English.
        </motion.p>
        <motion.p variants={revealItem} className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-cocoaSoft">
          Alo Agent is simulated and frontend-only. It helps explain blood pressure, blood sugar, BMI, food habits, lifestyle habits, common cold, and dengue awareness without diagnosis or data storage.
        </motion.p>
        <motion.div variants={revealItem} className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#ask-agent" className="focus-ring inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-alertClay/90 active:scale-[0.98]">
            Start Asking Alo <ArrowRight className="h-4 w-4" />
          </a>
          <Link href="/classifier" className="focus-ring inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-cocoa shadow-lift transition hover:-translate-y-0.5 hover:bg-mint active:scale-[0.98]">
            Try Classifier
          </Link>
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.12, duration: 0.5 }} className="min-w-0">
        <AgentAssistantHeroVisual />
      </motion.div>
    </section>
  );
}

function AgentAssistantHeroVisual() {
  return (
    <div className="relative min-h-[300px] w-full max-w-full overflow-hidden rounded-[1.8rem] border border-cocoa/10 bg-cream p-4 shadow-soft sm:min-h-[340px]">
      <motion.div aria-hidden className="pointer-events-none absolute left-8 top-12 h-24 w-24 rounded-full bg-mint/60 blur-3xl" animate={{ opacity: [0.45, 0.82, 0.45], scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} />
      <motion.div aria-hidden className="pointer-events-none absolute bottom-16 right-10 h-28 w-28 rounded-full bg-orange/18 blur-3xl" animate={{ opacity: [0.35, 0.72, 0.35], scale: [1.04, 1, 1.04] }} transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }} />
      {[0, 1, 2, 3, 4].map((particle) => (
        <motion.span
          key={particle}
          aria-hidden
          className="pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-olive/35"
          style={{ left: `${14 + particle * 17}%`, top: `${18 + (particle % 3) * 18}%` }}
          animate={{ opacity: [0.2, 0.75, 0.2], y: [0, -14, 0], scale: [0.9, 1.2, 0.9] }}
          transition={{ repeat: Infinity, duration: 3.6 + particle * 0.25, delay: particle * 0.18, ease: "easeInOut" }}
        />
      ))}
      <div className="relative z-10 mx-auto grid h-full min-h-[268px] max-w-[420px] place-items-center sm:min-h-[308px]">
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }} className="w-full rounded-[1.6rem] border border-cocoa/10 bg-white p-4 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase text-oliveDeep">Simulated chat</p>
              <h2 className="mt-1 text-xl font-black text-cocoa">Alo answer preview</h2>
            </div>
            <span className="rounded-full bg-orange/15 px-3 py-2 text-xs font-black text-alertClay">Education only</span>
          </div>
          <div className="mt-3 rounded-[1.35rem] bg-cream p-3">
            <p className="max-w-[88%] rounded-[1.05rem] bg-white px-3 py-2 text-xs font-bold leading-5 text-cocoa shadow-lift">
              My blood sugar example is 132 mg/dL.
            </p>
            <div className="mt-3 ml-auto max-w-[92%] rounded-[1.05rem] bg-mint px-3 py-3 shadow-lift">
              <div className="flex items-center gap-3">
                <MiniAssistantFace />
                <div className="min-w-0">
                  <p className="text-xs font-black text-cocoa">Preparing a bilingual guide</p>
                  <div className="mt-2 flex gap-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.span key={dot} className="h-2 w-2 rounded-full bg-orange" animate={{ opacity: [0.35, 1, 0.35], y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: dot * 0.15 }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 rounded-full bg-cream p-1 text-xs font-black text-cocoaSoft">
            <span className="rounded-full bg-orange px-3 py-2 text-center text-white shadow-lift">Indonesia</span>
            <span className="px-3 py-2 text-center">English</span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <HeroMiniCard title="Food" visual="food" />
            <HeroMiniCard title="Lifestyle" visual="lifestyle" />
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
  const [browseOpen, setBrowseOpen] = useState(false);
  const quickScenarios = filteredScenarios.slice(0, 4);

  return (
    <section id="ask-agent" className="scroll-mt-28">
      <SectionHeader
        eyebrow="Ask Alo Agent"
        title="Choose one question. Get one clear learning guide."
        body="Start from a preset health context, then Alo Agent returns explanation, food guidance, lifestyle guidance, safety reminders, and next modules."
      />

      <CategoryFilters activeCategory={activeCategory} onCategoryChange={onCategoryChange} />

      <div className="mt-6 grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <div className="grid min-w-0 gap-4">
          <motion.div layout className="relative min-w-0 overflow-hidden rounded-[2rem] border border-cocoa/10 bg-white p-4 shadow-soft sm:p-5">
            <motion.div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange/15 blur-3xl" animate={{ opacity: [0.28, 0.58, 0.28], scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} />
            <div className="relative grid gap-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:items-center">
              <AgentVisualFrame kind={selectedScenario.visualType} size="feature" selected>
                <AgentScenarioVisual kind={selectedScenario.visualType} large />
              </AgentVisualFrame>
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-mint px-3 py-1 text-[10px] font-black uppercase text-oliveDeep">{categoryLabel(selectedScenario.category)}</span>
                  <span className={cn("rounded-full px-3 py-1 text-[10px] font-black uppercase", selectedScenario.level === "crisis" ? "bg-alertClay/15 text-alertClay" : "bg-orange/15 text-alertClay")}>
                    {selectedScenario.level ?? "general"}
                  </span>
                </div>
                <h3 className="text-xl font-black leading-tight text-cocoa">{selectedScenario.title[selectedOutputLanguage]}</h3>
                <p className="mt-2 text-xs font-black uppercase text-cocoaSoft">{selectedScenario.sampleContext[selectedOutputLanguage]}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-cocoa">{selectedScenario.userQuestion[selectedOutputLanguage]}</p>
              </div>
            </div>
            <div className="relative mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => onAsk(selectedScenario)}
                className="focus-ring inline-flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Ask Alo Agent <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setBrowseOpen((open) => !open)}
                className="focus-ring inline-flex min-h-[50px] items-center justify-center rounded-full bg-cream px-5 py-3 text-sm font-black text-cocoa transition hover:bg-mint active:scale-[0.98]"
              >
                {browseOpen ? "Hide questions" : `Browse ${filteredScenarios.length} questions`}
              </button>
            </div>
          </motion.div>

          <div className="min-w-0 rounded-[1.6rem] border border-cocoa/10 bg-parchment p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase text-oliveDeep">Quick picks</p>
                <p className="mt-1 text-sm font-semibold text-cocoaSoft">Tap a context, then ask Alo.</p>
              </div>
              <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black text-cocoaSoft">{filteredScenarios.length}</span>
            </div>
            <motion.div variants={revealContainer} initial="hidden" animate="show" className="mt-4 grid gap-2">
              {quickScenarios.map((scenario) => (
                <ScenarioPill
                  key={scenario.id}
                  scenario={scenario}
                  selected={scenario.id === selectedScenario.id}
                  language={selectedOutputLanguage}
                  onSelect={() => onSelectScenario(scenario.id)}
                />
              ))}
            </motion.div>
          </div>

          <motion.div layout className="min-w-0 overflow-hidden rounded-[1.7rem] border border-cocoa/10 bg-white shadow-soft">
            <button
              type="button"
              onClick={() => setBrowseOpen((open) => !open)}
              className="focus-ring flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
            >
              <span className="min-w-0">
                <span className="block text-xs font-black uppercase text-oliveDeep">Browse all preset questions</span>
                <span className="mt-1 block text-sm font-semibold text-cocoaSoft">Collapsed by default to keep mobile short and calm.</span>
              </span>
              <motion.span animate={{ rotate: browseOpen ? 180 : 0 }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-sm font-black text-cocoa">
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path d="M7 10 L12 15 L17 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.span>
            </button>
            {browseOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-cocoa/10 p-3">
                <motion.div variants={revealContainer} initial="hidden" animate="show" className="grid gap-3 md:grid-cols-2">
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
              </motion.div>
            )}
          </motion.div>
        </div>

        <AgentChatWindow
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
    <motion.div layout className="mt-7 flex flex-wrap gap-2 pb-2">
      {agentScenarioCategories.map((category) => (
        <motion.button
          key={category.id}
          layout
          type="button"
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "focus-ring relative min-h-[38px] shrink-0 overflow-hidden rounded-full px-4 py-2 text-xs font-black shadow-lift transition",
            activeCategory === category.id ? "text-white" : "bg-white text-cocoaSoft hover:bg-mint hover:text-oliveDeep"
          )}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {activeCategory === category.id && <motion.span layoutId="agent-category-pill" className="absolute inset-0 rounded-full bg-orange" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
          <span className="relative z-10">{category.label}</span>
        </motion.button>
      ))}
    </motion.div>
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
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      onClick={onSelect}
      className={cn(
        "group relative grid min-w-0 cursor-pointer gap-3 overflow-hidden rounded-[1.6rem] border p-3 transition sm:grid-cols-[4.15rem_minmax(0,1fr)]",
        selected ? "border-orange bg-orange/10 shadow-lift ring-2 ring-orange/18" : "border-cocoa/10 bg-cream shadow-sm hover:border-olive/30 hover:shadow-lift"
      )}
    >
      <motion.div
        aria-hidden
        className={cn("pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full blur-3xl", selected ? "bg-orange/25" : "bg-mint/35")}
        animate={{ opacity: selected ? [0.35, 0.7, 0.35] : [0.18, 0.38, 0.18], scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut" }}
      />
      <AgentVisualFrame kind={scenario.visualType} size="thumb" selected={selected} className="relative shrink-0 transition group-hover:-translate-y-0.5">
        <AgentScenarioVisual kind={scenario.visualType} compact />
      </AgentVisualFrame>
      <div className="relative min-w-0">
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
          className={cn(
            "focus-ring mt-3 inline-flex min-h-[42px] items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-black transition hover:-translate-y-0.5 active:scale-[0.98]",
            selected ? "bg-orange text-white shadow-lift" : "bg-cocoa text-white group-hover:bg-oliveDeep"
          )}
        >
          Ask Alo Agent <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.article>
  );
}

function ScenarioPill({
  scenario,
  selected,
  language,
  onSelect
}: {
  scenario: AgentScenario;
  selected: boolean;
  language: AgentLanguage;
  onSelect: () => void;
}) {
  return (
    <motion.button
      type="button"
      variants={revealItem}
      onClick={onSelect}
      whileTap={{ scale: 0.985 }}
      className={cn(
        "focus-ring grid min-w-0 grid-cols-[3rem_minmax(0,1fr)] items-center gap-3 rounded-[1.2rem] border p-2 text-left transition",
        selected ? "border-orange bg-orange/10 shadow-lift" : "border-cocoa/10 bg-white hover:border-olive/25 hover:bg-mint/45"
      )}
    >
      <AgentVisualFrame kind={scenario.visualType} size="thumb" selected={selected} className="h-12 w-12 rounded-2xl p-1 shadow-sm">
        <AgentScenarioVisual kind={scenario.visualType} compact />
      </AgentVisualFrame>
      <span className="min-w-0">
        <span className="block truncate text-sm font-black text-cocoa">{scenario.title[language]}</span>
        <span className="mt-1 block truncate text-xs font-bold text-cocoaSoft">{scenario.sampleContext[language]}</span>
      </span>
    </motion.button>
  );
}

function AgentChatWindow({
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
    <div className="relative min-w-0 overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-5">
      <motion.div aria-hidden className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-mint/35 blur-3xl" animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 5.4, ease: "easeInOut" }} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="relative min-w-0">
          <p className="text-xs font-black uppercase text-oliveDeep">Simulated chat answer</p>
          <h3 className="mt-1 text-2xl font-black text-cocoa">Alo Agent response</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">Switch Indonesia / English without asking again.</p>
        </div>
        <LanguageToggle value={language} onChange={onLanguageChange} />
      </div>

      <div className="relative mt-5 grid gap-4">
        <motion.div key={scenario.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="ml-auto max-w-[92%] rounded-[1.4rem] rounded-br-md bg-white p-4 shadow-lift">
          <p className="text-xs font-black uppercase text-cocoaSoft">You</p>
          <p className="mt-2 text-sm font-bold leading-6 text-cocoa">{scenario.userQuestion[language]}</p>
        </motion.div>

        {!askedScenario && (
          <div className="rounded-[1.5rem] border border-dashed border-olive/30 bg-white p-5">
            <div className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
              <AgentVisualFrame kind={scenario.visualType} size="thumb">
                <AgentScenarioVisual kind={scenario.visualType} compact />
              </AgentVisualFrame>
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
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-[94%] overflow-hidden rounded-[1.4rem] rounded-bl-md bg-mint p-4 shadow-lift">
      <motion.span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-orange to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }} />
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
      <motion.div variants={revealItem} className="grid gap-3 rounded-[1.5rem] border border-cocoa/10 bg-cream p-3.5 sm:grid-cols-[8.5rem_minmax(0,1fr)] md:items-center md:p-4">
        <AgentVisualFrame kind={scenario.visualType} size="report" selected={scenario.level === "crisis"}>
          <AgentScenarioVisual kind={scenario.visualType} large />
        </AgentVisualFrame>
        <div className="min-w-0">
          <AgentInsightPanel scenario={scenario} language={language} />
          <h3 className="mt-3 text-xl font-black leading-tight text-cocoa sm:text-3xl">{answer.title[language]}</h3>
          <p className="mt-2 text-sm font-semibold leading-7 text-cocoaSoft">{answer.opening[language]}</p>
          <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm font-black leading-6 text-cocoa shadow-sm">{scenario.sampleContext[language]}</p>
        </div>
      </motion.div>

      <div className="mt-4 grid gap-3 xl:grid-cols-2">
        {reportSections.map((section) => {
          const isGuidance = section.key === "foodGuidance" || section.key === "lifestyleGuidance";
          const isSafety = section.key === "safetyReminder";
          const isPath = section.key === "recommendedPath";

          return (
            <motion.article
              key={section.key}
              variants={revealItem}
              className={cn(
                "grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] gap-3 rounded-[1.35rem] border border-cocoa/10 bg-cream p-3.5",
                isGuidance ? "border-orange/25 bg-orange/5" : "",
                isSafety && scenario.level === "crisis" ? "border-alertClay/30 bg-alertClay/10" : "",
                isPath ? "bg-cocoa text-white" : ""
              )}
            >
              <div className={cn("grid h-12 w-12 place-items-center rounded-2xl border", isPath ? "border-white/10 bg-white/10" : isGuidance ? "border-orange/15 bg-parchment" : "border-cocoa/5 bg-mint/45")}>
                {section.key === "foodGuidance" ? (
                  <ReportSectionVisual kind="food" compact />
                ) : section.key === "lifestyleGuidance" ? (
                  <ReportSectionVisual kind="lifestyle" compact />
                ) : section.key === "safetyReminder" ? (
                  <SafetyReminderVisual compact />
                ) : section.key === "recommendedPath" ? (
                  <ModulePathVisual compact />
                ) : (
                  <ReportSectionVisual kind={section.visual} compact />
                )}
              </div>
              <div className="min-w-0">
                <p className={cn("text-xs font-black uppercase", isPath ? "text-orange" : "text-oliveDeep")}>{section.label[language]}</p>
                <p className={cn("mt-2 text-xs font-semibold leading-6 sm:text-sm sm:leading-7", isPath ? "text-white/82" : "text-cocoaSoft")}>{answer[section.key][language]}</p>
                {isPath && (
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    {scenario.modules.map((module) => (
                      <Link key={`${module.href}-${module.label}`} href={module.href} className="focus-ring inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full bg-orange px-4 py-2 text-xs font-black text-white transition hover:-translate-y-0.5 active:scale-[0.98]">
                        {module.label} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ))}
                    <Link href="/passport" className="focus-ring inline-flex min-h-[40px] items-center justify-center rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white transition hover:-translate-y-0.5 active:scale-[0.98]">
                      View Passport
                    </Link>
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </motion.div>
  );
}

function AgentInsightPanel({ scenario, language }: { scenario: AgentScenario; language: AgentLanguage }) {
  const safetyCopy =
    scenario.level === "crisis"
      ? language === "id"
        ? "Pengingat keselamatan utama"
        : "Priority safety reminder"
      : language === "id"
        ? "Edukasi aman"
        : "Safe education";

  return (
    <div className="flex flex-wrap gap-2">
      <div className="rounded-2xl bg-mint px-3 py-2">
        <p className="text-[10px] font-black uppercase text-oliveDeep">{language === "id" ? "Kategori" : "Category"}</p>
        <p className="mt-0.5 text-xs font-black text-cocoa">{categoryLabel(scenario.category)}</p>
      </div>
      <div className={cn("rounded-2xl px-3 py-2", scenario.level === "crisis" ? "bg-alertClay/15" : "bg-orange/15")}>
        <p className={cn("text-[10px] font-black uppercase", scenario.level === "crisis" ? "text-alertClay" : "text-alertClay")}>{language === "id" ? "Level belajar" : "Learning level"}</p>
        <p className="mt-0.5 text-xs font-black text-cocoa">{scenario.level ?? "general"}</p>
      </div>
      <div className="rounded-2xl bg-white px-3 py-2">
        <p className="text-[10px] font-black uppercase text-oliveDeep">{language === "id" ? "Status" : "Status"}</p>
        <p className="mt-0.5 text-xs font-black text-cocoa">{safetyCopy}</p>
      </div>
    </div>
  );
}

function FoodLifestyleSection() {
  return (
    <section>
      <SectionHeader
        eyebrow="Why Alo Agent feels useful"
        title="Food and lifestyle are part of the answer."
        body="Unlike a number checker, Alo Agent keeps practical food education and daily habit context visible inside every generated guide."
      />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {guidanceCards.map((card) => (
          <motion.article key={card.title} whileHover={{ y: -4 }} className="grid min-w-0 gap-4 rounded-[1.8rem] border border-cocoa/10 bg-white p-4 shadow-soft sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-center sm:p-5">
            <div className="min-h-[150px] overflow-hidden rounded-[1.4rem] bg-parchment p-2">
              <AgentScenarioVisual kind={card.visual} large />
            </div>
            <div className="min-w-0">
              <h3 className="text-2xl font-black text-cocoa">{card.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-7 text-cocoaSoft">{card.body}</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-cocoaSoft">{card.idBody}</p>
            </div>
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
    <div className="grid w-full max-w-[230px] grid-cols-2 rounded-full bg-white p-1 text-xs font-black shadow-lift sm:w-[230px]">
      {(["id", "en"] as AgentLanguage[]).map((language) => (
        <motion.button
          key={language}
          layout
          type="button"
          onClick={() => onChange(language)}
          className={cn(
            "focus-ring relative min-h-[40px] overflow-hidden rounded-full px-3 transition",
            value === language ? "text-white" : "text-cocoaSoft hover:bg-mint hover:text-oliveDeep"
          )}
          whileTap={{ scale: 0.98 }}
        >
          {value === language && <motion.span layoutId="agent-language-pill" className="absolute inset-0 rounded-full bg-orange shadow-lift" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
          <span className="relative z-10">{language === "id" ? "Indonesia" : "English"}</span>
        </motion.button>
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
    <motion.div whileHover={{ y: -3 }} className="grid min-w-0 grid-cols-[2.8rem_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-cocoa/5 bg-mint/45 px-3 py-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-parchment">
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
        <circle cx="40" cy="40" r="29" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.12" strokeWidth="4" />
        <motion.path d="M27 45 C33 35 47 35 53 45" fill="none" stroke="#202020" strokeWidth="5" strokeLinecap="round" animate={thinking ? { y: [0, -1, 0] } : undefined} transition={{ repeat: Infinity, duration: 1.8 }} />
        <circle cx="31" cy="33" r="4" fill="#202020" />
        <circle cx="49" cy="33" r="4" fill="#202020" />
        <path d="M40 14 C45 19 50 25 50 31 C50 39 45 44 40 44 C35 44 30 39 30 31 C30 25 35 19 40 14Z" fill="#90A090" opacity="0.9" />
        <circle cx="57" cy="53" r="7" fill="#C9A668" />
      </svg>
    </motion.div>
  );
}

function ReportSectionVisual({ kind, compact = false }: { kind: ReportVisualKind; compact?: boolean }) {
  const size = compact ? "h-10 w-10" : "h-20 w-20";
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

function AgentVisualFrame({
  children,
  kind,
  size = "thumb",
  selected = false,
  className
}: {
  children: ReactNode;
  kind: AgentVisualType;
  size?: "thumb" | "feature" | "report";
  selected?: boolean;
  className?: string;
}) {
  const tone: Record<AgentVisualType, string> = {
    pressure: "from-[#fff4ea] via-[#f9eadf] to-[#e5ecdf]",
    sugar: "from-[#fff8ea] via-[#f4edd8] to-[#e5ecdf]",
    bmi: "from-[#fff8ea] via-[#f5eadf] to-[#f0d9a2]/55",
    food: "from-[#fff9f1] via-[#edf3e8] to-[#f0d9a2]/55",
    lifestyle: "from-[#fff9f1] via-[#e5ecdf] to-[#fff0dd]",
    cold: "from-[#fff9f1] via-[#eef3ee] to-[#e9f1f4]",
    dengue: "from-[#fff8ea] via-[#f3ead7] to-[#e5ecdf]"
  };
  const sizes = {
    thumb: "h-16 w-16 rounded-[1.25rem]",
    feature: "min-h-[142px] w-full rounded-[1.55rem] sm:min-h-[132px]",
    report: "min-h-[134px] w-full rounded-[1.45rem] sm:min-h-[146px]"
  };

  return (
    <motion.div
      className={cn(
        "relative isolate grid place-items-center overflow-hidden border border-cocoa/10 bg-gradient-to-br p-1.5 shadow-lift",
        tone[kind],
        sizes[size],
        selected && "ring-2 ring-orange/20",
        className
      )}
      whileHover={{ y: size === "thumb" ? -2 : 0 }}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/45 blur-2xl"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 4.6, ease: "easeInOut" }}
      />
      <div className="relative z-10 grid h-full w-full place-items-center">{children}</div>
    </motion.div>
  );
}

function AgentScenarioVisual({ kind, compact = false, large = false }: { kind: AgentVisualType; compact?: boolean; large?: boolean }) {
  const className = large ? "h-full min-h-[132px] w-full" : "h-full w-full";

  if (kind === "food") {
    return <FoodPlateVisual compact={compact && !large} className={className} />;
  }

  if (kind === "lifestyle") {
    return <LifestyleOrbitVisual compact={compact && !large} className={className} />;
  }

  const visuals = {
    pressure: <PressureVisual className={className} compact={compact && !large} />,
    sugar: <SugarVisual className={className} compact={compact && !large} />,
    bmi: <BMIVisual className={className} compact={compact && !large} />,
    cold: <ColdVisual className={className} compact={compact && !large} />,
    dengue: <DengueVisual className={className} compact={compact && !large} />
  } satisfies Record<Exclude<AgentVisualType, "food" | "lifestyle">, ReactNode>;

  return (
    <motion.div key={kind} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.28, ease: "easeOut" }} className="grid h-full w-full place-items-center">
      {visuals[kind as Exclude<AgentVisualType, "food" | "lifestyle">]}
    </motion.div>
  );
}

function PressureVisual({ className, compact = false }: { className: string; compact?: boolean }) {
  return (
    <motion.svg viewBox="0 0 300 240" className={className} aria-label="Animated blood pressure education visual">
      <motion.circle cx="142" cy="122" r="78" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.12" strokeWidth="5" animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 3.4 }} style={{ transformOrigin: "142px 122px" }} />
      <path d="M75 132 C93 90 113 168 137 119 C157 78 184 158 218 96" fill="none" stroke="#708473" strokeWidth={compact ? 15 : 12} strokeLinecap="round" />
      <motion.path d="M101 178 C121 151 164 151 185 178" fill="none" stroke="#C9A668" strokeWidth="12" strokeLinecap="round" animate={{ pathLength: [0.45, 1, 0.45] }} transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }} />
      <motion.g animate={{ rotate: [-9, 12, -9] }} transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }} style={{ transformOrigin: "150px 120px" }}>
        <path d="M142 122 L179 89" stroke="#202020" strokeWidth="9" strokeLinecap="round" />
      </motion.g>
      {!compact && (
        <motion.g animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}>
          <rect x="202" y="139" width="62" height="48" rx="17" fill="#FFF9F1" stroke="#202020" strokeOpacity="0.1" />
          <path d="M216 164 C223 151 231 151 238 164 C245 151 253 151 260 164" fill="none" stroke="#B86B5E" strokeWidth="6" strokeLinecap="round" />
        </motion.g>
      )}
    </motion.svg>
  );
}

function SugarVisual({ className, compact = false }: { className: string; compact?: boolean }) {
  return (
    <motion.svg viewBox="0 0 300 240" className={className} aria-label="Animated blood sugar education visual">
      <rect x="91" y="51" width="118" height="139" rx="34" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.12" strokeWidth="5" />
      <rect x="116" y="76" width="68" height="42" rx="16" fill="#E5ECDF" />
      <motion.rect x="118" y="137" width="64" height="16" rx="8" fill="#90A090" animate={{ scaleX: [0.62, 1, 0.78] }} transition={{ repeat: Infinity, duration: 3.1, ease: "easeInOut" }} style={{ transformOrigin: "118px 145px" }} />
      <rect x="118" y="162" width="48" height="16" rx="8" fill="#C9A668" />
      {[61, 238, 226, 70, 230].map((cx, index) => (
        <motion.circle key={`${cx}-${index}`} cx={cx} cy={[78, 86, 155, 166, 124][index]} r={compact ? 10 : 13} fill={index % 2 ? "#C9A668" : "#90A090"} animate={{ y: [0, index % 2 ? 10 : -10, 0], opacity: [0.65, 1, 0.65] }} transition={{ repeat: Infinity, duration: 2.8 + index * 0.2, ease: "easeInOut" }} />
      ))}
      {!compact && (
        <motion.path d="M68 190 C109 168 141 208 182 183 C202 171 225 171 246 190" fill="none" stroke="#708473" strokeOpacity="0.38" strokeWidth="8" strokeLinecap="round" animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }} />
      )}
    </motion.svg>
  );
}

function BMIVisual({ className, compact = false }: { className: string; compact?: boolean }) {
  return (
    <motion.svg viewBox="0 0 300 240" className={className} aria-label="Animated BMI education visual">
      <rect x="68" y="61" width="154" height="128" rx="36" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.12" strokeWidth="5" />
      <path d="M101 126 A45 45 0 0 1 190 126" fill="none" stroke="#90A090" strokeWidth="13" strokeLinecap="round" />
      <motion.path d="M146 126 L182 92" stroke="#C9A668" strokeWidth="10" strokeLinecap="round" animate={{ rotate: [-5, 8, -5] }} transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }} style={{ transformOrigin: "146px 126px" }} />
      <rect x="99" y="157" width="95" height="18" rx="9" fill="#202020" opacity="0.82" />
      {!compact && (
        <motion.g animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}>
          <rect x="230" y="45" width="22" height="142" rx="11" fill="#FFF9F1" stroke="#202020" strokeOpacity="0.12" />
          {[76, 102, 128, 154].map((y) => (
            <path key={y} d={`M230 ${y} L245 ${y}`} stroke="#708473" strokeWidth="4" strokeLinecap="round" />
          ))}
        </motion.g>
      )}
    </motion.svg>
  );
}

function ColdVisual({ className, compact = false }: { className: string; compact?: boolean }) {
  return (
    <motion.svg viewBox="0 0 300 240" className={className} aria-label="Animated common cold education visual">
      <motion.g animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}>
        <circle cx="126" cy="110" r="61" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.12" strokeWidth="5" />
        <path d="M86 150 C111 126 143 126 171 150" fill="none" stroke="#708473" strokeWidth="11" strokeLinecap="round" />
        <rect x="87" y="73" width="78" height="36" rx="14" fill="#E5ECDF" opacity="0.9" />
      </motion.g>
      {[202, 235, 214, 248].map((cx, index) => (
        <motion.circle key={`${cx}-${index}`} cx={cx} cy={[68, 109, 151, 184][index]} r={compact ? 8 : 12} fill={index === 1 ? "#C9A668" : "#90A090"} animate={{ x: [0, index % 2 ? 8 : -8, 0], y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 2.5 + index * 0.2, ease: "easeInOut" }} />
      ))}
      {!compact && <motion.path d="M69 172 C102 155 135 185 168 168" fill="none" stroke="#C9A668" strokeWidth="8" strokeLinecap="round" animate={{ opacity: [0.35, 0.85, 0.35] }} transition={{ repeat: Infinity, duration: 2.8 }} />}
    </motion.svg>
  );
}

function DengueVisual({ className, compact = false }: { className: string; compact?: boolean }) {
  return (
    <motion.svg viewBox="0 0 300 240" className={className} aria-label="Animated dengue prevention education visual">
      <path d="M145 32 L225 67 V123 C225 168 190 201 145 218 C100 201 65 168 65 123 V67Z" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.12" strokeWidth="5" />
      <motion.path d="M101 135 C124 101 165 101 188 135" fill="none" stroke="#708473" strokeWidth="12" strokeLinecap="round" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.7, ease: "easeInOut" }} />
      <motion.circle cx="145" cy="155" r="23" fill="#90A090" opacity="0.32" animate={{ scale: [0.86, 1.08, 0.86] }} transition={{ repeat: Infinity, duration: 2.8 }} style={{ transformOrigin: "145px 155px" }} />
      <motion.g animate={{ x: [0, 8, 0], y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}>
        <ellipse cx="219" cy="74" rx="17" ry="11" fill="#202020" opacity="0.8" />
        <path d="M204 74 L179 61 M204 81 L180 98 M235 74 L257 58 M235 82 L258 100" stroke="#202020" strokeOpacity="0.55" strokeWidth="4.5" strokeLinecap="round" />
      </motion.g>
      {!compact && <motion.path d="M65 190 C92 170 119 205 147 185 C174 165 204 198 235 176" fill="none" stroke="#90A090" strokeWidth="8" strokeLinecap="round" animate={{ opacity: [0.35, 0.8, 0.35] }} transition={{ repeat: Infinity, duration: 3 }} />}
    </motion.svg>
  );
}

function FoodPlateVisual({ compact = false, className }: { compact?: boolean; className?: string }) {
  const svgClassName = className ?? (compact ? "h-28 w-full" : "h-full min-h-[210px] w-full");
  return (
    <motion.svg viewBox="0 0 300 240" className={svgClassName} aria-label="Animated balanced plate visual">
      <motion.circle cx="132" cy="120" r="76" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.14" strokeWidth="5" animate={{ scale: [1, 1.018, 1] }} transition={{ repeat: Infinity, duration: 3.4 }} style={{ transformOrigin: "132px 120px" }} />
      <path d="M132 44 A76 76 0 0 1 205 141 L132 120Z" fill="#90A090" />
      <path d="M132 120 L205 141 A76 76 0 0 1 96 187Z" fill="#C9A668" />
      <path d="M132 44 A76 76 0 0 0 96 187 L132 120Z" fill="#F0D9A2" />
      <motion.circle cx="79" cy="79" r="14" fill="#90A090" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.6 }} />
      <motion.circle cx="104" cy="67" r="10" fill="#708473" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.9, delay: 0.2 }} />
      <motion.rect x="208" y="47" width="34" height="34" rx="10" fill="#FFF9F1" stroke="#C9A668" strokeWidth="5" animate={{ rotate: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3 }} style={{ transformOrigin: "225px 64px" }} />
      <motion.path d="M239 183 C221 160 221 145 239 123 C257 145 257 160 239 183Z" fill="#90A090" animate={{ scale: [1, 1.07, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} style={{ transformOrigin: "239px 153px" }} />
      <rect x="41" y="181" width="56" height="18" rx="9" fill="#202020" opacity="0.76" />
      {!compact && (
        <motion.g animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 3.6 }}>
          <rect x="188" y="143" width="76" height="56" rx="18" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.12" />
          <rect x="204" y="158" width="38" height="7" rx="3.5" fill="#90A090" />
          <rect x="204" y="176" width="48" height="7" rx="3.5" fill="#C9A668" />
        </motion.g>
      )}
    </motion.svg>
  );
}

function LifestyleOrbitVisual({ compact = false, className }: { compact?: boolean; className?: string }) {
  const svgClassName = className ?? (compact ? "h-28 w-full" : "h-full min-h-[210px] w-full");
  const points = [
    [150, 43],
    [213, 76],
    [213, 154],
    [150, 189],
    [87, 154],
    [87, 76]
  ];
  return (
    <motion.svg viewBox="0 0 300 240" className={svgClassName} aria-label="Animated healthy lifestyle orbit visual">
      <motion.circle cx="150" cy="118" r="82" fill="none" stroke="#708473" strokeWidth="4" strokeDasharray="9 10" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 24, ease: "linear" }} style={{ transformOrigin: "150px 118px" }} />
      <rect x="104" y="72" width="92" height="92" rx="30" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.14" strokeWidth="5" />
      <path d="M127 123 C141 107 160 107 174 123" fill="none" stroke="#202020" strokeWidth="7" strokeLinecap="round" />
      <circle cx="133" cy="104" r="5" fill="#202020" />
      <circle cx="167" cy="104" r="5" fill="#202020" />
      <path d="M126 139 C141 150 159 150 174 139" fill="none" stroke="#C9A668" strokeWidth="7" strokeLinecap="round" />
      {points.map(([cx, cy], index) => (
        <motion.g key={`${cx}-${cy}`} animate={{ scale: [1, 1.14, 1], y: [0, index % 2 ? 5 : -5, 0] }} transition={{ repeat: Infinity, duration: 3, delay: index * 0.12 }} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={compact ? 12 : 16} fill={index % 2 ? "#C9A668" : "#90A090"} />
          {!compact && index < 4 && <circle cx={cx} cy={cy} r="5" fill="#FFF8EA" opacity="0.92" />}
        </motion.g>
      ))}
      {!compact && <motion.path d="M78 199 C111 181 130 217 163 197 C189 182 211 193 232 174" fill="none" stroke="#90A090" strokeOpacity="0.42" strokeWidth="8" strokeLinecap="round" animate={{ opacity: [0.25, 0.72, 0.25] }} transition={{ repeat: Infinity, duration: 3.4 }} />}
    </motion.svg>
  );
}

function SafetyReminderVisual({ compact = false }: { compact?: boolean }) {
  return (
    <motion.svg viewBox="0 0 120 120" className={compact ? "h-11 w-11" : "h-24 w-24"} aria-label="Animated safety reminder visual">
      <path d="M60 18 L93 32 V57 C93 80 79 97 60 108 C41 97 27 80 27 57 V32Z" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.14" strokeWidth="4" />
      {[42, 58, 74].map((y, index) => (
        <motion.g key={y} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.5, delay: index * 0.18 }}>
          <path d={`M43 ${y} L50 ${y + 6} L62 ${y - 8}`} fill="none" stroke="#708473" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {!compact && <rect x="67" y={y - 5} width="20" height="5" rx="2.5" fill={index === 1 ? "#C9A668" : "#90A090"} />}
        </motion.g>
      ))}
    </motion.svg>
  );
}

function ModulePathVisual({ compact = false }: { compact?: boolean }) {
  return (
    <motion.svg viewBox="0 0 140 120" className={compact ? "h-11 w-12" : "h-24 w-28"} aria-label="Animated module path visual">
      <motion.rect x="15" y="34" width="38" height="42" rx="13" fill="#FFF8EA" stroke="#FFFFFF" strokeOpacity="0.22" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2.8 }} />
      <motion.rect x="52" y="24" width="38" height="54" rx="14" fill="#90A090" animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 3.1 }} />
      <motion.rect x="88" y="40" width="38" height="42" rx="13" fill="#C9A668" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3.4 }} />
      <path d="M36 85 C57 99 83 99 104 85" fill="none" stroke="#FFF8EA" strokeOpacity="0.75" strokeWidth="5" strokeLinecap="round" />
      <path d="M99 61 L107 69 L120 51" fill="none" stroke="#FFF8EA" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
}
