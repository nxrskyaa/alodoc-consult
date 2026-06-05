"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Play, RotateCcw, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type LayerKey = "signal" | "task" | "tutor" | "food" | "lifestyle" | "judge" | "proof";
type SignalKey = "bp" | "sugar" | "bmi" | "cold" | "dengue";

type ModuleLink = {
  label: string;
  href: string;
};

type Layer = {
  key: LayerKey;
  number: string;
  title: string;
  role: string;
  short: string;
  explanation: string;
  example: string;
  why: string;
};

type SampleSignal = {
  key: SignalKey;
  title: string;
  example: string;
  recommended: ModuleLink[];
  output: {
    signal: string;
    task: string;
    tutor: string;
    food: string;
    lifestyle: string;
    judge: string;
    proof: string;
  };
};

const layers: Layer[] = [
  {
    key: "signal",
    number: "01",
    title: "Signal",
    role: "Input awareness layer",
    short: "Reads educational context without treating it as diagnosis.",
    explanation:
      "Signal receives educational context from Alodoc tools such as the Classifier or learning modules. A signal can be a blood pressure range, blood sugar range, BMI range, or selected health topic. Alo Agent does not treat it as a diagnosis. It treats it as a starting point for education.",
    example: "145/92 mmHg becomes an education signal, not a diagnosis.",
    why: "This keeps Alodoc focused on learning instead of medical decision-making."
  },
  {
    key: "task",
    number: "02",
    title: "Task",
    role: "Learning objective layer",
    short: "Transforms the signal into a clear learning objective.",
    explanation:
      "Task turns the signal into a safe learning objective. Instead of jumping to conclusions, Alo Agent decides what the user should learn from the signal.",
    example: "Create task: explain high blood pressure range in simple language.",
    why: "A clear task prevents vague or unsafe health output."
  },
  {
    key: "tutor",
    number: "03",
    title: "Tutor",
    role: "Bilingual explanation layer",
    short: "Explains the topic in simple Indonesian and English.",
    explanation:
      "Tutor explains the topic in simple Indonesian and English. It avoids heavy medical jargon and helps users understand the basics clearly.",
    example: "Explain hypertension basics in simple words.",
    why: "Health education only works if users can actually understand it."
  },
  {
    key: "food",
    number: "04",
    title: "Food",
    role: "Healthy food education layer",
    short: "Adds general food literacy linked to the topic.",
    explanation:
      "Food adds general nutrition education related to the learning context. For blood pressure, it can explain salt awareness and processed food. For blood sugar, it can explain sugary drinks, fiber, portions, and balanced meals. For BMI, it can explain sustainable eating habits. For common cold and dengue, it can explain hydration and maintaining intake when possible. It does not create a personal diet plan.",
    example: "Add food education: reduce sugary drinks, understand portions, stay hydrated, and choose balanced meals.",
    why: "Many common health topics are connected to everyday eating patterns, so food education makes the learning more practical."
  },
  {
    key: "lifestyle",
    number: "05",
    title: "Lifestyle",
    role: "Daily habit education layer",
    short: "Connects the topic to practical daily habits.",
    explanation:
      "Lifestyle connects the topic to everyday habits such as sleep, physical activity, hydration, stress management, hand hygiene, mosquito prevention, smoking awareness, and routine check-ups. It gives general education, not personal treatment instructions.",
    example: "Add lifestyle context: walking, sleep, hydration, stress, prevention, and monitoring.",
    why: "Health education becomes more useful when users can connect it to daily behavior."
  },
  {
    key: "judge",
    number: "06",
    title: "Judge",
    role: "Safety review layer",
    short: "Checks safety boundaries before output is shown.",
    explanation:
      "Judge checks whether the output stays within Alodoc's safety boundaries. It makes sure the content does not diagnose, prescribe treatment, claim certainty, or store private medical data.",
    example: "Check: no diagnosis, no treatment decision, education only.",
    why: "This protects users and keeps Alodoc responsible."
  },
  {
    key: "proof",
    number: "07",
    title: "Proof",
    role: "Learning proof layer",
    short: "Connects safe education to quizzes, badges, and passport progress.",
    explanation:
      "Proof connects the learning journey to Alodoc's Web3 layer. After learning, users can complete quizzes and earn onchain proof-of-learning badges. This proof represents learning progress only, not medical records.",
    example: "Complete Hypertension quiz -> earn learning badge.",
    why: "Users can build a Health Literacy Passport without exposing private medical data."
  }
];

