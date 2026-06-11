<?php
/**
 * Title: Homepage — Pillars
 * Slug: pll/home-pillars
 * Categories: pll-sections
 *
 * Port of components/v2/Pillars.tsx. The four motion.article cards are
 * flattened per index (border/padding ternaries resolved per card) and the
 * whileInView/whileHover motion is mapped to js-reveal + pll-delay-* and
 * hover:-translate-y-1 per docs/PATTERN_CONVENTIONS.md.
 *
 * @package pll-editorial
 */
?>
<!-- wp:group {"tagName":"section","layout":{"type":"default"},"templateLock":"contentOnly","lock":{"move":true,"remove":true},"anchor":"why","className":"bg-paper-off py-20 lg:py-28 border-b border-rule"} -->
<section class="wp-block-group bg-paper-off py-20 lg:py-28 border-b border-rule" id="why">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12">
		<!-- wp:group {"tagName":"header","layout":{"type":"default"},"className":"js-reveal mb-12"} -->
		<header class="wp-block-group js-reveal mb-12">
			<!-- wp:paragraph {"className":"eyebrow mb-4"} -->
			<p class="eyebrow mb-4">Why Premier Limb Lengthening</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":2,"className":"mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[24ch] [text-wrap:balance] text-[clamp(40px,6vw,84px)]"} -->
			<h2 class="wp-block-heading mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[24ch] [text-wrap:balance] text-[clamp(40px,6vw,84px)]">Four reasons patients <em class="italic text-spine">choose us.</em></h2>
			<!-- /wp:heading -->
		</header>
		<!-- /wp:group -->

		<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-ink"} -->
		<div class="wp-block-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-ink">
			<!-- wp:group {"tagName":"article","layout":{"type":"default"},"className":"js-reveal group py-9 pr-7 flex flex-col gap-4 min-h-[300px] lg:min-h-[340px] lg:pl-0 lg:border-r md:border-r md:border-b lg:border-b-0 border-rule lg:border-b-0 transition-transform duration-300 hover:-translate-y-1"} -->
			<article class="wp-block-group js-reveal group py-9 pr-7 flex flex-col gap-4 min-h-[300px] lg:min-h-[340px] lg:pl-0 lg:border-r md:border-r md:border-b lg:border-b-0 border-rule lg:border-b-0 transition-transform duration-300 hover:-translate-y-1">
				<!-- wp:paragraph {"className":"inline-flex items-center gap-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"} -->
				<p class="inline-flex items-center gap-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"><span class="inline-block w-2 h-2 bg-spine group-hover:bg-spine-deep transition-colors" aria-hidden="true"></span>01 · Expertise</p>
				<!-- /wp:paragraph -->

				<!-- wp:heading {"level":3,"className":"font-serif font-medium text-[26px] lg:text-[28px] leading-[1.1] tracking-[-0.01em] text-ink"} -->
				<h3 class="wp-block-heading font-serif font-medium text-[26px] lg:text-[28px] leading-[1.1] tracking-[-0.01em] text-ink">Surgical Expertise</h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"className":"flex-1 text-[14.5px] text-ink-soft leading-[1.65]"} -->
				<p class="flex-1 text-[14.5px] text-ink-soft leading-[1.65]">Thousands of procedures performed in trauma, cosmetic, and revisional settings by Dr. Hrayr Basmajian.</p>
				<!-- /wp:paragraph -->

				<!-- wp:buttons -->
				<div class="wp-block-buttons"><!-- wp:button -->
				<div class="wp-block-button"><a class="wp-block-button__link wp-element-button self-start inline-flex items-center gap-2.5 pb-1 font-mono uppercase tracking-[0.18em] text-[11px] text-spine border-b border-spine" href="/#dr">Meet Dr. Basmajian<span class="font-serif italic text-[16px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></a></div>
				<!-- /wp:button --></div>
				<!-- /wp:buttons -->
			</article>
			<!-- /wp:group -->

			<!-- wp:group {"tagName":"article","layout":{"type":"default"},"className":"js-reveal pll-delay-100 group py-9 pr-7 flex flex-col gap-4 min-h-[300px] lg:min-h-[340px] md:pl-5 lg:pl-5 lg:border-r md:border-b lg:border-b-0 border-rule lg:border-b-0 transition-transform duration-300 hover:-translate-y-1"} -->
			<article class="wp-block-group js-reveal pll-delay-100 group py-9 pr-7 flex flex-col gap-4 min-h-[300px] lg:min-h-[340px] md:pl-5 lg:pl-5 lg:border-r md:border-b lg:border-b-0 border-rule lg:border-b-0 transition-transform duration-300 hover:-translate-y-1">
				<!-- wp:paragraph {"className":"inline-flex items-center gap-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"} -->
				<p class="inline-flex items-center gap-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"><span class="inline-block w-2 h-2 bg-spine group-hover:bg-spine-deep transition-colors" aria-hidden="true"></span>02 · Technology</p>
				<!-- /wp:paragraph -->

				<!-- wp:heading {"level":3,"className":"font-serif font-medium text-[26px] lg:text-[28px] leading-[1.1] tracking-[-0.01em] text-ink"} -->
				<h3 class="wp-block-heading font-serif font-medium text-[26px] lg:text-[28px] leading-[1.1] tracking-[-0.01em] text-ink">Internal Nail Technology</h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"className":"flex-1 text-[14.5px] text-ink-soft leading-[1.65]"} -->
				<p class="flex-1 text-[14.5px] text-ink-soft leading-[1.65]">Precice 4th-generation magnetic lengthening nails. No external hardware. Less pain, faster recovery, virtually invisible.</p>
				<!-- /wp:paragraph -->

				<!-- wp:buttons -->
				<div class="wp-block-buttons"><!-- wp:button -->
				<div class="wp-block-button"><a class="wp-block-button__link wp-element-button self-start inline-flex items-center gap-2.5 pb-1 font-mono uppercase tracking-[0.18em] text-[11px] text-spine border-b border-spine" href="/#surgery">How It Works<span class="font-serif italic text-[16px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></a></div>
				<!-- /wp:button --></div>
				<!-- /wp:buttons -->
			</article>
			<!-- /wp:group -->

			<!-- wp:group {"tagName":"article","layout":{"type":"default"},"className":"js-reveal pll-delay-200 group py-9 pr-7 flex flex-col gap-4 min-h-[300px] lg:min-h-[340px] lg:pl-5 lg:border-r md:border-r border-rule lg:border-b-0 transition-transform duration-300 hover:-translate-y-1"} -->
			<article class="wp-block-group js-reveal pll-delay-200 group py-9 pr-7 flex flex-col gap-4 min-h-[300px] lg:min-h-[340px] lg:pl-5 lg:border-r md:border-r border-rule lg:border-b-0 transition-transform duration-300 hover:-translate-y-1">
				<!-- wp:paragraph {"className":"inline-flex items-center gap-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"} -->
				<p class="inline-flex items-center gap-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"><span class="inline-block w-2 h-2 bg-spine group-hover:bg-spine-deep transition-colors" aria-hidden="true"></span>03 · Service</p>
				<!-- /wp:paragraph -->

				<!-- wp:heading {"level":3,"className":"font-serif font-medium text-[26px] lg:text-[28px] leading-[1.1] tracking-[-0.01em] text-ink"} -->
				<h3 class="wp-block-heading font-serif font-medium text-[26px] lg:text-[28px] leading-[1.1] tracking-[-0.01em] text-ink">Concierge Experience</h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"className":"flex-1 text-[14.5px] text-ink-soft leading-[1.65]"} -->
				<p class="flex-1 text-[14.5px] text-ink-soft leading-[1.65]">We coordinate flights, hotels, ground transportation, and recovery housing for out-of-area patients. White-glove care, start to finish.</p>
				<!-- /wp:paragraph -->

				<!-- wp:buttons -->
				<div class="wp-block-buttons"><!-- wp:button -->
				<div class="wp-block-button"><a class="wp-block-button__link wp-element-button self-start inline-flex items-center gap-2.5 pb-1 font-mono uppercase tracking-[0.18em] text-[11px] text-spine border-b border-spine" href="/#concierge">Travel Program<span class="font-serif italic text-[16px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></a></div>
				<!-- /wp:button --></div>
				<!-- /wp:buttons -->
			</article>
			<!-- /wp:group -->

			<!-- wp:group {"tagName":"article","layout":{"type":"default"},"className":"js-reveal pll-delay-300 group py-9 pr-7 flex flex-col gap-4 min-h-[300px] lg:min-h-[340px] md:pl-5 lg:pl-5 border-rule lg:border-b-0 transition-transform duration-300 hover:-translate-y-1"} -->
			<article class="wp-block-group js-reveal pll-delay-300 group py-9 pr-7 flex flex-col gap-4 min-h-[300px] lg:min-h-[340px] md:pl-5 lg:pl-5 border-rule lg:border-b-0 transition-transform duration-300 hover:-translate-y-1">
				<!-- wp:paragraph {"className":"inline-flex items-center gap-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"} -->
				<p class="inline-flex items-center gap-2.5 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted"><span class="inline-block w-2 h-2 bg-spine group-hover:bg-spine-deep transition-colors" aria-hidden="true"></span>04 · Institution</p>
				<!-- /wp:paragraph -->

				<!-- wp:heading {"level":3,"className":"font-serif font-medium text-[26px] lg:text-[28px] leading-[1.1] tracking-[-0.01em] text-ink"} -->
				<h3 class="wp-block-heading font-serif font-medium text-[26px] lg:text-[28px] leading-[1.1] tracking-[-0.01em] text-ink">Institutional Depth</h3>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"className":"flex-1 text-[14.5px] text-ink-soft leading-[1.65]"} -->
				<p class="flex-1 text-[14.5px] text-ink-soft leading-[1.65]">Founded by Dr. Basmajian, who also founded Premier Orthopaedic &amp; Trauma Specialists, a 17+ surgeon group with in-house physical therapy and on-site imaging. Our patients access that infrastructure through his network.</p>
				<!-- /wp:paragraph -->

				<!-- wp:buttons -->
				<div class="wp-block-buttons"><!-- wp:button -->
				<div class="wp-block-button"><a class="wp-block-button__link wp-element-button self-start inline-flex items-center gap-2.5 pb-1 font-mono uppercase tracking-[0.18em] text-[11px] text-spine border-b border-spine" href="/#practice">About Our Practice<span class="font-serif italic text-[16px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></a></div>
				<!-- /wp:button --></div>
				<!-- /wp:buttons -->
			</article>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
