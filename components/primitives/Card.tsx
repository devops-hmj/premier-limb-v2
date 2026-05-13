import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  /** Top bar text — mono uppercase tracker (e.g. "№ 01 · Pillar"). */
  index?: ReactNode;
  /** Optional right-side mono label on the top bar. */
  topLabel?: ReactNode;
  /** Card heading. Wrap a word in <em> for italic spine accent. */
  heading: ReactNode;
  /** Body copy. Plain string or arbitrary nodes. */
  children?: ReactNode;
  className?: string;
};

/**
 * Card — a "list item" pillar card with a spine-colored top bar.
 * Used for editorial pillars, services, articles in a grid.
 */
export function Card({ index, topLabel, heading, children, className }: CardProps) {
  return (
    <article className={cn("surface p-9", className)}>
      {(index || topLabel) && (
        <div className="flex items-center gap-3 pb-3.5 mb-4 border-b-2 border-spine font-mono text-[10.5px] uppercase tracking-eyebrow text-spine">
          {index && (
            <span className="bg-spine text-paper px-2 py-0.5">{index}</span>
          )}
          {topLabel && <span>{topLabel}</span>}
        </div>
      )}
      <h3 className="font-serif font-medium text-[28px] leading-[1.1] mb-2.5 tracking-[-0.01em] [&_em]:italic [&_em]:text-spine">
        {heading}
      </h3>
      {children && (
        <div className="text-[14px] text-ink-soft leading-[1.6]">{children}</div>
      )}
    </article>
  );
}
