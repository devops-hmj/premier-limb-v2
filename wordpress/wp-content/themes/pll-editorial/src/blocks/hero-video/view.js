/**
 * pll/hero-video — Interactivity API store.
 *
 * Port of the imperative video logic in components/v2/HeroStage.tsx:
 *  - force muted + kick playback explicitly (don't trust the attribute),
 *    retrying on canplay/loadeddata
 *  - enable sound at the visitor's first interaction (pointer, key, touch,
 *    scroll) — the closest to "autoplay with sound" browsers allow
 *  - manual sound toggle button
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

function stageVideo( ref ) {
	const stage = ref.closest( '.v2-video-stage' ) || ref;
	return stage.querySelector( 'video' );
}

const { state, actions } = store( 'pll/hero', {
	state: {
		get soundLabel() {
			return getContext().muted
				? 'Turn hero video sound on'
				: 'Mute hero video';
		},
		get soundText() {
			return getContext().muted ? 'Sound off' : 'Sound on';
		},
	},
	actions: {
		toggleSound() {
			const ctx = getContext();
			const video = stageVideo( getElement().ref );
			if ( ! video ) {
				return;
			}
			video.muted = ! video.muted;
			ctx.muted = video.muted;
			if ( ! video.muted ) {
				video.play?.().catch( () => {} );
			}
		},
	},
	callbacks: {
		init() {
			const ctx = getContext();
			const video = stageVideo( getElement().ref );
			if ( ! video ) {
				return;
			}
			video.muted = true;

			const tryPlay = () => {
				video.play?.().catch( () => {} );
			};
			tryPlay();
			video.addEventListener( 'canplay', tryPlay );
			video.addEventListener( 'loadeddata', tryPlay );

			let armed = true;
			const detach = () => {
				window.removeEventListener( 'pointerdown', enableSound );
				window.removeEventListener( 'keydown', enableSound );
				window.removeEventListener( 'touchstart', enableSound );
				window.removeEventListener( 'scroll', enableSound );
			};
			const enableSound = () => {
				if ( ! armed ) {
					return;
				}
				armed = false;
				video.muted = false;
				ctx.muted = false;
				video.play?.().catch( () => {} );
				detach();
			};
			window.addEventListener( 'pointerdown', enableSound );
			window.addEventListener( 'keydown', enableSound );
			window.addEventListener( 'touchstart', enableSound );
			window.addEventListener( 'scroll', enableSound, { passive: true } );
		},
	},
} );
