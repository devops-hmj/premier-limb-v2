import { cn } from "@/lib/cn";

type EyebrowProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** Tone: spine (default) for light grounds, paper for dark grounds, muted for tertiary. */
  tone?: "spine" | "paper" | "muted";
};

/**
 * Eyebrow — mono · uppercase · letter-spaced label with a leading rule.
 * Used as section labels and metadata, never as body copy.
 */
export function Eyebrow({ tone = "spine", className, ...rest }: EyebrowProps) {
  return (
    <span
      className={cn(
        "eyebrow",
        // `.eyebrow` base sets text-spine; override per tone via !important utilities
        // so the custom-component-layer class doesn't win the specificity contest.
        tone === "paper" && "!text-paper eyebrow--paper",
        tone === "muted" && "!text-muted eyebrow--muted",
        className,
      )}
      {...rest}
    />
  );
}
