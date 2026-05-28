import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fbf5ea",
        parchment: "#fffaf1",
        cocoa: "#382417",
        cocoaSoft: "#6f5543",
        olive: "#788a4f",
        oliveDeep: "#4f6739",
        orange: "#e9823c",
        peach: "#f5cfaa",
        mint: "#dfe8d0"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(56, 36, 23, 0.12)",
        lift: "0 12px 30px rgba(56, 36, 23, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
