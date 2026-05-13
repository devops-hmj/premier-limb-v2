import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** `dark` flips to ink ground (#0F1417) with spine accents. */
  variant?: "light" | "dark";
  /** Vertical rhythm. Defaults to 96px (section). */
  padding?: "default" | "lg" | "xl";
};

const padMap: Record<NonNullable<SectionProps["padding"]>, string> = {
  default: "py-section",
  lg: "py-section-lg",
  xl: "py-section-xl",
};

/**
 * Section — the building block of the page. Provides vertical rhythm,
 * a hairline bottom rule, and an inner container.
 */
export function Section({
  id,
  children,
  className,
  variant = "light",
  padding = "default",
}: SectionProps) {
  const dark = variant === "dark";
  return (
    <section
      id={id}
      className={cn(
        padMap[padding],
        "border-b",
        dark ? "bg-ink text-[#E5E7E9] border-transparent" : "border-rule",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
