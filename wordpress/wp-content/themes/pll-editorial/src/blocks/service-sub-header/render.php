<?php
/**
 * Render pll/service-sub-header — port of the header variants in
 * app/your-surgery/[slug]/page.tsx. The hero-background variant fires when
 * the page carries _pll_hero_image (set by the content pipeline for
 * limb-lengthening-expectations and exercise-after-limb-lengthening, whose
 * first body image becomes a full-bleed backdrop).
 *
 * @package pll-editorial
 */

$pll_post = get_post();
if ( ! $pll_post ) {
	return;
}
$pll_hero    = (string) get_post_meta( $pll_post->ID, '_pll_hero_image', true );
$pll_minutes = pll_reading_time( $pll_post );
$pll_title   = get_the_title( $pll_post );

if ( $pll_hero ) :
	?>
<header class="relative border-b border-ink pt-28 lg:pt-40 pb-14 lg:pb-20 overflow-hidden">
	<img src="<?php echo esc_url( $pll_hero ); ?>" alt="" aria-hidden="true" class="absolute inset-0 w-full h-full object-cover"/>
	<div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/40" aria-hidden="true"></div>
	<div class="relative z-10 mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
		<div class="js-reveal col-span-12 lg:col-span-9">
			<nav aria-label="<?php esc_attr_e( 'Breadcrumb', 'pll-editorial' ); ?>" class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-white/70 mb-5">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-white transition-colors"><?php esc_html_e( 'Home', 'pll-editorial' ); ?></a>
				<span aria-hidden="true" class="mx-2">·</span>
				<a href="<?php echo esc_url( home_url( '/your-surgery/' ) ); ?>" class="hover:text-white transition-colors"><?php esc_html_e( 'Your Surgery', 'pll-editorial' ); ?></a>
				<span aria-hidden="true" class="mx-2">·</span>
				<span class="text-white"><?php echo esc_html( $pll_title ); ?></span>
			</nav>
			<h1 class="font-serif font-normal tracking-[-0.025em] text-white leading-[0.98] max-w-[22ch] text-[clamp(36px,5.8vw,96px)] [text-shadow:0_2px_30px_rgba(0,0,0,0.45)]"><?php echo esc_html( $pll_title ); ?></h1>
			<div class="mt-7 pt-5 border-t border-white/25 flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono uppercase tracking-[0.18em] text-[11px] text-white/80">
				<span><span class="text-white font-medium"><?php esc_html_e( 'Reading', 'pll-editorial' ); ?></span> · <?php echo (int) $pll_minutes; ?> min</span>
				<span><span class="text-white font-medium"><?php esc_html_e( 'Topic', 'pll-editorial' ); ?></span> · <?php esc_html_e( 'Your Surgery', 'pll-editorial' ); ?></span>
				<span><span class="text-white font-medium"><?php esc_html_e( 'By', 'pll-editorial' ); ?></span> · Dr. Hrayr Basmajian</span>
			</div>
		</div>
	</div>
</header>
<?php else : ?>
<header class="border-b border-ink pt-28 lg:pt-36 pb-12 lg:pb-16">
	<div class="mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
		<div class="js-reveal col-span-12 lg:col-span-9">
			<nav aria-label="<?php esc_attr_e( 'Breadcrumb', 'pll-editorial' ); ?>" class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted mb-5">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hover:text-spine transition-colors"><?php esc_html_e( 'Home', 'pll-editorial' ); ?></a>
				<span aria-hidden="true" class="mx-2">·</span>
				<a href="<?php echo esc_url( home_url( '/your-surgery/' ) ); ?>" class="hover:text-spine transition-colors"><?php esc_html_e( 'Your Surgery', 'pll-editorial' ); ?></a>
				<span aria-hidden="true" class="mx-2">·</span>
				<span class="text-ink"><?php echo esc_html( $pll_title ); ?></span>
			</nav>
			<h1 class="font-serif font-normal tracking-[-0.025em] text-ink leading-[0.98] max-w-[22ch] text-[clamp(36px,5.8vw,96px)]"><?php echo esc_html( $pll_title ); ?></h1>
			<div class="mt-7 pt-5 border-t border-rule flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono uppercase tracking-[0.18em] text-[11px] text-muted">
				<span><span class="text-ink font-medium"><?php esc_html_e( 'Reading', 'pll-editorial' ); ?></span> · <?php echo (int) $pll_minutes; ?> min</span>
				<span><span class="text-ink font-medium"><?php esc_html_e( 'Topic', 'pll-editorial' ); ?></span> · <?php esc_html_e( 'Your Surgery', 'pll-editorial' ); ?></span>
				<span><span class="text-ink font-medium"><?php esc_html_e( 'By', 'pll-editorial' ); ?></span> · Dr. Hrayr Basmajian</span>
			</div>
		</div>
	</div>
</header>
<?php endif; ?>
