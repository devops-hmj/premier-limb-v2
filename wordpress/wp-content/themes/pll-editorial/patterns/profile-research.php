<?php
/**
 * Title: Dr. Basmajian — Research & Publications
 * Slug: pll/profile-research
 * Categories: pll-sections
 *
 * Port of app/dr-basmajian/page.tsx (Research & Publications section) with
 * the citations from lib/basmajian.ts `publications` + `bookChapter`. The
 * JSX <ol> is rendered as stacked group rows (each entry nests paragraphs,
 * which core/list-item rich text cannot hold); numbering is baked in, and
 * the styled grid never showed list markers, so parity holds.
 *
 * @package pll-editorial
 */

?>
<!-- wp:group {"tagName":"section","layout":{"type":"default"},"templateLock":"contentOnly","lock":{"move":true,"remove":true},"className":"bg-paper-off py-20 lg:py-28 border-b border-rule"} -->
<section class="wp-block-group bg-paper-off py-20 lg:py-28 border-b border-rule">
	<!-- wp:group {"layout":{"type":"default"},"className":"mx-auto max-w-wrap px-6 lg:px-12"} -->
	<div class="wp-block-group mx-auto max-w-wrap px-6 lg:px-12">
		<!-- wp:group {"tagName":"header","layout":{"type":"default"},"className":"js-reveal pb-8 mb-12 border-b border-ink"} -->
		<header class="wp-block-group js-reveal pb-8 mb-12 border-b border-ink">
			<!-- wp:paragraph {"className":"eyebrow mb-4"} -->
			<p class="eyebrow mb-4">Research</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":2,"className":"mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[26ch] text-[clamp(36px,5.4vw,76px)]"} -->
			<h2 class="wp-block-heading mt-4 font-serif font-normal tracking-[-0.02em] text-ink leading-[0.98] max-w-[26ch] text-[clamp(36px,5.4vw,76px)]">Peer-reviewed <em class="italic text-spine">publications.</em></h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"className":"mt-5 text-[15.5px] leading-[1.7] text-ink-soft max-w-[62ch]"} -->
			<p class="mt-5 text-[15.5px] leading-[1.7] text-ink-soft max-w-[62ch]">Selected publications in the orthopaedic literature, alongside national podium presentations at the Orthopaedic Trauma Association and the American Academy of Orthopaedic Surgeons.</p>
			<!-- /wp:paragraph -->
		</header>
		<!-- /wp:group -->

		<!-- wp:group {"layout":{"type":"default"},"className":"js-reveal"} -->
		<div class="wp-block-group js-reveal">
			<!-- wp:group {"layout":{"type":"default"},"className":"border-t border-ink"} -->
			<div class="wp-block-group border-t border-ink">
				<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule"} -->
				<div class="wp-block-group grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule">
					<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1"} -->
					<p class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1">01</p>
					<!-- /wp:paragraph -->

					<!-- wp:group {"layout":{"type":"default"},"className":"max-w-[78ch]"} -->
					<div class="wp-block-group max-w-[78ch]">
						<!-- wp:paragraph {"className":"font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"} -->
						<p class="font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"><a href="https://pubmed.ncbi.nlm.nih.gov/35685981/" target="_blank" rel="noopener noreferrer" class="underline decoration-rule underline-offset-4 hover:text-spine hover:decoration-spine transition-colors">Liposomal Bupivacaine Associated with Cost Savings during Postoperative Pain Management in Fragility Intertrochanteric Hip Fractures.</a></p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft"} -->
						<p class="mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft">Chintalapudi N, Agarwalla A, Bortman J, Lu J, Basmajian HG, Amin NH, Liu JN.</p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"} -->
						<p class="mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"><span class="text-spine">Clin Orthop Surg</span> · 2022;14(2):162–168</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->

				<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule"} -->
				<div class="wp-block-group grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule">
					<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1"} -->
					<p class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1">02</p>
					<!-- /wp:paragraph -->

					<!-- wp:group {"layout":{"type":"default"},"className":"max-w-[78ch]"} -->
					<div class="wp-block-group max-w-[78ch]">
						<!-- wp:paragraph {"className":"font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"} -->
						<p class="font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"><a href="https://pubmed.ncbi.nlm.nih.gov/32797351/" target="_blank" rel="noopener noreferrer" class="underline decoration-rule underline-offset-4 hover:text-spine hover:decoration-spine transition-colors">Immediate weight bearing as tolerated correlates with decreased length of stay post intramedullary fixation for subtrochanteric fractures: a multicenter retrospective cohort study.</a></p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft"} -->
						<p class="mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft">Cunningham BP, Ali A, Basmajian HG, et al.</p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"} -->
						<p class="mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"><span class="text-spine">Eur J Orthop Surg Traumatol</span> · 2021;31(2):235–243</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->

				<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule"} -->
				<div class="wp-block-group grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule">
					<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1"} -->
					<p class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1">03</p>
					<!-- /wp:paragraph -->

					<!-- wp:group {"layout":{"type":"default"},"className":"max-w-[78ch]"} -->
					<div class="wp-block-group max-w-[78ch]">
						<!-- wp:paragraph {"className":"font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"} -->
						<p class="font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"><a href="https://pubmed.ncbi.nlm.nih.gov/31634285/" target="_blank" rel="noopener noreferrer" class="underline decoration-rule underline-offset-4 hover:text-spine hover:decoration-spine transition-colors">Liposomal Bupivacaine for Post-Operative Pain Control in Fragility Intertrochanteric Femur Fractures.</a></p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft"} -->
						<p class="mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft">Basmajian HG, Farmer T, Lu JC, Amin NH.</p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"} -->
						<p class="mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"><span class="text-spine">J Orthop Trauma</span> · 2020;34(3):139–144</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->

				<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule"} -->
				<div class="wp-block-group grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule">
					<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1"} -->
					<p class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1">04</p>
					<!-- /wp:paragraph -->

					<!-- wp:group {"layout":{"type":"default"},"className":"max-w-[78ch]"} -->
					<div class="wp-block-group max-w-[78ch]">
						<!-- wp:paragraph {"className":"font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"} -->
						<p class="font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"><a href="https://pubmed.ncbi.nlm.nih.gov/31992927/" target="_blank" rel="noopener noreferrer" class="underline decoration-rule underline-offset-4 hover:text-spine hover:decoration-spine transition-colors">Kirschner wire prepared pilot holes improve screw pull-out strength in synthetic osteoporotic-type bone.</a></p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft"} -->
						<p class="mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft">Basmajian HG, Liu JN, Scudday T, Campbell ST, Amin NH.</p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"} -->
						<p class="mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"><span class="text-spine">J Clin Orthop Trauma</span> · 2020;11(Suppl 1):S100–104</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->

				<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule"} -->
				<div class="wp-block-group grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule">
					<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1"} -->
					<p class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1">05</p>
					<!-- /wp:paragraph -->

					<!-- wp:group {"layout":{"type":"default"},"className":"max-w-[78ch]"} -->
					<div class="wp-block-group max-w-[78ch]">
						<!-- wp:paragraph {"className":"font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"} -->
						<p class="font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"><a href="https://pubmed.ncbi.nlm.nih.gov/31170099/" target="_blank" rel="noopener noreferrer" class="underline decoration-rule underline-offset-4 hover:text-spine hover:decoration-spine transition-colors">Fracture of a Carbon Fiber Re-Enforced Intramedullary Femoral Nail (Case Report).</a></p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft"} -->
						<p class="mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft">Vercio R, Basmajian HG.</p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"} -->
						<p class="mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"><span class="text-spine">J Am Acad Orthop Surg</span> · 2019;27(12):e585–588</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->

				<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule"} -->
				<div class="wp-block-group grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule">
					<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1"} -->
					<p class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1">06</p>
					<!-- /wp:paragraph -->

					<!-- wp:group {"layout":{"type":"default"},"className":"max-w-[78ch]"} -->
					<div class="wp-block-group max-w-[78ch]">
						<!-- wp:paragraph {"className":"font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"} -->
						<p class="font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"><a href="https://pubmed.ncbi.nlm.nih.gov/29318091/" target="_blank" rel="noopener noreferrer" class="underline decoration-rule underline-offset-4 hover:text-spine hover:decoration-spine transition-colors">Nerve blocks in the geriatric patient with hip fracture: a review of the current literature and relevant neuroanatomy.</a></p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft"} -->
						<p class="mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft">Amin NH, Basmajian HG, et al.</p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"} -->
						<p class="mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"><span class="text-spine">Geriatr Orthop Surg Rehabil</span> · 2017;8(4):268–275</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->

				<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule"} -->
				<div class="wp-block-group grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule">
					<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1"} -->
					<p class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1">07</p>
					<!-- /wp:paragraph -->

					<!-- wp:group {"layout":{"type":"default"},"className":"max-w-[78ch]"} -->
					<div class="wp-block-group max-w-[78ch]">
						<!-- wp:paragraph {"className":"font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"} -->
						<p class="font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"><a href="https://pubmed.ncbi.nlm.nih.gov/26053466/" target="_blank" rel="noopener noreferrer" class="underline decoration-rule underline-offset-4 hover:text-spine hover:decoration-spine transition-colors">Professional demands and job satisfaction in orthopaedic trauma: an Orthopaedic Trauma Association member survey.</a></p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft"} -->
						<p class="mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft">Cunningham B, Swanson D, Basmajian HG, McLemore R, Ortega G.</p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"} -->
						<p class="mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"><span class="text-spine">J Orthop Trauma</span> · 2015</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->

				<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule"} -->
				<div class="wp-block-group grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule">
					<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1"} -->
					<p class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1">08</p>
					<!-- /wp:paragraph -->

					<!-- wp:group {"layout":{"type":"default"},"className":"max-w-[78ch]"} -->
					<div class="wp-block-group max-w-[78ch]">
						<!-- wp:paragraph {"className":"font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"} -->
						<p class="font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"><a href="https://pubmed.ncbi.nlm.nih.gov/29252602/" target="_blank" rel="noopener noreferrer" class="underline decoration-rule underline-offset-4 hover:text-spine hover:decoration-spine transition-colors">A rare presentation of sciatic palsy due to hematoma after use of the Kocher-Langenbeck approach to the acetabulum.</a></p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft"} -->
						<p class="mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft">Rog D, Basmajian HG.</p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"} -->
						<p class="mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"><span class="text-spine">JBJS Case Connect</span> · 2015;5(1)</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->

				<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule"} -->
				<div class="wp-block-group grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule">
					<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1"} -->
					<p class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1">09</p>
					<!-- /wp:paragraph -->

					<!-- wp:group {"layout":{"type":"default"},"className":"max-w-[78ch]"} -->
					<div class="wp-block-group max-w-[78ch]">
						<!-- wp:paragraph {"className":"font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"} -->
						<p class="font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"><a href="https://pubmed.ncbi.nlm.nih.gov/24811086/" target="_blank" rel="noopener noreferrer" class="underline decoration-rule underline-offset-4 hover:text-spine hover:decoration-spine transition-colors">Radial neck fractures in children: experience from two level-1 trauma centers.</a></p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft"} -->
						<p class="mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft">Basmajian HG, Choi PD, Huh K, Sankar WN, Wells L, Arkader A.</p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"} -->
						<p class="mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"><span class="text-spine">J Pediatr Orthop B</span> · 2014;23(4):369–374</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->

				<!-- wp:group {"layout":{"type":"default"},"className":"grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule"} -->
				<div class="wp-block-group grid grid-cols-1 sm:grid-cols-[44px_1fr] gap-2 sm:gap-6 py-6 border-b border-rule">
					<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1"} -->
					<p class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine pt-1">10</p>
					<!-- /wp:paragraph -->

					<!-- wp:group {"layout":{"type":"default"},"className":"max-w-[78ch]"} -->
					<div class="wp-block-group max-w-[78ch]">
						<!-- wp:paragraph {"className":"font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"} -->
						<p class="font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"><a href="https://pubmed.ncbi.nlm.nih.gov/23320897/" target="_blank" rel="noopener noreferrer" class="underline decoration-rule underline-offset-4 hover:text-spine hover:decoration-spine transition-colors">Pectus excavatum in blunt chest trauma: a case report.</a></p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft"} -->
						<p class="mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft">Liodakis E, Liodaki E, Basmajian HG, Hawi N, Petri M, Krettek C, Jagodzinski M.</p>
						<!-- /wp:paragraph -->

						<!-- wp:paragraph {"className":"mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"} -->
						<p class="mt-1 font-mono uppercase tracking-[0.14em] text-[10.5px] text-muted"><span class="text-spine">J Med Case Rep</span> · 2013;7(1):22</p>
						<!-- /wp:paragraph -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->

			<!-- wp:group {"layout":{"type":"default"},"className":"mt-8 border border-rule bg-paper p-6 lg:p-7 max-w-[80ch]"} -->
			<div class="wp-block-group mt-8 border border-rule bg-paper p-6 lg:p-7 max-w-[80ch]">
				<!-- wp:paragraph {"className":"font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine mb-2"} -->
				<p class="font-mono uppercase tracking-[0.2em] text-[10.5px] text-spine mb-2">Book Chapter</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink"} -->
				<p class="font-serif text-[17px] lg:text-[19px] leading-[1.4] text-ink">Minimally invasive reduction and fixation techniques for acetabular fractures.</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"className":"mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft"} -->
				<p class="mt-1.5 text-[13.5px] leading-[1.5] text-ink-soft">Basmajian HG, Ortega G. In: Minimally Invasive Orthopaedic Surgery. Philadelphia: Lippincott, Williams &amp; Wilkins; 2014.</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->

			<!-- wp:buttons -->
			<div class="wp-block-buttons">
				<!-- wp:button {"linkTarget":"_blank","rel":"noopener noreferrer"} -->
				<div class="wp-block-button"><a class="wp-block-button__link wp-element-button group mt-10 inline-flex items-center gap-3 px-5 py-3.5 bg-ink text-paper uppercase tracking-wide text-[12px] font-medium hover:bg-spine transition-colors" href="https://premierlimblengthening.com/wp-content/uploads/2023/09/Basmajian-CV.pdf" target="_blank" rel="noopener noreferrer">Full Curriculum Vitae &amp; PubMed Articles<span class="font-serif italic text-[17px] transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:group -->
	</div>
	<!-- /wp:group -->
</section>
<!-- /wp:group -->
