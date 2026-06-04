"use client";

import { AnimatedScalePipeline } from "@/components/visuals/AgentWorkflowVisuals";

export function ScaleWorkflowVisual({ className }: { className?: string }) {
  return <AnimatedScalePipeline className={className} />;
}
