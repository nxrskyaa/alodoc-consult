import Link from "next/link";
import { AlodocLogo as BrandAlodocLogo } from "@/components/branding/AlodocLogo";

export function AlodocLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" aria-label="Alodoc home" className="focus-ring inline-flex rounded-full">
      <BrandAlodocLogo variant="lockup" size={compact ? "sm" : "md"} />
    </Link>
  );
}
