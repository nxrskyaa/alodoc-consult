"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HealthVisual({
  src,
  alt,
  className,
  imageClassName,
  children,
  priority = false
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
  priority?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative isolate min-w-0 overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment shadow-soft", className)}>
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        className="relative z-10 grid h-full min-h-[220px] place-items-center p-4"
      >
        <Image
          src={src}
          alt={alt}
          width={720}
          height={720}
          priority={priority}
          sizes="(max-width: 768px) 90vw, 420px"
          className={cn("h-full max-h-[360px] w-full max-w-[360px] object-contain", imageClassName)}
        />
      </motion.div>
      {!reduceMotion && (
        <>
          <motion.span className="absolute left-5 top-6 h-4 w-4 rounded-full bg-olive/35" animate={{ y: [0, -10, 0], opacity: [0.45, 0.9, 0.45] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} />
          <motion.span className="absolute bottom-7 right-7 h-7 w-7 rounded-full bg-orange/20" animate={{ y: [0, 9, 0], scale: [1, 1.08, 1] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.span className="absolute right-10 top-12 h-12 w-12 rounded-[1.2rem] bg-white/55" animate={{ rotate: [0, 8, 0], y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
        </>
      )}
      {children}
    </div>
  );
}
