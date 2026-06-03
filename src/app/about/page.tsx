import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About Alodoc | Rialo-ready health education",
  description: "Learn how Alodoc combines bilingual health education, privacy-safe learning progress, and future Rialo positioning."
};

export default function AboutPage() {
  return <AboutPageContent />;
}
