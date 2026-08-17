<?php
/**
 * Pricing tiers — PHP port of lib/pricing-plans.ts (names + prices only;
 * the schema needs nothing more). Drives the ItemList JSON-LD on
 * /limb-lengthening-pricing-options/.
 *
 * @package pll-seo
 */

defined( 'ABSPATH' ) || exit;

/**
 * The pricing tiers.
 *
 * @return array<int, array{name: string, price: string}>
 */
function pll_seo_pricing_tiers() {
	// Page order: the three PRECICE Max packages, then the three PRECICE 2
	// packages (same items per surgery type, flat $20,000 lower).
	return array(
		array(
			'name'  => 'Bilateral Femur Lengthening',
			'price' => '$95,500',
		),
		array(
			'name'  => 'Bilateral Tibia Lengthening',
			'price' => '$105,500',
		),
		array(
			'name'  => 'Combined Tibia + Femur',
			'price' => '$195,000',
		),
		array(
			'name'  => 'Bilateral Femur Lengthening with PRECICE 2',
			'price' => '$75,500',
		),
		array(
			'name'  => 'Bilateral Tibia Lengthening with PRECICE 2',
			'price' => '$85,500',
		),
		array(
			'name'  => 'Combined Tibia + Femur with PRECICE 2',
			// $150,000, not $175,000. This tier drives the pricing page's Offer
			// JSON-LD, which production has been publishing as 175000 while the
			// visible card on the same page reads $150,000. $150,000 is the
			// figure the pricing page and the Evaluate-Your-Surgeon cost table
			// both show, and the only one in git history. Confirmed by the
			// owner 2026-08-17.
			'price' => '$150,000',
		),
	);
}
