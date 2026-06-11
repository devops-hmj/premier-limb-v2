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
 * @return array<int, array{name: string, price: string}>
 */
function pll_seo_pricing_tiers() {
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
	);
}
