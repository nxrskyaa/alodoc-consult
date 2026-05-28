"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { AloGuideBubble } from "@/components/AloGuideBubble";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { FloatingPreviewCards } from "@/components/FloatingPreviewCards";
import { PhoneMockup } from "@/components/PhoneMockup";

export function HeroSection() {
  return (
    <section className="grid min-h-[calc(100vh-132px)] gap-8 pt-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-oliveDeep shadow-lift">
          <Sparkles className="h-4 w-4 text-orange" />
          Alodoc health literacy quests
        </div>
        <h1 className="max-w-3xl text-4xl font-black leading-[1.04] tracking-normal text-cocoa sm:text-5xl md:text-7xl">
          Alodoc makes health learning feel friendly, visual, and worth proving.
        </h1>
        <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-cocoaSoft">
          Learn. Understand. Live well.
          <br />
          Belajar. Pahami. Hidup sehat.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/library" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-[#dc7432]">
            Start Learning <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/library" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-cocoa/10 bg-white px-6 py-4 text-sm font-black text-cocoa shadow-lift transition hover:-translate-y-0.5 hover:bg-mint/60">
            <BookOpen className="h-4 w-4" /> Explore Library
          </Link>
          <ConnectWalletButton />
        </div>
        <div className="mt-6 max-w-xl">
          <AloGuideBubble text="This is general education, not medical advice. Learn concepts, answer quizzes, and keep your private health data private." />
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {["Education only", "Privacy-safe", "Bilingual", "Onchain learning proof"].map((item) => (
            <span key={item} className="rounded-full border border-cocoa/10 bg-parchment px-4 py-2 text-sm font-black text-cocoaSoft shadow-lift">
              {item}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.12 }} className="relative min-h-[520px]">
        <PhoneMockup />
        <FloatingPreviewCards />
      </motion.div>
    </section>
  );
}
