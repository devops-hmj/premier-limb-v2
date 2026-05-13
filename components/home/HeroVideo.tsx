"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * HeroVideo — looping video player with a sound toggle.
 *
 * Autoplay modes:
 *   "immediate" (default) → play on mount. Use for the hero.
 *   "in-view"             → wait until the figure enters the viewport, then
 *                           attempt play. Pause on leave to save bandwidth.
 *
 * WHY a toggle instead of unmuted autoplay:
 * Every major browser blocks `autoplay` when the video is not muted (Chrome,
 * Safari, Firefox enforce this for any first-visit page). A non-muted video
 * simply will not start. The compromise — used by Apple, Stripe, and most
 * editorial sites — is muted autoplay with a visible "Sound" control that
 * the visitor can click. The first click counts as a user gesture and
 * unmutes the video while it keeps playing.
 */
type AutoplayMode = "immediate" | "in-view";

export function HeroVideo({
  src,
  className,
  autoplay = "immediate",
}: {
  src: string;
  className?: string;
  autoplay?: AutoplayMode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Default state assumes unmuted. We'll downgrade to muted only if the
  // browser rejects unmuted autoplay (see attemptPlay below).
  const [muted, setMuted] = useState(false);

  // If the browser rejects autoplay for any reason, surface a paused state
  // so the toggle becomes a play+unmute control on the same click.
  const [paused, setPaused] = useState(false);

  /**
   * Try unmuted play first. On rejection, mute and retry.
   * On a fresh visit virtually every browser rejects unmuted — but on a
   * return visit where the user has interacted with this origin before,
   * Chrome's Media Engagement Index can grant unmuted autoplay.
   */
  const attemptPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play()
      .then(() => setMuted(false))
      .catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {
          /* even muted failed (rare) — leave it paused */
        });
      });
  }, []);

  // Tracks whether the unmute negotiation has already happened — so a
  // second viewport entry doesn't re-run the unmuted attempt (which would
  // unmute again even if the user had clicked "Mute").
  const playedOnceRef = useRef(false);

  // Mode "immediate" — play on mount.
  useEffect(() => {
    if (autoplay !== "immediate") return;
    attemptPlay();
    playedOnceRef.current = true;
  }, [autoplay, attemptPlay]);

  // Mode "in-view" — observe and play when the figure enters the viewport,
  // pause when it leaves. The first entry runs the unmute negotiation;
  // subsequent re-entries just resume play without re-touching mute state.
  useEffect(() => {
    if (autoplay !== "in-view") return;
    const v = videoRef.current;
    if (!v) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!playedOnceRef.current) {
              attemptPlay();
              playedOnceRef.current = true;
            } else {
              v.play().catch(() => {
                /* leave paused — user can click toggle */
              });
            }
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(v);
    return () => observer.disconnect();
  }, [autoplay, attemptPlay]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPause = () => setPaused(true);
    const onPlay = () => setPaused(false);
    v.addEventListener("pause", onPause);
    v.addEventListener("play", onPlay);
    return () => {
      v.removeEventListener("pause", onPause);
      v.removeEventListener("play", onPlay);
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    const nextMuted = !muted;
    v.muted = nextMuted;
    setMuted(nextMuted);
    // Make sure the click also counts as the "play" gesture if autoplay
    // was previously rejected — the same gesture satisfies both policies.
    if (v.paused) {
      v.play().catch(() => {
        /* user can try again — leave state as paused */
      });
    }
  };

  return (
    <>
      {/* We drive play() and mute imperatively in the effect above — this
          lets us prefer unmuted autoplay and fall back gracefully. */}
      <video
        ref={videoRef}
        className={cn("absolute inset-0 w-full h-full object-cover", className)}
        src={src}
        loop
        playsInline
        preload="auto"
        aria-label="Dr. Basmajian — looping clinical footage"
      />

      <button
        type="button"
        onClick={toggle}
        aria-pressed={!muted}
        aria-label={muted ? "Turn sound on" : "Mute sound"}
        className="
          group absolute top-4 right-4 z-20
          inline-flex items-center gap-2
          px-2.5 py-1.5
          bg-ink/70 hover:bg-ink/85 backdrop-blur-sm
          border border-paper/20
          font-mono text-eyebrow tracking-eyebrow uppercase text-paper
          transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal
        "
      >
        <SpeakerIcon muted={muted} />
        <span>{muted ? "Sound on" : "Mute"}</span>
      </button>

      {/* Quiet hint when autoplay was blocked (e.g. data-saver, Safari low-power).
          Only renders if the browser explicitly paused the video on load. */}
      {paused && (
        <button
          type="button"
          onClick={toggle}
          aria-label="Play video"
          className="absolute inset-0 z-10 grid place-items-center bg-ink/40 hover:bg-ink/55 transition-colors"
        >
          <span className="font-mono text-eyebrow tracking-eyebrow uppercase text-paper border border-paper px-4 py-2">
            ▶ Play
          </span>
        </button>
      )}
    </>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
    >
      <path d="M3 6h2l3-2.5v9L5 10H3z" fill="currentColor" />
      {muted ? (
        <>
          <line x1="10.5" y1="6" x2="14" y2="9.5" />
          <line x1="14" y1="6" x2="10.5" y2="9.5" />
        </>
      ) : (
        <>
          <path d="M10.5 5.5c1 .8 1 4.2 0 5" />
          <path d="M12.5 4c1.8 1.3 1.8 6.7 0 8" />
        </>
      )}
    </svg>
  );
}
