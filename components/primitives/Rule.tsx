import { cn } from "@/lib/cn";

type RuleProps = {
  /**
   * hair     — 1px rule (#D9D5C9), used between list items
   * thin     — 1px ink rule, default divider
   * bold     — 2px ink rule, section divider
   * thick    — 3px ink rule, masthead divider
   * spine    — 4px spine rule, color-coded section spine
   */
  weight?: "hair" | "thin" | "bold" | "thick" | "spine";
  className?: string;
};

export function Rule({ weight = "thin", className }: RuleProps) {
  return (
    <hr
      className={cn(
        "w-full border-0",
        weight === "hair" && "rule-hair",
        weight === "thin" && "rule-thin",
        weight === "bold" && "rule-bold",
        weight === "thick" && "rule-thick",
        weight === "spine" && "rule-spine",
        className,
      )}
    />
  );
}