const sampleSignals: SampleSignal[] = [
  {
    key: "bp",
    title: "Elevated blood pressure reading",
    example: "145/92 mmHg",
    recommended: [{ label: "Hypertension", href: "/disease/hypertension" }],
    output: {
      signal: "The example signal is an elevated blood pressure reading: 145/92 mmHg.",
      task: "Explain what a high blood pressure range means in simple language.",
      tutor:
        "This reading is in a high adult blood pressure education range. A single reading is not enough for diagnosis, but it is a useful signal to learn about hypertension, repeated measurements, and lifestyle factors.",
      food:
        "Helpful food topics to learn include reducing excessive salt intake, choosing more fruits and vegetables, understanding processed foods, reading nutrition labels, and building balanced meals.",
      lifestyle:
        "Relevant lifestyle topics include regular walking or physical activity, sleep quality, stress management, avoiding smoking, limiting alcohol, and routine blood pressure monitoring.",
      judge:
        "Safe output confirmed. No diagnosis or treatment decision is given. The user is reminded to confirm concerning readings with a qualified healthcare professional.",
      proof: "Recommended module: Hypertension. Complete the quiz to earn an onchain learning badge."
    }
  },
  {
    key: "sugar",
    title: "High fasting blood sugar reading",
    example: "132 mg/dL",
    recommended: [{ label: "Type 2 Diabetes", href: "/disease/type-2-diabetes" }],
    output: {
      signal: "The example signal is a fasting blood sugar value: 132 mg/dL.",
      task: "Explain what an elevated fasting glucose range generally means.",
      tutor:
        "This fasting value is above the usual adult range used for education. It is not a diagnosis and should be confirmed with proper medical testing.",
      food:
        "Helpful food topics to learn include balanced portions, sugar awareness, fiber-rich foods, reducing sugary drinks, understanding refined carbohydrates, and building consistent meal habits.",
      lifestyle: "Relevant lifestyle topics include regular physical activity, sleep, weight management, hydration, stress awareness, and routine check-ups.",
      judge: "Safe output confirmed. No diagnosis or treatment decision was provided.",
      proof: "Recommended module: Type 2 Diabetes. Complete the quiz to earn an onchain learning badge."
    }
  },
  {
    key: "bmi",
    title: "BMI overweight range",
    example: "BMI 27.4",
    recommended: [
      { label: "Type 2 Diabetes", href: "/disease/type-2-diabetes" },
      { label: "Hypertension", href: "/disease/hypertension" }
    ],
    output: {
      signal: "The example signal is a BMI value: 27.4.",
      task: "Explain what the overweight BMI range generally means.",
      tutor:
        "This BMI is in the overweight range for adult education. BMI is only a screening tool and does not directly measure body fat or account for muscle mass, pregnancy, age, sex, or individual medical context.",
      food:
        "Helpful food topics to learn include balanced meals, portion awareness, protein and fiber, reducing sugary drinks, limiting ultra-processed foods, and building sustainable eating habits.",
      lifestyle:
        "Relevant lifestyle topics include walking, strength-friendly movement, sleep consistency, stress management, and learning how weight, blood pressure, and blood sugar can be connected.",
      judge: "Safe output confirmed. BMI limitations are included. No diagnosis is given.",
      proof: "Recommended modules: Type 2 Diabetes and Hypertension."
    }
  },
  {
    key: "cold",
    title: "Common cold education request",
    example: "runny nose, mild cough, sore throat learning context",
    recommended: [{ label: "Common Cold", href: "/disease/common-cold" }],
    output: {
      signal: "The example signal is a request to learn about runny nose, mild cough, and sore throat.",
      task: "Explain common cold basics in a simple and safe way.",
      tutor:
        "Common cold is usually a mild viral infection of the upper respiratory tract. It often improves on its own. Antibiotics are not routinely used because common cold is usually caused by viruses.",
      food: "Helpful food topics to learn include staying hydrated, eating nourishing meals, warm fluids if comfortable, and avoiding dehydration while sick.",
      lifestyle:
        "Relevant lifestyle topics include rest, sleep, hand hygiene, wearing a mask when sick, avoiding close contact while symptomatic, and watching for red flags.",
      judge: "Safe output confirmed. No diagnosis is given. Red flag reminders should be shown.",
      proof: "Recommended module: Common Cold."
    }
  },
  {
    key: "dengue",
    title: "Dengue awareness request",
    example: "fever and mosquito exposure awareness",
    recommended: [{ label: "Dengue Fever", href: "/disease/dengue-fever" }],
    output: {
      signal: "The example signal is a dengue awareness learning request.",
      task: "Explain dengue warning signs and prevention in simple language.",
      tutor:
        "Dengue is a mosquito-borne viral infection. Important warning signs include severe abdominal pain, persistent vomiting, bleeding, extreme weakness, breathing difficulty, or cold clammy skin.",
      food: "Helpful food topics to learn include hydration awareness, maintaining food intake when possible, and understanding why medical guidance matters when warning signs appear.",
      lifestyle:
        "Relevant prevention topics include removing standing water, avoiding mosquito bites, using repellents, wearing protective clothing, and supporting community mosquito control.",
      judge: "Safe output confirmed. Urgent care reminder is included for warning signs.",
      proof: "Recommended module: Dengue Fever."
    }
  }
];

const outputLabels = [
  { key: "signal", title: "Signal understood" },
  { key: "task", title: "Learning task created" },
  { key: "tutor", title: "Tutor explanation" },
  { key: "food", title: "Healthy food education" },
  { key: "lifestyle", title: "Healthy lifestyle education" },
  { key: "judge", title: "Safety judge result" },
  { key: "proof", title: "Next learning proof" }
] as const;

const comparisonCards = [
  {
    title: "Library",
    body: "Learn disease modules through structured bilingual cards."
  },
  {
    title: "Classifier",
    body: "Check blood pressure, blood sugar, and BMI for educational guidance."
  },
  {
    title: "Alo Agent",
    body: "Turns signals into structured education with tutor explanation, healthy food guidance, lifestyle context, safety review, and proof of learning."
  }
];

