import { BookOpen, CheckCircle2, Medal, UserRound } from "lucide-react";

export function PhoneMockup() {
  const items = [
    { icon: BookOpen, title: "Disease Library", detail: "5 starter quests" },
    { icon: CheckCircle2, title: "Quiz Score", detail: "80% ready for proof" },
    { icon: UserRound, title: "Passport", detail: "Learning only" },
    { icon: Medal, title: "Badge", detail: "Cold Care Basics" }
  ];

  return (
    <div className="relative mx-auto h-[520px] w-[280px] rounded-[2.5rem] border-[10px] border-cocoa bg-parchment p-4 shadow-soft">
      <div className="mx-auto mb-5 h-1.5 w-20 rounded-full bg-cocoa/25" />
      <div className="rounded-[1.8rem] bg-cream p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase text-oliveDeep">Alodoc</p>
            <h3 className="mt-1 text-2xl font-black text-cocoa">Learn card</h3>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-oliveDeep">A</div>
        </div>
        <div className="mt-5 rounded-3xl bg-white p-4 shadow-lift">
          <p className="text-sm font-black text-cocoa">Common Cold</p>
          <p className="mt-2 text-xs leading-5 text-cocoaSoft">Usually viral, spreads through droplets, hands, and surfaces.</p>
          <div className="mt-4 h-2 rounded-full bg-mint">
            <div className="h-2 w-2/3 rounded-full bg-orange" />
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-center gap-3 rounded-2xl bg-white/80 p-3 shadow-lift">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-mint text-oliveDeep">
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
