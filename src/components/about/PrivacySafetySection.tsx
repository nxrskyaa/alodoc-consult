"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { safetyCards } from "@/data/about";

export function PrivacySafetySection() {
  return (
    <section className="rounded-[2.4rem] border border-cocoa/10 bg-mint p-5 shadow-soft sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="grid h-16 w-16 place-items-center rounded-[1.6rem] bg-parchment text-oliveDeep shadow-lift">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="mt-5 text-3xl font-semibold leading-tight text-cocoa sm:text-5xl">Safety and privacy are product features.</h2>
          <p className="mt-4 text-sm leading-6 text-cocoaSoft">
            Alodoc stays intentionally narrow: education, literacy progress, and proof-of-learning. It does not become a diagnosis tool, consultation service, or medical record vault.
          </p>
        </div>
        <div className="grid gap-3">
          {safetyCards.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-3xl bg-white/80 px-5 py-4 text-sm font-semibold text-cocoa shadow-lift"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