const walkthrough = [
  { layer: "Signal", text: "145/92 mmHg", key: "signal" as LayerKey },
  { layer: "Task", text: "explain high blood pressure range", key: "task" as LayerKey },
  { layer: "Tutor", text: "explain repeated measurements and hypertension basics", key: "tutor" as LayerKey },
  { layer: "Food", text: "salt awareness, processed foods, balanced meals", key: "food" as LayerKey },
  { layer: "Lifestyle", text: "walking, sleep, stress, smoking, monitoring", key: "lifestyle" as LayerKey },
  { layer: "Judge", text: "no diagnosis or treatment claim", key: "judge" as LayerKey },
  { layer: "Proof", text: "Hypertension quiz and badge", key: "proof" as LayerKey }
];

const safetyCards = ["No diagnosis", "No personal diet plan", "No medical records", "Learning proof only"];

const revealContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const revealItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" } }
};

export function AloAgentPage() {
  const [selectedSignal, setSelectedSignal] = useState<SignalKey>("bp");
  const [activeStep, setActiveStep] = useState<LayerKey>("signal");
  const [hasRun, setHasRun] = useState(false);
  const [activeLayer, setActiveLayer] = useState<LayerKey>("food");
  const [activeShowcase, setActiveShowcase] = useState<SignalKey>("bp");
  const timers = useRef<number[]>([]);

  const selected = useMemo(() => sampleSignals.find((signal) => signal.key === selectedSignal) ?? sampleSignals[0], [selectedSignal]);
  const showcase = useMemo(() => sampleSignals.find((signal) => signal.key === activeShowcase) ?? sampleSignals[0], [activeShowcase]);

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  function runAgent() {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setHasRun(false);

    layers.forEach((layer, index) => {
      const timer = window.setTimeout(() => {
        setActiveStep(layer.key);
        if (index === layers.length - 1) {
          setHasRun(true);
        }
      }, index * 280);
      timers.current.push(timer);
    });
  }

  function resetAgent() {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setHasRun(false);
    setActiveStep("signal");
  }

  return (
    <div className="mx-auto w-full max-w-7xl overflow-x-hidden px-4 pb-28 sm:px-6 lg:px-8">
      <div className="grid gap-14 sm:gap-16 lg:gap-20">
        <AgentHero />
        <AgentWorkflowSimulator
          selected={selected}
          selectedSignal={selectedSignal}
          activeStep={activeStep}
          hasRun={hasRun}
          onSelectSignal={(key) => {
            setSelectedSignal(key);
            setHasRun(false);
            setActiveStep("signal");
          }}
          onSelectStep={setActiveStep}
          onRun={runAgent}
          onReset={resetAgent}
        />
        <AgentLayerDeepDive activeLayer={activeLayer} onSelectLayer={setActiveLayer} />
        <AgentOutputShowcase activeShowcase={activeShowcase} showcase={showcase} onSelectShowcase={setActiveShowcase} />
        <AgentComparisonSection />
        <AgentExampleWalkthrough />
        <AgentSafetySection />
      </div>
    </div>
  );
}

function AgentHero() {
  return (
    <section className="grid min-w-0 grid-cols-1 items-center gap-8 rounded-[2.5rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
      <motion.div variants={revealContainer} initial="hidden" animate="show" className="min-w-0">
        <motion.p variants={revealItem} className="text-sm font-black uppercase tracking-[0.18em] text-oliveDeep">
          Alo Agent
        </motion.p>
        <motion.h1 variants={revealItem} className="mt-4 max-w-3xl text-4xl font-black leading-[1.04] text-cocoa sm:text-5xl lg:text-6xl">
          Turn health signals into safer learning.
        </motion.h1>
        <motion.p variants={revealItem} className="mt-5 max-w-2xl text-lg font-extrabold leading-8 text-cocoa sm:text-xl">
          Alo Agent transforms classifier results and learning context into bilingual health education, healthy food guidance, lifestyle education, safety review, and proof of learning.
        </motion.p>
        <motion.p variants={revealItem} className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-cocoaSoft sm:text-base">
          Alo Agent is not a doctor and does not provide diagnosis. It helps users understand common health topics, what food habits matter, what lifestyle factors matter, and which Alodoc module to continue.
        </motion.p>
        <motion.div variants={revealItem} className="mt-6 flex flex-wrap gap-2">
          {["Built on Rialo", "SCALE-inspired", "Education only", "Privacy-safe"].map((pill) => (
            <span key={pill} className="rounded-full bg-white px-4 py-2 text-xs font-black text-oliveDeep shadow-lift">
              {pill}
            </span>
          ))}
        </motion.div>
        <motion.div variants={revealItem} className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#workflow" className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-alertClay/90 active:scale-[0.98]">
            Explore Agent Flow <ArrowRight className="h-4 w-4" />
          </a>
          <Link href="/classifier" className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-cocoa shadow-lift transition hover:-translate-y-0.5 hover:bg-mint active:scale-[0.98]">
            Try Classifier
          </Link>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.12, duration: 0.5 }} className="min-w-0">
        <AgentOrbVisual />
      </motion.div>
    </section>
  );
}

