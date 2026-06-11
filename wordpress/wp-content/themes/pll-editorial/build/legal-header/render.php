<?php
/**
 * Render pll/legal-header — port of the masthead in components/v2/legal/LegalDocument.tsx.
 * Header copy comes from page meta (seeded by the content pipeline):
 *   _pll_legal_eyebrow, _pll_legal_title_lead, _pll_legal_title_accent,
 *   _pll_legal_title_tail, _pll_legal_lede, _pll_legal_effective, _pll_legal_updated.
 *
 * @package pll-editorial
 */

$pll_post = get_post();
if ( ! $pll_post ) {
	return;
}

$pll_meta = static function ( $key ) use ( $pll_post ) {
	return (string) get_post_meta( $pll_post->ID, $key, true );
};

$pll_eyebrow   = $pll_meta( '_pll_legal_eyebrow' );
$pll_lead      = $pll_meta( '_pll_legal_title_lead' );
$pll_accent    = $pll_meta( '_pll_legal_title_accent' );
$pll_tail      = $pll_meta( '_pll_legal_title_tail' );
$pll_lede      = $pll_meta( '_pll_legal_lede' );
$pll_effective = $pll_meta( '_pll_legal_effective' );
$pll_updated   = $pll_meta( '_pll_legal_updated' );
$pll_label     = get_the_title( $pll_post );

if ( ! $pll_lead ) {
	$pll_lead = $pll_label;
}
?>
<header class="border-b border-ink pt-28 lg:pt-36 pb-12 lg:pb-16">
	<div class="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
		<div class="js-reveal col-span-12 lg:col-span-9">
			<nav aria-label="<?php esc_attr_e( 'Breadcrumb', 'pll-editorial' ); ?>" class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted mb-5">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-spine transition-colors"><?php esc_html_e( 'Home', 'pll-editorial' ); ?></a>
				<span aria-hidden="true" class="mx-2">·</span>
				<span class="text-ink"><?php echo esc_html( $pll_label ); ?></span>
			</nav>
			<?php if ( $pll_eyebrow ) : ?>
			<span class="eyebrow mb-5"><?php echo esc_html( $pll_eyebrow ); ?></span>
			<?php endif; ?>
			<h1 class="font-serif font-normal tracking-[-0.025em] text-ink leading-[0.98] max-w-[20ch] text-[clamp(40px,6.4vw,104px)]"><?php echo esc_html( $pll_lead ); ?> <em class="italic text-spine"><?php echo esc_html( $pll_accent ); ?></em><?php echo $pll_tail ? ' ' . esc_html( $pll_tail ) : ''; ?></h1>
			<?php if ( $pll_lede ) : ?>
			<p class="mt-6 font-serif italic text-[19px] lg:text-[22px] leading-[1.4] text-ink-soft max-w-[58ch]"><?php echo esc_html( $pll_lede ); ?></p>
			<?php endif; ?>
			<?php if ( $pll_effective || $pll_updated ) : ?>
			<div class="mt-7 pt-5 border-t border-rule flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono uppercase tracking-[0.18em] text-[11px] text-muted">
				<?php if ( $pll_effective ) : ?>
				<span><span class="text-ink font-medium"><?php esc_html_e( 'Effective', 'pll-editorial' ); ?></span> · <?php echo esc_html( $pll_effective ); ?></span>
				<?php endif; ?>
				<?php if ( $pll_updated ) : ?>
				<span><span class="text-ink font-medium"><?php esc_html_e( 'Last updated', 'pll-editorial' ); ?></span> · <?php echo esc_html( $pll_updated ); ?></span>
				<?php endif; ?>
			</div>
			<?php endif; ?>
		</div>
	</div>
</header>
