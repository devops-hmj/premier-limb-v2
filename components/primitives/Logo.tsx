import Image from "next/image";
import { cn } from "@/lib/cn";

// ============================================================================
// Logo — the OFFICIAL Premier Limb Lengthening Institute wordmark (PNG asset).
// ============================================================================

type LogoTone = "light" | "dark";

type LogoProps = {
  /** Background brightness. `light` → black wordmark · `dark` → white wordmark. */
  tone?: LogoTone;
  /** Rendered width in pixels. Height is derived from the asset's 3:1 ratio. */
  width?: number;
  /** Pass `true` for above-the-fold use (Nav, hero). Forwards to next/image. */
  priority?: boolean;
  className?: string;
};

const ASSET: Record<LogoTone, { src: string; w: number; h: number }> = {
  // Intrinsic dimensions match the source files in public/.
  light: { src: "/PLL-black-logo.png", w: 863, h: 289 },
  dark: { src: "/PLL-white-logo.png", w: 202, h: 62 },
};

/**
 * Logo — the official "Premier Limb Lengthening Institute" wordmark.
 * Renders the PNG via next/image so it's optimized + responsive.
 *
 * For the typographic study lockup used in the design dossier
 * (italic "P" mark + Premier Limb Lengthening + tagline), use <LogoLockup />.
 */
export function Logo({
  tone = "light",
  width = 200,
  priority = false,
  className,
}: LogoProps) {
  const asset = ASSET[tone];
  const height = Math.round((width * asset.h) / asset.w);
  return (
    <Image
      src={asset.src}
      alt="Premier Limb Lengthening Institute"
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={cn("block h-auto w-auto max-w-full", className)}
      style={{ width, height }}
    />
  );
}

// ============================================================================
// LogoLockup — the synthesized typographic lockup that documents the brand's
// editorial construction. Used in the design-system dossier ONLY.
// ============================================================================

type LockupSize = "sm" | "md" | "lg";
type LockupVariant = "default" | "reverse-spine" | "reverse-ink" | "cream";

type LogoLockupProps = {
  layout?: "row" | "stack";
  size?: LockupSize;
  variant?: LockupVariant;
  tagline?: string;
  emphasizeName?: boolean;
  className?: string;
};

const markSize: Record<LockupSize, string> = {
  sm: "w-10 h-10 text-[22px]",
  md: "w-[60px] h-[60px] text-[36px]",
  lg: "w-24 h-24 text-[60px]",
};

const topSize: Record<LockupSize, string> = {
  sm: "text-[22px]",
  md: "text-[32px]",
  lg: "text-[44px]",
};

/**
 * LogoLockup — the typographic study lockup (italic "P" + Newsreader wordmark
 * + mono tagline) used to DOCUMENT the brand's editorial system in the
 * design dossier. NOT the production mark — for that, use <Logo />.
 */
export function LogoLockup({
  layout = "row",
  size = "md",
  variant = "default",
  tagline = "Cosmetic limb lengthening, founded by Dr. Hrayr Basmajian",
  emphasizeName = false,
  className,
}: LogoLockupProps) {
  const isReverseSpine = variant === "reverse-spine";
  const isReverseInk = variant === "reverse-ink";
  const isCream = variant === "cream";
  const onDark = isReverseSpine || isReverseInk;

  return (
    <div
      className={cn(
        "flex items-center gap-[18px]",
        layout === "stack" && "flex-col items-center gap-[14px]",
        className,
      )}
    >
      <div
        className={cn(
          "grid place-items-center font-serif italic font-medium pb-1 select-none",
          markSize[size],
          isReverseSpine && "bg-paper text-spine",
          !isReverseSpine && "bg-spine text-paper",
          isCream && "bg-spine text-paper",
        )}
        aria-hidden
      >
        P
      </div>
      <div className={cn("leading-[1.05]", layout === "stack" && "text-center")}>
        <div
          className={cn(
            "font-serif font-medium tracking-[-0.01em]",
            topSize[size],
            onDark && "text-paper",
          )}
        >
          {emphasizeName ? (
            <>
              Premier <em className="em-spine">Limb Lengthening</em>
            </>
          ) : (
            <>Premier Limb Lengthening</>
          )}
        </div>
        <div
          className={cn(
            "mt-1 font-mono uppercase text-[10px] tracking-eyebrow",
            onDark ? "text-paper/55" : "text-muted",
          )}
        >
          {tagline}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Monogram — square serif "P" mark, used for avatars / favicons / seals.
// ============================================================================

export function Monogram({
  size = 100,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.6 }}
      className={cn(
        "grid place-items-center bg-spine text-paper",
        "font-serif italic font-medium pb-[6px] select-none",
        className,
      )}
      aria-label="Premier Limb Lengthening"
      role="img"
    >
      P
    </div>
  );
}
