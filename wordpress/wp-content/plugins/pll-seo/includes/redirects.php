<?php
/**
 * Legacy URL redirects. The URL strategy is zero-redirect for every built
 * surface; this map only covers legacy URLs with no destination page.
 *
 * @package pll-seo
 */

defined( 'ABSPATH' ) || exit;

/**
 * Path (no trailing slash) → target path. 301s.
 *
 * /video/will-i-be-a-better-athlete had no body content on the legacy site
 * (only a related-articles widget), so it redirects to the topically exact
 * article rather than being rebuilt. (The Next.js app interim-302'd it to
 * /blog; a topical 301 transfers more equity.)
 *
 * @return array<string, string>
 */
function pll_seo_redirect_map() {
	return apply_filters(
		'pll_seo_redirects',
		array(
			'/video/will-i-be-a-better-athlete' => '/is-leg-lengthening-off-limits-for-athletes/',
		)
	);
}

add_action(
	'template_redirect',
	function () {
		if ( ! is_404() ) {
			return;
		}
		$path = untrailingslashit( (string) wp_parse_url( add_query_arg( array() ), PHP_URL_PATH ) );
		$map  = pll_seo_redirect_map();
		if ( isset( $map[ $path ] ) ) {
			wp_safe_redirect( home_url( $map[ $path ] ), 301 );
			exit;
		}
	},
	5
);
