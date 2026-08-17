<?php
/**
 * Homepage FAQ entries — PHP port of lib/faqs.ts. Drives the FAQPage
 * JSON-LD on the front page. Keep in sync with the pll/faq pattern content
 * (theme patterns/home-faq.php).
 *
 * @package pll-seo
 */

defined( 'ABSPATH' ) || exit;

/**
 * The homepage FAQ entries.
 *
 * @return array<int, array{q: string, a: string}>
 */
function pll_seo_faqs() {
	return array(
		array(
			'q' => 'How much does limb lengthening surgery cost?',
			// This answer is published as homepage FAQPage JSON-LD. It used to
			// quote only the PRECICE Max tier, which declared $95,500 as the
			// femur price while the pricing page and the SERP anchor both start
			// at $75,500. Every figure below is sourced from data/pricing.php.
			//
			// ⚠️ THIS STRING EXISTS IN THREE PLACES AND ONLY TWO ARE IN GIT.
			// 1. here            → JSON-LD, ships on code deploy
			// 2. home-faq.php    → pattern source, INERT on a seeded site
			// 3. post_content    → the visible homepage, in the DATABASE
			// setup.php pll_compose_patterns() inlines patterns at seed time, so
			// editing (2) does nothing to a live site. Changing this answer
			// WITHOUT hand-editing (3) makes the homepage's structured data
			// contradict its own visible text. Runbook: docs/MIGRATION.md §6f.
			// verify-seo-meta.mjs raises ACTION REQUIRED until it is done.
			'a' => 'Bilateral femur lengthening is $75,500 with the PRECICE 2 nail and $95,500 with PRECICE Max. Bilateral tibia is $85,500 and $105,500. Combined tibia and femur is $150,000 and $195,000. Every quote includes surgery, implants, anesthesia, hospitalization, and follow-up care. Financing is available through SoFi and CareCredit.',
		),
		array(
			'q' => 'How much height can I gain?',
			'a' => 'Femur lengthening typically adds 2 to 3 inches. Tibia lengthening adds another 2 to 3 inches. Combined staged height lengthening procedures can achieve up to 6 inches total. Results are permanent.',
		),
		array(
			'q' => 'How long is the recovery?',
			'a' => 'Active lengthening takes 3 to 4 months. Most patients return to daily activities within 3 to 4 months and full activity by 6 to 12 months.',
		),
		array(
			'q' => 'Will there be visible scars or hardware?',
			'a' => 'The Precice system is entirely internal (no external frames, no visible hardware). Small incisions heal to minimal scars.',
		),
		array(
			'q' => 'Do you accept out-of-state & international patients?',
			'a' => "Yes. Our concierge program coordinates flights, ground transportation, extended-stay housing, and on-site therapy. We've served patients from 50+ states and countries.",
		),
		array(
			'q' => 'Can you handle revision cases?',
			'a' => "Yes. Dr. Basmajian's trauma reconstruction expertise means we accept revision cases many surgeons decline. We will review your history and imaging before committing to any plan.",
		),
	);
}
