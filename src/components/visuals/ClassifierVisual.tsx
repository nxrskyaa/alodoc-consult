"use client";

import { HealthVisual } from "@/components/visuals/HealthVisual";
import { cn } from "@/lib/utils";

const visuals = {
  blood_pressure: {
    src: "/visuals/blood-pressure-checker.png",
    alt: "Blood pressure checker education visual"
  },
  blood_sugar: {
    src: "/visuals/blood-sugar-checker.png",
    alt: "Blood sugar checker education visual"
  },
  bmi: {
    src: "/visuals/bmi-visual.png",
    alt: "BMI education checker visual"
  }
};

export function ClassifierVisual({ type, className }: { type: keyof typeof visuals; className?: string }) {
  const visual = visuals[type];
  return <HealthVisual src={visual.src} alt={visual.alt} className={cn("bg-cream", className)} imageClassName="max-h-[260px] max-w-[260px]" />;
}
