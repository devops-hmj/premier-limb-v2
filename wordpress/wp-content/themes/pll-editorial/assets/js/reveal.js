/**
 * Scroll-reveal — replaces framer-motion's whileInView fade-up.
 *
 * Progressive enhancement: elements carrying .js-reveal are fully visible
 * unless <html> has the `js` class (added inline in inc/enqueue.php before
 * first paint). CSS in src/css/tailwind.css owns the transition; an optional
 * data-reveal-delay="0.08" attribute staggers siblings.
 */

/*
 * ch-unit rebind after webfont arrival. Chromium caches computed styles per
 * matched-rule-set (MatchedPropertiesCache); entries created while the
 * fallback font was active keep fallback-resolved ch/ex lengths even after
 * the swap, so max-w-[Nch] clamps measured Consolas/Georgia zeros instead of
 * the brand fonts and text wrapped differently than the Next build. Adding a
 * one-way class changes every element's matched-rule set exactly once,
 * post-load (a paired rule lives in src/css/tailwind.css), forcing fresh
 * computed styles against the loaded fonts. Toggles don't work: reverting
 * rejoins the stale cache entry.
 */
if (document.fonts && document.fonts.ready) {
	document.fonts.ready.then(() => {
		document.documentElement.classList.add('pll-fonts-loaded');
	});
}

const items = document.querySelectorAll('.js-reveal');

if (items.length) {
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (reduced || !('IntersectionObserver' in window)) {
		items.forEach((el) => el.classList.add('is-visible'));
	} else {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
						observer.unobserve(entry.target);
					}
				}
			},
			{ rootMargin: '0px 0px -10% 0px' }
		);

		items.forEach((el) => {
			// Stagger via data-reveal-delay="0.15" (seconds) on hand-written
			// markup, or .pll-delay-<ms> classes on block markup (blocks
			// cannot carry data attributes).
			const delay = el.getAttribute('data-reveal-delay');
			if (delay) {
				el.style.setProperty('--reveal-delay', `${delay}s`);
			}
			observer.observe(el);
		});
	}
}
