"use client";

import { motion, useReducedMotion } from "framer-motion";

const shapes = [
  { left: "8%", top: "12%", color: "#E8F1DD", size: 46 },
  { left: "82%", top: "18%", color: "#F6D77A", size: 34 },
  { left: "75%", top: "72%", color: "#F28B44", size: 42 },
  { left: "12%", top: "78%", color: "#FFFDF8", size: 38 },
  { left: "48%", top: "8%", color: "#E8F1DD", size: 26 }
];

export function FloatingHealthShapes() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.span
          key={`${shape.left}-${shape.top}`}
          className="absolute hidden rounded-2xl border border-cocoa/10 shadow-lift sm:block"
          style={{ left: shape.left, top: shape.top, width: shape.size, height: shape.size, background: shape.color }}
          animate={reduceMotion ? {} : { y: [0, -18, 0], opacity: [0.45, 0.85, 0.45], rotate: [-4, 5, -4] }}
          transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
