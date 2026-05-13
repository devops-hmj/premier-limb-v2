/**
 * Premier Limb Lengthening — Design Tokens (typed)
 *
 * Single source of truth for the values consumed by Tailwind + CSS variables.
 * Import these in code that generates content programmatically (charts, SVG,
 * dynamic theming, etc.). For styling components, prefer Tailwind classes.
 */

export const color = {
  // Editorial spine — used for mastheads, eyebrows, italic accents, rules.
  spine: "#254A5D",
  spineDeep: "#18323F",
  spineWash: "#EAF0F3",
  spineTint: "#F3F6F8",

  // Signal Blue — secondary actions, phone numbers, live links.
  signal: "#1E6FE5",
  signalDeep: "#1556B8",

  // Action Green — reserved for the single highest-intent CTA on a surface.
  action: "#2BBE7B",
  actionDeep: "#1F9C63",
  actionInk: "#06281A",

  ink: "#0F1417",
  inkSoft: "#3A4047",
  paper: "#FFFFFF",
  paperOff: "#F8F6F1", // Newsprint — primary page ground
  paperWarm: "#ECE8DE",
  cream: "#F4F0E6",
  rule: "#D9D5C9",
  ruleHard: "#0F1417",
  muted: "#6B6F72",
  warn: "#B03A3A",
} as const;

export const space = {
  xs: 8,
  s: 16,
  m: 24,
  l: 40,
  xl: 64,
  "2xl": 96,
  "3xl": 160,
} as const;

export const layout = {
  containerMax: 1320,
  gutterDesktop: 48,
  gutterMobile: 24,
  columns: 12,
  sectionMin: 96,
  sectionMax: 150,
} as const;

export const font = {
  serif: '"Newsreader", Georgia, ui-serif, serif',
  sans: '"Inter Tight", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
} as const;

/**
 * The Three-Tier CTA Hierarchy.
 * Each surface gets ONE tier 01 CTA — and only one.
 */
export const ctaTier = {
  /** Action Green — book, schedule, apply. The conversion verb. */
  conversion: "action",
  /** Signal Blue — phone numbers, secondary actions, live links. */
  interactive: "signal",
  /** Premier Blue — in-body editorial CTAs, low intensity. */
  editorial: "spine",
} as const;

export type CtaTier = keyof typeof ctaTier;

/**
 * Pantone references (for print collateral).
 */
export const print = {
  spine: { pantone: "2168 C", cmyk: "85 / 60 / 40 / 25" },
  ink: { pantone: "426 C", cmyk: "35 / 0 / 0 / 91" },
  paperOff: { pantone: "11-0507 TCX" },
} as const;
