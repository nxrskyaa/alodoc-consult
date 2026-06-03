import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F8F1E8",
        parchment: "#FFF9F1",
        cocoa: "#202020",
        cocoaSoft: "#5F5A53",
        olive: "#90A090",
        oliveDeep: "#708473",
        orange: "#B86B5E",
        peach: "#C9A668",
        mint: "#E5ECDF",
        cardBeige: "#EFE6DA",
        deepBlack: "#0E0E0E",
        warningSand: "#C9A668",
        alertClay: "#B86B5E"
      },
      boxShadow: {
        soft: "0 24px 70px rgba(32, 32, 32, 0.12)",
        lift: "0 14px 34px rgba(32, 32, 32, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
