<?php
/**
 * Plugin Name: PLL SEO
 * Plugin URI: https://premierlimblengthening.com
 * Description: Search metadata for Premier Limb Lengthening: document titles, meta descriptions, canonicals, Open Graph/Twitter tags, Schema.org JSON-LD (MedicalBusiness, Physician, Article, FAQPage, MedicalProcedure), sitemap and robots tuning, and legacy redirects. A 1:1 port of the Next.js site's lib/jsonld.ts + per-page metadata.
 * Version: 1.0.0
 * Requires at least: 6.7
 * Requires PHP: 8.1
 * Author: Premier Limb Lengthening
 * License: GPL-2.0-or-later
 * Text Domain: pll-seo
 *
 * @package pll-seo
 */

defined( 'ABSPATH' ) || exit;

define( 'PLL_SEO_VERSION', '1.0.0' );
define( 'PLL_SEO_DIR', plugin_dir_path( __FILE__ ) );

// Canonical production origin. All canonical URLs, OG URLs, and schema @id
// values resolve against this, independent of the local host.
if ( ! defined( 'PLL_SEO_ORIGIN' ) ) {
	define( 'PLL_SEO_ORIGIN', 'https://premierlimblengthening.com' );
}

foreach ( array( 'data/faqs', 'data/pricing', 'meta', 'titles', 'head', 'schema', 'sitemap', 'robots-txt', 'redirects' ) as $pll_seo_include ) {
	$pll_seo_file = PLL_SEO_DIR . 'includes/' . $pll_seo_include . '.php';
	if ( file_exists( $pll_seo_file ) ) {
		require_once $pll_seo_file;
	}
}
unset( $pll_seo_include, $pll_seo_file );
