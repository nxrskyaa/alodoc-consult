import { BookOpen, CheckCircle2, Medal, UserRound } from "lucide-react";
import { AnimatedDiseaseVisual } from "@/components/AnimatedDiseaseVisual";
import { AlodocSymbol } from "@/components/branding/AlodocLogo";

export function PhoneMockup() {
  const items = [
    { icon: BookOpen, title: "Disease Library", detail: "5 starter quests" },
    { icon: CheckCircle2, title: "Quiz Score", detail: "80% ready for proof" },
    { icon: UserRound, title: "Passport", detail: "Learning only" },
    { icon: Medal, title: "Badge", detail: "Cold Care Basics" }
  ];

  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[250px] rounded-[2.35rem] border-[9px] border-cocoa bg-parchment p-3 shadow-soft sm:h-[500px] sm:max-w-[310px] sm:rounded-[2.6rem] sm:border-[10px] sm:p-4 lg:h-[560px] lg:max-w-[360px]">
      <div className="mx-auto mb-5 h-1.5 w-20 rounded-full bg-cocoa/25" />
      <div className="rounded-[1.8rem] bg-cream p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase text-oliveDeep">Alodoc</p>
            <h3 className="mt-1 text-xl font-black text-cocoa sm:text-2xl">Learn card</h3>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-oliveDeep">
            <AlodocSymbol className="h-8 w-8" />
          </div>
        </div>
        <div className="mt-4 rounded-3xl bg-white p-3 shadow-lift sm:mt-5">
          <AnimatedDiseaseVisual slug="common-cold" compact className="mb-3 min-h-[96px] rounded-2xl sm:min-h-[120px]" />
          <p className="text-sm font-black text-cocoa">Common Cold</p>
          <p className="mt-2 text-xs leading-5 text-cocoaSoft">Usually viral, spreads through droplets, hands, and surfaces.</p>
          <div className="mt-4 h-2 rounded-full bg-mint">
            <div className="h-2 w-2/3 rounded-full bg-orange" />
          </div>
        </div>
      </div>
      <div className="mt-3 grid gap-2 sm:mt-4 sm:gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-center gap-3 rounded-2xl bg-white/80 p-2.5 shadow-lift sm:p-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-mint text-oliveDeep sm:h-10 sm:w-10">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-black text-cocoa">{item.title}</p>
                <p className="text-xs text-cocoaSoft">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
