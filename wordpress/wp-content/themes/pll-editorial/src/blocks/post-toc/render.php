<?php
/**
 * Render pll/post-toc — port of the sticky "In This Post" aside in app/[slug]/page.tsx.
 * Headings come from the post's <h2 id="…"> anchors (md-to-blocks bakes the
 * same toSlug() ids that lib/content.ts getHeadings() derived).
 *
 * @package pll-editorial
 */

$pll_post = get_post();
if ( ! $pll_post ) {
	return;
}

$pll_headings = array();
$pll_seen     = array();
if ( preg_match_all( '/<h2[^>]*\bid="([^"]+)"[^>]*>(.*?)<\/h2>/is', $pll_post->post_content, $pll_matches, PREG_SET_ORDER ) ) {
	foreach ( $pll_matches as $pll_m ) {
		$pll_id   = $pll_m[1];
		$pll_text = trim( wp_strip_all_tags( $pll_m[2] ) );
		if ( $pll_id && $pll_text && ! isset( $pll_seen[ $pll_id ] ) ) {
			$pll_seen[ $pll_id ] = true;
			$pll_headings[]      = array(
				'id'   => $pll_id,
				'text' => $pll_text,
			);
		}
	}
}

if ( ! $pll_headings ) {
	return;
}
?>
<aside class="hidden lg:block lg:col-span-3">
	<div class="sticky top-28 border-t border-ink pt-5">
		<div class="font-mono uppercase tracking-[0.22em] text-[10.5px] text-spine mb-4"><?php esc_html_e( 'In This Post', 'pll-editorial' ); ?></div>
		<nav aria-label="<?php esc_attr_e( 'On this page', 'pll-editorial' ); ?>">
			<ul class="flex flex-col gap-3">
				<?php foreach ( $pll_headings as $pll_heading ) : ?>
				<li><a href="#<?php echo esc_attr( $pll_heading['id'] ); ?>" class="block text-[14px] leading-[1.4] text-ink-soft hover:text-spine transition-colors"><?php echo esc_html( $pll_heading['text'] ); ?></a></li>
				<?php endforeach; ?>
			</ul>
		</nav>
	</div>
</aside>
