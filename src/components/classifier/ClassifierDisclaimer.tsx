import { ShieldAlert } from "lucide-react";
import type { ClassifierLanguage } from "@/lib/health-classifier";
import { classifierDisclaimer } from "@/lib/health-classifier";

export function ClassifierDisclaimer({ language }: { language: ClassifierLanguage }) {
  return (
    <div className="rounded-3xl border border-orange/20 bg-orange/10 p-4 sm:p-5">
      <div className="flex gap-3">
        <ShieldAlert className="mt-1 h-5 w-5 shrink-0 text-orange" />
        <p className="text-sm font-semibold leading-6 text-cocoa">{classifierDisclaimer[language]}</p>
      </div>
    </div>
  );
}
