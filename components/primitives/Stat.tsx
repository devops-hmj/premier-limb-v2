import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StatItem = {
  /** Numeric value. Wrap in <em> for italic spine accent. */
  n: ReactNode;
  /** Lowercase descriptor (mono uppercase under the number). */
  label: ReactNode;
};

/**
 * StatGrid — numerical proof, three across, with a spine top rule.
 * Used to convert claims into specifics ("Hundreds of procedures.").
 */
export function StatGrid({
  items,
  className,
}: {
  items: StatItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid border-t-2 border-spine",
        items.length === 2 && "grid-cols-2",
        items.length === 3 && "grid-cols-3",
        items.length === 4 && "grid-cols-2 md:grid-cols-4",
        className,
      )}
    >
      {items.map((s, i) => (
        <div
          key={i}
          className={cn(
            "py-5 pr-4 border-r border-rule last:border-r-0",
          )}
        >
          <div className="font-serif font-medium text-[44px] leading-none tracking-[-0.02em] [&_em]:italic [&_em]:text-spine">
            {s.n}
          </div>
          <div className="mt-2.5 font-mono text-[10.5px] uppercase tracking-eyebrow text-muted">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
