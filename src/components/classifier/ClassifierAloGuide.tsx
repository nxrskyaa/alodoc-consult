"use client";

import { AloGuideBubble } from "@/components/AloGuideBubble";
import type { ClassifierLanguage } from "@/lib/health-classifier";

export function ClassifierAloGuide({ language, text }: { language: ClassifierLanguage; text?: string }) {
  return (
    <AloGuideBubble
      text={
        text ??
        (language === "id"
          ? "Fitur ini hanya menjelaskan kategori umum. Ini bukan diagnosis."
          : "This tool explains general categories only. It does not diagnose your condition.")
      }
    />
  );
}
