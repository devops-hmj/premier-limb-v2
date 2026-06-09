"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // React's `muted` JSX attribute is NOT reliably reflected to the DOM
  // property, and browsers block muted-autoplay if the property isn't set when
  // they evaluate it — so set it imperatively the moment the node mounts.
  const attachVideo = (el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el) el.muted = true;
  };

  // Kick playback explicitly (don't trust the autoPlay attribute alone) and
  // retry once the browser has buffered enough. Then enable sound at the
  // visitor's first interaction — click, tap, key, or scroll. A manual toggle
  // is also provided. This is the closest to "autoplay with sound" allowed.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;

    const tryPlay = () => {
      void v.play?.().catch(() => {});
    };
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("loadeddata", tryPlay);

    let armed = true;
    const enableSound = () => {
      if (!armed) return;
      armed = false;
      v.muted = false;
      setMuted(false);
      void v.play?.().catch(() => {});
      detachInteraction();
    };
    const detachInteraction = () => {
      window.removeEventListener("pointerdown", enableSound);
      window.removeEventListener("keydown", enableSound);
      window.removeEventListener("touchstart", enableSound);
      window.removeEventListener("scroll", enableSound);
    };
    window.addEventListener("pointerdown", enableSound);
    window.addEventListener("keydown", enableSound);
    window.addEventListener("touchstart", enableSound);
    window.addEventListener("scroll", enableSound, { passive: true });

    return () => {
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("loadeddata", tryPlay);
      detachInteraction();
    };
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play?.().catch(() => {});
  };

  return (
    <div className="v2-video-stage relative border-b border-ink min-h-[100svh] lg:h-[100svh] lg:overflow-hidden flex flex-col">
      {/* Animated gradient sits behind the video as a load-time placeholder. */}
      <div className="v2-vbg" aria-hidden />
      <video
        ref={attachVideo}
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/video/home-hero-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/video/home-hero.mp4" type="video/mp4" />
      </video>
      <div className="v2-vshade" aria-hidden />
      <span className="v2-vplate hidden lg:inline-flex" aria-hidden>From the Practice</span>

      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Turn hero video sound on" : "Mute hero video"}
        className="absolute z-20 bottom-5 right-5 lg:bottom-7 lg:right-7 inline-flex items-center gap-2 bg-ink/70 hover:bg-ink text-white backdrop-blur px-3.5 py-2.5 font-mono uppercase tracking-[0.18em] text-[10.5px] transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
          <path d="M3 9v6h4l5 4V5L7 9H3z" fill="currentColor" />
          {muted ? (
            <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M16 8.5a4.5 4.5 0 010 7M18.5 6a8 8 0 010 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          )}
        </svg>
        <span>{muted ? "Sound off" : "Sound on"}</span>
      </button>

      <NavV2Overlay />

      <div className="relative z-10 mx-auto max-w-wrap w-full px-6 lg:px-12 pt-3 lg:pt-4 grid grid-cols-12 gap-4 lg:gap-8">
        <div className="col-span-12 sm:col-span-4 pt-3 lg:pt-4 font-mono uppercase tracking-[0.2em] text-[10.5px] text-white/85">
          <strong className="text-white font-medium">The Practice</strong>
          <span className="text-white/70"> · Cosmetic Limb Lengthening</span>
        </div>
        <div className="hidden sm:block col-span-4 pt-3 lg:pt-4 text-center font-serif italic text-[15px] text-white/85">
          &ldquo;Confidence you can stand behind.&rdquo;
        </div>
        <div className="col-span-12 sm:col-span-4 pt-3 lg:pt-4 sm:text-right font-mono uppercase tracking-[0.2em] text-[10.5px] text-white/85">
          <strong className="text-white font-medium">Southern California</strong>
          <span className="text-white/70"> · Est. Upland</span>
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
          className="font-serif italic text-[16px] lg:text-[20px] max-w-[58ch] pb-4 lg:pb-5"
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
            <div><strong className="text-white font-medium">Practice</strong> &nbsp; Premier Limb Lengthening</div>
            <div><strong className="text-white font-medium">Location</strong> &nbsp; Upland, California</div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
