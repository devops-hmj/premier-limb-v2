import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CoverStripProps = {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  className?: string;
};

/**
 * CoverStrip — the thin ink masthead bar at the top of editorial pages.
 * Mono · uppercase · 10.5px. Left item gets a leading spine dot.
 */
export function CoverStrip({ left, center, right, className }: CoverStripProps) {
  return (
    <div
      className={cn(
        "cover-strip flex justify-between gap-4 py-2.5 px-6 md:px-12",
        className,
      )}
    >
      {left !== undefined && (
        <div className="inline-flex items-center gap-2.5 before:content-[''] before:w-2.5 before:h-2.5 before:bg-spine">
          {left}
        </div>
      )}
      {center !== undefined && <div className="text-center">{center}</div>}
      {right !== undefined && <div className="text-right">{right}</div>}
    </div>
  );
}
