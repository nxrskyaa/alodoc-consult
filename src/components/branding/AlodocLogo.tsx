import Link from "next/link";
import { cn } from "@/lib/utils";

type AlodocLogoProps = {
  compact?: boolean;
  symbolOnly?: boolean;
  className?: string;
};

export function AlodocSymbol({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" className={cn("h-12 w-12 shrink-0", className)}>
      <path
        d="M48 25.3 43.6 21c-7.3-7-18.9-2-18.9 8.3 0 6.5 4.4 10.9 8.6 15.1L48 59l14.7-14.6c4.2-4.2 8.6-8.6 8.6-15.1C71.3 19 59.7 14 52.4 21L48 25.3Z"
        fill="#90A090"
      />
      <circle cx="48" cy="65.5" r="8.8" fill="#90A090" />
      <rect x="21" y="41" width="16" height="42" rx="8" transform="rotate(40 21 41)" fill="#202020" />
      <rect x="75" y="41" width="16" height="42" rx="8" transform="rotate(-40 75 41)" fill="#202020" />
    </svg>
  );
}

export function AlodocWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="leading-none">
      <div className={compact ? "text-xl font-semibold tracking-normal text-cocoa sm:text-2xl" : "text-2xl font-semibold tracking-normal text-cocoa"}>Alodoc</div>
      {!compact && <div className="mt-1 text-[11px] font-medium text-cocoaSoft">Learn. Understand. Live well.</div>}
    </div>
  );
}

export function AlodocLogo({ compact = false, symbolOnly = false, className }: AlodocLogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)} aria-label="Alodoc home">
      <span className="grid h-12 w-12 place-items-center rounded-[1.1rem] bg-cream ring-1 ring-cocoa/10 sm:h-[54px] sm:w-[54px]">
        <AlodocSymbol className="h-9 w-9 sm:h-10 sm:w-10" />
      </span>
      {!symbolOnly && <AlodocWordmark compact={compact} />}
    </Link>
  );
}
