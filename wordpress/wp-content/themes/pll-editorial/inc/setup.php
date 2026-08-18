<?php
/**
 * Theme setup: editor styles, pattern categories, and shared site data.
 *
 * @package pll-editorial
 */

/**
 * Factory defaults for the site info. These ship with the theme and are the
 * fallback whenever the "PLL Site Settings" screen (inc/settings.php) has not
 * overridden a given field.
 *
 * @return array<string, string>
 */
function pll_site_info_defaults() {
	return array(
		'name'       => 'Premier Limb Lengthening',
		'tagline'    => 'Cosmetic limb lengthening, founded by Dr. Hrayr Basmajian',
		'phone'      => '(951) 620-5663',
		'phone_href' => 'tel:+19516205663',
		'street'     => '400 N. Mountain Ave. Suite 305',
		'city'       => 'Upland',
		'state'      => 'CA',
		'zip'        => '91786',
		'maps_url'   => 'https://www.google.com/maps/dir/400+N.+Mountain+Ave.+Suite+305,+Upland,+CA+91786/',
		// Booking and contact are separate flows: the site-wide "Schedule
		// Consultation" button goes to the on-site booking page (embedded GHL
		// calendar), while the nav/footer "Contact" links keep /consult/.
		'cta_url'    => '/book-a-consultation/',
		'cta_label'  => 'Schedule Consultation',
		'domain'     => 'premierlimblengthening.com',
	);
}

/**
 * Site info — single source of truth for contact details + the primary CTA.
 * Reads the `pll_site_info` option (managed on the "PLL Site Settings" screen)
 * layered over the theme defaults, so a non-developer can change the phone,
 * address, and primary CTA in one place and have every live-rendered surface
 * (header, footer, hero overlay) follow. Mirrors lib/site.ts in the Next app.
 *
 * Derived, never stored raw: `phone_href` (from the phone digits) and
 * `cta_href` (an absolute-ready URL from `cta_url`, which may be a relative
 * path, a full URL, a tel: link, or a #anchor).
 *
 * @return array<string, string>
 */
function pll_site_info() {
	$defaults = pll_site_info_defaults();

	$saved = get_option( 'pll_site_info', array() );
	if ( ! is_array( $saved ) ) {
		$saved = array();
	}
	// Blank fields fall back to the default rather than blanking the site.
	$saved = array_filter(
		$saved,
		static function ( $value ) {
			return '' !== $value && null !== $value;
		}
	);

	$info = array_merge( $defaults, $saved );

	// Keep the tel: link in step with the display phone unless one was stored.
	if ( empty( $saved['phone_href'] ) ) {
		$digits = preg_replace( '/\D+/', '', (string) $info['phone'] );
		if ( 10 === strlen( $digits ) ) {
			$info['phone_href'] = 'tel:+1' . $digits;
		} elseif ( 11 === strlen( $digits ) && '1' === $digits[0] ) {
			$info['phone_href'] = 'tel:+' . $digits;
		}
	}

	// Resolve the primary CTA to a ready-to-print href. Absolute URLs, tel:,
	// mailto:, and #anchors pass through; a bare path is made site-absolute.
	// Delimiter is ~ because the pattern itself contains a literal # (an
	// unescaped # inside #-delimited patterns terminates them early).
	$cta              = (string) $info['cta_url'];
	$info['cta_href'] = preg_match( '~^(https?://|tel:|mailto:|#)~i', $cta )
		? $cta
		: home_url( '/' . ltrim( $cta, '/' ) );

	return apply_filters( 'pll_site_info', $info );
}

add_action(
	'after_setup_theme',
	function () {
		// Same compiled stylesheet front and back so the editor canvas matches
		// the site, plus a small canvas-only sheet of "make it editable" fixes
		// that must never reach the front end (see assets/css/editor.css).
		add_editor_style( array( 'assets/css/pll.css', 'assets/css/editor.css' ) );
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
