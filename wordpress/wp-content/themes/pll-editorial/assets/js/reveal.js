/**
 * Scroll-reveal — replaces framer-motion's whileInView fade-up.
 *
 * Progressive enhancement: elements carrying .js-reveal are fully visible
 * unless <html> has the `js` class (added inline in inc/enqueue.php before
 * first paint). CSS in src/css/tailwind.css owns the transition; an optional
 * data-reveal-delay="0.08" attribute staggers siblings.
 */
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
