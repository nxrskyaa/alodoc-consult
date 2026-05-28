import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Alodoc | Learn. Understand. Live well.",
  description: "A bilingual health education dApp for learning cards, quizzes, and onchain proof-of-learning badges.",
  metadataBase: new URL("https://alodoc.vercel.app")
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
