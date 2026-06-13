import { notFound } from "next/navigation";
import { Web3IssueFlow } from "@/components/web3/Web3IssueFlow";
import { web3Issues, getWeb3IssueBySlug } from "@/data/web3HealthIssues";

export function generateStaticParams() {
  return web3Issues.map((issue) => ({ slug: issue.slug }));
}

export default async function Web3HealthIssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issue = getWeb3IssueBySlug(slug);
  if (!issue) notFound();
  return <Web3IssueFlow issue={issue} />;
}
