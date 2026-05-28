import { Award, BookOpen, ClipboardCheck, ShieldCheck } from "lucide-react";

const previews = [
  { title: "Disease Library", text: "Simple modules", icon: BookOpen, className: "left-0 top-8" },
  { title: "Quiz", text: "Fact or myth", icon: ClipboardCheck, className: "right-0 top-20" },
  { title: "Passport", text: "No medical records", icon: ShieldCheck, className: "left-5 bottom-16" },
  { title: "Badge", text: "Onchain proof", icon: Award, className: "right-4 bottom-5" }
];

export function FloatingPreviewCards() {
  return (
    <>
    <div className="pointer-events-none absolute inset-0 hidden lg:block">
      {previews.map((preview) => {
        const Icon = preview.icon;
        return (
          <div key={preview.title} className={`absolute ${preview.className} rounded-3xl border border-cocoa/10 bg-white/85 p-4 shadow-soft backdrop-blur`}>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-oliveDeep">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-black text-cocoa">{preview.title}</p>
                <p className="text-xs font-semibold text-cocoaSoft">{preview.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2 lg:hidden">
      {previews.map((preview) => {
        const Icon = preview.icon;
        return (
          <div key={preview.title} className="min-w-[190px] snap-start rounded-3xl border border-cocoa/10 bg-white/85 p-4 shadow-lift backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-oliveDeep">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-black text-cocoa">{preview.title}</p>
                <p className="text-xs font-semibold text-cocoaSoft">{preview.text}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
}
