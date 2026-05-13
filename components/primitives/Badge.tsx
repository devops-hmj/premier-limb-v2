import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  /**
   * spine    — default, mono on spine ground
   * outline  — mono on paper with hairline border
   * dark     — mono on ink ground
   */
  variant?: "spine" | "outline" | "dark";
  className?: string;
};

/**
 * Badge — small mono uppercase token (e.g. "№ 0142", "Confidential").
 * Never used for emphasis on body text; reserved for metadata chrome.
 */
export function Badge({ children, variant = "spine", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5",
        "font-mono uppercase text-[10.5px] tracking-eyebrow",
        variant === "spine" && "bg-spine text-paper",
        variant === "outline" && "border border-ink text-ink",
        variant === "dark" && "bg-ink text-paper",
        className,
      )}
    >
      {children}
    </span>
  );
}
