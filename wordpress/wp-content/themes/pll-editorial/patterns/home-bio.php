<?php
/**
 * Title: Homepage — Dr. Basmajian Bio
 * Slug: pll/home-bio
 * Categories: pll-sections
 *
 * Port of components/v2/Bio.tsx — editorial portrait + credentials +
 * 3 paragraphs + inline CTA + 3-up stat strip. Paper ground.
 *
 * @package pll-editorial
 */

$pll_portrait = get_theme_file_uri( 'assets/images/Dr-ig-pic.jpg' );
?>
<!-- wp:group {"tagName":"section","layout":{"type":"default"},"templateLock":"contentOnly","lock":{"move":true,"remove":true},"anchor":"dr","className":"bg-paper py-20 lg:py-28 border-t border-b border-rule"} -->
<section class="wp-block-group bg-paper py-20 lg:py-28 border-t border-b border-rule" id="dr">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12">
		<!-- wp:group {"tagName":"header","layout":{"type":"default"},"className":"js-reveal pb-8 mb-12 border-b border-ink"} -->
		<header class="wp-block-group js-reveal pb-8 mb-12 border-b border-ink">
			<!-- wp:paragraph {"className":"eyebrow mb-4"} -->
			<p class="eyebrow mb-4">Your Surgeon</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":2,"className":"mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] text-[clamp(40px,6vw,84px)]"} -->
			<h2 class="wp-block-heading mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] text-[clamp(40px,6vw,84px)]">Dr. Hrayr <em class="italic text-spine">Basmajian.</em></h2>
			<!-- /wp:heading -->
		</header>
		<!-- /wp:group -->

		<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-start"} -->
		<div class="wp-block-group grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-start">
			<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal self-start"} -->
			<div class="wp-block-group js-reveal self-start">
				<!-- wp:group {"layout":{"type":"default"},"className":"v2-portrait aspect-[4/5] bg-paper-warm border border-rule relative overflow-hidden max-w-[85%]"} -->
				<div class="wp-block-group v2-portrait aspect-[4/5] bg-paper-warm border border-rule relative overflow-hidden max-w-[85%]">
					<!-- wp:image {"sizeSlug":"full","className":"absolute inset-0"} -->
					<figure class="wp-block-image size-full absolute inset-0"><img src="<?php echo esc_url( $pll_portrait ); ?>" alt="Dr. Hrayr Basmajian consulting with a patient at Pomona Valley Hospital" class="w-full h-full object-cover"/></figure>
					<!-- /wp:image -->

					<!-- wp:paragraph {"className":"absolute z-10 top-3 left-3 px-2 py-1 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted bg-paper"} -->
					<p class="absolute z-10 top-3 left-3 px-2 py-1 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted bg-paper">With a Patient</p>
					<!-- /wp:paragraph -->

					<!-- wp:paragraph {"className":"absolute z-10 bottom-3 left-3 right-3 px-3.5 py-2.5 bg-paper/95 backdrop-blur-sm border-l-2 border-spine font-serif italic text-[15px] lg:text-[16px] text-ink"} -->
					<p class="absolute z-10 bottom-3 left-3 right-3 px-3.5 py-2.5 bg-paper/95 backdrop-blur-sm border-l-2 border-spine font-serif italic text-[15px] lg:text-[16px] text-ink">“A rare combination of trauma precision and cosmetic judgment.”</p>
					<!-- /wp:paragraph -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal pll-delay-100"} -->
			<div class="wp-block-group js-reveal pll-delay-100">
				<!-- wp:paragraph {"className":"py-3.5 mb-7 border-t border-b border-rule font-mono uppercase tracking-[0.14em] text-[12px] text-ink"} -->
				<p class="py-3.5 mb-7 border-t border-b border-rule font-mono uppercase tracking-[0.14em] text-[12px] text-ink">Orthopaedic Trauma Surgeon · Fellowship-Trained · Director, PVHMC</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"font-serif text-[18px] leading-[1.5] text-ink mb-4 max-w-[62ch]"} -->
				<p class="font-serif text-[18px] leading-[1.5] text-ink mb-4 max-w-[62ch]">Dr. Basmajian brings a rare combination of precision trauma surgery and cosmetic limb lengthening expertise to every procedure.</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"text-[15.5px] leading-[1.7] text-ink-soft mb-4 max-w-[62ch]"} -->
				<p class="text-[15.5px] leading-[1.7] text-ink-soft mb-4 max-w-[62ch]">His fellowship training in complex fracture reconstruction gives him an unmatched ability to manage the nuances of bone lengthening, including revision cases other surgeons won’t take on.</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"text-[15.5px] leading-[1.7] text-ink-soft mb-7 max-w-[62ch]"} -->
				<p class="text-[15.5px] leading-[1.7] text-ink-soft mb-7 max-w-[62ch]">As Director of Orthopaedic Trauma at Pomona Valley Hospital Medical Center and founder of Premier Orthopaedic &amp; Trauma Specialists, a 17+ surgeon orthopaedic group, he built Premier Limb Lengthening on that institutional depth.</p>
				<!-- /wp:paragraph -->

				<!-- wp:buttons -->
				<div class="wp-block-buttons">
					<!-- wp:button -->
					<div class="wp-block-button"><a class="wp-block-button__link wp-element-button group inline-flex items-center gap-3 px-5 py-3.5 bg-ink text-paper uppercase tracking-wide text-[12px] font-medium border border-ink hover:bg-spine hover:border-spine transition-colors" href="/#dr-full">Learn more about Dr. Basmajian<span class="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></a></div>
					<!-- /wp:button -->
				</div>
				<!-- /wp:buttons -->

				<!-- wp:group {"layout":{"type":"default"},"className":"mt-10 grid grid-cols-3 border-t border-ink"} -->
				<div class="wp-block-group mt-10 grid grid-cols-3 border-t border-ink">
					<!-- wp:group {"layout":{"type":"default"},"className":"pt-6 pb-2 pr-4 border-r border-rule"} -->
					<div class="wp-block-group pt-6 pb-2 pr-4 border-r border-rule">
						<!-- wp:paragraph {"className":"font-serif text-[36px] lg:text-[48px] leading-none tracking-[-0.02em] text-ink"} -->
						<p class="font-serif text-[36px] lg:text-[48px] leading-none tracking-[-0.02em] text-ink"><em class="italic text-spine">1,000s</em></p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"} -->
						<p class="mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted">Procedures</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->

					<!-- wp:group {"layout":{"type":"default"},"className":"pt-6 pb-2 pr-4 border-r border-rule"} -->
					<div class="wp-block-group pt-6 pb-2 pr-4 border-r border-rule">
						<!-- wp:paragraph {"className":"font-serif text-[36px] lg:text-[48px] leading-none tracking-[-0.02em] text-ink"} -->
						<p class="font-serif text-[36px] lg:text-[48px] leading-none tracking-[-0.02em] text-ink">2</p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"} -->
						<p class="mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted">Fellowship Programs Completed</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->

					<!-- wp:group {"layout":{"type":"default"},"className":"pt-6 pb-2 pr-4"} -->
					<div class="wp-block-group pt-6 pb-2 pr-4">
						<!-- wp:paragraph {"className":"font-serif text-[36px] lg:text-[48px] leading-none tracking-[-0.02em] text-ink"} -->
						<p class="font-serif text-[36px] lg:text-[48px] leading-none tracking-[-0.02em] text-ink">Up to <em class="italic text-spine">3-6</em>″</p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"} -->
						<p class="mt-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted">Height Gain</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
