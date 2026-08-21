<?php
/**
 * Primary navigation data + shared renderers.
 *
 * The nav is deliberately a PHP array (not core/navigation): the bespoke
 * dropdown (eyebrow header + numbered serif items) is not expressible with
 * the core block, and the menu is stable. Menu changes are a dev task —
 * documented in docs/DEVELOPMENT.md. Ported from components/v2/NavV2.tsx.
 *
 * @package pll-editorial
 */

/**
 * Primary nav items. Hrefs are root-relative WordPress paths (trailing slash).
 *
 * @return array<int, array{label: string, href: string, submenu?: array<int, array{label: string, href: string}>}>
 */
function pll_nav_items() {
	$surgery_submenu = array(
		array(
			'label' => 'Surgery Overview',
			'href'  => '/your-surgery/',
		),
		array(
			'label' => 'External vs. Internal Lengthening',
			'href'  => '/your-surgery/external-internal-lengthening/',
		),
		array(
			'label' => 'Recovery & Expectations',
			'href'  => '/your-surgery/limb-lengthening-expectations/',
		),
		array(
			'label' => 'Will Limb Lengthening Hurt?',
			'href'  => '/your-surgery/will-limb-lengthening-hurt/',
		),
		array(
			'label' => 'Is There an Age Limit?',
			'href'  => '/your-surgery/is-there-an-age-limit-for-limb-lengthening/',
		),
		array(
			'label' => 'How Much Taller Can I Get?',
			'href'  => '/your-surgery/how-much-taller-can-i-get-with-limb-lengthening/',
		),
		array(
			'label' => 'Can I Bend My Lengthening Nail?',
			'href'  => '/your-surgery/can-i-bend-my-lengthening-nail/',
		),
		array(
			'label' => 'Exercise After Limb Lengthening',
			'href'  => '/your-surgery/exercise-after-limb-lengthening/',
		),
	);

	return apply_filters(
		'pll_nav_items',
		array(
			array(
				'label'   => 'Your Surgery',
				'href'    => '/your-surgery/',
				'submenu' => $surgery_submenu,
			),
			array(
				'label' => 'About Dr. Basmajian',
				'href'  => '/dr-basmajian/',
			),
			array(
				'label' => 'Pricing',
				'href'  => '/limb-lengthening-pricing-options/',
			),
			array(
				'label' => 'Evaluate a Surgeon',
				'href'  => '/evaluate-your-surgeon/',
			),
			array(
				'label' => 'Blog',
				'href'  => '/blog/',
			),
		)
	);
}

/**
 * The official wordmark <img>. Mirrors components/primitives/Logo.tsx
 * (3:1-ish intrinsic ratio, explicit width/height to avoid CLS).
 *
 * @param string $tone    'light' (black wordmark) or 'dark' (white wordmark).
 * @param int    $width   Rendered width in px.
 * @param string $classes Extra classes.
 * @return string HTML.
 */
function pll_logo_img( $tone = 'light', $width = 200, $classes = '' ) {
	$assets = array(
		'light' => array(
			'file' => 'assets/images/PLL-black-logo.png',
			'w'    => 863,
			'h'    => 289,
		),
		'dark'  => array(
			'file' => 'assets/images/PLL-white-logo.png',
			'w'    => 202,
			'h'    => 62,
		),
	);
	$asset  = $assets[ $tone ] ?? $assets['light'];
	$height = (int) round( $width * $asset['h'] / $asset['w'] );

	// Width/height ATTRIBUTES (not a fixed inline style) so the browser keeps
	// the aspect-ratio hint for CLS while max-w-full lets the logo shrink when
	// its wrapper is constrained (the mobile header caps it to make room for
	// the click-to-call button).
	return sprintf(
		'<img src="%s" alt="%s" width="%d" height="%d" class="block h-auto max-w-full%s" />',
		esc_url( get_theme_file_uri( $asset['file'] ) ),
		esc_attr__( 'Premier Limb Lengthening Institute', 'pll-editorial' ),
		$width,
		$height,
		$classes ? ' ' . esc_attr( $classes ) : ''
	);
}

/**
 * The "Your Surgery" dropdown panel (shared by the sticky bar and the hero
 * overlay nav — identical markup in both, per NavV2.tsx).
 *
 * @param string $shadow Tailwind shadow class for the panel.
 * @return string HTML.
 */
