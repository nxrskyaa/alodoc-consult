"use client";

import { motion } from "framer-motion";
import type { Web3IssueTone } from "@/data/web3HealthIssues";

const TONES: Record<Web3IssueTone, { bg: string; soft: string; accent: string; deep: string }> = {
  lime: { bg: "#E5ECDF", soft: "#CDDAC4", accent: "#90A090", deep: "#708473" },
  blue: { bg: "#E2EAEF", soft: "#C7D6E0", accent: "#7E9BB0", deep: "#5C7C92" },
  orange: { bg: "#F1E2D8", soft: "#E4C9B6", accent: "#C99A7E", deep: "#B86B5E" },
  purple: { bg: "#E9E4EF", soft: "#D3C9E0", accent: "#A491BE", deep: "#7E6CA0" },
  pink: { bg: "#F3E1E6", soft: "#E7C7D2", accent: "#CC97A8", deep: "#B86B82" }
};

type VisualProps = {
  slug: string;
  tone: Web3IssueTone;
  compact?: boolean;
  className?: string;
};

/**
 * Calm, health-literacy illustration set for the Web3 Health Issues category.
 * Every glyph lives inside a padded 160x160 viewBox so nothing clips the card edge.
 */
export function Web3IssueVisual({ slug, tone, compact = false, className }: VisualProps) {
  const c = TONES[tone];
  const float = {
    animate: { y: [0, -6, 0] },
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const }
  };

  return (
    <div
      className={[
        "relative grid w-full place-items-center overflow-hidden rounded-[1.75rem] border border-cocoa/10 p-6",
        compact ? "min-h-[190px]" : "min-h-[260px]",
        className ?? ""
      ].join(" ")}
      style={{ background: `linear-gradient(150deg, ${c.bg}, ${c.soft})` }}
    >
      {/* soft ambient blobs, kept well inside bounds */}
      <span className="pointer-events-none absolute -left-6 -top-8 h-24 w-24 rounded-full opacity-50 blur-2xl" style={{ background: c.accent }} />
      <span className="pointer-events-none absolute -bottom-10 -right-6 h-28 w-28 rounded-full opacity-40 blur-2xl" style={{ background: c.deep }} />

      <motion.svg
        viewBox="0 0 160 160"
        className="relative h-auto w-[62%] max-w-[180px]"
        role="img"
        aria-label={slug}
        {...float}
      >
        <Glyph slug={slug} c={c} />
      </motion.svg>
    </div>
  );
}

