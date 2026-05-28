import { ReactNode } from "react";
import { HeaderPill } from "@/components/HeaderPill";
import { Footer } from "@/components/Footer";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <HeaderPill />
      <main className="mx-auto w-[min(1120px,calc(100vw-24px))] pb-16 pt-8">{children}</main>
      <Footer />
    </div>
  );
}
