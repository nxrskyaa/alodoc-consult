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
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Alodoc logo"
      role="img"
      className={cn("shrink-0", className)}
    >
      <path d="M12 20c3.5-5.5 20.5-5.5 24 0" stroke="#708473" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="24" cy="16" r="4.2" fill="#202020" />
      <path d="M9.5 28.5c7.3-1.2 12.2 2.5 14.5 10.5-7.6.5-13.3-3.7-14.5-10.5Z" fill="#90A090" />
      <path d="M38.5 28.5c-7.3-1.2-12.2 2.5-14.5 10.5 7.6.5 13.3-3.7 14.5-10.5Z" fill="#B86B5E" />
      <path d="M24 24v12" stroke="#202020" strokeWidth="3.4" strokeLinecap="round" />
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
