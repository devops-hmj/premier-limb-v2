import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SwatchProps = {
  /** Role label shown small at the top of the chip (mono caps). */
  role: string;
  /** Display name. Wrap a fragment in <em> to italicize the second word. */
  name: ReactNode;
  /** Metadata key/value pairs shown below the chip. */
  meta: Array<{ k: string; v: ReactNode }>;
  /** Tailwind classes for the chip background + text color. */
  chipClassName: string;
  /** Larger chip surface (220px+ min height). */
  size?: "default" | "compact";
  className?: string;
};

/**
 * Swatch — a magazine-style color card.
 *
 * The chip presents the surface color and role; the meta row beneath
 * presents the canonical values (hex, rgb, cmyk, pantone, token).
 */
export function Swatch({
  role,
  name,
  meta,
  chipClassName,
  size = "default",
  className,
}: SwatchProps) {
  return (
    <div className={cn("surface flex flex-col", className)}>
      <div
        className={cn(
          "flex flex-col justify-between flex-1 px-6 py-5",
          size === "default" ? "min-h-[220px]" : "min-h-[160px]",
          chipClassName,
        )}
      >
        <div className="font-mono text-[10.5px] uppercase tracking-eyebrow opacity-70">
          {role}
        </div>
        <div
          className={cn(
            "font-serif font-medium leading-none tracking-[-0.01em]",
            size === "default" ? "text-[32px]" : "text-[22px]",
            "[&_em]:italic",
          )}
        >
          {name}
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 border-t border-ink px-6 py-4 bg-paper">
        {meta.map(({ k, v }) => (
          <div key={k} className="contents">
            <dt className="font-mono text-[10.5px] uppercase tracking-wider text-muted">{k}</dt>
            <dd className="font-mono text-[12px] text-ink text-right">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