function AgentOrbVisual() {
  const orbitLabels = ["Signal", "Task", "Tutor", "Food", "Lifestyle", "Judge", "Proof"];

  return (
    <div className="relative min-h-[430px] w-full max-w-full overflow-hidden rounded-[2.3rem] border border-cocoa/10 bg-cream p-4 shadow-soft sm:min-h-[500px] sm:p-6">
      <motion.div aria-hidden className="pointer-events-none absolute left-8 top-9 h-24 w-24 rounded-full bg-mint/65 blur-3xl" animate={{ opacity: [0.45, 0.8, 0.45], scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} />
      <motion.div aria-hidden className="pointer-events-none absolute bottom-14 right-10 h-28 w-28 rounded-full bg-orange/18 blur-3xl" animate={{ opacity: [0.35, 0.7, 0.35], scale: [1.04, 1, 1.04] }} transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }} />

      <div className="relative z-10 mx-auto flex h-full min-h-[398px] max-w-[470px] flex-col items-center justify-center gap-4 sm:min-h-[456px]">
        <div className="grid w-full grid-cols-3 gap-2">
          {orbitLabels.map((label, index) => (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * index, duration: 0.32 }}
              className={cn(
                "rounded-full border border-cocoa/10 bg-white px-2 py-2 text-center text-[10px] font-black uppercase text-cocoaSoft shadow-lift sm:text-xs",
                label === "Food" || label === "Lifestyle" ? "bg-mint text-oliveDeep" : ""
              )}
            >
              {label}
            </motion.span>
          ))}
        </div>

        <div className="relative grid h-[260px] w-full place-items-center sm:h-[300px]">
          <motion.svg viewBox="0 0 360 280" className="h-full w-full max-w-[390px]" role="img" aria-label="Animated Alo Agent signal to proof pipeline">
            <defs>
              <linearGradient id="agentCore" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#90A090" />
                <stop offset="100%" stopColor="#C9A668" />
              </linearGradient>
            </defs>
            <motion.path d="M42 138 C86 78 112 202 158 142 C201 86 223 194 267 134 C291 104 315 118 334 134" fill="none" stroke="#708473" strokeWidth="8" strokeLinecap="round" strokeDasharray="18 18" animate={{ strokeDashoffset: [0, -72] }} transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }} opacity="0.42" />
            {[40, 67, 94].map((x, index) => (
              <motion.circle key={x} cx={x} cy={124 + index * 23} r="8" fill={index === 1 ? "#C9A668" : "#90A090"} animate={{ x: [0, 32, 0], opacity: [0.55, 1, 0.55], scale: [0.92, 1.12, 0.92] }} transition={{ repeat: Infinity, duration: 2.6, delay: index * 0.25, ease: "easeInOut" }} />
            ))}
            <motion.g animate={{ y: [0, -7, 0], scale: [1, 1.025, 1] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}>
              <rect x="123" y="58" width="118" height="118" rx="38" fill="url(#agentCore)" opacity="0.2" />
              <rect x="136" y="70" width="92" height="92" rx="31" fill="#fffaf1" stroke="#202020" strokeOpacity="0.12" strokeWidth="2" />
              <path d="M164 119 C164 103 176 92 182 88 C188 92 200 103 200 119 C200 135 190 145 182 151 C174 145 164 135 164 119Z" fill="#90A090" />
              <rect x="156" y="111" width="13" height="52" rx="7" fill="#202020" transform="rotate(-38 162 137)" />
              <rect x="195" y="111" width="13" height="52" rx="7" fill="#202020" transform="rotate(38 201 137)" />
              <circle cx="182" cy="160" r="10" fill="#C9A668" />
            </motion.g>
            <motion.g animate={{ x: [0, 7, 0], y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}>
              <rect x="244" y="176" width="92" height="64" rx="22" fill="#fff" stroke="#202020" strokeOpacity="0.12" />
              <circle cx="270" cy="207" r="16" fill="#F0D9A2" />
              <path d="M264 207 L270 213 L280 200" fill="none" stroke="#708473" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="293" y="194" width="23" height="7" rx="4" fill="#90A090" />
              <rect x="293" y="208" width="31" height="7" rx="4" fill="#C9A668" />
            </motion.g>
          </motion.svg>
        </div>

        <div className="grid w-full grid-cols-2 gap-3">
          <MiniStatusCard label="Food education" value="balanced habits" />
          <MiniStatusCard label="Proof output" value="learning only" />
        </div>
      </div>
    </div>
  );
}

function MiniStatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-cocoa/10 bg-white px-4 py-3 shadow-lift">
      <p className="text-[10px] font-black uppercase text-cocoaSoft">{label}</p>
      <p className="mt-1 truncate text-sm font-black text-cocoa">{value}</p>
    </div>
  );
}

