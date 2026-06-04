"use client";

import { motion } from "framer-motion";
import { Activity, Droplets, Scale } from "lucide-react";
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
      action: { en: "Check Tensi", id: "Cek Tensi" },
      icon: Activity
    },
    {
      type: "blood_sugar" as const,
      title: { en: "Blood Sugar", id: "Gula Darah" },
      text: { en: "Interpret fasting, random, or HbA1c values.", id: "Pahami GDP, GDS, atau HbA1c." },
      action: { en: "Check Blood Sugar", id: "Cek Gula Darah" },
      icon: Droplets
    },
    {
      type: "bmi" as const,
      title: { en: "BMI Checker", id: "Cek BMI" },
      text: { en: "Calculate adult BMI from temporary height and weight.", id: "Hitung BMI dewasa dari tinggi dan berat sementara." },
      action: { en: "Check BMI", id: "Cek BMI" },
      icon: Scale
    }
  ];

  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;
        const active = selected === item.type;
        return (
          <motion.button
            key={item.type}
            type="button"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(item.type)}
            className={cn(
              "focus-ring group relative w-full min-w-0 overflow-hidden rounded-[1.6rem] border bg-white p-4 text-left shadow-lift transition",
              active ? "border-orange ring-4 ring-orange/15" : "border-cocoa/10 hover:border-olive/40 hover:bg-mint/25"
            )}
          >
            <motion.span
              layout
              className={cn("absolute inset-x-4 top-0 h-1 rounded-b-full", active ? "bg-orange" : "bg-transparent")}
            />
            <div className="flex items-start gap-3">
              <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition", active ? "bg-orange text-white" : "bg-mint text-oliveDeep")}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase text-oliveDeep">{item.action[language]}</p>
                <h3 className="mt-1 text-xl font-extrabold text-cocoa">{item.title[language]}</h3>
                <p className="mt-1 text-sm font-medium leading-6 text-cocoaSoft">{item.text[language]}</p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