function pll_nav_dropdown_panel( $shadow = 'shadow-[0_24px_48px_-12px_rgba(15,20,23,0.25)]' ) {
	$items = array();
	foreach ( pll_nav_items() as $item ) {
		if ( ! empty( $item['submenu'] ) ) {
			$items = $item['submenu'];
			break;
		}
	}

	$rows = '';
	foreach ( $items as $i => $sub ) {
		$rows .= sprintf(
			'<li><a href="%s" class="group flex items-baseline gap-4 px-6 py-2.5 hover:bg-spine-tint transition-colors">' .
			'<span class="font-mono uppercase tracking-[0.18em] text-[10px] text-muted shrink-0 w-6">%s</span>' .
			'<span class="font-serif text-[15.5px] leading-[1.3] tracking-[-0.005em] text-ink group-hover:text-spine transition-colors">%s</span>' .
			'</a></li>',
			esc_url( home_url( $sub['href'] ) ),
			esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ),
			esc_html( $sub['label'] )
		);
	}

	return sprintf(
		'<div class="min-w-[360px] bg-paper border border-ink %s">' .
		'<div class="px-6 pt-5 pb-2 border-b border-rule">' .
		'<div class="font-mono uppercase tracking-[0.22em] text-[10.5px] text-spine inline-flex items-center gap-2.5">' .
		'<span aria-hidden="true" class="inline-block w-[22px] h-px bg-spine"></span>' .
		'Your Surgery · Overview' .
		'</div></div>' .
		'<ul class="list-none py-2">%s</ul>' .
		'</div>',
		esc_attr( $shadow ),
		$rows
	);
}

/**
 * Hero overlay nav — the transparent dark-ground header rendered inside the
 * video stage by the pll/hero-video block. Port of NavV2Overlay.
 *
 * Interactivity: shares the pll/header store (registered by the site-header
 * block, which is always present via the header template part).
 *
 * @return string HTML.
 */
function pll_render_overlay_nav() {
	$info = pll_site_info();

	$links = '';
	foreach ( pll_nav_items() as $item ) {
		if ( ! empty( $item['submenu'] ) ) {
			$links .= sprintf(
				'<div class="pll-subnav relative" data-wp-context=\'{"subOpen":false}\' data-wp-on--mouseenter="actions.openSub" data-wp-on--mouseleave="actions.closeSub" data-wp-class--is-open="context.subOpen">' .
				'<a href="%1$s" class="inline-flex items-center gap-1.5 hover:text-cream transition-colors" aria-haspopup="true" data-wp-bind--aria-expanded="context.subOpen">%2$s<span aria-hidden="true" class="pll-chevron font-serif italic text-[14px]">⌄</span></a>' .
				'<div class="pll-dropdown">%3$s</div>' .
				'</div>',
				esc_url( home_url( $item['href'] ) ),
				esc_html( $item['label'] ),
				pll_nav_dropdown_panel( 'shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)]' )
			);
		} else {
			$links .= sprintf(
				'<a href="%s" class="hover:text-cream transition-colors">%s</a>',
				esc_url( home_url( $item['href'] ) ),
				esc_html( $item['label'] )
			);
		}
	}

	// Mobile (<sm): the click-to-call button IS the primary CTA — the phone
	// number must be visible without scrolling or opening a menu (conversion
	// requirement). Consult stays available in the hero body, the floating
	// widget, and the sticky bar; from sm up the desktop layout is unchanged
	// (gold italic phone text + Consult button).
	return sprintf(
		'<header class="relative z-30" data-wp-interactive="pll/header">' .
		'<div class="mx-auto max-w-wrap px-6 lg:px-12 py-4 lg:py-5 grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 lg:gap-10">' .
		'<a href="%1$s" aria-label="%2$s" class="flex items-center min-w-0 shrink sm:shrink-0 max-w-[132px] sm:max-w-none">%3$s</a>' .
		'<nav class="hidden lg:flex items-center justify-center gap-7 text-[13.5px] font-medium text-white/90" aria-label="Primary">%4$s</nav>' .
		'<div class="flex items-center gap-4 lg:gap-5 justify-self-end">' .
		'<a href="%5$s" class="sm:hidden inline-flex items-center gap-2 px-4 py-3 bg-spine text-paper font-medium tracking-wide text-[13px] whitespace-nowrap hover:bg-spine-deep transition-colors">%6$s</a>' .
		'<a href="%5$s" class="hidden sm:inline-block font-serif italic text-[17px] lg:text-[18px] hover:text-white transition-colors" style="color:#F4D88A">%6$s</a>' .
		'<a href="%7$s" class="hidden sm:inline-flex items-center gap-2.5 px-4 lg:px-5 py-3 lg:py-3.5 bg-spine text-paper font-medium uppercase tracking-wide text-[11px] lg:text-[12px] hover:bg-spine-deep transition-colors">' .
		'%8$s' .
		'<span class="font-serif italic text-[15px]" aria-hidden="true">→</span></a>' .
		'</div></div></header>',
		esc_url( home_url( '/' ) ),
		esc_attr__( 'Premier Limb Lengthening, home', 'pll-editorial' ),
		pll_logo_img( 'dark', 210, 'drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]' ),
		$links,
		esc_url( $info['phone_href'] ),
		esc_html( $info['phone'] ),
		esc_url( $info['cta_href'] ),
		esc_html( $info['cta_label'] )
	);
}
