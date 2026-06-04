"use client";

import { AnimatedAloAgentOrb } from "@/components/visuals/AgentWorkflowVisuals";
import { cn } from "@/lib/utils";

export function AgentVisual({
  className,
  compact = false,
  mood = "idle"
}: {
  className?: string;
  compact?: boolean;
  mood?: "idle" | "thinking" | "explaining" | "success" | "caution" | "happy";
}) {
  return <AnimatedAloAgentOrb compact={compact} mood={mood} className={cn(compact ? "min-h-[120px]" : "min-h-[320px]", className)} />;
}
