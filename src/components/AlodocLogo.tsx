import Link from "next/link";

export function AlodocLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Alodoc home">
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden="true" className="h-11 w-11 shrink-0 sm:h-[54px] sm:w-[54px]">
        <rect width="54" height="54" rx="18" fill="#fffaf1" />
        <path d="M13 29c9-12 20-12 28 0" stroke="#788a4f" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M16 31c7 1 11 4 13 10-7 0-12-3-13-10Z" fill="#8fa261" />
        <path d="M38 31c-7 1-11 4-13 10 7 0 12-3 13-10Z" fill="#e9823c" />
        <circle cx="27" cy="21" r="4.3" fill="#6f4028" />
        <path d="M27 26v10" stroke="#6f4028" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <div className="leading-none">
        <div className={compact ? "text-xl font-black tracking-normal text-cocoa sm:text-2xl" : "text-2xl font-black tracking-normal text-cocoa"}>Alodoc</div>
        {!compact && <div className="mt-1 text-[11px] font-semibold text-cocoaSoft">Learn. Understand. Live well.</div>}
      </div>
    </Link>
  );
}
