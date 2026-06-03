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
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Alodoc logo"
      role="img"
      className={cn("shrink-0", className)}
    >
      <path d="M60 28C56 19 43 15 35 23C27 31 31 45 60 62C89 45 93 31 85 23C77 15 64 19 60 28Z" fill="#90A090" />
      <rect x="21" y="55" width="28" height="58" rx="14" transform="rotate(34 21 55)" fill="#202020" />
      <rect x="71" y="71" width="28" height="58" rx="14" transform="rotate(-34 71 71)" fill="#202020" />
      <circle cx="60" cy="82" r="13" fill="#90A090" />
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
