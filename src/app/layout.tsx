import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Space_Mono, Doto } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { Providers } from "@/components/Providers";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap"
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-grotesk",
  display: "swap"
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap"
});

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
  display: "swap"
});

// No-FOUC: apply persisted theme before first paint.
const themeScript = `(function(){try{var t=localStorage.getItem('alodoc-theme');if(t==='glyph'){document.documentElement.dataset.theme='glyph';}else{document.documentElement.dataset.theme='light';}}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Alodoc | Learn. Understand. Live well.",
  description: "A bilingual health education dApp for learning cards, quizzes, and onchain proof-of-learning badges.",
  metadataBase: new URL("https://alodoc.vercel.app"),
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-theme="light" className={`${jakarta.variable} ${grotesk.variable} ${spaceMono.variable} ${doto.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={jakarta.className}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
