<?php
/**
 * Head output: meta description, canonical, Open Graph, Twitter cards —
 * parity with each page's generateMetadata()/metadata export in the
 * Next.js app. Plus head cleanup.
 *
 * @package pll-seo
 */

defined( 'ABSPATH' ) || exit;

// Core canonical replaced by ours (production origin, trailing slash).
remove_action( 'wp_head', 'rel_canonical' );

// Head cleanup: discovery/version cruft the Next site never emitted.
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'wp_shortlink_wp_head' );
remove_action( 'wp_head', 'rest_output_link_wp_head' );
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'wp_head', 'feed_links_extra', 3 );

/**
 * og:type for the current view. Posts and the your-surgery tree are
 * "article" (matching the Next OG output); dr-basmajian is "profile".
 *
 * @return string
 */
function pll_seo_og_type() {
	$mapped = pll_seo_value( 'og_type' );
	if ( $mapped ) {
		return $mapped;
	}
	if ( is_singular( 'post' ) ) {
		return 'article';
	}
	if ( is_singular( 'page' ) ) {
		$post = get_post( get_queried_object_id() );
		if ( $post && $post->post_parent ) {
			$parent = get_post( $post->post_parent );
			if ( $parent && 'your-surgery' === $parent->post_name ) {
				return 'article';
			}
		}
	}
	return 'website';
}

/**
 * OG image URL for the current view (posts: featured image).
 *
 * @return array{url: string, alt: string}|null
 */
function pll_seo_og_image() {
	if ( is_singular( 'post' ) ) {
		$thumb_id = get_post_thumbnail_id( get_queried_object_id() );
		if ( $thumb_id ) {
			$url = wp_get_attachment_image_url( $thumb_id, 'full' );
			if ( $url ) {
				return array(
					'url' => $url,
					'alt' => (string) get_post_meta( $thumb_id, '_wp_attachment_image_alt', true ),
				);
			}
		}
	}
	return null;
}

add_action(
	'wp_head',
	function () {
		if ( is_404() || is_search() ) {
			return;
		}

		$canonical      = pll_seo_current_url();
		$description    = pll_seo_value( 'description' );
		$og_title       = pll_seo_value( 'og_title' );
		$og_description = pll_seo_value( 'og_description' );
		$og_image       = pll_seo_og_image();

		echo '<link rel="canonical" href="' . esc_url( $canonical ) . '" />' . "\n";
		if ( $description ) {
			echo '<meta name="description" content="' . esc_attr( $description ) . '" />' . "\n";
		}
		if ( $og_title ) {
			echo '<meta property="og:title" content="' . esc_attr( $og_title ) . '" />' . "\n";
		}
		if ( $og_description ) {
			echo '<meta property="og:description" content="' . esc_attr( $og_description ) . '" />' . "\n";
		}
		echo '<meta property="og:url" content="' . esc_url( $canonical ) . '" />' . "\n";
		echo '<meta property="og:site_name" content="Premier Limb Lengthening" />' . "\n";
		echo '<meta property="og:type" content="' . esc_attr( pll_seo_og_type() ) . '" />' . "\n";
		if ( $og_image ) {
			echo '<meta property="og:image" content="' . esc_url( $og_image['url'] ) . '" />' . "\n";
			if ( $og_image['alt'] ) {
				echo '<meta property="og:image:alt" content="' . esc_attr( $og_image['alt'] ) . '" />' . "\n";
			}
			echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
			echo '<meta name="twitter:title" content="' . esc_attr( $og_title ) . '" />' . "\n";
			echo '<meta name="twitter:description" content="' . esc_attr( $og_description ) . '" />' . "\n";
			echo '<meta name="twitter:image" content="' . esc_url( $og_image['url'] ) . '" />' . "\n";
		}
	},
	1
);

/**
 * Robots parity: "index, follow" only (the Next site emits no
 * max-image-preview directives).
 */
add_filter(
	'wp_robots',
	function ( $robots ) {
		if ( is_search() || is_404() ) {
			return array( 'noindex' => true, 'follow' => true );
		}
		return array(
			'index'  => true,
			'follow' => true,
		);
	},
	20
);
