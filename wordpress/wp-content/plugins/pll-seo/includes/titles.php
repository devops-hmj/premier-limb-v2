<?php
/**
 * Document titles — parity with the Next.js title template
 * "%s · Premier Limb Lengthening" (app/layout.tsx).
 *
 * @package pll-seo
 */

defined( 'ABSPATH' ) || exit;

/**
 * Does this title already carry the phrase the brand name would repeat?
 *
 * "Premier Limb Lengthening" contains the head term, so appending it to a title
 * that already says "limb lengthening" publishes the phrase twice inside a
 * ~65-character SERP budget. Measured 2026-08-17 against all 43 indexed pages:
 * 29 said it twice, one said it three times, and 32 titles ran past the cutoff,
 * so the suffix was usually either pushing the useful words off the end or being
 * truncated itself. Brand queries were 1.2% of impressions and 4.6% of clicks
 * over the preceding 90 days ("premier limb lengthening": 17 impressions), so
 * there was almost no brand demand for it to capture. Google appends the site
 * name on its own when it wants one.
 *
 * Deliberately a condition rather than a deletion: a future page titled
 * something like "Patient Financing Options" carries no head term and still
 * gets branded.
 *
 * @param string $title Title part, before any suffix.
 * @return bool
 */
function pll_seo_title_has_head_term( $title ) {
	return (bool) preg_match( '/\b(limb|leg) lengthening\b/i', (string) $title );
}

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
		$cat = single_cat_title( '', false );
		// The "Limb Lengthening" category read "Limb Lengthening · Limb
		// Lengthening Articles · Premier Limb Lengthening" — three times in one
		// title. Qualify the archive without restating the term.
		return $cat . ( pll_seo_title_has_head_term( $cat ) ? ' · Articles' : ' · Limb Lengthening Articles' );
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
		// The ' · Your Surgery' breadcrumb segment used to be appended here for
		// parity with app/your-surgery/[slug]/page.tsx. Dropped 2026-08-17: with
		// the brand suffix it cost 42 characters before the title's own words
		// began, on the two highest-impression pages on the site (one is 32% of
		// all impressions). It is a breadcrumb, and Google already renders the
		// real breadcrumb from BreadcrumbList schema.
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
		$title    = pll_seo_title_part();
		if ( ! empty( $defaults[ $path ]['title_absolute'] ) ) {
			return $title;
		}
		// And skip it wherever the title already says the brand's head term.
		if ( pll_seo_title_has_head_term( $title ) ) {
			return $title;
		}
		return $title . ' · Premier Limb Lengthening';
	},
	20
);
