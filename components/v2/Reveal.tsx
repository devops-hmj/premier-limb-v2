"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal — gentle scroll-triggered fade-up wrapper.
 *
 * Fires once when the element crosses ~10% into the viewport. Keeps motion
 * subtle (~18px lift, 700ms) so the editorial feel stays primary and the
 * animation is supportive, not theatrical.
 *
 * `delay` lets callers stagger neighboring children (pillars, results, etc.)
 * without rewiring an orchestrator.
 */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: custom, ease: [0.2, 0.65, 0.3, 1] },
  }),
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Tag override for semantic markup (default: div). */
  as?: "div" | "section" | "li" | "article" | "header" | "aside";
};

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={fadeUp}
      custom={delay}
    >
      {children}
    </Tag>
  );
}
