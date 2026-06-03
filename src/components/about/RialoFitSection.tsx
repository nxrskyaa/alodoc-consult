"use client";

import { motion } from "framer-motion";
import { rialoCards } from "@/data/about";

export function RialoFitSection() {
  return (
    <section className="relative overflow-hidden rounded-[2.4rem] border border-cocoa/10 bg-cocoa p-5 text-cream shadow-soft sm:p-8">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-olive/25" />
      <div className="absolute -bottom-20 left-10 h-64 w-64 rounded-full bg-peach/10" />
      <div className="relative max-w-4xl">
        <p className="text-sm font-semibold uppercase text-mint">Rialo positioning</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">Why Alodoc becomes more powerful on Rialo</h2>
        <p className="mt-5 text-base leading-8 text-cream/78">
          Alodoc is already a strong example of health education as a real-world consumer use case. On Rialo, the concept could become more compelling because Rialo is designed for applications that need real-world connectivity, automation, privacy-aware execution, and a natural bridge between Web2-style experiences and onchain logic.
        </p>
      </div>
      <div className="relative mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rialoCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.04 }}
              className="relative overflow-hidden rounded-[2rem] border border-cream/10 bg-cream/8 p-5 backdrop-blur"
            >
              <motion.div
                className="grid h-14 w-14 place-items-center rounded-[1.4rem] bg-cream text-cocoa"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + index * 0.15, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon className="h-6 w-6" />
              </motion.div>
              <h3 className="mt-5 text-xl font-semibold text-cream">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-cream/72">{card.text}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
