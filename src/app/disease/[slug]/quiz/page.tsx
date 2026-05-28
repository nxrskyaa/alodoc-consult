import { notFound } from "next/navigation";
import { QuizFlow } from "@/components/QuizFlow";
import { diseases, getDiseaseBySlug } from "@/data/diseases";

export function generateStaticParams() {
  return diseases.map((disease) => ({ slug: disease.slug }));
}

export default async function QuizPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const disease = getDiseaseBySlug(slug);
  if (!disease) notFound();
  return <QuizFlow disease={disease} />;
}
