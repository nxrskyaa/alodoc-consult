import { cn } from "@/lib/utils";

type AlodocLogoProps = {
  variant?: "symbol" | "lockup";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function AlodocSymbol({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const symbolSize = size === "sm" ? 28 : size === "lg" ? 56 : 40;

  return (
    <svg
      width={symbolSize}
      height={symbolSize}
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Alodoc logo"
      role="img"
      className={cn("shrink-0", className)}
    >
      <rect x="3" y="3" width="48" height="48" rx="16" fill="#FFF9F1" />
      <path d="M13 29c9-12 20-12 28 0" stroke="#708473" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M16 31c7 1 11 4 13 10-7 0-12-3-13-10Z" fill="#90A090" />
      <path d="M38 31c-7 1-11 4-13 10 7 0 12-3 13-10Z" fill="#B86B5E" />
      <circle cx="27" cy="21" r="4.3" fill="#4B3024" />
      <path d="M27 26v10" stroke="#4B3024" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function AlodocWordmark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const wordSize = size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl";

  return (
    <span className={cn("font-bold tracking-tight text-[#202020]", wordSize)} style={{ fontFamily: "Inter, sans-serif" }}>
      Alodoc
    </span>
  );
}

export function AlodocLogo({ variant = "lockup", size = "md", className = "" }: AlodocLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <AlodocSymbol size={size} />
      {variant === "lockup" && <AlodocWordmark size={size} />}
    </div>
  );
}
