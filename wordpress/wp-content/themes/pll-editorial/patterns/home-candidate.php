<?php
/**
 * Title: Homepage — Candidate Checklist
 * Slug: pll/home-candidate
 * Categories: pll-sections
 *
 * Port of components/v2/Candidate.tsx.
 *
 * @package pll-editorial
 */

?>
<!-- wp:group {"tagName":"section","layout":{"type":"default"},"templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"bg-paper py-20 lg:py-28"} -->
<section class="wp-block-group bg-paper py-20 lg:py-28">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12">
		<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center pb-10 lg:pb-12 mb-12 border-b border-ink"} -->
		<div class="wp-block-group grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center pb-10 lg:pb-12 mb-12 border-b border-ink">
			<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal order-2 lg:order-1"} -->
			<div class="wp-block-group js-reveal order-2 lg:order-1">
				<!-- wp:group {"layout":{"type":"default"},"className":"v2-portrait aspect-[4/5] bg-paper-warm border border-rule relative overflow-hidden max-w-[420px] lg:max-w-[85%]"} -->
				<div class="wp-block-group v2-portrait aspect-[4/5] bg-paper-warm border border-rule relative overflow-hidden max-w-[420px] lg:max-w-[85%]">
					<!-- wp:image {"sizeSlug":"full","className":"absolute inset-0"} -->
					<figure class="wp-block-image size-full absolute inset-0"><img src="<?php echo esc_url( get_theme_file_uri( 'assets/images/candidate-portrait.webp' ) ); ?>" alt="A professional considering cosmetic limb lengthening" class="w-full h-full object-cover"/></figure>
					<!-- /wp:image -->

					<!-- wp:paragraph {"className":"absolute z-10 top-3 left-3 px-2 py-1 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted bg-paper"} -->
					<p class="absolute z-10 top-3 left-3 px-2 py-1 font-mono uppercase tracking-[0.2em] text-[10.5px] text-muted bg-paper">The Candidate</p>
					<!-- /wp:paragraph -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal pll-delay-100 order-1 lg:order-2"} -->
			<div class="wp-block-group js-reveal pll-delay-100 order-1 lg:order-2">
				<!-- wp:group {"tagName":"header","layout":{"type":"default"}} -->
				<header class="wp-block-group">
					<!-- wp:paragraph {"className":"eyebrow mb-4"} -->
					<p class="eyebrow mb-4">Am I a Candidate?</p>
					<!-- /wp:paragraph -->

					<!-- wp:heading {"level":2,"className":"mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[18ch] [text-wrap:balance] text-[clamp(40px,6vw,84px)]"} -->
					<h2 class="wp-block-heading mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[18ch] [text-wrap:balance] text-[clamp(40px,6vw,84px)]">Who is a good candidate for <em class="italic text-spine">limb lengthening?</em></h2>
					<!-- /wp:heading -->
				</header>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 lg:gap-14 items-start"} -->
		<div class="wp-block-group grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-12 lg:gap-14 items-start">
			<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal"} -->
			<div class="wp-block-group js-reveal">
				<!-- wp:list {"className":"border-t border-ink"} -->
				<ul class="wp-block-list border-t border-ink"><!-- wp:list-item {"className":"list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"} -->
				<li class="list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"><span class="font-serif italic text-spine text-[20px]">01</span><span>Generally healthy adults aged 18 to 55 (older patients evaluated case by case).</span></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"} -->
				<li class="list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"><span class="font-serif italic text-spine text-[20px]">02</span><span>Non-smoker or willing to quit 6 weeks before surgery.</span></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"} -->
				<li class="list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"><span class="font-serif italic text-spine text-[20px]">03</span><span>BMI under 35 (ideal under 30).</span></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"} -->
				<li class="list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"><span class="font-serif italic text-spine text-[20px]">04</span><span>No active bone disease or uncontrolled diabetes.</span></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"} -->
				<li class="list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"><span class="font-serif italic text-spine text-[20px]">05</span><span>Able to commit to 3 to 6 months of recovery and on-site therapy.</span></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"} -->
				<li class="list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"><span class="font-serif italic text-spine text-[20px]">06</span><span>Realistic expectations about height gain (up to 3″ per bone, up to 6″ combined).</span></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"} -->
				<li class="list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"><span class="font-serif italic text-spine text-[20px]">07</span><span>Cosmetic height enhancement OR limb-length discrepancy correction.</span></li>
				<!-- /wp:list-item --><!-- wp:list-item {"className":"list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"} -->
				<li class="list-none py-5 border-b border-rule grid grid-cols-[44px_1fr] items-baseline text-[15.5px] text-ink"><span class="font-serif italic text-spine text-[20px]">08</span><span>Revision patients: previous surgery complications or unsatisfactory results.</span></li>
				<!-- /wp:list-item --></ul>
				<!-- /wp:list -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"tagName":"aside","layout":{"type":"default"},"className":"js-reveal pll-delay-100"} -->
			<aside class="wp-block-group js-reveal pll-delay-100">
				<!-- wp:group {"layout":{"type":"default"},"className":"relative bg-spine text-paper p-10 lg:p-12"} -->
				<div class="wp-block-group relative bg-spine text-paper p-10 lg:p-12">
					<!-- wp:group {"layout":{"type":"default"},"className":"absolute inset-x-0 top-0 h-1 bg-gold"} -->
					<div class="wp-block-group absolute inset-x-0 top-0 h-1 bg-gold"></div>
					<!-- /wp:group -->

					<!-- wp:paragraph {"className":"font-mono uppercase text-[11px] tracking-[0.2em] inline-flex items-center gap-3 text-gold"} -->
					<p class="font-mono uppercase text-[11px] tracking-[0.2em] inline-flex items-center gap-3 text-gold"><span class="inline-block w-[22px] h-px bg-gold" aria-hidden="true"></span>Not sure if you qualify?</p>
					<!-- /wp:paragraph -->

					<!-- wp:heading {"level":3,"className":"mt-5 mb-5 font-serif font-medium text-[28px] lg:text-[36px] leading-[1.1] tracking-[-0.01em] max-w-[16ch]"} -->
					<h3 class="wp-block-heading mt-5 mb-5 font-serif font-medium text-[28px] lg:text-[36px] leading-[1.1] tracking-[-0.01em] max-w-[16ch]">Many patients told <em class="italic text-gold">“no”</em> elsewhere are candidates here.</h3>
					<!-- /wp:heading -->

					<!-- wp:paragraph {"className":"text-[15px] leading-[1.7] text-paper/95 mb-7"} -->
					<p class="text-[15px] leading-[1.7] text-paper/95 mb-7">The best way to find out is through a confidential consultation. Dr. Basmajian evaluates each patient individually. Many patients who were told “no” by other surgeons are candidates at our practice due to our trauma reconstruction expertise.</p>
					<!-- /wp:paragraph -->

					<!-- wp:buttons -->
					<div class="wp-block-buttons"><!-- wp:button -->
					<div class="wp-block-button"><a class="wp-block-button__link wp-element-button group inline-flex items-center gap-3 px-5 py-3.5 text-ink uppercase tracking-wide text-[12px] font-medium hover:bg-paper transition-colors bg-gold" href="/#consult">Schedule Your Assessment<span class="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></a></div>
					<!-- /wp:button --></div>
					<!-- /wp:buttons -->
				</div>
				<!-- /wp:group -->
			</aside>
			<!-- /wp:group -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
