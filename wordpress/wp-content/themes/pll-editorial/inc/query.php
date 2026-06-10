<?php
/**
 * Query customizations and small template helpers.
 *
 * @package pll-editorial
 */

/**
 * Reading time for a post, matching lib/content.ts (220 wpm, minimum 1 minute).
 *
 * @param int|WP_Post|null $post Post reference.
 * @return int Minutes.
 */
function pll_reading_time( $post = null ) {
	$post = get_post( $post );
	if ( ! $post ) {
		return 1;
	}
	$words = str_word_count( wp_strip_all_tags( $post->post_content ) );
	return max( 1, (int) round( $words / 220 ) );
}

/**
 * "Related posts" query loops are marked with className pll-related in the
 * single template: same category as the current post, excluding itself.
 */
add_filter(
	'query_loop_block_query_vars',
	function ( $query, $block ) {
		$class = $block->context['className'] ?? ( $block->parsed_block['attrs']['className'] ?? '' );
		if ( false === strpos( (string) $class, 'pll-related' ) ) {
			return $query;
		}

		$post = get_post();
		if ( ! $post ) {
			return $query;
		}

		$query['post__not_in'] = array( $post->ID );
		$categories            = wp_get_post_categories( $post->ID );
		if ( $categories ) {
			$query['category__in'] = $categories;
		}
		return $query;
	},
	10,
	2
);
