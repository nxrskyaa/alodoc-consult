import { HeartPulse } from "lucide-react";

export function AloGuideBubble({ text }: { text: string }) {
  return (
    <div className="rounded-3xl bg-mint p-5 shadow-lift">
      <div className="flex gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-oliveDeep">
          <HeartPulse className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-black text-cocoa">Alo Guide</p>
          <p className="mt-1 text-sm font-semibold leading-6 text-cocoaSoft">{text}</p>
        </div>
      </div>
    </div>
  );
}
