# Premier Limb Lengthening (PLL) – Project Implementation Plan

## Overview
This document outlines the systematic, agent-driven implementation plan for the Premier Limb Lengthening website. The project involves taking the newly scraped content, the netlify homepage wireframe, and the existing design system to construct a high-fidelity, high-performance Next.js application.

---

## Phase 1: Foundation & Design System Sync
**Goal:** Establish a bulletproof design system and project foundation.
*   **Design Tokens:** Audit and align `app/globals.css` and `tailwind.config.ts` with the canonical design tokens (typography, Premier Blue, spacing) from the `/Design` directory.
*   **Component Architecture:** Ensure core UI components (buttons, cards, typography components) are purged of default overrides and strictly follow the brand's premium editorial styling.
*   **Routing Setup:** Initialize the core routing structure in Next.js (App Router) based on `sitemap_data.json`.

---

## Phase 2: Homepage Implementation (Priority 1)
**Goal:** Build the high-conversion, pixel-perfect homepage based on `netlify_homepage.md`.
*   **Hero Section:** Implement the cinematic hero section with video background/grain effects. Add the "Cosmetic Limb Lengthening Surgery" copy and dual CTAs.
*   **Key Stats / Brag Bar:** Build the interactive stats bar highlighting procedures performed and transparent pricing.
*   **Concierge Program Section:** Develop the specialized content section outlining the white-glove travel program, utilizing clean typography and iconography.
*   **Boilerplate & Footer:** Implement the AEO (Answer Engine Optimization) boilerplate and global footer.

---

## Phase 3: Shared Layouts & Navigation
**Goal:** Implement the overarching site shell to support subpages.
*   **Global Navigation:** Refine `components/layout/Nav.tsx` to handle desktop/mobile states, ensuring CTA consistency.
*   **Page Wrappers:** Create reusable layout wrappers with consistent padding, maximal widths, and motion entry animations.

---

## Phase 4: Subpage Content Migration
**Goal:** Map and migrate the 38 extracted pages from `scraped_content` into the Next.js architecture.
*   **Page Generation:** Scaffold the directories for `/dr-basmajian`, `/your-surgery`, `/consult`, `/blog`, etc.
*   **Content Formatting:** Transform the raw Markdown content into rich React components, utilizing standard layout templates (e.g., standard article view, service details view).
*   **SEO Metadata:** Inject exact page titles and descriptions derived from the scraped data into the Next.js `metadata` exports.

---

## Phase 5: QA, Polish, & Handoff
**Goal:** Ensure a premium, bug-free, responsive experience.
*   **Responsive QA:** Execute rigorous testing across mobile, tablet, and desktop breakpoints. Ensure the magazine-style layout holds up beautifully.
*   **Motion & Interaction:** Polish micro-interactions, scroll indicators, and section transitions using Framer Motion.
*   **SEO & Analytics:** Finalize dynamic XML sitemaps, robots.txt, and prepare tracking scripts.

---

### Instructions for Agent Execution:
When picking up a track from this plan, the agent MUST:
1. Reference `CLAUDE.md` for current project status.
2. Read the corresponding `scraped_content/*.md` file before generating page code.
3. Use the `view_file` tool on related design specs in the `/Design` directory before writing CSS/Tailwind classes.
4. Update `CLAUDE.md` upon completion of a phase.
