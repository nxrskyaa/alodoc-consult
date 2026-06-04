"use client";

import { HealthVisual } from "@/components/visuals/HealthVisual";
import type { Disease } from "@/data/diseases";
import { cn } from "@/lib/utils";

const diseaseVisuals: Record<string, { src: string; alt: string }> = {
  "common-cold": { src: "/visuals/common-cold-visual.png", alt: "Common cold education visual with gentle virus particles and sneeze cloud" },
  hypertension: { src: "/visuals/hypertension-visual.png", alt: "Hypertension education visual with heart, pulse line, and gauge" },
  "type-2-diabetes": { src: "/visuals/diabetes-visual.png", alt: "Type 2 diabetes literacy visual with glucose dots and balanced meter" },
  gerd: { src: "/visuals/gerd-visual.png", alt: "GERD education visual with stomach and gentle acid wave" },
  "dengue-fever": { src: "/visuals/dengue-visual.png", alt: "Dengue awareness visual with mosquito prevention and shield motif" }
};

export function DiseaseVisual({ slug, className, compact = false }: { slug: Disease["slug"]; className?: string; compact?: boolean }) {
  const visual = diseaseVisuals[slug] ?? diseaseVisuals["common-cold"];

  return (
    <HealthVisual
      src={visual.src}
      alt={visual.alt}
      className={cn("bg-cream", className)}
      imageClassName={compact ? "max-h-[190px] max-w-[190px]" : undefined}
    />
  );
}
