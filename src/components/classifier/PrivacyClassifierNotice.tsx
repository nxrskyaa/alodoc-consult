import { LockKeyhole } from "lucide-react";
import { SectionMiniVisual } from "@/components/classifier/visuals/SectionMiniVisual";
import type { ClassifierLanguage } from "@/lib/health-classifier";
import { classifierPrivacyCopy } from "@/lib/health-classifier";

export function PrivacyClassifierNotice({ language }: { language: ClassifierLanguage }) {
  return (
    <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-lift sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <SectionMiniVisual type="privacy" />
        <div>
          <div className="flex items-center gap-2 text-sm font-black uppercase text-oliveDeep">
            <LockKeyhole className="h-4 w-4" />
            {language === "id" ? "Privasi sejak awal" : "Private by design"}
          </div>
          <p className="mt-2 text-sm font-semibold leading-6 text-cocoaSoft">{classifierPrivacyCopy[language]}</p>
        </div>
      </div>
    </div>
  );
}
