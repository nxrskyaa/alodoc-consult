"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { AloGuideBubble } from "@/components/AloGuideBubble";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { FloatingPreviewCards } from "@/components/FloatingPreviewCards";
import { PhoneMockup } from "@/components/PhoneMockup";
import { AlodocSymbol } from "@/components/branding/AlodocLogo";

export function HeroSection() {
  return (
    <section className="relative mx-auto grid min-h-[auto] grid-cols-1 items-center gap-10 overflow-hidden pt-6 sm:pt-8 lg:min-h-[720px] lg:grid-cols-12 lg:gap-12 lg:pt-4">
      <div className="pointer-events-none absolute left-1/2 top-4 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-mint/50 blur-3xl lg:left-[62%] lg:h-96 lg:w-96" />
      <motion.div className="min-w-0 lg:col-span-6" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-oliveDeep shadow-lift">
          <Sparkles className="h-4 w-4 text-orange" />
          Premium health literacy, privacy-safe by design
        </div>
        <h1 className="max-w-full text-[clamp(2.45rem,10vw,4rem)] font-semibold leading-[1.05] tracking-normal text-cocoa sm:text-5xl lg:max-w-3xl lg:text-6xl xl:text-7xl">
          Alodoc turns health learning into a calm, visual journey.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-cocoaSoft sm:text-xl">
          Learn. Understand. Live well.
          <br />
          Belajar. Pahami. Hidup sehat.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/library" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-cocoa px-6 py-4 text-sm font-semibold text-cream shadow-lift transition hover:-translate-y-0.5 hover:bg-deepBlack sm:w-auto">
            Start Learning <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/library" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-cocoa/10 bg-white px-6 py-4 text-sm font-semibold text-cocoa shadow-lift transition hover:-translate-y-0.5 hover:bg-mint/60 sm:w-auto">
            <BookOpen className="h-4 w-4" /> Explore Library
          </Link>
          <ConnectWalletButton className="hidden lg:inline-flex" />
        </div>
        <div className="mt-6 w-full max-w-[520px]">
          <AloGuideBubble text="This is general education, not medical advice. Learn concepts, answer quizzes, and keep your private health data private." />
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {["Education only", "Privacy-safe", "Bilingual", "Onchain learning proof"].map((item) => (
            <span key={item} className="rounded-full border border-cocoa/10 bg-parchment px-4 py-2 text-sm font-semibold text-cocoaSoft shadow-lift">
              {item}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.12 }}
        className="relative isolate min-h-[360px] overflow-hidden rounded-[2.25rem] sm:min-h-[460px] lg:col-span-6 lg:min-h-[620px]"
      >
        <div className="absolute inset-x-2 bottom-0 top-2 rounded-[2rem] bg-[linear-gradient(145deg,rgba(144,160,144,0.34),rgba(239,230,218,0.8))] sm:inset-x-8 lg:inset-x-12" />
        <motion.div className="absolute left-5 top-6 z-10 hidden rounded-[1.4rem] bg-parchment p-3 shadow-lift sm:block" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <AlodocSymbol className="h-12 w-12" />
        </motion.div>
        <div className="relative z-10 flex min-h-[360px] items-center justify-center py-6 sm:min-h-[460px] lg:min-h-[620px]">
          <PhoneMockup />
        </div>
        <FloatingPreviewCards />
      </motion.div>
    </section>
  );
}