function Glyph({ slug, c }: { slug: string; c: { bg: string; soft: string; accent: string; deep: string } }) {
  const stroke = "#202020";
  const sw = 3;
  const common = { fill: "none", stroke, strokeWidth: sw, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (slug) {
    case "sleep-deprivation":
      return (
        <g>
          <circle cx="80" cy="84" r="34" fill="#fff" stroke={stroke} strokeWidth={sw} />
          <path d="M66 80c0 8 6 14 14 14s14-6 14-14" {...common} />
          <circle cx="70" cy="74" r="2.6" fill={stroke} />
          <circle cx="90" cy="74" r="2.6" fill={stroke} />
          <path d="M104 44c-3 3-3 9 0 12-7 1-12-5-10-11 1-4 6-6 10-1z" fill={c.deep} stroke={stroke} strokeWidth={sw} />
          <text x="108" y="40" fontSize="15" fontWeight="700" fill={c.deep}>z</text>
          <text x="118" y="32" fontSize="11" fontWeight="700" fill={c.accent}>z</text>
        </g>
      );
    case "digital-eye-strain":
      return (
        <g>
          <path d="M40 84c12-18 28-18 40-18s28 0 40 18c-12 18-28 18-40 18s-28 0-40-18z" fill="#fff" stroke={stroke} strokeWidth={sw} />
          <circle cx="80" cy="84" r="11" fill={c.soft} stroke={stroke} strokeWidth={sw} />
          <circle cx="80" cy="84" r="3.5" fill={stroke} />
          <path d="M58 110c4 6 12 9 22 9s18-3 22-9" {...common} />
          <path d="M120 60l8-6M122 72l9-2" {...common} />
        </g>
      );
    case "neck-back-pain":
      return (
        <g>
          <circle cx="66" cy="52" r="13" fill="#fff" stroke={stroke} strokeWidth={sw} />
          <path d="M66 65c-6 10-6 22-2 34" {...common} />
          <path d="M64 99c10 2 22 2 34-2" {...common} />
          <path d="M72 78c8-4 18-6 28-4" {...common} />
          <path d="M104 56l6-2M106 66l7 1" stroke={c.deep} strokeWidth={sw} strokeLinecap="round" />
          <path d="M110 60l4 4M114 60l-4 4" stroke={c.deep} strokeWidth={sw} strokeLinecap="round" />
        </g>
      );
    case "stress-anxiety":
      return (
        <g>
          <path d="M52 74c-10 0-16 8-12 16 2 6 8 8 14 7 2 7 9 11 17 9 7-2 11-8 10-15 7-3 9-11 4-17-4-5-11-6-16-2-3-6-11-8-17-4-4 3-6 7-4 12z" fill="#fff" stroke={stroke} strokeWidth={sw} />
          <path d="M60 104c4 5 4 11 0 16M76 106c4 5 4 11 0 16M92 104c4 5 4 11 0 16" stroke={c.deep} strokeWidth={sw} strokeLinecap="round" fill="none" />
        </g>
      );
    case "burnout":
      return (
        <g>
          <rect x="46" y="60" width="60" height="38" rx="9" fill="#fff" stroke={stroke} strokeWidth={sw} />
          <rect x="106" y="71" width="9" height="16" rx="3" fill={stroke} />
          <rect x="53" y="68" width="22" height="22" rx="5" fill={c.deep} />
          <path d="M58 110c3-5 9-5 12 0M82 110c3-5 9-5 12 0" stroke={c.accent} strokeWidth={sw} strokeLinecap="round" fill="none" />
        </g>
      );
    case "physical-inactivity":
      return (
        <g>
          <circle cx="80" cy="46" r="11" fill="#fff" stroke={stroke} strokeWidth={sw} />
          <path d="M80 57c-4 10-4 18-2 24" {...common} />
          <path d="M78 81l-14 12M78 75l16 8" {...common} />
          <path d="M76 104l-8 16M82 104l8 16" {...common} />
          <path d="M112 96h22M112 104h16" stroke={c.deep} strokeWidth={sw} strokeLinecap="round" />
        </g>
      );
    case "excessive-caffeine":
      return (
        <g>
          <path d="M50 66h48v20c0 13-11 22-24 22S50 99 50 86z" fill="#fff" stroke={stroke} strokeWidth={sw} />
          <path d="M98 72h10c6 0 6 14-4 16" {...common} />
          <path d="M66 50c-3 4-3 8 0 12M80 48c-3 4-3 8 0 12" stroke={c.deep} strokeWidth={sw} strokeLinecap="round" fill="none" />
          <path d="M112 58l3-3M118 64l4-1" stroke={c.accent} strokeWidth={sw} strokeLinecap="round" />
        </g>
      );
    case "irregular-eating":
      return (
        <g>
          <circle cx="80" cy="84" r="32" fill="#fff" stroke={stroke} strokeWidth={sw} />
          <circle cx="80" cy="84" r="18" fill={c.soft} stroke={stroke} strokeWidth={sw} />
          <path d="M80 52v-14M80 38l-5 6M80 38l5 6" {...common} />
          <path d="M118 60v26M118 60c-5 1-7 5-7 10s3 7 7 7" {...common} />
        </g>
      );
    case "social-isolation":
      return (
        <g>
          <circle cx="64" cy="74" r="14" fill="#fff" stroke={stroke} strokeWidth={sw} />
          <path d="M44 108c2-12 10-18 20-18s18 6 20 18" {...common} />
          <circle cx="108" cy="70" r="11" fill="none" stroke={c.accent} strokeWidth={sw} strokeDasharray="4 5" />
          <path d="M92 102c1-9 7-14 16-14" stroke={c.accent} strokeWidth={sw} strokeLinecap="round" strokeDasharray="4 5" fill="none" />
        </g>
      );
    case "doomscrolling":
      return (
        <g>
          <rect x="56" y="40" width="48" height="80" rx="11" fill="#fff" stroke={stroke} strokeWidth={sw} />
          <line x1="68" y1="60" x2="92" y2="60" {...common} />
          <line x1="68" y1="74" x2="92" y2="74" {...common} />
          <line x1="68" y1="88" x2="84" y2="88" {...common} />
          <path d="M80 122v8M70 132c3 4 17 4 20 0" stroke={c.deep} strokeWidth={sw} strokeLinecap="round" fill="none" />
          <path d="M112 56l5-4M116 70l6-1" stroke={c.accent} strokeWidth={sw} strokeLinecap="round" />
        </g>
      );
    default:
      return <circle cx="80" cy="80" r="30" fill="#fff" stroke={stroke} strokeWidth={sw} />;
  }
}
