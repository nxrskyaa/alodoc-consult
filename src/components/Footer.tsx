import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto mb-4 w-[min(1120px,calc(100vw-24px))] rounded-[2rem] border border-cocoa/10 bg-parchment/80 p-5 shadow-lift backdrop-blur sm:p-7">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xl font-bold text-cocoa">Alodoc</p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-cocoaSoft">
            Education only. Alodoc stores learning progress and proof-of-learning badges, not diagnosis data, private symptoms, or medical records.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-bold text-cocoaSoft">
          <Link href="/classifier" className="hover:text-cocoa">Classifier</Link>
          <Link href="/library" className="hover:text-cocoa">Library</Link>
          <Link href="/passport" className="hover:text-cocoa">Passport</Link>
          <Link href="/leaderboard" className="hover:text-cocoa">Leaderboard</Link>
          <Link href="/about" className="hover:text-cocoa">About</Link>
        </div>
      </div>
    </footer>
  );
}
