<?php
/**
 * Title: Homepage — Article Lede
 * Slug: pll/home-article
 * Categories: pll-sections
 *
 * Port of components/v2/Article.tsx — the paper-off lede that docks under
 * the video stage: editorial portrait + drop-cap lead + 2-column running
 * body + CTA row, concluded by the 4-up trust strip.
 *
 * @package pll-editorial
 */

$pll_portrait = get_theme_file_uri( 'assets/images/dr-picture.jpg' );
?>
<!-- wp:group {"tagName":"section","layout":{"type":"default"},"templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"bg-paper-off"} -->
<section class="wp-block-group bg-paper-off">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12 pt-16 pb-6"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12 pt-16 pb-6">
		<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-12 gap-6 lg:gap-8"} -->
		<div class="wp-block-group grid grid-cols-12 gap-6 lg:gap-8">
			<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal col-span-12 lg:col-span-5"} -->
			<div class="wp-block-group js-reveal col-span-12 lg:col-span-5">
				<!-- wp:group {"layout":{"type":"default"},"ariaLabel":"Portrait of Dr. Basmajian","className":"v2-portrait aspect-[4/5] border border-rule bg-paper-warm relative overflow-hidden max-w-[85%]"} -->
				<div class="wp-block-group v2-portrait aspect-[4/5] border border-rule bg-paper-warm relative overflow-hidden max-w-[85%]" aria-label="Portrait of Dr. Basmajian">
					<!-- wp:image {"sizeSlug":"full","className":"absolute inset-0"} -->
					<figure class="wp-block-image size-full absolute inset-0"><img src="<?php echo esc_url( $pll_portrait ); ?>" alt="Dr. Hrayr Basmajian examining a femur model in his Upland clinic" class="w-full h-full object-cover"/></figure>
					<!-- /wp:image -->

					<!-- wp:paragraph {"className":"absolute z-10 top-3 left-3 px-2 py-1 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted bg-paper-off"} -->
					<p class="absolute z-10 top-3 left-3 px-2 py-1 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted bg-paper-off">In Clinic</p>
					<!-- /wp:paragraph -->

					<!-- wp:paragraph {"className":"absolute z-10 bottom-3 left-3 right-3 px-3 py-2 bg-paper-off/95 backdrop-blur-sm border-t-2 border-spine font-serif italic text-[14px] lg:text-[15px] text-ink-soft"} -->
					<p class="absolute z-10 bottom-3 left-3 right-3 px-3 py-2 bg-paper-off/95 backdrop-blur-sm border-t-2 border-spine font-serif italic text-[14px] lg:text-[15px] text-ink-soft">Dr. Basmajian, examining a femur in clinic. Upland, California.</p>
					<!-- /wp:paragraph -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal pll-delay-100 col-span-12 lg:col-span-7"} -->
			<div class="wp-block-group js-reveal pll-delay-100 col-span-12 lg:col-span-7">
				<!-- wp:paragraph {"className":"v2-dropcap text-[18px] leading-[1.6] text-ink mb-7 max-w-[54ch]"} -->
				<p class="v2-dropcap text-[18px] leading-[1.6] text-ink mb-7 max-w-[54ch]">Concierge care from your first consultation through full recovery. We combine a trauma surgeon’s precision with a private-clinic’s level of discretion. The result is a practice that accepts cases others decline, in a setting designed around the patient.</p>
				<!-- /wp:paragraph -->

				<!-- wp:group {"layout":{"type":"default"},"className":"v2-cols text-[14.5px] leading-[1.7] text-ink-soft pt-4 border-t border-rule"} -->
				<div class="wp-block-group v2-cols text-[14.5px] leading-[1.7] text-ink-soft pt-4 border-t border-rule">
					<!-- wp:paragraph -->
					<p>Our program is the only US limb lengthening practice offering a full white-glove travel and recovery coordination service: flights, housing, physical therapy, and a single dedicated coordinator from first call to final follow-up.</p>
					<!-- /wp:paragraph -->

					<!-- wp:paragraph -->
					<p>Every procedure uses the latest internal Precice® nail technology: no external hardware, no visible frame, faster recovery, and a virtually invisible result once healed.</p>
					<!-- /wp:paragraph -->
				</div>
				<!-- /wp:group -->

				<!-- wp:buttons {"className":"mt-8 pt-7 border-t border-rule flex flex-wrap gap-3"} -->
				<div class="wp-block-buttons mt-8 pt-7 border-t border-rule flex flex-wrap gap-3">
					<!-- wp:button -->
					<div class="wp-block-button"><a class="wp-block-button__link wp-element-button group inline-flex items-center gap-3 px-5 py-3.5 bg-spine text-paper uppercase tracking-wide text-[12px] font-medium border border-spine hover:bg-spine-deep hover:border-spine-deep transition-colors" href="/#consult">Schedule a Confidential Consultation<span class="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></a></div>
					<!-- /wp:button -->

					<!-- wp:button -->
					<div class="wp-block-button"><a class="wp-block-button__link wp-element-button group inline-flex items-center gap-3 px-5 py-3.5 bg-transparent text-spine border border-spine uppercase tracking-wide text-[12px] font-medium hover:bg-spine hover:text-paper transition-colors" href="/limb-lengthening-pricing-options/">View Pricing Options<span class="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></a></div>
					<!-- /wp:button -->
				</div>
				<!-- /wp:buttons -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->

	<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal mx-auto max-w-wrap px-6 lg:px-12 mt-12"} -->
	<div class="wp-block-group js-reveal mx-auto max-w-wrap px-6 lg:px-12 mt-12">
		<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-2 lg:grid-cols-4 border-t border-b border-ink py-7"} -->
		<div class="wp-block-group grid grid-cols-2 lg:grid-cols-4 border-t border-b border-ink py-7">
			<!-- wp:group {"layout":{"type":"default"},"className":"px-4 lg:pr-6 flex flex-col gap-1.5 lg:border-r border-rule border-r border-rule lg:border-r border-b border-rule pb-5 lg:border-b-0 lg:pb-0"} -->
			<div class="wp-block-group px-4 lg:pr-6 flex flex-col gap-1.5 lg:border-r border-rule border-r border-rule lg:border-r border-b border-rule pb-5 lg:border-b-0 lg:pb-0">
				<!-- wp:paragraph {"className":"font-mono uppercase text-[10px] tracking-[0.22em] text-muted"} -->
				<p class="font-mono uppercase text-[10px] tracking-[0.22em] text-muted">01</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"font-serif text-[20px] lg:text-[22px] leading-[1.15] tracking-[-0.01em] text-ink"} -->
				<p class="font-serif text-[20px] lg:text-[22px] leading-[1.15] tracking-[-0.01em] text-ink"><em class="italic text-spine">Thousands</em> of procedures</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"text-[12px] text-muted leading-[1.55]"} -->
				<p class="text-[12px] text-muted leading-[1.55]">Trauma, cosmetic, and revision combined.</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"layout":{"type":"default"},"className":"px-4 lg:pr-6 flex flex-col gap-1.5 lg:border-r border-rule border-b border-rule pb-5 lg:border-b-0 lg:pb-0"} -->
			<div class="wp-block-group px-4 lg:pr-6 flex flex-col gap-1.5 lg:border-r border-rule border-b border-rule pb-5 lg:border-b-0 lg:pb-0">
				<!-- wp:paragraph {"className":"font-mono uppercase text-[10px] tracking-[0.22em] text-muted"} -->
				<p class="font-mono uppercase text-[10px] tracking-[0.22em] text-muted">02</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"font-serif text-[20px] lg:text-[22px] leading-[1.15] tracking-[-0.01em] text-ink"} -->
				<p class="font-serif text-[20px] lg:text-[22px] leading-[1.15] tracking-[-0.01em] text-ink"><em class="italic text-spine">Precice®</em> nail technology</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"text-[12px] text-muted leading-[1.55]"} -->
				<p class="text-[12px] text-muted leading-[1.55]">Internal magnetic lengthening (no external frame).</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"layout":{"type":"default"},"className":"px-4 lg:pr-6 flex flex-col gap-1.5 lg:border-r border-rule border-r border-rule lg:border-r pt-5 lg:pt-0"} -->
			<div class="wp-block-group px-4 lg:pr-6 flex flex-col gap-1.5 lg:border-r border-rule border-r border-rule lg:border-r pt-5 lg:pt-0">
				<!-- wp:paragraph {"className":"font-mono uppercase text-[10px] tracking-[0.22em] text-muted"} -->
				<p class="font-mono uppercase text-[10px] tracking-[0.22em] text-muted">03</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"font-serif text-[20px] lg:text-[22px] leading-[1.15] tracking-[-0.01em] text-ink"} -->
				<p class="font-serif text-[20px] lg:text-[22px] leading-[1.15] tracking-[-0.01em] text-ink"><em class="italic text-spine">Concierge</em> travel program</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"text-[12px] text-muted leading-[1.55]"} -->
				<p class="text-[12px] text-muted leading-[1.55]">White-glove logistics, domestic &amp; international.</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"layout":{"type":"default"},"className":"px-4 lg:pr-6 flex flex-col gap-1.5 pt-5 lg:pt-0"} -->
			<div class="wp-block-group px-4 lg:pr-6 flex flex-col gap-1.5 pt-5 lg:pt-0">
				<!-- wp:paragraph {"className":"font-mono uppercase text-[10px] tracking-[0.22em] text-muted"} -->
				<p class="font-mono uppercase text-[10px] tracking-[0.22em] text-muted">04</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"font-serif text-[20px] lg:text-[22px] leading-[1.15] tracking-[-0.01em] text-ink"} -->
				<p class="font-serif text-[20px] lg:text-[22px] leading-[1.15] tracking-[-0.01em] text-ink"><em class="italic text-spine">Transparent</em> pricing</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"text-[12px] text-muted leading-[1.55]"} -->
				<p class="text-[12px] text-muted leading-[1.55]">Fully itemised quote before you commit.</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
