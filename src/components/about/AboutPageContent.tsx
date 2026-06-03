"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Network, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { AboutFeatureCard } from "@/components/about/AboutFeatureCard";
import { AboutVisual } from "@/components/about/AboutVisual";
import { BuilderContributorSection } from "@/components/about/BuilderContributorSection";
import { PrivacySafetySection } from "@/components/about/PrivacySafetySection";
import { RialoFitSection } from "@/components/about/RialoFitSection";
import { aboutPillars, aboutStats, matterCards } from "@/data/about";

export function AboutPageContent() {
  return (
    <div className="grid gap-10">
      <section className="grid gap-8 rounded-[2.6rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-2 text-xs font-semibold uppercase text-oliveDeep">
            <ShieldCheck className="h-4 w-4" />
            About Alodoc
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-cocoa sm:text-6xl">
            A calmer gateway to health understanding.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-cocoaSoft sm:text-lg">
            Alodoc is a bilingual health education dApp that helps users understand common diseases through short learning cards, quizzes, animated educational visuals, and privacy-safe learning progress. It is not a diagnosis app, doctor consultation app, or medical record platform.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/library" className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-cocoa px-5 py-3 text-sm font-semibold text-cream shadow-lift">
              Explore Library <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/about" className="focus-ring inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-cocoa shadow-lift">
              Safety & Privacy
            </Link>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {aboutStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="rounded-3xl bg-white/80 p-4 shadow-lift">
                  <Icon className="h-5 w-5 text-oliveDeep" />
                  <p className="mt-3 text-2xl font-semibold text-cocoa">{stat.value}</p>
                  <p className="text-xs font-medium uppercase text-cocoaSoft">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
        <AboutVisual />
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {aboutPillars.map((point, index) => (
          <AboutFeatureCard key={point.title} index={index} icon={point.icon} title={point.title} text={point.text} />
        ))}
      </section>

      <section className="rounded-[2.4rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-oliveDeep">Why Alodoc matters</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-cocoa sm:text-5xl">Health literacy should feel clear before it feels scary.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {matterCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[2rem] bg-white p-5 shadow-lift"
              >
                <h3 className="text-xl font-semibold leading-tight text-cocoa">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-cocoaSoft">{card.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <BuilderContributorSection />

      <section className="grid gap-5 rounded-[2.4rem] border border-cocoa/10 bg-parchment p-5 shadow-soft sm:p-8 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="grid h-20 w-20 place-items-center rounded-[1.8rem] bg-cocoa text-cream shadow-lift">
          <Network className="h-9 w-9" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase text-oliveDeep">Why Arc Testnet now</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-cocoa">Build now, prove the concept live.</h2>
          <p className="mt-4 text-sm leading-6 text-cocoaSoft">
            Alodoc is currently deployed on Arc Testnet as a practical proof-of-concept. This allows the learning passport, quiz completion, and onchain proof-of-learning flow to be tested in a live blockchain environment while the broader Rialo deployment path is still being prepared.
          </p>
        </div>
      </section>

      <RialoFitSection />
      <PrivacySafetySection />

      <section className="rounded-[2.4rem] border border-cocoa/10 bg-parchment p-5 text-center shadow-soft sm:p-8">
        <BookOpen className="mx-auto h-8 w-8 text-oliveDeep" />
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight text-cocoa sm:text-5xl">Education only, built with care.</h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-cocoaSoft">
          Alodoc does not provide diagnosis, treatment decisions, or emergency medical advice. If symptoms are severe, persistent, or concerning, consult a qualified healthcare professional.
        </p>
      </section>
    </div>
  );
}
