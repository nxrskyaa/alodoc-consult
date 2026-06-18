import { ReactNode } from "react";
import { HeaderPill } from "@/components/HeaderPill";
import { Footer } from "@/components/Footer";
import { GlyphHUD } from "@/components/glyph/GlyphHUD";
import { GlyphBoot } from "@/components/glyph/GlyphBoot";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <GlyphHUD />
      <GlyphBoot />
      <HeaderPill />
      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-5 sm:px-6 md:pb-16 md:pt-8 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
}
