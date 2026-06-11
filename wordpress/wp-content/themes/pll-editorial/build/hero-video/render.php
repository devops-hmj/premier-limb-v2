<?php
/**
 * pll/hero-video front-end render.
 *
 * Port of components/v2/HeroStage.tsx. The z-stack (gradient fallback,
 * <video>, scrim, plate, sound toggle, overlay nav) is server-owned; the
 * editable text (top metadata, kicker, H1, deck bar) flows in as inner
 * blocks ($content). Sound behavior: view.js (Interactivity API).
 *
 * @package pll-editorial
 *
 * @var array  $attributes Block attributes.
 * @var string $content    Inner blocks markup.
 */

$pll_video  = $attributes['videoUrl'] ?? '';
$pll_poster = $attributes['posterUrl'] ?? '';
?>
<div
	class="v2-video-stage relative border-b border-ink min-h-[100svh] lg:h-[100svh] lg:overflow-hidden flex flex-col"
	data-wp-interactive="pll/hero"
	data-wp-context='{"muted":true}'
	data-wp-init="callbacks.init"
>
	<div class="v2-vbg" aria-hidden="true"></div>
	<?php if ( $pll_video ) : ?>
	<video
		aria-hidden="true"
		autoplay
		muted
		loop
		playsinline
		preload="auto"
		<?php echo $pll_poster ? 'poster="' . esc_url( $pll_poster ) . '"' : ''; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		class="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
	>
		<source src="<?php echo esc_url( $pll_video ); ?>" type="video/mp4" />
	</video>
	<?php endif; ?>
	<div class="v2-vshade" aria-hidden="true"></div>
	<span class="v2-vplate hidden lg:inline-flex" aria-hidden="true"><?php esc_html_e( 'From the Practice', 'pll-editorial' ); ?></span>

	<?php if ( $pll_video ) : ?>
	<button
		type="button"
		class="pll-sound-btn is-muted absolute z-20 bottom-5 right-5 lg:bottom-7 lg:right-7 inline-flex items-center gap-2 bg-ink/70 hover:bg-ink text-white backdrop-blur px-3.5 py-2.5 font-mono uppercase tracking-[0.18em] text-[10.5px] transition-colors"
		data-wp-on--click="actions.toggleSound"
		data-wp-bind--aria-label="state.soundLabel"
		data-wp-class--is-muted="context.muted"
	>
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="shrink-0">
			<path d="M3 9v6h4l5 4V5L7 9H3z" fill="currentColor" />
			<path class="pll-icon-muted" d="M16 9l5 6M21 9l-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			<path class="pll-icon-on" d="M16 8.5a4.5 4.5 0 010 7M18.5 6a8 8 0 010 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none" />
		</svg>
		<span data-wp-text="state.soundText"><?php esc_html_e( 'Sound off', 'pll-editorial' ); ?></span>
	</button>
	<?php endif; ?>

	<?php echo pll_render_overlay_nav(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- inner blocks markup. ?>
</div>
