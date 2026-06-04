"use client";

import { motion } from "framer-motion";
import { HealthVisual } from "@/components/visuals/HealthVisual";
import { cn } from "@/lib/utils";

const steps = ["Learning Task", "Tutor Agent", "Quiz Agent", "Judge Agent", "Learning Badge"];

export function ScaleWorkflowVisual({ className }: { className?: string }) {
  return (
    <HealthVisual
      src="/visuals/scale-workflow-visual.png"
      alt="SCALE-inspired health education agent workflow visual"
      className={cn("bg-[radial-gradient(circle_at_20%_10%,rgba(242,138,62,0.14),transparent_32%),#fffaf1]", className)}
      imageClassName="max-h-[280px] max-w-[280px]"
    >
      <div className="relative z-20 grid gap-2 px-4 pb-4 sm:grid-cols-5">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="rounded-2xl bg-white/90 px-3 py-2 text-center text-[11px] font-black text-cocoa shadow-lift"
          >
            {step}
          </motion.div>
        ))}
      </div>
    </HealthVisual>
  );
}
