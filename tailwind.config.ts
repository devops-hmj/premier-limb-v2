import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    // Editorial / magazine grid — 1320px max container, 48px gutter.
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1320px",
      "2xl": "1440px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "24px",
        md: "32px",
        lg: "48px",
      },
      screens: {
        xl: "1320px",
        "2xl": "1320px",
      },
    },
    extend: {
      // ===== Colors =====
      // Each color has a single, defined job. See DESIGN_SYSTEM.md.
      colors: {
        // Editorial spine — used for mastheads, eyebrows, italic accents, rules.
        spine: {
          DEFAULT: "#254A5D", // Premier Blue
          deep: "#18323F",
          wash: "#EAF0F3",
          tint: "#F3F6F8",
        },
        // Signal Blue — secondary actions, phone numbers, live links.
        signal: {
          DEFAULT: "#1E6FE5",
          deep: "#1556B8",
        },
        // Action Green — reserved for the single highest-intent CTA on a surface.
        action: {
          DEFAULT: "#2BBE7B",
          deep: "#1F9C63",
          ink: "#06281A",
        },
        ink: {
          DEFAULT: "#0F1417",
          soft: "#3A4047",
        },
        paper: {
          DEFAULT: "#FFFFFF",
          off: "#F8F6F1", // Newsprint — primary page ground
          warm: "#ECE8DE",
        },
        cream: "#F4F0E6",
        rule: {
          DEFAULT: "#D9D5C9",
          hard: "#0F1417",
        },
        muted: "#6B6F72",
        warn: "#B03A3A",
      },

      // ===== Typography families =====
      // Resolved from next/font CSS variables (--font-serif / --font-sans / --font-mono).
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "ui-serif", "serif"],
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },

      // Type scale — D-* = serif display, T-* = sans text, EB = mono eyebrow.
      fontSize: {
        eyebrow: ["11px", { lineHeight: "1.4", letterSpacing: "0.2em" }],
        "t-xs": ["12px", { lineHeight: "1.5", letterSpacing: "0" }],
        "t-s": ["13px", { lineHeight: "1.55" }],
        "t-m": ["15px", { lineHeight: "1.6" }],
        "t-l": ["16px", { lineHeight: "1.6" }],
        "t-xl": ["18px", { lineHeight: "1.55" }],
        "d-s": ["24px", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "d-m": ["36px", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "d-l": ["56px", { lineHeight: "0.96", letterSpacing: "-0.02em" }],
        "d-xl": ["80px", { lineHeight: "0.94", letterSpacing: "-0.02em" }],
        "d-2xl": ["120px", { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        hero: ["clamp(80px, 11vw, 168px)", { lineHeight: "0.9", letterSpacing: "-0.025em" }],
      },

      letterSpacing: {
        eyebrow: "0.22em",
        wide: "0.16em",
        wider: "0.18em",
        widest: "0.28em",
      },

      // ===== Spacing scale =====
      // xs 8 · s 16 · m 24 · l 40 · xl 64 · 2xl 96 · 3xl 160
      spacing: {
        xs: "8px",
        s: "16px",
        m: "24px",
        l: "40px",
        xl: "64px",
        "2xl": "96px",
        "3xl": "160px",
        section: "96px",
        "section-lg": "120px",
        "section-xl": "150px",
      },

      borderRadius: {
        none: "0",
        sm: "0",
        DEFAULT: "0",
        md: "0",
        lg: "0",
        xl: "0",
        pill: "9999px", // permitted only for hero-context icon dots
      },

      borderWidth: {
        hair: "1px",
        DEFAULT: "1px",
        "2": "2px",
        "3": "3px",
        "4": "4px",
      },

      maxWidth: {
        wrap: "1320px",
        prose: "72ch",
        deck: "36ch",
      },

      gridTemplateColumns: {
        "edit-12": "repeat(12, minmax(0, 1fr))",
      },

      boxShadow: {
        edge: "0 0 0 1px #0F1417",
        "edge-blue": "0 0 0 1px #254A5D",
      },
    },
  },
  plugins: [],
};

export default config;
