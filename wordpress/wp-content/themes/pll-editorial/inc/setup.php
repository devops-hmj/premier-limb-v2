<?php
/**
 * Theme setup: editor styles, pattern categories, and shared site data.
 *
 * @package pll-editorial
 */

/**
 * Site constants — single source of truth for contact details inside the theme.
 * Mirrors lib/site.ts in the Next.js app. Filterable so a future settings
 * screen can override without editing the theme.
 *
 * @return array<string, string>
 */
function pll_site_info() {
	return apply_filters(
		'pll_site_info',
		array(
			'name'       => 'Premier Limb Lengthening',
			'tagline'    => 'Cosmetic limb lengthening, founded by Dr. Hrayr Basmajian',
			'phone'      => '(951) 620-5663',
			'phone_href' => 'tel:+19516205663',
			'street'     => '400 N. Mountain Ave. Suite 305',
			'city'       => 'Upland',
			'state'      => 'CA',
			'zip'        => '91786',
			'domain'     => 'premierlimblengthening.com',
		)
	);
}

add_action(
	'after_setup_theme',
	function () {
		// Same compiled stylesheet front and back so the editor canvas matches the site.
		add_editor_style( array( 'assets/css/pll.css' ) );
	}
);

/**
 * Keep the footer copyright year current without an annual content edit.
 * The footer pattern wraps the year in <span class="pll-year">.
 */
add_filter(
	'render_block_core/paragraph',
	function ( $block_content ) {
		if ( false !== strpos( $block_content, 'pll-year' ) ) {
			$block_content = preg_replace(
				'/(<span class="pll-year">)\d{4}(<\/span>)/',
				'${1}' . gmdate( 'Y' ) . '${2}',
				$block_content
			);
		}
		return $block_content;
	}
);

add_action(
	'init',
	function () {
		register_block_pattern_category(
			'pll-sections',
			array(
				'label'       => __( 'PLL Sections', 'pll-editorial' ),
				'description' => __( 'Locked editorial sections for Premier Limb Lengthening pages. Re-insert one of these if a section is ever removed by mistake.', 'pll-editorial' ),
			)
		);
		register_block_pattern_category(
			'pll-pages',
			array(
				'label'       => __( 'PLL Pages', 'pll-editorial' ),
				'description' => __( 'Full-page compositions used to seed Premier Limb Lengthening pages.', 'pll-editorial' ),
			)
		);
	}
);
