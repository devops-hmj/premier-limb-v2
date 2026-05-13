import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/primitives";

type PageHeaderProps = {
  eyebrow?: ReactNode;
  /** Main heading. Wrap a word in <em> for the italic-spine accent. */
  title: ReactNode;
  /** Optional deck — the answer-first opening sentence for GEO. */
  deck?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * PageHeader — the standard top of a content page.
 *   Eyebrow · h1 · optional deck — no other chrome.
 *
 * Sizing mirrors the design system display tokens but scales with viewport.
 */
export function PageHeader({
  eyebrow,
  title,
  deck,
  align = "left",
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5 sm:gap-6 max-w-prose",
        align === "center" && "items-center text-center mx-auto",
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1
        className="
          font-serif font-medium
          text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[0.98]
          tracking-[-0.02em] [&_em]:italic [&_em]:text-spine
          [text-wrap:balance]
        "
      >
        {title}
      </h1>
      {deck && (
        <p className="font-serif italic text-d-s leading-[1.4] text-ink-soft max-w-[40ch]">
          {deck}
        </p>
      )}
    </header>
  );
}
