import { BookOpen, DatabaseZap, Globe2, ShieldCheck } from "lucide-react";

const points = [
  {
    icon: Globe2,
    title: "Bilingual health education",
    text: "Alodoc teaches common disease concepts in Indonesia and English through short learning cards."
  },
  {
    icon: ShieldCheck,
    title: "Education only",
    text: "It is not a diagnosis app, doctor consultation app, medical record app, or symptom checker."
  },
  {
    icon: DatabaseZap,
    title: "No medical records",
    text: "The passport stores learning progress only: profile identity, XP, completed quests, badges, accuracy, and streak."
  },
  {
    icon: BookOpen,
    title: "Proof of learning onchain",
    text: "Quiz completion and badges are written to Arc Testnet while Rialo testnet is not live yet."
  }
];

export default function AboutPage() {
  return (
    <div className="grid gap-8">
      <section className="rounded-[2rem] border border-cocoa/10 bg-parchment p-8 shadow-soft">
        <h1 className="max-w-4xl text-5xl font-black leading-tight text-cocoa">Alodoc helps people learn health basics, then prove learning progress onchain.</h1>
        <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-cocoaSoft">
          The concept is inspired by Rialo's real-world application thesis: useful crypto should support everyday outcomes. For this MVP, Alodoc uses Arc Testnet for proof-of-learning badges while Rialo testnet is not live yet.
        </p>
      </section>
      <section className="grid gap-5 md:grid-cols-2">
        {points.map((point) => {
          const Icon = point.icon;
          return (
            <article key={point.title} className="rounded-[2rem] border border-cocoa/10 bg-parchment p-6 shadow-lift">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-oliveDeep">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-black text-cocoa">{point.title}</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-cocoaSoft">{point.text}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
