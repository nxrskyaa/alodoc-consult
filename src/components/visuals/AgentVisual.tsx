"use client";

import { AnimatedAloAgentOrb } from "@/components/visuals/AgentWorkflowVisuals";
import { cn } from "@/lib/utils";

export function AgentVisual({ className, compact = false }: { className?: string; compact?: boolean }) {
  return <AnimatedAloAgentOrb className={cn(compact ? "min-h-[220px]" : "min-h-[320px]", className)} />;
}
