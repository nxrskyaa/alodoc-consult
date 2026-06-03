"use client";

import type { ElementType } from "react";
import { motion } from "framer-motion";

export function AboutFeatureCard({ icon: Icon, title, text, index = 0 }: { icon: ElementType; title: string; text: string; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-lift"
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-mint/60 transition group-hover:scale-110" />
      <div className="relative grid h-14 w-14 place-items-center rounded-[1.4rem] bg-cream text-oliveDeep shadow-lift">
        <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <Icon className="h-6 w-6" />
        </motion.div>
      </div>
      <h3 className="relative mt-5 text-2xl font-semibold leading-tight text-cocoa">{title}</h3>
      <p className="relative mt-3 text-sm leading-6 text-cocoaSoft">{text}</p>
    </motion.article>
  );
}
