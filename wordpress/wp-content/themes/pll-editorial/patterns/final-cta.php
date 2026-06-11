<?php
/**
 * Title: Final CTA
 * Slug: pll/final-cta
 * Categories: pll-sections
 *
 * Port of components/v2/FinalCta.tsx — full-bleed spine-blue closing CTA.
 * Two-column at lg.
 *
 * @package pll-editorial
 */

$pll_info = pll_site_info();
?>
<!-- wp:group {"tagName":"section","layout":{"type":"default"},"templateLock":"contentOnly","lock":{"move":true,"remove":true},"anchor":"consult","className":"bg-spine text-paper py-24 lg:py-32"} -->
<section class="wp-block-group bg-spine text-paper py-24 lg:py-32" id="consult">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8 items-end"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8 items-end">
		<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal col-span-12 lg:col-span-7"} -->
		<div class="wp-block-group js-reveal col-span-12 lg:col-span-7">
			<!-- wp:paragraph {"className":"font-mono uppercase text-[11px] tracking-[0.2em] inline-flex items-center gap-3 text-gold"} -->
			<p class="font-mono uppercase text-[11px] tracking-[0.2em] inline-flex items-center gap-3 text-gold"><span aria-hidden="true" class="inline-block w-[22px] h-px bg-gold"></span>Begin</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":2,"className":"mt-5 font-serif font-medium tracking-[-0.03em] text-paper leading-[1.04] [text-wrap:balance] text-[clamp(34px,4.6vw,72px)]"} -->
			<h2 class="wp-block-heading mt-5 font-serif font-medium tracking-[-0.03em] text-paper leading-[1.04] [text-wrap:balance] text-[clamp(34px,4.6vw,72px)]">Dr. Basmajian takes a limited number of cosmetic limb lengthening cases. <em class="italic text-gold">This is where you start.</em></h2>
			<!-- /wp:heading -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal pll-delay-100 col-span-12 lg:col-span-5 lg:pl-6 lg:border-l border-white/25"} -->
		<div class="wp-block-group js-reveal pll-delay-100 col-span-12 lg:col-span-5 lg:pl-6 lg:border-l border-white/25">
			<!-- wp:paragraph {"className":"font-serif italic text-[20px] lg:text-[22px] text-paper/95 mb-7 leading-[1.3]"} -->
			<p class="font-serif italic text-[20px] lg:text-[22px] text-paper/95 mb-7 leading-[1.3]">Consultations are confidential, held virtually or in-person, and carry no obligation. Dr. Basmajian evaluates every patient personally. No associates. No rotating surgeons.</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"layout":{"type":"flex","orientation":"vertical"},"className":"flex flex-col gap-3 items-start"} -->
			<div class="wp-block-buttons flex flex-col gap-3 items-start">
				<!-- wp:button -->
				<div class="wp-block-button"><a class="wp-block-button__link wp-element-button group inline-flex items-center gap-3 px-5 py-3.5 text-ink uppercase tracking-wide text-[12px] font-medium hover:bg-paper transition-colors bg-gold" href="/consult/">Schedule a Confidential Consultation <span class="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></a></div>
				<!-- /wp:button -->

				<!-- wp:button -->
				<div class="wp-block-button"><a class="wp-block-button__link wp-element-button group inline-flex items-center gap-3 px-5 py-3.5 bg-transparent text-paper border border-white/40 uppercase tracking-wide text-[12px] font-medium hover:bg-paper hover:text-spine hover:border-paper transition-colors" href="<?php echo esc_url( $pll_info['phone_href'] ); ?>">Call <?php echo esc_html( $pll_info['phone'] ); ?> <span class="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
