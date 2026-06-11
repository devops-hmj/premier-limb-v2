/**
 * Tailwind config for the pll-editorial block theme.
 *
 * Ported verbatim from the root Next.js `tailwind.config.ts` (keep the two in sync —
 * identical tokens are the pixel-parity contract). Differences from the root config:
 *   - content globs scan theme PHP/HTML + plugin render templates (paths are relative
 *     to the `wordpress/` working directory where npm scripts run)
 *   - font families are literal stacks (next/font CSS variables don't exist here);
 *     the woff2 faces are registered by theme.json fontFace
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // WordPress stamps its media-size class `size-full` on every full-size
  // wp:image figure, which collides with Tailwind 3.4's size-full utility
  // (width:100% + height:100%) — image figures were filling their flex rows
  // and squeezing siblings. The design never uses the size-* utilities;
  // suppress the colliding one.
  blocklist: ["size-full", "size-large", "size-medium", "size-thumbnail"],
  content: [
    "./wp-content/themes/pll-editorial/templates/**/*.html",
    "./wp-content/themes/pll-editorial/parts/**/*.html",
    "./wp-content/themes/pll-editorial/patterns/**/*.php",
    "./wp-content/themes/pll-editorial/src/**/*.{js,jsx,php}",
    "./wp-content/themes/pll-editorial/inc/**/*.php",
    "./wp-content/plugins/pll-forms/src/**/*.{js,jsx,php}",
    "./wp-content/plugins/pll-forms/includes/**/*.php",
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
      // Each color has a single, defined job. See DESIGN_SYSTEM.md at the repo root.
      colors: {
        spine: {
          DEFAULT: "#254A5D", // Premier Blue
          deep: "#18323F",
          wash: "#EAF0F3",
          tint: "#F3F6F8",
        },
        signal: {
          DEFAULT: "#1E6FE5",
          deep: "#1556B8",
        },
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
        gold: "#F4D88A",
        rule: {
          DEFAULT: "#D9D5C9",
          hard: "#0F1417",
        },
        muted: "#6B6F72",
        warn: "#B03A3A",
      },

      // ===== Typography families =====
      // Literal stacks; @font-face is emitted by theme.json (self-hosted woff2).
      // Indirect through the :root custom properties (defined in
      // src/css/tailwind.css) instead of literal stacks: cssnano strips the
      // quotes from font names during --minify, and Chromium fails ch-unit
      // resolution for UNQUOTED multi-word families delivered via stylesheet
      // rules ("JetBrains Mono" renders fine but every max-w-[Nch] clamp
      // measures the fallback font). var() values pass through minification
      // untouched, and this matches how the Next build references its fonts.
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
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
        2: "2px",
        3: "3px",
        4: "4px",
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
