"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HealthVisual({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("relative isolate min-w-0 overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment shadow-soft", className)}>
      {children}
    </div>
  );
}
