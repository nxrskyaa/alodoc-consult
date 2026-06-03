import type { Metadata } from "next";
import { HealthClassifierPage } from "@/components/classifier/HealthClassifierPage";

export const metadata: Metadata = {
  title: "Health Education Tool | Alodoc",
  description: "A local educational tool for understanding blood pressure and blood sugar categories. No diagnosis, no storage, no blockchain write."
};

export default function ClassifierPage() {
  return <HealthClassifierPage />;
}
