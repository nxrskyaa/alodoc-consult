import { Award, BookOpen, ClipboardCheck, ShieldCheck } from "lucide-react";

const previews = [
  { title: "Disease Quest", text: "Simple modules", icon: BookOpen, className: "left-3 top-12 xl:left-8" },
  { title: "Quiz Score", text: "Fact or myth", icon: ClipboardCheck, className: "right-3 top-24 xl:right-8" },
  { title: "Passport", text: "No records", icon: ShieldCheck, className: "left-8 bottom-24 xl:left-14" },
  { title: "Badge", text: "Onchain proof", icon: Award, className: "right-8 bottom-16 xl:right-14" }
];

export function FloatingPreviewCards() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {previews.map((preview) => {
        const Icon = preview.icon;
        return (
          <div
            key={preview.title}
            className={`alodoc-float absolute hidden max-w-[190px] rounded-3xl border border-cocoa/10 bg-white/90 p-4 shadow-soft backdrop-blur sm:block ${preview.className}`}
          >
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
      <div className="absolute bottom-5 left-4 right-4 grid grid-cols-2 gap-2 sm:hidden">
        {previews.slice(0, 2).map((preview) => {
          const Icon = preview.icon;
          return (
            <div key={preview.title} className="rounded-2xl border border-cocoa/10 bg-white/92 p-3 shadow-lift backdrop-blur">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-mint text-oliveDeep">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-black text-cocoa">{preview.title}</p>
                  <p className="truncate text-[11px] font-semibold text-cocoaSoft">{preview.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
