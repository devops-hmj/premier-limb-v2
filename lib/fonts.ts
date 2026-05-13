import { Inter_Tight, JetBrains_Mono, Newsreader } from "next/font/google";

/**
 * The three families from the brand dossier:
 *   • Newsreader     — Display / editorial / italic spine accents
 *   • Inter Tight    — Body / navigation / UI
 *   • JetBrains Mono — Eyebrows / metadata / technical labels
 *
 * Each is exposed as a CSS variable so Tailwind's `font-serif|sans|mono`
 * classes resolve to the right family. See tailwind.config.ts.
 */

export const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
});

/** Concatenated class name for <html>. */
export const fontVariables = [serif.variable, sans.variable, mono.variable].join(" ");
