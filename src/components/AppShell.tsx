import { ReactNode } from "react";
import { HeaderPill } from "@/components/HeaderPill";
import { Footer } from "@/components/Footer";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <HeaderPill />
      <main className="mx-auto w-full max-w-[1120px] px-4 pb-24 pt-5 sm:px-5 md:pb-16 md:pt-8">{children}</main>
      <Footer />
    </div>
  );
}
