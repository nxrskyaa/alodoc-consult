import { notFound } from "next/navigation";
import { LearningFlow } from "@/components/LearningFlow";
import { diseases, getDiseaseBySlug } from "@/data/diseases";

export function generateStaticParams() {
  return diseases.map((disease) => ({ slug: disease.slug }));
}

export default async function DiseasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const disease = getDiseaseBySlug(slug);
  if (!disease) notFound();
  return <LearningFlow disease={disease} />;
}
