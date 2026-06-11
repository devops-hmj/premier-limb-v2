<?php
/**
 * SEO meta fields. Seeded by the content pipeline (WXR/setup.php); override
 * per entity. Underscore-prefixed (protected) so they don't clutter the
 * Custom Fields UI; exposed over REST for future editor UI.
 *
 * @package pll-seo
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'init',
	function () {
		$keys = array( '_pll_seo_title', '_pll_seo_description', '_pll_og_title', '_pll_og_description' );
		foreach ( array( 'post', 'page' ) as $type ) {
			foreach ( $keys as $key ) {
				register_post_meta(
					$type,
					$key,
					array(
						'show_in_rest'      => true,
						'single'            => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
						'auth_callback'     => function () {
							return current_user_can( 'edit_posts' );
						},
					)
				);
			}
		}
	}
);

/**
 * Hand-written metadata for the marketing pages — extracted from each
 * page.tsx `metadata` export in the Next.js app (the parity source).
 * Post meta wins over these defaults; these win over generated fallbacks.
 *
 * @return array<string, array{title?: string, description?: string, og_title?: string, og_description?: string, og_type?: string}>
 */
function pll_seo_page_defaults() {
	return array(
		'/'                                 => array(
			'title'          => 'Limb Lengthening Surgery in Southern California · Dr. Hrayr Basmajian',
			'description'    => "Cosmetic limb lengthening surgery with one of the West Coast's most experienced surgeons. Gain up to 6 inches with concierge care from first consult through full recovery.",
			'og_title'       => 'Limb Lengthening Surgery in Southern California · Premier',
			'og_description' => 'Gain up to 6 inches with one of the most experienced limb lengthening surgeons on the West Coast. Concierge care, transparent pricing.',
			'og_type'        => 'website',
		),
		'/about/'                           => array(
			'title'          => 'About Premier Limb Lengthening, Founded by Dr. Hrayr Basmajian',
			'description'    => 'Premier Limb Lengthening is a cosmetic and reconstructive surgery practice created by Dr. Hrayr Basmajian, founder of Premier Orthopaedic & Trauma Specialists, based in Upland, California.',
			'og_title'       => 'About Premier Limb Lengthening, Founded by Dr. Hrayr Basmajian',
			'og_description' => 'A cosmetic and reconstructive surgery practice created by Dr. Hrayr Basmajian, founder of Premier Orthopaedic & Trauma Specialists, based in Upland, California.',
			'og_type'        => 'website',
		),
		'/consult/'                         => array(
			'title'          => 'Schedule a Limb Lengthening Consultation',
			'description'    => 'Schedule a consultation with Premier Limb Lengthening in Upland, California. Confidential intake, virtual visits, and white-glove travel coordination.',
			'og_title'       => 'Schedule a Limb Lengthening Consultation · Premier',
			'og_description' => 'Confidential intake, virtual visits, and white-glove travel coordination from Upland, California.',
			'og_type'        => 'website',
		),
		'/dr-basmajian/'                    => array(
			'title'          => 'Dr. Hrayr Basmajian — Limb Lengthening Surgeon',
			'description'    => 'Board-certified orthopaedic trauma surgeon and Medical Director of Orthopaedic Trauma at Pomona Valley Hospital. Thousands of limb lengthening procedures performed.',
			'og_title'       => 'Dr. Hrayr Basmajian — Limb Lengthening Surgeon',
			'og_description' => 'Board-certified orthopaedic trauma surgeon. Director, Orthopaedic Trauma at Pomona Valley Hospital. Thousands of limb lengthening procedures performed.',
			'og_type'        => 'profile',
		),
		'/limb-lengthening-pricing-options/' => array(
			'title'          => 'Limb Lengthening Cost — Pricing & Financing',
			'description'    => 'Transparent 2026 pricing for cosmetic limb lengthening. Every quote bundles implants, OR time, hospitalization, anesthesia, follow-up care, and on-site sessions.',
			'og_title'       => 'Limb Lengthening Cost — Pricing & Financing',
			'og_description' => 'Transparent 2026 pricing for cosmetic limb lengthening. Bundled implants, OR time, hospitalization, anesthesia, follow-up care, and on-site sessions.',
			'og_type'        => 'website',
		),
		'/your-surgery/'                    => array(
			'title'          => 'Limb Lengthening Surgery — How It Works',
			'description'    => 'How limb lengthening works — distraction osteogenesis, Precice internal nail placement, gradual distraction, and a recovery timeline you can plan your life around.',
			'og_title'       => 'Limb Lengthening Surgery — How It Works',
			'og_description' => 'Distraction osteogenesis, internal Precice technology, and a recovery timeline you can plan your life around.',
			'og_type'        => 'article',
		),
		'/blog/'                            => array(
			'title'          => 'Limb Lengthening Blog, Articles & Patient Guides',
			'description'    => 'Honest, plain-language coverage of cosmetic limb lengthening: candidacy, recovery, pricing, and the science of bone regeneration, written to help patients decide with confidence.',
			'og_title'       => 'Limb Lengthening Blog, Articles & Patient Guides',
			'og_description' => 'Patient-grade articles on candidacy, recovery, pricing, and the science of bone regeneration.',
			'og_type'        => 'website',
		),
		'/privacy/'                         => array(
			'title'          => 'Privacy Policy',
			'description'    => 'How Premier Limb Lengthening collects, uses, and protects website data, our HIPAA commitments, and our SMS and mobile messaging practices.',
			'og_title'       => 'Privacy Policy · Premier Limb Lengthening',
			'og_description' => 'Our privacy practices for website data, HIPAA-protected health information, and SMS and mobile messaging.',
			'og_type'        => 'website',
		),
		'/terms/'                           => array(
			'title'          => 'Terms of Service',
			'description'    => 'The terms of use for the Premier Limb Lengthening website, including our medical disclaimer, individual-results notice, and SMS text messaging program terms.',
			'og_title'       => 'Terms of Service · Premier Limb Lengthening',
			'og_description' => 'Website terms of use, medical disclaimer, and SMS text messaging terms for Premier Limb Lengthening.',
			'og_type'        => 'website',
		),
		'/accessibility/'                   => array(
			'title'          => 'Accessibility Statement',
			'description'    => "Premier Limb Lengthening's commitment to website accessibility, our work toward WCAG 2.1 Level AA, and how to request an accommodation.",
			'og_title'       => 'Accessibility Statement · Premier Limb Lengthening',
			'og_description' => 'Our commitment to an accessible website, our WCAG 2.1 AA goal, and how to reach us for help or accommodations.',
			'og_type'        => 'website',
		),
	);
}

