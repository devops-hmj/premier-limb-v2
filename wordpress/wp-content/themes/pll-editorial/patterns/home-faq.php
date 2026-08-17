<?php
/**
 * Title: Homepage — FAQ
 * Slug: pll/home-faq
 * Categories: pll-sections
 *
 * Port of components/v2/FaqV2.tsx with the entries from lib/faqs.ts.
 * Questions/answers are fully editable; items can be added or removed
 * (pll/faq sets templateLock:false on its inner area).
 *
 * NOTE: the FAQPage JSON-LD is NOT generated from this file. pll-seo emits it
 * from its own copy in plugins/pll-seo/includes/data/faqs.php. The two must be
 * kept byte-identical by hand. (An earlier version of this note said pll-seo
 * "reads the rendered blocks", which is not true and is worth knowing before
 * you assume editing here is enough.) verify-seo-meta.mjs V10 now enforces it.
 *
 * ⚠️ EDITING THIS FILE DOES NOT CHANGE AN ALREADY-SEEDED SITE. setup.php
 * pll_compose_patterns() inlines this pattern into the Home page's post_content
 * at seed time, so the live visible text lives in the database. The JSON-LD in
 * data/faqs.php DOES ship on a code deploy, so changing one without hand-editing
 * the live page makes the homepage contradict its own structured data.
 * Runbook: docs/MIGRATION.md §6f. Same trap as §6c step 3 and §6e.
 *
 * @package pll-editorial
 */

?>
<!-- wp:group {"tagName":"section","layout":{"type":"default"},"anchor":"faq","className":"bg-paper-off py-20 lg:py-28"} -->
<section class="wp-block-group bg-paper-off py-20 lg:py-28" id="faq">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12">
		<!-- wp:group {"tagName":"header","layout":{"type":"default"},"className":"js-reveal pb-8 mb-12 border-b border-ink"} -->
		<header class="wp-block-group js-reveal pb-8 mb-12 border-b border-ink">
			<!-- wp:paragraph {"className":"eyebrow mb-4"} -->
			<p class="eyebrow mb-4">Common Questions</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":2,"className":"mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] text-[clamp(40px,6vw,84px)]"} -->
			<h2 class="wp-block-heading mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] text-[clamp(40px,6vw,84px)]">Frequently asked <em class="italic text-spine">questions.</em></h2>
			<!-- /wp:heading -->
		</header>
		<!-- /wp:group -->

		<!-- wp:pll/faq -->
		<!-- wp:pll/faq-item {"question":"How much does limb lengthening surgery cost?"} -->
		<!-- wp:paragraph -->
		<p>Bilateral femur lengthening is $75,500 with the PRECICE 2 nail and $95,500 with PRECICE Max. Bilateral tibia is $85,500 and $105,500. Combined tibia and femur is $150,000 and $195,000. Every quote includes surgery, implants, anesthesia, hospitalization, and follow-up care. Financing is available through SoFi and CareCredit.</p>
		<!-- /wp:paragraph -->
		<!-- /wp:pll/faq-item -->

		<!-- wp:pll/faq-item {"question":"How much height can I gain?"} -->
		<!-- wp:paragraph -->
		<p>Femur lengthening typically adds 2 to 3 inches. Tibia lengthening adds another 2 to 3 inches. Combined staged height lengthening procedures can achieve up to 6 inches total. Results are permanent.</p>
		<!-- /wp:paragraph -->
		<!-- /wp:pll/faq-item -->

		<!-- wp:pll/faq-item {"question":"How long is the recovery?"} -->
		<!-- wp:paragraph -->
		<p>Active lengthening takes 3 to 4 months. Most patients return to daily activities within 3 to 4 months and full activity by 6 to 12 months.</p>
		<!-- /wp:paragraph -->
		<!-- /wp:pll/faq-item -->

		<!-- wp:pll/faq-item {"question":"Will there be visible scars or hardware?"} -->
		<!-- wp:paragraph -->
		<p>The Precice system is entirely internal (no external frames, no visible hardware). Small incisions heal to minimal scars.</p>
		<!-- /wp:paragraph -->
		<!-- /wp:pll/faq-item -->

		<!-- wp:pll/faq-item {"question":"Do you accept out-of-state &amp; international patients?"} -->
		<!-- wp:paragraph -->
		<p>Yes. Our concierge program coordinates flights, ground transportation, extended-stay housing, and on-site therapy. We've served patients from 50+ states and countries.</p>
		<!-- /wp:paragraph -->
		<!-- /wp:pll/faq-item -->

		<!-- wp:pll/faq-item {"question":"Can you handle revision cases?"} -->
		<!-- wp:paragraph -->
		<p>Yes. Dr. Basmajian's trauma reconstruction expertise means we accept revision cases many surgeons decline. We will review your history and imaging before committing to any plan.</p>
		<!-- /wp:paragraph -->
		<!-- /wp:pll/faq-item -->
		<!-- /wp:pll/faq -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
