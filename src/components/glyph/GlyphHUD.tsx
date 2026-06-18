"use client";

import { useEffect, useState } from "react";
import { useIsGlyph } from "@/hooks/useIsGlyph";

/**
 * Nothing-OS instrument overlay — only renders in glyph mode.
 * Corner brackets + a bottom Space-Mono status strip with a live
 * clock and a pulsing red signal dot. Pure decoration: pointer-events
 * none, so it never blocks interaction. Desktop-only status bar to
 * avoid clashing with the mobile bottom nav.
 */
export function GlyphHUD() {
  const isGlyph = useIsGlyph();
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    if (!isGlyph) return;
    const tick = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, "0");
      setClock(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isGlyph]);

  if (!isGlyph) return null;

  return (
    <div className="glyph-hud" aria-hidden>
      <span className="glyph-hud-bracket tl" />
      <span className="glyph-hud-bracket tr" />
      <span className="glyph-hud-bracket bl" />
      <span className="glyph-hud-bracket br" />

      <div className="glyph-hud-bar hidden sm:flex">
        <span className="inline-flex items-center gap-2">
          <span className="glyph-hud-dot" />
          ALODOC · SYS.V1
        </span>
        <span>GLYPH MODE · ONCHAIN HEALTH LITERACY</span>
        <span className="glyph-hud-clock tabular-nums">{clock}</span>
      </div>
    </div>
  );
}
