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
			'a' => 'Bilateral femur lengthening is $95,500 and bilateral tibia lengthening is $105,500. A combined tibia and femur procedure is $195,000, with maximum-height options up to 6 inches discussed during consultation. Every quote includes surgery, implants, anesthesia, hospitalization, and follow-up care. Financing is available through SoFi and CareCredit.',
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
			'a' => "Yes. Our concierge program coordinates flights, ground transportation, extended-stay housing, and physical therapy. We've served patients from 50+ states and countries.",
		),
		array(
			'q' => 'Can you handle revision cases?',
			'a' => "Yes. Dr. Basmajian's trauma reconstruction expertise means we accept revision cases many surgeons decline. We will review your history and imaging before committing to any plan.",
		),
	);
}
