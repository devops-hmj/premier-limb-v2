import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadProps = {
  /** Roman numeral or short serif index (e.g. "i", "ii"). */
  numeral?: ReactNode;
  /** Right-aligned mono section label (e.g. "§ 02 · Color"). */
  label?: ReactNode;
  /** Main heading. Use <em> internally for the italic spine accent. */
  children: ReactNode;
  /** Use on dark grounds to switch border/text colors. */
  variant?: "light" | "dark";
  className?: string;
};

/**
 * SectionHead — the magazine-style section opener.
 * Grid: [numeral · heading · label] with a thick bottom rule.
 */
export function SectionHead({
  numeral,
  label,
  children,
  variant = "light",
  className,
}: SectionHeadProps) {
  const dark = variant === "dark";
  return (
    <header
      className={cn(
        "grid items-end gap-7 pb-6 mb-14 border-b-2",
        "grid-cols-[90px_1fr_auto]",
        dark ? "border-spine" : "border-ink",
        className,
      )}
    >
      {numeral !== undefined ? (
        <div
          className={cn(
            "font-serif italic font-medium text-[60px] leading-[0.9]",
            "text-spine",
          )}
        >
          {numeral}
        </div>
      ) : (
        <div aria-hidden />
      )}
      <h2
        className={cn(
          "font-serif font-medium text-d-l md:text-d-xl",
          "[&_em]:font-serif [&_em]:italic [&_em]:text-spine",
          dark && "text-paper",
        )}
      >
        {children}
      </h2>
      {label !== undefined ? (
        <div className="text-right font-mono text-[10.5px] uppercase tracking-eyebrow text-muted">
          {label}
        </div>
      ) : (
        <div aria-hidden />
      )}
    </header>
  );
}
