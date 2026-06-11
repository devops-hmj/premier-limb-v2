/**
 * pll/faq — Interactivity API store.
 *
 * Single-open accordion mirroring components/v2/FaqV2.tsx (`openIdx` state):
 * opening an item closes the previous one; clicking the open item closes it.
 * Height animation is pure CSS (grid-template-rows 0fr → 1fr).
 */
import { store, getContext } from '@wordpress/interactivity';

store( 'pll/faq', {
	state: {
		get isOpen() {
			const ctx = getContext();
			return ctx.openIndex === ctx.index;
		},
	},
	actions: {
		toggle() {
			const ctx = getContext();
			ctx.openIndex = ctx.openIndex === ctx.index ? null : ctx.index;
		},
	},
} );