/**
 * Current request path, root-relative with trailing slash ('/about/').
 *
 * @return string
 */
function pll_seo_current_path() {
	if ( is_front_page() ) {
		return '/';
	}
	$url  = pll_seo_current_url();
	$path = wp_parse_url( $url, PHP_URL_PATH );
	return $path ? $path : '/';
}

/**
 * Canonical URL for the current view, on the production origin.
 *
 * @return string
 */
function pll_seo_current_url() {
	global $wp;
	if ( is_front_page() ) {
		return PLL_SEO_ORIGIN . '/';
	}
	$local = home_url( add_query_arg( array(), trailingslashit( $wp->request ) ) );
	$path  = wp_parse_url( $local, PHP_URL_PATH );
	return PLL_SEO_ORIGIN . ( $path ? $path : '/' );
}

/**
 * Resolve a metadata field for the current view: post meta → page defaults
 * map → generated fallback.
 *
 * @param string $field 'title'|'description'|'og_title'|'og_description'|'og_type'.
 * @return string
 */
function pll_seo_value( $field ) {
	$meta_keys = array(
		'title'          => '_pll_seo_title',
		'description'    => '_pll_seo_description',
		'og_title'       => '_pll_og_title',
		'og_description' => '_pll_og_description',
	);

	if ( is_singular() && isset( $meta_keys[ $field ] ) ) {
		$meta = (string) get_post_meta( get_queried_object_id(), $meta_keys[ $field ], true );
		if ( $meta ) {
			return $meta;
		}
	}

	$defaults = pll_seo_page_defaults();
	$path     = pll_seo_current_path();
	if ( isset( $defaults[ $path ][ $field ] ) ) {
		return $defaults[ $path ][ $field ];
	}

	// OG fields fall back to the SEO fields.
	if ( 'og_title' === $field ) {
		return pll_seo_value( 'title' );
	}
	if ( 'og_description' === $field ) {
		return pll_seo_value( 'description' );
	}
	return '';
}
