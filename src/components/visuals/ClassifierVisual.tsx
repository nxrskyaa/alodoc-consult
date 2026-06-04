"use client";

import { AnimatedBMIRing, AnimatedGlucoseDots, AnimatedHealthParticles, AnimatedPulseLine } from "@/components/visuals/AgentWorkflowVisuals";
import { cn } from "@/lib/utils";

export function ClassifierVisual({ type, className }: { type: "blood_pressure" | "blood_sugar" | "bmi"; className?: string }) {
  return (
    <div className={cn("relative isolate grid min-h-[260px] place-items-center overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment p-5 shadow-soft", className)}>
      <AnimatedHealthParticles />
      {type === "blood_pressure" && (
        <div className="relative z-10 w-full max-w-[300px]">
          <AnimatedPulseLine />
          <div className="mx-auto mt-1 grid h-28 w-28 place-items-center rounded-full border-8 border-orange/30 bg-white shadow-lift">
            <div className="h-4 w-16 rounded-full bg-olive" />
          </div>
        </div>
      )}
      {type === "blood_sugar" && <AnimatedGlucoseDots className="relative z-10 max-w-[300px]" />}
      {type === "bmi" && <AnimatedBMIRing className="relative z-10" />}
    </div>
  );
}
