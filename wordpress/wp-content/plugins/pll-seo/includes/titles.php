<?php
/**
 * Document titles — parity with the Next.js title template
 * "%s · Premier Limb Lengthening" (app/layout.tsx).
 *
 * @package pll-seo
 */

defined( 'ABSPATH' ) || exit;

/**
 * The page part of the title (before the site suffix).
 *
 * @return string
 */
function pll_seo_title_part() {
	if ( is_home() ) {
		return pll_seo_page_defaults()['/blog/']['title'];
	}
	if ( is_category() ) {
		return single_cat_title( '', false ) . ' · Limb Lengthening Articles';
	}
	if ( is_author() ) {
		return get_the_author_meta( 'display_name', (int) get_query_var( 'author' ) );
	}
	if ( is_search() ) {
		/* translators: %s: search query */
		return sprintf( __( 'Search results for “%s”', 'pll-seo' ), get_search_query() );
	}
	if ( is_404() ) {
		return __( 'Page Not Found', 'pll-seo' );
	}
	if ( is_singular() ) {
		$title = pll_seo_value( 'title' );
		if ( ! $title ) {
			$title = get_the_title( get_queried_object_id() );
		}
		// Surgery sub-pages: "{title} · Your Surgery" (app/your-surgery/[slug]/page.tsx).
		$post = get_post( get_queried_object_id() );
		if ( $post && 'page' === $post->post_type && $post->post_parent ) {
			$parent = get_post( $post->post_parent );
			if ( $parent && 'your-surgery' === $parent->post_name ) {
				$title .= ' · Your Surgery';
			}
		}
		return $title;
	}
	return get_bloginfo( 'name' );
}

add_filter(
	'pre_get_document_title',
	function () {
		// Pages flagged title_absolute skip the site-name template (the
		// homepage's keyword-first title would exceed 100 chars with it).
		$defaults = pll_seo_page_defaults();
		$path     = pll_seo_current_path();
		if ( ! empty( $defaults[ $path ]['title_absolute'] ) ) {
			return pll_seo_title_part();
		}
		return pll_seo_title_part() . ' · Premier Limb Lengthening';
	},
	20
);
