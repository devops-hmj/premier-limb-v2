import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PullQuoteProps = {
  children: ReactNode;
  attribution?: ReactNode;
  className?: string;
};

/**
 * PullQuote — serif italic large display. Used for patient quotes
 * and editorial pull-outs. Lives in a wash panel with a spine spine.
 */
export function PullQuote({ children, attribution, className }: PullQuoteProps) {
  return (
    <figure className={cn("surface-wash px-8 py-7", className)}>
      <blockquote className="font-serif italic font-normal text-[22px] leading-[1.4] text-ink [&_em]:not-italic [&_em]:text-spine">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 font-mono text-[10.5px] uppercase tracking-eyebrow text-muted">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
