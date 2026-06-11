<?php
/**
 * Shared post-card renderer — port of components/v2/blog/PostCard.tsx.
 * Used by the pll/blog-index, pll/post-grid, and pll/related-posts blocks.
 *
 * @package pll-editorial
 */

/**
 * "Dec 25, 2025" — matches lib/content.ts formatDate().
 *
 * @param WP_Post $post Post.
 * @return string
 */
function pll_card_date( $post ) {
	return get_post_time( 'M j, Y', false, $post, true );
}

/**
 * Primary category for a post (the content model assigns exactly one).
 *
 * @param WP_Post $post Post.
 * @return array{slug: string, label: string}
 */
function pll_primary_category( $post ) {
	$terms = get_the_category( $post->ID );
	if ( $terms && ! is_wp_error( $terms ) ) {
		return array(
			'slug'  => $terms[0]->slug,
			'label' => $terms[0]->name,
		);
	}
	return array(
		'slug'  => 'limb-lengthening',
		'label' => 'Limb Lengthening',
	);
}

/**
 * Card excerpt: the seeded meta description, falling back to the excerpt.
 *
 * @param WP_Post $post Post.
 * @return string
 */
function pll_card_description( $post ) {
	$desc = get_post_meta( $post->ID, '_pll_seo_description', true );
	if ( ! $desc ) {
		$desc = get_the_excerpt( $post );
	}
	return (string) $desc;
}

/**
 * One blog card. Markup is the literal PostCard.tsx port.
 *
 * @param WP_Post $post Post.
 * @param array   $opts Options: delay (float, reveal stagger in seconds), filterable (bool, add data-category/data-search attrs for the blog index), title_tag (string, heading tag, default h3).
 * @return string HTML.
 */
function pll_post_card_html( $post, $opts = array() ) {
	$category = pll_primary_category( $post );
	$desc     = pll_card_description( $post );
	$title    = get_the_title( $post );
	$date     = pll_card_date( $post );
	$minutes  = pll_reading_time( $post );
	$url      = get_permalink( $post );
	$tag      = $opts['title_tag'] ?? 'h3';

	$thumb_id  = get_post_thumbnail_id( $post );
	$image_url = $thumb_id ? wp_get_attachment_image_url( $thumb_id, 'large' ) : '';
	$image_alt = $thumb_id ? (string) get_post_meta( $thumb_id, '_wp_attachment_image_alt', true ) : '';

	if ( $image_url ) {
		$media = sprintf(
			'<img src="%s" alt="%s" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"/>',
			esc_url( $image_url ),
			esc_attr( $image_alt )
		);
	} else {
		$media = '<div class="absolute inset-0 flex items-center justify-center bg-spine-tint"><span class="font-serif italic text-spine text-[28px]">PLL</span></div>';
	}

	$style = '';
	if ( ! empty( $opts['delay'] ) ) {
		$style = sprintf( ' style="--reveal-delay:%ss"', esc_attr( (string) $opts['delay'] ) );
	}

	$filter_attrs = '';
	if ( ! empty( $opts['filterable'] ) ) {
		$haystack     = strtolower( $title . ' ' . $desc . ' ' . $category['label'] );
		$filter_attrs = sprintf(
			' data-category="%s" data-search="%s"',
			esc_attr( $category['slug'] ),
			esc_attr( $haystack )
		);
	}

	return sprintf(
		'<article class="js-reveal"%1$s%2$s><a href="%3$s" class="group block">' .
		'<div class="relative aspect-[3/2] border border-ink overflow-hidden bg-paper-warm">%4$s</div>' .
		'<div class="mt-4 font-mono uppercase tracking-[0.18em] text-[10.5px] text-muted">%5$s · %6$s · %7$s min</div>' .
		'<%8$s class="mt-2 font-serif font-medium text-[22px] lg:text-[24px] leading-[1.15] tracking-[-0.01em] text-ink group-hover:text-spine transition-colors max-w-[40ch]">%9$s</%8$s>' .
		'<p class="mt-2 text-[14px] leading-[1.6] text-ink-soft break-words line-clamp-2 max-w-[52ch]">%10$s</p>' .
		'<span class="mt-3 inline-flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-[10.5px] text-spine border-b border-spine pb-0.5">Read<span class="font-serif italic text-[14px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></span>' .
		'</a></article>',
		$style,
		$filter_attrs, // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped above.
		esc_url( $url ),
		$media,
		esc_html( $category['label'] ),
		esc_html( $date ),
		(int) $minutes,
		tag_escape( $tag ),
		esc_html( $title ),
		esc_html( $desc )
	);
}
