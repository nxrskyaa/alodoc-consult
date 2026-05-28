"use client";

import { Language } from "@/data/diseases";
import { cn } from "@/lib/utils";

export function LanguageToggle({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  return (
    <div className="inline-flex rounded-full border border-cocoa/10 bg-white p-1 shadow-lift">
      {(["id", "en"] as const).map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={cn("focus-ring rounded-full px-4 py-2 text-sm font-black text-cocoaSoft transition", language === item && "bg-mint text-cocoa")}
        >
          {item === "id" ? "Indonesia" : "English"}
        </button>
      ))}
    </div>
  );
}
