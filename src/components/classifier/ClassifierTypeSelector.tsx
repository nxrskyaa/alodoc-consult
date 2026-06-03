"use client";

import { motion } from "framer-motion";
import { Activity, Droplets } from "lucide-react";
import { AnimatedBloodPressureHero } from "@/components/classifier/visuals/AnimatedBloodPressureHero";
import { AnimatedBloodSugarHero } from "@/components/classifier/visuals/AnimatedBloodSugarHero";
import type { ClassifierLanguage, ClassifierType } from "@/lib/health-classifier";
import { cn } from "@/lib/utils";

export function ClassifierTypeSelector({
  selected,
  onSelect,
  language
}: {
  selected: ClassifierType;
  onSelect: (type: ClassifierType) => void;
  language: ClassifierLanguage;
}) {
  const items = [
    {
      type: "blood_pressure" as const,
      title: { en: "Blood Pressure", id: "Tekanan Darah" },
      text: { en: "Understand systolic and diastolic categories.", id: "Pahami kategori angka sistolik dan diastolik." },
      icon: Activity,
      visual: <AnimatedBloodPressureHero size="sm" />
    },
    {
      type: "blood_sugar" as const,
      title: { en: "Blood Sugar", id: "Gula Darah" },
      text: { en: "Interpret fasting, random, or HbA1c values.", id: "Pahami GDP, GDS, atau HbA1c." },
      icon: Droplets,
      visual: <AnimatedBloodSugarHero size="sm" />
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => {
        const Icon = item.icon;
        const active = selected === item.type;
        return (
          <motion.button
            key={item.type}
            type="button"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(item.type)}
            className={cn(
              "focus-ring rounded-[2rem] border bg-parchment p-4 text-left shadow-lift transition",
              active ? "border-orange ring-4 ring-orange/15" : "border-cocoa/10 hover:border-olive/40"
            )}
          >
            {item.visual}
            <div className="mt-4 flex items-start gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-mint text-oliveDeep">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-cocoa">{item.title[language]}</h3>
                <p className="mt-1 text-sm font-semibold leading-6 text-cocoaSoft">{item.text[language]}</p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
