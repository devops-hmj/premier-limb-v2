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
 * The og:type for the current view. Posts and the your-surgery tree are
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
 * OG image URL for the current view. Posts: featured image. The profile and
 * your-surgery pages mirror the Next.js per-page openGraph images (so their
 * Twitter cards stay summary_large_image).
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
		return null;
	}

	if ( ! is_page() ) {
		return null;
	}

	$path = pll_seo_current_path();

	if ( '/dr-basmajian/' === $path ) {
		return array(
			'url' => get_theme_file_uri( 'assets/images/dr-picture.jpg' ),
			'alt' => 'Dr. Hrayr Basmajian',
		);
	}

	if ( '/your-surgery/' === $path ) {
		$uploads = wp_get_upload_dir();
		return array(
			'url' => $uploads['baseurl'] . '/pll/your-surgery/overview-magnetic-lengthening.webp',
			'alt' => 'Magnetic Limb Lengthening Diagram',
		);
	}

	// Surgery sub-pages: first content image (or the extracted hero image),
	// matching the generateMetadata() image extraction in Next.
	$post = get_post( get_queried_object_id() );
	if ( $post && $post->post_parent ) {
		$parent = get_post( $post->post_parent );
		if ( $parent && 'your-surgery' === $parent->post_name ) {
			$hero = (string) get_post_meta( $post->ID, '_pll_hero_image', true );
			if ( ! $hero && preg_match( '/<img[^>]+src="([^"]+)"/', $post->post_content, $m ) ) {
				$hero = $m[1];
			}
			if ( $hero ) {
				if ( 0 === strpos( $hero, '/' ) ) {
					$hero = home_url( $hero );
				}
				return array(
					'url' => $hero,
					'alt' => get_the_title( $post ),
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

		// Category archives: term description + the archive title (parity with
		// app/category/[slug]/page.tsx generateMetadata).
		if ( is_category() ) {
			$term_description = trim( wp_strip_all_tags( category_description() ) );
			if ( $term_description ) {
				$description    = $term_description;
				$og_description = $term_description;
			}
			$og_title = pll_seo_title_part();
		}
		if ( is_home() && ! $og_title ) {
			$og_title = pll_seo_title_part();
		}

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
		}
		// Twitter card on every page, like Next's metadata API: large card
		// when an image exists, plain summary otherwise.
		echo '<meta name="twitter:card" content="' . ( $og_image ? 'summary_large_image' : 'summary' ) . '" />' . "\n";
		if ( $og_title ) {
			echo '<meta name="twitter:title" content="' . esc_attr( $og_title ) . '" />' . "\n";
		}
		if ( $og_description ) {
			echo '<meta name="twitter:description" content="' . esc_attr( $og_description ) . '" />' . "\n";
		}
		if ( $og_image ) {
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
	function () {
		if ( is_search() || is_404() ) {
			return array(
				'noindex' => true,
				'follow'  => true,
			);
		}
		return array(
			'index'  => true,
			'follow' => true,
		);
	},
	20
);
