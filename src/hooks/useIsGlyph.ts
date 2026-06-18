"use client";

import { useEffect, useState } from "react";

/**
 * Reactive read of the active theme. The ThemeToggle flips
 * `document.documentElement.dataset.theme` between "light" and "glyph";
 * this hook mirrors that into React state via a MutationObserver so
 * glyph-only components (HUD, boot sequence) can mount/unmount cleanly
 * without a context provider.
 */
export function useIsGlyph(): boolean {
  const [isGlyph, setIsGlyph] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    const sync = () => setIsGlyph(el.dataset.theme === "glyph");
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  return isGlyph;
}
