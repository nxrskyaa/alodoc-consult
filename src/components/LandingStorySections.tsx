"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ArrowRight, Award, BookOpen, CheckCircle2, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { AloGuideBubble } from "@/components/AloGuideBubble";
import { AnimatedDiseaseVisual } from "@/components/AnimatedDiseaseVisual";
import { ClassifierHeroCombo } from "@/components/classifier/visuals/ClassifierHeroCombo";
import { diseases } from "@/data/diseases";

const steps = [
  { title: "Learn", text: "Swipe through bite-sized bilingual cards.", icon: BookOpen },
  { title: "Quiz", text: "Answer friendly fact checks with explanations.", icon: CheckCircle2 },
  { title: "Earn XP", text: "Turn understanding into literacy progress.", icon: Sparkles },
  { title: "Claim Badge", text: "Write proof of learning on Arc Testnet.", icon: Award },
  { title: "Build Passport", text: "Show learning progress without medical records.", icon: Trophy }
];

export function LandingStorySections() {
  return (
    <div className="grid gap-10">
      <section className="overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment py-4 shadow-soft">
        <div className="alodoc-marquee flex w-max gap-3 px-4">
          {[...Array(2)].map((_, group) =>
            ["Education only", "Privacy-safe", "Bilingual", "Onchain learning proof", "No medical records"].map((item) => (
              <span key={`${group}-${item}`} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-cocoaSoft shadow-lift">
                {item}
              </span>
            ))
          )}
        </div>
      </section>

      <section className="alodoc-surface overflow-hidden rounded-[2.4rem] border border-cocoa/10 p-5 shadow-soft sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-oliveDeep">How Alodoc works</p>
            <h2 className="mt-2 text-3xl font-semibold text-cocoa sm:text-5xl">A soft path from learning to proof.</h2>
          </div>
          <Link href="/library" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-semibold text-cream shadow-lift">
            Start a quest <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-[1.8rem] bg-white/86 p-4 shadow-lift"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-oliveDeep">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-cocoa">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-cocoaSoft">{step.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-xs font-semibold uppercase text-oliveDeep">
            <Activity className="h-4 w-4" />
            Health Classifier
          </div>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-cocoa sm:text-5xl">Understand health numbers without storing them.</h2>
          <p className="mt-4 text-sm leading-6 text-cocoaSoft">
            A local-only educational classifier for blood pressure and blood sugar categories. No wallet required, no blockchain write, no passport data, and no medical record.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Browser only", "No storage", "Education only", "ID/EN"].map((item) => (
              <span key={item} className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-cocoaSoft shadow-lift">
                {item}
              </span>
            ))}
          </div>
          <Link href="/classifier" className="focus-ring mt-6 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-semibold text-white shadow-lift">
            Try classifier <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ClassifierHeroCombo />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-8">
          <p className="text-sm font-semibold uppercase text-oliveDeep">Disease quests</p>
          <h2 className="mt-2 text-3xl font-semibold text-cocoa sm:text-5xl">Cute visuals for serious literacy.</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {diseases.slice(0, 4).map((disease) => (
              <Link key={disease.id} href={`/disease/${disease.slug}`} className="group rounded-3xl bg-white p-3 shadow-lift transition hover:-translate-y-1 hover:shadow-soft">
                <AnimatedDiseaseVisual slug={disease.slug} compact className="min-h-[140px] rounded-2xl" />
                <p className="mt-3 font-black text-cocoa">{disease.title.en}</p>
                <p className="text-sm font-semibold text-cocoaSoft">{disease.badgeName.en}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-5">
          <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-8">
            <AnimatedDiseaseVisual slug="passport" className="min-h-[250px]" />
            <h2 className="mt-6 text-3xl font-semibold text-cocoa">Health Literacy Passport</h2>
            <p className="mt-3 text-sm leading-6 text-cocoaSoft">A warm public learning identity with XP, badge reveal, completed quests, and X avatar support.</p>
            <div className="mt-5 flex gap-2">
              <span className="rounded-full bg-mint px-4 py-2 text-xs font-black text-oliveDeep">XP</span>
              <span className="rounded-full bg-orange/15 px-4 py-2 text-xs font-black text-orange">Badge</span>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-cocoaSoft">Private-data safe</span>
            </div>
          </div>
          <AloGuideBubble text="Alodoc keeps the app about learning progress. It does not ask for symptoms, diagnosis, medication, or medical records." />
        </div>
      </section>

      <section className="rounded-[2rem] border border-orange/20 bg-orange/10 p-5 shadow-lift sm:p-8">
        <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
          <div className="grid h-16 w-16 place-items-center rounded-[1.5rem] bg-white text-orange shadow-lift">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-cocoa">Education only, always.</h2>
            <p className="mt-2 text-sm leading-6 text-cocoaSoft">
              Alodoc does not provide diagnosis, treatment decisions, emergency medical advice, or medical records. If symptoms are severe, persistent, or concerning, consult a qualified healthcare professional.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
