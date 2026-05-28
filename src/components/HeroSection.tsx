"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { FloatingPreviewCards } from "@/components/FloatingPreviewCards";
import { PhoneMockup } from "@/components/PhoneMockup";

export function HeroSection() {
  return (
    <section className="grid min-h-[calc(100vh-132px)] gap-10 pt-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
        <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-normal text-cocoa md:text-7xl">
          Health literacy that feels simple, warm, and worth proving.
        </h1>
        <p className="mt-6 max-w-2xl text-xl font-semibold leading-8 text-cocoaSoft">
          Learn. Understand. Live well.
          <br />
          Belajar. Pahami. Hidup sehat.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/library" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-4 text-sm font-black text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-[#dc7432]">
            Start Learning <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/library" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-cocoa/10 bg-white px-6 py-4 text-sm font-black text-cocoa shadow-lift transition hover:-translate-y-0.5 hover:bg-mint/60">
            <BookOpen className="h-4 w-4" /> Explore Library
          </Link>
          <ConnectWalletButton />
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {["Education only", "Privacy-safe", "Bilingual", "Onchain learning proof"].map((item) => (
            <span key={item} className="rounded-full border border-cocoa/10 bg-parchment px-4 py-2 text-sm font-black text-cocoaSoft shadow-lift">
              {item}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.65, delay: 0.12 }} className="relative min-h-[580px]">
        <PhoneMockup />
        <FloatingPreviewCards />
      </motion.div>
    </section>
  );
}
