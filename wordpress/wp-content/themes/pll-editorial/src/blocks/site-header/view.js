/**
 * pll/site-header — Interactivity API store.
 *
 * Replaces the React state in components/v2/NavV2.tsx:
 *   scrolled  → sticky bar visibility past 120px (unless forceVisible)
 *   open      → mobile sheet, with <html> scroll lock + Escape to close
 *   subOpen   → desktop "Your Surgery" hover dropdown (per-instance context)
 *   expanded  → mobile inline submenu expansion
 *
 * All transitions are CSS (src/css/tailwind.css, .pll-* classes).
 */
import { store, getContext } from '@wordpress/interactivity';

const SCROLL_THRESHOLD = 120;

function setScrollLock( locked ) {
	document.documentElement.classList.toggle( 'pll-menu-open', locked );
}

const { state, actions } = store( 'pll/header', {
	state: {
		get isVisible() {
			const ctx = getContext();
			return Boolean( ctx.forceVisible || ctx.scrolled );
		},
		get menuLabel() {
			return getContext().open ? 'Close menu' : 'Open menu';
		},
	},
	actions: {
		toggleMenu() {
			const ctx = getContext();
			ctx.open = ! ctx.open;
			setScrollLock( ctx.open );
		},
		closeMenu() {
			const ctx = getContext();
			if ( ctx.open ) {
				ctx.open = false;
				setScrollLock( false );
			}
		},
		openSub() {
			getContext().subOpen = true;
		},
		closeSub() {
			getContext().subOpen = false;
		},
		toggleMobileSub() {
			const ctx = getContext();
			ctx.expanded = ! ctx.expanded;
		},
	},
	callbacks: {
		init() {
			const ctx = getContext();
			if ( ! ctx.forceVisible ) {
				ctx.scrolled = window.scrollY > SCROLL_THRESHOLD;
			}
		},
		onScroll() {
			const ctx = getContext();
			if ( ! ctx.forceVisible ) {
				ctx.scrolled = window.scrollY > SCROLL_THRESHOLD;
			}
		},
		onKeydown( event ) {
			if ( 'Escape' === event.key ) {
				actions.closeMenu();
			}
		},
	},
} );