function AgentWorkflowSimulator({
  selected,
  selectedSignal,
  activeStep,
  hasRun,
  onSelectSignal,
  onSelectStep,
  onRun,
  onReset
}: {
  selected: SampleSignal;
  selectedSignal: SignalKey;
  activeStep: LayerKey;
  hasRun: boolean;
  onSelectSignal: (key: SignalKey) => void;
  onSelectStep: (key: LayerKey) => void;
  onRun: () => void;
  onReset: () => void;
}) {
  const activeLayer = layers.find((layer) => layer.key === activeStep) ?? layers[0];

  return (
    <section id="workflow" className="scroll-mt-28">
      <SectionHeader
        eyebrow="Alo Agent Workflow"
        title="Choose a sample signal and see how Alo Agent creates safe education, food guidance, lifestyle context, and learning proof."
        body="This is frontend-only and educational. It does not store medical data, call a backend, or make diagnosis claims."
      />

      <div className="mt-7 grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[0.92fr_0.92fr_1.16fr]">
        <motion.div variants={revealContainer} initial="hidden" animate="show" className="min-w-0 rounded-[2rem] border border-cocoa/10 bg-white p-4 shadow-soft sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase text-oliveDeep">Signal selector</p>
              <h3 className="mt-1 text-2xl font-black text-cocoa">Sample input</h3>
            </div>
            <LayerVisual layer="signal" compact />
          </div>

          <div className="mt-5 grid gap-3">
            {sampleSignals.map((signal) => (
              <motion.button
                key={signal.key}
                type="button"
                variants={revealItem}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => onSelectSignal(signal.key)}
                className={cn(
                  "focus-ring w-full min-w-0 rounded-2xl border p-4 text-left transition",
                  selectedSignal === signal.key ? "border-orange bg-orange/10 shadow-lift" : "border-cocoa/10 bg-cream hover:border-olive/30"
                )}
              >
                <p className="text-sm font-black text-cocoa">{signal.title}</p>
                <p className="mt-1 text-xs font-bold leading-5 text-cocoaSoft">{signal.example}</p>
              </motion.button>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <button type="button" onClick={onRun} className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 active:scale-[0.98]">
              <Play className="h-4 w-4" /> Run Alo Agent
            </button>
            <button type="button" onClick={onReset} className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 active:scale-[0.98]">
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </motion.div>

        <div className="min-w-0 rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase text-oliveDeep">Agent pipeline</p>
              <h3 className="mt-1 text-2xl font-black text-cocoa">{activeLayer.title}</h3>
            </div>
            <LayerVisual layer={activeStep} compact />
          </div>
          <div className="relative grid gap-3">
            <div className="pointer-events-none absolute bottom-8 left-6 top-8 w-px bg-olive/25" />
            {layers.map((layer) => {
              const active = layer.key === activeStep;
              return (
                <motion.button
                  key={layer.key}
                  type="button"
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onSelectStep(layer.key)}
                  className={cn(
                    "focus-ring relative z-10 grid w-full min-w-0 grid-cols-[3rem_minmax(0,1fr)] items-center gap-3 rounded-2xl border p-3 text-left transition",
                    active ? "border-orange bg-white shadow-lift ring-4 ring-orange/10" : "border-cocoa/10 bg-white/70 hover:bg-white"
                  )}
                >
                  <motion.span animate={active ? { scale: [1, 1.07, 1] } : { scale: 1 }} transition={{ repeat: active ? Infinity : 0, duration: 1.8 }} className={cn("grid h-11 w-11 place-items-center rounded-2xl text-xs font-black", active ? "bg-orange text-white" : "bg-mint text-oliveDeep")}>
                    {layer.number}
                  </motion.span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black text-cocoa">{layer.title}</span>
                    <span className="block text-xs font-bold leading-5 text-cocoaSoft">{layer.short}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <AgentOutputPanel selected={selected} hasRun={hasRun} />
      </div>
    </section>
  );
}

function AgentOutputPanel({ selected, hasRun }: { selected: SampleSignal; hasRun: boolean }) {
  return (
    <div className="min-w-0 rounded-[2rem] border border-cocoa/10 bg-white p-4 shadow-soft sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase text-oliveDeep">Agent output</p>
          <h3 className="mt-1 text-2xl font-black text-cocoa">Structured learning report</h3>
        </div>
        <motion.div animate={hasRun ? { scale: [1, 1.08, 1], rotate: [0, 3, 0] } : { y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: hasRun ? 2.4 : 2.8, ease: "easeInOut" }} className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-mint">
          <LayerVisual layer={hasRun ? "proof" : "tutor"} compact />
        </motion.div>
      </div>

      {!hasRun ? (
        <div className="mt-5 rounded-[1.5rem] border border-dashed border-olive/30 bg-cream p-5">
          <p className="text-sm font-black text-cocoa">Run Alo Agent to generate the report.</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">
            The output appears after Signal, Task, Tutor, Food, Lifestyle, Judge, and Proof have passed through the simulated pipeline.
          </p>
          <div className="mt-4 flex gap-1">
            {[0, 1, 2].map((dot) => (
              <motion.span key={dot} className="h-2.5 w-2.5 rounded-full bg-orange" animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: dot * 0.15 }} />
            ))}
          </div>
        </div>
      ) : (
        <motion.div variants={revealContainer} initial="hidden" animate="show" className="mt-5 grid gap-3">
          {outputLabels.map((label) => (
            <motion.div key={label.key} variants={revealItem} className="rounded-[1.35rem] border border-cocoa/10 bg-cream p-4">
              <p className="text-xs font-black uppercase text-oliveDeep">{label.title}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">{selected.output[label.key]}</p>
            </motion.div>
          ))}
          <motion.div variants={revealItem} className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {selected.recommended.map((module) => (
              <Link key={module.href} href={module.href} className="focus-ring inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 active:scale-[0.98]">
                Start {module.label} <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function AgentLayerDeepDive({ activeLayer, onSelectLayer }: { activeLayer: LayerKey; onSelectLayer: (key: LayerKey) => void }) {
  return (
    <section>
      <SectionHeader
        eyebrow="What each Alo Agent layer does"
        title="Alo Agent is not only a content page."
        body="Each layer has a role in turning health signals into safe, useful, and practical education."
      />

      <div className="mt-7 flex flex-wrap gap-2">
        {layers.map((layer) => (
          <button
            key={layer.key}
            type="button"
            onClick={() => onSelectLayer(layer.key)}
            className={cn(
              "focus-ring rounded-full px-4 py-2 text-xs font-black transition",
              activeLayer === layer.key ? "bg-orange text-white shadow-lift" : "bg-white text-cocoaSoft hover:bg-mint hover:text-oliveDeep"
            )}
          >
            {layer.title}
          </button>
        ))}
      </div>

      <motion.div variants={revealContainer} initial="hidden" animate="show" className="mt-7 grid gap-6">
        {layers.map((layer, index) => (
          <motion.article
            key={layer.key}
            variants={revealItem}
            className={cn(
              "grid min-w-0 grid-cols-1 gap-5 rounded-[2.2rem] border border-cocoa/10 bg-white p-5 shadow-soft sm:p-6 lg:grid-cols-2 lg:items-center",
              activeLayer === layer.key ? "ring-4 ring-orange/10" : ""
            )}
          >
            <div className={cn("min-w-0", index % 2 === 1 ? "lg:order-2" : "")}>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-mint px-3 py-1 text-xs font-black uppercase text-oliveDeep">{layer.role}</span>
                <span className="rounded-full bg-cream px-3 py-1 text-xs font-black text-cocoaSoft">{layer.number}</span>
              </div>
              <h3 className="text-3xl font-black text-cocoa">{layer.title} Layer</h3>
              <p className="mt-4 text-sm font-semibold leading-7 text-cocoaSoft">{layer.explanation}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoBox title="Example" body={layer.example} />
                <InfoBox title="Why it matters" body={layer.why} />
              </div>
            </div>
            <div className="min-w-0">
              <div className="relative min-h-[280px] overflow-hidden rounded-[1.8rem] bg-parchment p-4 sm:min-h-[320px]">
                <LayerVisual layer={layer.key} large />
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function AgentOutputShowcase({
  activeShowcase,
  showcase,
  onSelectShowcase
}: {
  activeShowcase: SignalKey;
  showcase: SampleSignal;
  onSelectShowcase: (key: SignalKey) => void;
}) {
  return (
    <section>
      <SectionHeader
        eyebrow="Alo Agent output is structured, not random."
        title="The report separates tutoring, food, lifestyle, safety, and modules."
        body="This makes Alo Agent different from a disease page or a number classifier. It turns an educational signal into a practical learning shape."
      />

      <div className="mt-7 rounded-[2.2rem] border border-cocoa/10 bg-parchment p-4 shadow-soft sm:p-6">
        <div className="flex flex-wrap gap-2">
          {sampleSignals.map((signal) => (
            <button
              key={signal.key}
              type="button"
              onClick={() => onSelectShowcase(signal.key)}
              className={cn(
                "focus-ring rounded-full px-4 py-2 text-xs font-black transition",
                activeShowcase === signal.key ? "bg-orange text-white shadow-lift" : "bg-white text-cocoaSoft hover:bg-mint hover:text-oliveDeep"
              )}
            >
              {signal.key === "bp" ? "Blood Pressure" : signal.key === "sugar" ? "Blood Sugar" : signal.key === "bmi" ? "BMI" : signal.key === "cold" ? "Common Cold" : "Dengue"}
            </button>
          ))}
        </div>

        <motion.div key={showcase.key} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mt-5 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="min-w-0 rounded-[1.8rem] bg-white p-5 shadow-lift">
            <p className="text-xs font-black uppercase text-oliveDeep">Selected signal</p>
            <h3 className="mt-2 text-3xl font-black text-cocoa">{showcase.title}</h3>
            <p className="mt-3 rounded-2xl bg-cream px-4 py-3 text-sm font-black text-cocoa">{showcase.example}</p>
            <div className="mt-5 min-h-[220px] overflow-hidden rounded-[1.5rem] bg-parchment p-3">
              <LayerVisual layer={showcase.key === "cold" || showcase.key === "dengue" ? "tutor" : showcase.key === "bmi" ? "food" : showcase.key === "bp" ? "lifestyle" : "food"} large />
            </div>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2">
            <InfoBox title="Tutor explanation" body={showcase.output.tutor} />
            <InfoBox title="Food guidance" body={showcase.output.food} />
            <InfoBox title="Lifestyle guidance" body={showcase.output.lifestyle} />
            <InfoBox title="Safety note" body={showcase.output.judge} />
            <div className="rounded-[1.5rem] border border-cocoa/10 bg-white p-4 shadow-lift sm:col-span-2">
              <p className="text-xs font-black uppercase text-oliveDeep">Recommended module</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">{showcase.output.proof}</p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {showcase.recommended.map((module) => (
                  <Link key={module.href} href={module.href} className="focus-ring inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 active:scale-[0.98]">
                    Open {module.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AgentComparisonSection() {
  return (
    <section>
      <SectionHeader
        eyebrow="How Alo Agent is different"
        title="Library teaches, Classifier checks, Alo Agent connects the journey."
        body="Alo Agent is the bridge between raw educational signals, practical guidance, safety boundaries, and proof of learning."
      />

      <motion.div variants={revealContainer} initial="hidden" animate="show" className="mt-7 grid gap-4 md:grid-cols-3">
        {comparisonCards.map((card, index) => (
          <motion.article key={card.title} variants={revealItem} whileHover={{ y: -4 }} className={cn("min-w-0 rounded-[2rem] border border-cocoa/10 bg-white p-5 shadow-soft", index === 2 ? "bg-cocoa text-white" : "")}>
            <div className={cn("mb-4 grid h-16 w-16 place-items-center rounded-2xl", index === 2 ? "bg-orange/25" : "bg-mint")}>
              <LayerVisual layer={index === 0 ? "tutor" : index === 1 ? "signal" : "proof"} compact />
            </div>
            <h3 className={cn("text-2xl font-black", index === 2 ? "text-white" : "text-cocoa")}>{card.title}</h3>
            <p className={cn("mt-3 text-sm font-semibold leading-7", index === 2 ? "text-white/78" : "text-cocoaSoft")}>{card.body}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function AgentExampleWalkthrough() {
  return (
    <section>
      <SectionHeader
        eyebrow="Example walkthrough: elevated blood pressure"
        title="A number becomes a safe education path."
        body="The agent does not diagnose. It turns the signal into a structured learning journey and points users back to Alodoc modules, quiz, and proof."
      />

      <motion.div variants={revealContainer} initial="hidden" animate="show" className="relative mt-7 rounded-[2.2rem] border border-cocoa/10 bg-white p-4 shadow-soft sm:p-6">
        <div className="pointer-events-none absolute bottom-8 left-[2.15rem] top-8 w-px bg-olive/25 sm:left-[2.65rem]" />
        <div className="grid gap-4">
          {walkthrough.map((step, index) => (
            <motion.div key={`${step.layer}-${step.text}`} variants={revealItem} className="relative z-10 grid min-w-0 grid-cols-[3.2rem_minmax(0,1fr)] gap-3 sm:grid-cols-[4rem_minmax(0,1fr)]">
              <motion.div animate={{ scale: index === 0 ? [1, 1.08, 1] : 1 }} transition={{ repeat: index === 0 ? Infinity : 0, duration: 2 }} className="grid h-12 w-12 place-items-center rounded-2xl bg-mint sm:h-14 sm:w-14">
                <LayerVisual layer={step.key} compact />
              </motion.div>
              <div className="min-w-0 rounded-[1.5rem] border border-cocoa/10 bg-cream p-4">
                <p className="text-xs font-black uppercase text-oliveDeep">{step.layer}</p>
                <p className="mt-1 text-base font-black text-cocoa">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function AgentSafetySection() {
  return (
    <section className="rounded-[2.3rem] border border-cocoa/10 bg-cocoa p-5 text-white shadow-soft sm:p-7">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-orange/20">
            <ShieldCheck className="h-8 w-8 text-orange" />
          </div>
          <p className="text-sm font-black uppercase text-mint">Safe by design</p>
          <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">Education first. Safety always visible.</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-white/78">
            Alo Agent is for education only. It does not provide diagnosis, treatment decisions, or emergency medical advice.
          </p>
          <p className="mt-3 text-sm font-semibold leading-7 text-white/78">
            Alo Agent hanya untuk edukasi. Fitur ini tidak memberikan diagnosis, keputusan pengobatan, atau saran medis darurat.
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

function InfoBox({ title, body }: { title: string; body: string }) {
  return (
    <div className="min-w-0 rounded-[1.5rem] border border-cocoa/10 bg-white p-4 shadow-lift">
      <p className="text-xs font-black uppercase text-oliveDeep">{title}</p>
      <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">{body}</p>
    </div>
  );
}

function LayerVisual({ layer, compact = false, large = false }: { layer: LayerKey; compact?: boolean; large?: boolean }) {
  const sizeClass = compact ? "h-8 w-8" : large ? "h-full min-h-[240px] w-full" : "h-28 w-full";

  return (
    <motion.div className={cn("relative grid place-items-center overflow-visible", sizeClass)} animate={compact ? { y: [0, -2, 0] } : { y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}>
      {layer === "signal" && <SignalVisual compact={compact} />}
      {layer === "task" && <TaskVisual compact={compact} />}
      {layer === "tutor" && <TutorVisual compact={compact} />}
      {layer === "food" && <FoodVisual compact={compact} />}
      {layer === "lifestyle" && <LifestyleVisual compact={compact} />}
      {layer === "judge" && <JudgeVisual compact={compact} />}
      {layer === "proof" && <ProofVisual compact={compact} />}
    </motion.div>
  );
}

function SignalVisual({ compact }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full max-w-[320px]" aria-hidden="true">
      <rect x="50" y="44" width="62" height="72" rx="24" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.12" />
      <path d="M24 80 C44 56 57 103 80 80 C104 56 116 104 138 80" fill="none" stroke="#708473" strokeWidth={compact ? 7 : 9} strokeLinecap="round" opacity="0.45" />
      {[28, 48, 132].map((cx, index) => (
        <motion.circle key={cx} cx={cx} cy={index === 1 ? 55 : 100} r={compact ? 8 : 10} fill={index === 1 ? "#C9A668" : "#90A090"} animate={{ scale: [0.9, 1.18, 0.9], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.8, delay: index * 0.18 }} />
      ))}
      <circle cx="80" cy="80" r="15" fill="#202020" opacity="0.9" />
    </svg>
  );
}

function TaskVisual({ compact }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full max-w-[320px]" aria-hidden="true">
      <rect x="36" y="30" width="88" height="102" rx="24" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.14" />
      <rect x="58" y="22" width="44" height="20" rx="10" fill="#90A090" />
      {[58, 80, 102].map((y, index) => (
        <g key={y}>
          <motion.circle cx="58" cy={y} r={compact ? 5 : 6} fill="#C9A668" animate={{ scale: [1, 1.18, 1] }} transition={{ repeat: Infinity, duration: 2.1, delay: index * 0.22 }} />
          <rect x="72" y={y - 5} width={index === 1 ? 44 : 36} height="10" rx="5" fill="#202020" opacity="0.85" />
        </g>
      ))}
    </svg>
  );
}

function TutorVisual({ compact }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full max-w-[320px]" aria-hidden="true">
      <motion.path d="M34 48 C55 38 68 43 80 58 C92 43 105 38 126 48 L126 120 C105 110 92 116 80 130 C68 116 55 110 34 120Z" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.14" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2.8 }} />
      <path d="M80 58 L80 130" stroke="#202020" strokeOpacity="0.15" />
      <rect x="48" y="67" width="20" height="8" rx="4" fill="#90A090" />
      <rect x="48" y="83" width="24" height="8" rx="4" fill="#C9A668" />
      <rect x="91" y="67" width="20" height="8" rx="4" fill="#90A090" />
      <rect x="91" y="83" width="24" height="8" rx="4" fill="#C9A668" />
      {!compact && (
        <motion.circle cx="80" cy="42" r="12" fill="#90A090" animate={{ scale: [1, 1.12, 1] }} transition={{ repeat: Infinity, duration: 2.2 }} />
      )}
    </svg>
  );
}

function FoodVisual({ compact }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full max-w-[320px]" aria-hidden="true">
      <circle cx="80" cy="82" r="47" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.14" strokeWidth="2" />
      <path d="M80 35 A47 47 0 0 1 124 96 L80 82Z" fill="#90A090" opacity="0.85" />
      <path d="M80 82 L124 96 A47 47 0 0 1 58 124Z" fill="#C9A668" opacity="0.85" />
      <path d="M80 35 A47 47 0 0 0 58 124 L80 82Z" fill="#F0D9A2" opacity="0.95" />
      <motion.circle cx="52" cy="54" r={compact ? 5 : 7} fill="#90A090" animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} />
      <motion.rect x="113" y="40" width="15" height="15" rx="4" fill="#FFF" stroke="#C9A668" strokeWidth="3" animate={{ rotate: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3 }} />
      <motion.path d="M126 121 C116 109 116 100 126 89 C136 100 136 109 126 121Z" fill="#90A090" animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2.4 }} />
      {!compact && <rect x="33" y="118" width="28" height="10" rx="5" fill="#202020" opacity="0.75" />}
    </svg>
  );
}

function LifestyleVisual({ compact }: { compact?: boolean }) {
  const points = [
    [80, 32],
    [120, 54],
    [120, 106],
    [80, 128],
    [40, 106],
    [40, 54]
  ];
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full max-w-[320px]" aria-hidden="true">
      <motion.circle cx="80" cy="80" r="47" fill="none" stroke="#708473" strokeWidth="2" strokeDasharray="7 9" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: "linear" }} style={{ transformOrigin: "80px 80px" }} />
      <rect x="55" y="55" width="50" height="50" rx="18" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.14" />
      <path d="M69 84 C77 73 83 73 91 84" fill="none" stroke="#202020" strokeWidth="5" strokeLinecap="round" />
      <circle cx="70" cy="71" r="4" fill="#202020" />
      <circle cx="90" cy="71" r="4" fill="#202020" />
      {points.map(([cx, cy], index) => (
        <motion.circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={compact ? 6 : 9} fill={index % 2 ? "#C9A668" : "#90A090"} animate={{ scale: [1, 1.18, 1] }} transition={{ repeat: Infinity, duration: 2.8, delay: index * 0.18 }} />
      ))}
    </svg>
  );
}

function JudgeVisual({ compact }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full max-w-[320px]" aria-hidden="true">
      <path d="M80 26 L122 43 V72 C122 100 104 122 80 135 C56 122 38 100 38 72 V43Z" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.14" strokeWidth="2" />
      <motion.path d="M59 81 L74 96 L103 63" fill="none" stroke="#708473" strokeWidth={compact ? 8 : 10} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="70" animate={{ strokeDashoffset: [70, 0, 0] }} transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }} />
      {!compact && (
        <>
          <rect x="49" y="109" width="62" height="8" rx="4" fill="#C9A668" opacity="0.85" />
          <rect x="56" y="122" width="48" height="7" rx="4" fill="#90A090" opacity="0.9" />
        </>
      )}
    </svg>
  );
}

function ProofVisual({ compact }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 160 160" className="h-full w-full max-w-[320px]" aria-hidden="true">
      <motion.rect x="34" y="42" width="78" height="78" rx="24" fill="#FFF8EA" stroke="#202020" strokeOpacity="0.14" animate={{ x: [34, 40, 34] }} transition={{ repeat: Infinity, duration: 4 }} />
      <rect x="50" y="60" width="34" height="8" rx="4" fill="#90A090" />
      <rect x="50" y="78" width="46" height="8" rx="4" fill="#C9A668" />
      <motion.g animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2.4 }} style={{ transformOrigin: "103px 97px" }}>
        <circle cx="103" cy="97" r="30" fill="#C9A668" />
        <path d="M91 97 L100 106 L116 88" fill="none" stroke="#FFF8EA" strokeWidth={compact ? 6 : 8} strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
      {!compact && (
        <g opacity="0.55">
          <rect x="113" y="35" width="14" height="14" rx="4" fill="#90A090" />
          <rect x="130" y="52" width="14" height="14" rx="4" fill="#90A090" />
          <rect x="119" y="69" width="14" height="14" rx="4" fill="#90A090" />
        </g>
      )}
    </svg>
  );
}
