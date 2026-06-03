import type { Metadata } from "next";
import { HealthClassifierPage } from "@/components/classifier/HealthClassifierPage";

export const metadata: Metadata = {
  title: "Learning Classifier | Alodoc",
  description: "A local education router that suggests common disease learning modules. No diagnosis, no storage, no blockchain write."
};

export default function ClassifierPage() {
  return <HealthClassifierPage />;
}
