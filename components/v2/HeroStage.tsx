"use client";

import { motion } from "framer-motion";
import { NavV2Overlay } from "./NavV2";

/**
 * HeroStage — the video-backed masthead and headline.
 *
 * Layered z-stack:
 *   .v2-vbg          → animated gradient + grain (fallback while the video
 *                      buffers). z-0.
 *   <video>          → /public/video/dr-hero.mp4, autoplays muted on loop,
 *                      fades in over the gradient once metadata loads.
 *   .v2-vshade       → top→bottom dark scrim that resolves into paper-off
 *                      at the bottom so the article body docks cleanly. z-1.
 *   <NavV2Overlay>   → transparent nav. z-10.
 *   <hero content>   → headline + deck. z-10.
 */
export function HeroStage() {
  return (
    <div className="v2-video-stage relative border-b border-ink min-h-[100svh] lg:h-[100svh] lg:overflow-hidden flex flex-col">
      {/* Animated gradient sits behind the video as a load-time placeholder. */}
      <div className="v2-vbg" aria-hidden />
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/video/dr-hero.mp4" type="video/mp4" />
      </video>
      <div className="v2-vshade" aria-hidden />
      <span className="v2-vplate hidden lg:inline-flex" aria-hidden>Reel · Looping</span>

      <NavV2Overlay />

      <div className="relative z-10 mx-auto max-w-wrap w-full px-6 lg:px-12 pt-3 lg:pt-4 grid grid-cols-12 gap-4 lg:gap-8 border-t border-white/20">
        <div className="col-span-12 sm:col-span-4 pt-3 lg:pt-4 font-mono uppercase tracking-[0.2em] text-[10.5px] text-white/85">
          <strong className="text-white font-medium">The Practice</strong>
          <span className="text-white/70"> · Cosmetic Limb Lengthening</span>
        </div>
        <div className="hidden sm:block col-span-4 pt-3 lg:pt-4 text-center font-serif italic text-[15px] text-white/85">
          &ldquo;Confidence you can stand behind.&rdquo;
        </div>
        <div className="col-span-12 sm:col-span-4 pt-3 lg:pt-4 sm:text-right font-mono uppercase tracking-[0.2em] text-[10.5px] text-white/85">
          <strong className="text-white font-medium">Southern California</strong>
          <span className="text-white/70"> · Est. Pomona</span>
        </div>
      </div>

      {/* Hero content — flows top→down with no empty gap. Kicker sits
          directly under the top metadata bar with its own horizontal rule;
          H1 docks immediately below; deck closes the column. flex-1 makes
          the section claim the remaining viewport so vh-scaled H1 has the
          full available space to fill. */}
      <section className="relative z-10 flex-1 flex flex-col mx-auto max-w-wrap w-full px-6 lg:px-12 pt-5 lg:pt-6 pb-6 lg:pb-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.2, 0.65, 0.3, 1] }}
          className="font-serif italic text-[16px] lg:text-[20px] max-w-[58ch] pb-4 lg:pb-5 border-b border-white/25"
          style={{ color: "#F4D88A" }}
        >
          A West-Coast authority on a procedure most surgeons won&rsquo;t perform.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.2, 0.65, 0.3, 1] }}
          className="font-serif font-normal text-white tracking-[-0.025em] leading-[0.92] max-w-[14ch] mt-5 lg:mt-6"
          style={{
            /* Scaled by min(width, height) so 4 lines + deck always fit.
               Generous cap (180) so the headline dominates on tall windows
               like the reference dossier. */
            fontSize: "clamp(46px, min(7.4vw, 13vh), 180px)",
            textShadow: "0 2px 30px rgba(0,0,0,0.4)",
          }}
        >
          Cosmetic
          <br />
          limb
          <br />
          lengthening, <em className="italic" style={{ color: "#F4D88A" }}>done<br />with care.</em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.2, 0.65, 0.3, 1] }}
          className="mt-auto pt-5 pb-5 border-t border-white/35 border-b grid grid-cols-12 gap-4 items-baseline"
        >
          <p className="col-span-12 lg:col-span-7 font-serif italic text-white leading-[1.2]" style={{ fontSize: "clamp(18px, 2.1vw, 26px)" }}>
            Gain up to 6 inches with one of the most experienced limb
            lengthening surgeons on the West Coast.
          </p>
          <div className="col-span-12 lg:col-span-5 font-mono uppercase text-[10.5px] tracking-[0.18em] text-white/85 leading-[1.7]">
            <div><strong className="text-white font-medium">Surgeon</strong> &nbsp; Dr. Hrayr Basmajian, MD</div>
            <div><strong className="text-white font-medium">Practice</strong> &nbsp; Premier Orthopaedic &amp; Trauma Specialists</div>
            <div><strong className="text-white font-medium">Location</strong> &nbsp; Pomona, Southern California</div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
