import { cn } from "@/lib/utils";

type AlodocLogoProps = {
  variant?: "symbol" | "lockup";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function AlodocWordmark({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const wordSize = size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl";

  return (
    <span className={cn("font-bold tracking-normal text-cocoa", wordSize, className)} style={{ fontFamily: "Inter, ui-rounded, system-ui, sans-serif" }}>
      Alodoc
    </span>
  );
}

export function AlodocLogo({ variant = "lockup", size = "md", className = "" }: AlodocLogoProps) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <AlodocWordmark size={variant === "symbol" ? size : size} />
    </div>
  );
}
