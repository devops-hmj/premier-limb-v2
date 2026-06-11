<?php
/**
 * Sitemap: core wp-sitemap.xml, trimmed to what the site actually publishes,
 * with 301 aliases for the legacy sitemap URLs.
 *
 * @package pll-seo
 */

defined( 'ABSPATH' ) || exit;

// Only the category taxonomy (no tags/post formats in this content model).
add_filter(
	'wp_sitemaps_taxonomies',
	function ( $taxonomies ) {
		return array_intersect_key( $taxonomies, array( 'category' => true ) );
	}
);

// Users stay listed: the two legacy author archives are deliberate surfaces.

// Legacy sitemap URLs → core sitemap (covers the Next-era /sitemap.xml and
// the original Yoast /sitemap_index.xml from old Search Console submissions).
add_action(
	'template_redirect',
	function () {
		$path = wp_parse_url( add_query_arg( array() ), PHP_URL_PATH );
		if ( in_array( untrailingslashit( (string) $path ), array( '/sitemap.xml', '/sitemap_index.xml' ), true ) ) {
			wp_safe_redirect( home_url( '/wp-sitemap.xml' ), 301 );
			exit;
		}
	},
	1
);
