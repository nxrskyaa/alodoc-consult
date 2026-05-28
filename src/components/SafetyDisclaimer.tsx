import { ShieldAlert } from "lucide-react";
import { Language, safetyDisclaimer } from "@/data/diseases";

export function SafetyDisclaimer({ language = "en" }: { language?: Language }) {
  return (
    <div className="rounded-3xl border border-orange/20 bg-orange/10 p-5">
      <div className="flex gap-3">
        <ShieldAlert className="mt-1 h-5 w-5 shrink-0 text-orange" />
        <p className="text-sm font-semibold leading-6 text-cocoa">{safetyDisclaimer[language]}</p>
      </div>
    </div>
  );
}
