"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AboutVisual() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative isolate overflow-hidden rounded-[2.4rem] border border-cocoa/10 bg-cream p-5 shadow-soft">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(144,160,144,0.34),transparent_28%),radial-gradient(circle_at_82%_70%,rgba(201,166,104,0.22),transparent_30%)]" />
      <motion.div
        className="relative mx-auto grid h-48 w-48 place-items-center rounded-[3rem] bg-parchment shadow-lift sm:h-64 sm:w-64"
        animate={reduceMotion ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="px-5 text-center">
          <p className="text-sm font-bold uppercase text-oliveDeep">Health literacy</p>
          <p className="mt-3 text-3xl font-extrabold leading-tight text-cocoa sm:text-4xl">Learn. Quiz. Prove.</p>
        </div>
      </motion.div>
      <div className="relative mt-5 grid grid-cols-3 gap-3">
        {["Learn", "Quiz", "Prove"].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="rounded-3xl bg-white/80 px-3 py-4 text-center shadow-lift"
          >
            <div className="mx-auto mb-2 h-2 w-8 rounded-full bg-olive" />
            <p className="text-xs font-semibold uppercase text-cocoa">{item}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
