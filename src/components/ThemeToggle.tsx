"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "glyph";

/**
 * Nothing-style mechanical theme switch. Reads/writes localStorage key
 * `alodoc-theme` and flips `document.documentElement.dataset.theme`.
 * Label is Space Mono ALL-CAPS micro text: LIGHT / GLYPH.
 */
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) || "light";
    setTheme(current);
    setMounted(true);
  }, []);

  const apply = (next: Theme) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("alodoc-theme", next);
    } catch {
      /* ignore */
    }
  };

  const isGlyph = theme === "glyph";

  return (
    <button
      type="button"
      onClick={() => apply(isGlyph ? "light" : "glyph")}
      aria-label={isGlyph ? "Switch to light mode" : "Switch to Glyph mode"}
      aria-pressed={isGlyph}
      className="focus-ring inline-flex select-none items-center gap-1.5 rounded-full border border-cocoa/15 bg-parchment/70 px-1.5 py-1 transition-colors hover:border-cocoa/30 sm:px-2"
      style={{ minHeight: 28 }}
    >
      <span
        className="glyph-label hidden text-[9px] font-bold uppercase tracking-[0.1em] text-cocoaSoft sm:inline"
        style={{ opacity: isGlyph ? 0.4 : 1 }}
      >
        Light
      </span>
      {/* The physical switch */}
      <span
        aria-hidden
        className="relative inline-flex h-[18px] w-[34px] items-center rounded-full transition-colors duration-200"
        style={{
          background: isGlyph ? "#d71921" : "rgba(32,32,32,0.18)",
          border: "1px solid rgba(232,232,232,0.25)"
        }}
      >
        <span
          className="absolute h-[14px] w-[14px] rounded-[3px] transition-all duration-200"
          style={{
            background: isGlyph ? "#ffffff" : "#202020",
            left: isGlyph ? "17px" : "2px"
          }}
        />
      </span>
      <span
        className="glyph-label hidden text-[9px] font-bold uppercase tracking-[0.1em] text-cocoaSoft sm:inline"
        style={{ opacity: isGlyph ? 1 : 0.4, color: isGlyph ? "#d71921" : undefined }}
      >
        Glyph
      </span>
    </button>
  );
}
