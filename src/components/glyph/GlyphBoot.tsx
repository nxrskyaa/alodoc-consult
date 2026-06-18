"use client";

import { useEffect, useRef, useState } from "react";
import { useIsGlyph } from "@/hooks/useIsGlyph";

/**
 * One-shot boot sequence played when the user switches INTO glyph
 * mode (rising edge only — not on every render). A black flash, a
 * dot-matrix "ALODOC" title that flickers on, a red scanline sweep,
 * then it fades away. The signature Nothing "power-on" moment.
 */
export function GlyphBoot() {
  const isGlyph = useIsGlyph();
  const [show, setShow] = useState(false);
  const prev = useRef(false);

  useEffect(() => {
    if (isGlyph && !prev.current) {
      setShow(true);
      const t = window.setTimeout(() => setShow(false), 1750);
      prev.current = true;
      return () => window.clearTimeout(t);
    }
    prev.current = isGlyph;
  }, [isGlyph]);

  if (!show) return null;

  return (
    <div className="glyph-boot" aria-hidden>
      <span className="glyph-boot-scan" />
      <span className="glyph-boot-label">SYSTEM · INIT</span>
      <span className="glyph-boot-title">ALODOC</span>
      <span className="glyph-boot-sub">GLYPH MODE</span>
    </div>
  );
}
