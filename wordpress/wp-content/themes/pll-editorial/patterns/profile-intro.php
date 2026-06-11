<?php
/**
 * Title: Dr. Basmajian — Intro & Pull Quote
 * Slug: pll/profile-intro
 * Categories: pll-sections
 *
 * Port of app/dr-basmajian/page.tsx (lede + intro section): drop-cap lede,
 * two supporting paragraphs, serif kicker line, and the pull-quote card.
 * The JSX <blockquote> is rendered as a plain group (core/quote chrome would
 * fight the verbatim utility classes); the oversized opening quote glyph is
 * folded into the quote paragraph as a block-level span.
 *
 * @package pll-editorial
 */
?>
<!-- wp:group {"tagName":"section","layout":{"type":"default"},"templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"bg-paper-off py-20 lg:py-28"} -->
<section class="wp-block-group bg-paper-off py-20 lg:py-28">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12 grid grid-cols-12 gap-6 lg:gap-8">
		<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal col-span-12 lg:col-span-7"} -->
		<div class="wp-block-group js-reveal col-span-12 lg:col-span-7">
			<!-- wp:paragraph {"className":"text-[18px] leading-[1.6] text-ink mb-7 max-w-[58ch]"} -->
			<p class="text-[18px] leading-[1.6] text-ink mb-7 max-w-[58ch]"><span class="v2-dropcap-word">Dr.</span> Basmajian is a board-certified orthopaedic surgeon specializing in trauma and non-trauma musculoskeletal concerns. He is the Orthopaedic Trauma Medical Director at Pomona Valley Hospital Medical Center, one of the busiest trauma centers in Los Angeles, and an assistant professor of orthopaedic surgery. Previously, he was Chair of Orthopaedic Trauma at Loma Linda University Medical Center.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"text-[15.5px] leading-[1.7] text-ink-soft mb-5 max-w-[58ch]"} -->
			<p class="text-[15.5px] leading-[1.7] text-ink-soft mb-5 max-w-[58ch]">Dr. Basmajian’s career has been punctuated by an insatiable drive toward quality improvement in the orthopaedic programs he helms as well as always striving to hone his own skills. His knowledge, compassion, and deep understanding of orthopaedic surgery and patient needs have made him a go-to provider across Southern California and the United States.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"text-[15.5px] leading-[1.7] text-ink-soft max-w-[58ch]"} -->
			<p class="text-[15.5px] leading-[1.7] text-ink-soft max-w-[58ch]">Dr. Basmajian has developed a particular interest in limb lengthening for several reasons, not least of which is the stunning transformation a patient undergoes physically and emotionally. Further, as a trauma surgeon, safe and effective limb lengthening is a cornerstone of his practice, with thousands of these procedures performed successfully over his time in practice. Dr. Basmajian has also seen the effects of improper limb lengthening that can result in deformity and a need for costly and painful correction.</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"mt-5 font-serif font-medium text-[20px] text-ink max-w-[58ch]"} -->
			<p class="mt-5 font-serif font-medium text-[20px] text-ink max-w-[58ch]">Doing it right the first time is an integral part of his practice.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:group -->

		<!-- wp:group {"tagName":"aside","layout":{"type":"default"},"className":"js-reveal pll-delay-100 col-span-12 lg:col-span-5 lg:pl-2"} -->
		<aside class="wp-block-group js-reveal pll-delay-100 col-span-12 lg:col-span-5 lg:pl-2">
			<!-- wp:group {"layout":{"type":"default"},"className":"relative bg-paper p-7 lg:p-9"} -->
			<div class="wp-block-group relative bg-paper p-7 lg:p-9">
				<!-- wp:paragraph {"className":"font-serif italic text-[20px] lg:text-[22px] leading-[1.4] text-ink"} -->
				<p class="font-serif italic text-[20px] lg:text-[22px] leading-[1.4] text-ink"><span aria-hidden="true" class="font-serif italic text-spine text-[88px] leading-[0.4] block mb-3">“</span>The need for quality care in orthopaedic surgery, limb lengthening, and medicine in general is as significant today as ever. Despite technological advances, a surgeon’s dedication to their craft can still be the difference between good and great results. At Premier Limb Lengthening, each patient is integral to our practice and deserves the utmost in attention and care. Our patients always come first and know they will receive direct and honest advice from our team.</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"mt-6 pt-4 border-t border-rule font-mono uppercase tracking-[0.18em] text-[11px] text-muted"} -->
				<p class="mt-6 pt-4 border-t border-rule font-mono uppercase tracking-[0.18em] text-[11px] text-muted"><span class="text-spine font-medium">Dr. Hrayr Basmajian</span><br>Founder · Premier Limb Lengthening</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</aside>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
