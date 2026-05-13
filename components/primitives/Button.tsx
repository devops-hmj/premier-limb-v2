import { forwardRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Three-Tier CTA hierarchy.
 *
 *   action   — Tier 01 · the single highest-intent CTA per surface.
 *   accent   — Tier 02 · phone numbers, secondary live links.
 *   spine    — Tier 03 · editorial in-body CTAs.
 *   ghost    — quiet alternative to spine, on light grounds.
 *   ink      — high-contrast utility (confidential / form submit).
 *   warn     — brand red · used for the phone CTA per product direction
 *              (diverges from the Three-Tier Hierarchy; see DESIGN_SYSTEM.md).
 */
export type ButtonVariant = "action" | "accent" | "spine" | "ghost" | "ink" | "warn";

const base =
  "inline-flex items-center gap-2.5 px-[22px] py-[14px] " +
  "font-sans text-[12px] tracking-wide uppercase font-semibold " +
  "border border-transparent transition-colors duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-paper-off focus-visible:ring-spine " +
  "disabled:opacity-50 disabled:cursor-not-allowed select-none";

const variants: Record<ButtonVariant, string> = {
  action:
    "bg-action text-action-ink font-bold tracking-[0.14em] hover:bg-action-deep hover:text-paper",
  accent:
    "bg-signal text-paper font-bold tracking-[0.14em] hover:bg-signal-deep",
  spine:
    "bg-spine text-paper hover:bg-spine-deep",
  ghost:
    "bg-transparent text-spine border-spine py-[13px] hover:bg-spine hover:text-paper",
  ink:
    "bg-ink text-paper hover:bg-ink-soft",
  warn:
    "bg-warn text-paper font-bold tracking-[0.14em] hover:bg-warn/85",
};

type AsButton = {
  as?: "button";
  variant?: ButtonVariant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type AsAnchor = {
  as: "a";
  variant?: ButtonVariant;
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = AsButton | AsAnchor;

/**
 * Button — semantic button by default. Pass `as="a"` for navigation links.
 * Children may include a trailing arrow via the <Arrow/> helper.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    // Branch on `as` first, then destructure inside each branch. This avoids
    // TS2700 "rest types may only be created from object types" — which
    // triggers when destructuring a union type before narrowing.
    if (props.as === "a") {
      const { as: _as, variant = "spine", className, children, ...rest } = props;
      void _as;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(base, variants[variant], className)}
          {...rest}
        >
          {children}
        </a>
      );
    }

    const { as: _as, variant = "spine", className, children, type, ...rest } = props;
    void _as;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type ?? "button"}
        className={cn(base, variants[variant], className)}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

/** Italic serif arrow used in editorial CTAs. */
export function Arrow({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("font-serif italic text-[16px] leading-none", className)}>
      →
    </span>
  );
}
