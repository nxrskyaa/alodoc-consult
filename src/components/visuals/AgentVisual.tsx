"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HealthVisual } from "@/components/visuals/HealthVisual";
import { cn } from "@/lib/utils";

export function AgentVisual({ className, compact = false }: { className?: string; compact?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <HealthVisual
      src="/visuals/alo-agent-mascot.png"
      alt="Friendly Alo Agent health education mascot"
      priority={!compact}
      className={cn("bg-[radial-gradient(circle_at_25%_10%,rgba(144,160,144,0.26),transparent_35%),#fffaf1]", className)}
      imageClassName={compact ? "max-h-[180px] max-w-[180px]" : undefined}
    >
      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="absolute bottom-7 left-1/2 h-2.5 w-2.5 rounded-full bg-orange"
              style={{ marginLeft: dot * 16 - 16 }}
              animate={{ y: [0, -8, 0], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.3, repeat: Infinity, delay: dot * 0.18, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}
    </HealthVisual>
  );
}
