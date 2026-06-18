import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // CSS-variable-backed (space-separated RGB channels) so [data-theme="glyph"]
        // can remap the whole app in one flip AND Tailwind opacity modifiers
        // (bg-cocoa/10, bg-parchment/88, ...) still work via <alpha-value>.
        // Light channel values are the fallbacks — identical to the original look.
        cream: "rgb(var(--c-cream, 248 241 232) / <alpha-value>)",
        parchment: "rgb(var(--c-parchment, 255 249 241) / <alpha-value>)",
        cocoa: "rgb(var(--c-cocoa, 32 32 32) / <alpha-value>)",
        cocoaSoft: "rgb(var(--c-cocoaSoft, 95 90 83) / <alpha-value>)",
        olive: "rgb(var(--c-olive, 144 160 144) / <alpha-value>)",
        oliveDeep: "rgb(var(--c-oliveDeep, 112 132 115) / <alpha-value>)",
        orange: "rgb(var(--c-orange, 184 107 94) / <alpha-value>)",
        peach: "rgb(var(--c-peach, 201 166 104) / <alpha-value>)",
        mint: "rgb(var(--c-mint, 229 236 223) / <alpha-value>)",
        cardBeige: "rgb(var(--c-cardBeige, 239 230 218) / <alpha-value>)",
        deepBlack: "rgb(var(--c-deepBlack, 14 14 14) / <alpha-value>)",
        warningSand: "rgb(var(--c-warningSand, 201 166 104) / <alpha-value>)",
        alertClay: "rgb(var(--c-alertClay, 184 107 94) / <alpha-value>)"
      },
      opacity: {
        88: "0.88",
        92: "0.92"
      },
      boxShadow: {
        soft: "var(--shadow-soft, 0 24px 70px rgba(32, 32, 32, 0.12))",
        lift: "var(--shadow-lift, 0 14px 34px rgba(32, 32, 32, 0.10))"
      }
    }
  },
  plugins: []
};

export default config;
